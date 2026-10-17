// Visitor counter backed by MongoDB Atlas.
//
// Returns { online, total }:
//   - total:  all-time visit count ($inc on a single counter doc)
//   - online: approximate "online now" — count of heartbeat docs that
//             haven't expired yet (a TTL index removes them automatically).
//
// The browser only ever talks to this same-origin function, so the site's
// strict CSP (connect-src 'self') stays intact — MongoDB is reached server-side.
//
// Configure in a local .env and in Vercel > Settings > Environment Variables:
//   MONGODB_URI   (required)  mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/?...
//   MONGODB_DB    (optional)  database name, defaults to "portfolio"
//
// If MONGODB_URI is absent or the DB is unreachable, the endpoint responds 204
// so the UI hides the badge gracefully instead of showing an error.

import { MongoClient } from 'mongodb'

const ONLINE_WINDOW_MS = 45_000
const DB_NAME = process.env.MONGODB_DB || 'portfolio'

// Cache the client across warm serverless invocations so we don't exhaust
// the Atlas connection pool by reconnecting on every request.
let cached = globalThis.__visitorsMongo
if (!cached) {
  cached = globalThis.__visitorsMongo = { client: null, promise: null, indexReady: false }
}

async function getDb() {
  const uri = String(process.env.MONGODB_URI || '').trim()
  if (!uri) return null

  if (!cached.client) {
    if (!cached.promise) {
      cached.promise = new MongoClient(uri, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5_000,
      }).connect()
    }
    cached.client = await cached.promise
  }

  const db = cached.client.db(DB_NAME)

  // Ensure the TTL index once per cold start. Heartbeats older than
  // ONLINE_WINDOW_MS are auto-removed by MongoDB, which makes "online now"
  // a simple countDocuments().
  if (!cached.indexReady) {
    await db.collection('heartbeats').createIndex(
      { expireAt: 1 },
      { expireAfterSeconds: 0 }
    )
    cached.indexReady = true
  }

  return db
}

function clientId(req) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'anon')
    .split(',')[0]
    .trim()
  return ip || 'anon'
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  let db
  try {
    db = await getDb()
  } catch (err) {
    console.warn('[visitors] connect failed —', err.message)
    return res.status(204).end()
  }
  // Not configured yet — tell the UI to stay quiet.
  if (!db) return res.status(204).end()

  const now = Date.now()
  const id = clientId(req)
  // A GET is a heartbeat/poll; a POST is a first-visit that also bumps the total.
  const isNewVisit = req.method === 'POST'

  try {
    // Refresh this visitor's heartbeat (upsert keyed by visitor id so a
    // refreshing/multi-tab visitor collapses to one presence).
    await db.collection('heartbeats').updateOne(
      { _id: id },
      { $set: { expireAt: new Date(now + ONLINE_WINDOW_MS) } },
      { upsert: true }
    )

    const online = await db.collection('heartbeats').countDocuments()

    let total
    if (isNewVisit) {
      const doc = await db.collection('visits').findOneAndUpdate(
        { _id: 'global' },
        { $inc: { total: 1 } },
        { upsert: true, returnDocument: 'after' }
      )
      // Driver versions differ on whether the doc is under `.value`.
      total = (doc?.value?.total ?? doc?.total ?? 1)
    } else {
      const doc = await db.collection('visits').findOne({ _id: 'global' })
      total = doc?.total ?? 0
    }

    return res.status(200).json({ online: Math.max(online, 1), total })
  } catch (err) {
    console.warn('[visitors] query failed —', err.message)
    // Soft-fail: 204 so the badge hides rather than showing a broken number.
    return res.status(204).end()
  }
}
