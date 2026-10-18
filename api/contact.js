// Contact form handler — validates and emails a visitor's message to Rany.
//
// Flow:
//   1. Same-origin + method + content-type + rate-limit + payload guards
//   2. Validate the sender email: format, then a live DNS MX-record lookup
//      (confirms the domain can actually receive mail — rejects typos like
//      "gmial.com" and made-up domains). Note: no provider on earth can
//      reliably confirm a specific Gmail *mailbox* exists, so we don't claim to.
//   3. Send via Resend to RECIPIENT, with the visitor's address as reply-to.
//
// The browser only talks to this same-origin function, so the strict CSP
// (connect-src 'self') stays intact — Resend is reached server-side.
//
// Env (set in .env locally and in Vercel > Settings > Environment Variables):
//   RESEND_API_KEY   (required to actually send)
//   CONTACT_FROM     (optional) sender; defaults to Resend's shared onboarding address
//   CONTACT_TO       (optional) recipient; defaults to RECIPIENT below

import { promises as dns } from 'node:dns'
import { validateSubmission } from './_contactValidation.js'

const RECIPIENT = process.env.CONTACT_TO || 'ranyboytemplado001@gmail.com'
const FROM = process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>'

const windows = new Map()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 5
const MAX_BODY_BYTES = 10_000
let lastPruneAt = 0

function clientId(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim()
}

function withinRateLimit(req) {
  const key = clientId(req)
  const now = Date.now()
  if (now - lastPruneAt > WINDOW_MS) {
    for (const [id, entry] of windows) {
      if (now - entry.started > WINDOW_MS) windows.delete(id)
    }
    lastPruneAt = now
  }
  const entry = windows.get(key)
  if (!entry || now - entry.started > WINDOW_MS) {
    windows.set(key, { started: now, count: 1 })
    return true
  }
  entry.count += 1
  return entry.count <= MAX_REQUESTS
}

function sameOrigin(req) {
  const origin = req.headers.origin
  const host = req.headers['x-forwarded-host'] || req.headers.host
  if (!origin || !host) return true
  try {
    const originHost = new URL(origin).host
    if (originHost === host) return true
    if (originHost.includes('localhost') || originHost.includes('127.0.0.1') || originHost.includes('vercel.app')) return true
    return false
  } catch {
    return true
  }
}

// Confirm the email's domain can receive mail (has MX, or at least an A record
// as a fallback per RFC 5321). This is the strongest "is this a real email"
// check possible without sending a confirmation link.
async function domainCanReceiveMail(email) {
  const domain = email.split('@')[1]
  if (!domain) return false
  try {
    const mx = await dns.resolveMx(domain)
    if (Array.isArray(mx) && mx.length > 0) return true
  } catch {
    // fall through to A-record fallback
  }
  try {
    const a = await dns.resolve(domain)
    return Array.isArray(a) && a.length > 0
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Origin not allowed.' })
  if (!String(req.headers['content-type'] || '').includes('application/json')) {
    return res.status(415).json({ error: 'JSON is required.' })
  }
  if (!withinRateLimit(req)) {
    return res.status(429).json({ error: 'Too many messages. Please wait a minute and try again.' })
  }

  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {})
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Message is too large.' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  // ── Zero-trust rule-based validation (name, email, message quality/spam) ──
  const verdict = validateSubmission(body)
  if (!verdict.is_valid) {
    const field = verdict.status_code === 'REJECTED_INVALID_EMAIL' ? 'email' : 'message'
    // Technical `reason` stays in the logs; the visitor sees a friendly message.
    console.info(`[contact] rejected (${verdict.status_code}): ${verdict.reason}`)
    return res.status(422).json({
      is_valid: false,
      status_code: verdict.status_code,
      error: verdict.userMessage,
      field,
    })
  }

  const { name, email, intent, message } = verdict.sanitized_payload

  // ── Email deliverability: live DNS MX-record lookup ──
  const deliverable = await domainCanReceiveMail(email)
  if (!deliverable) {
    console.info(`[contact] rejected (MX): domain for ${email} can't receive mail`)
    return res.status(422).json({
      is_valid: false,
      status_code: 'REJECTED_INVALID_EMAIL',
      error: 'Please use a real, working email address so Rany can reply to you directly.',
      field: 'email',
    })
  }

  // ── Send via Resend ──
  const apiKey = String(process.env.RESEND_API_KEY || '').trim()
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not configured')
    return res.status(503).json({ error: 'The contact service isn’t configured yet. Please email Rany directly.' })
  }

  const subject = intent && intent !== 'General'
    ? `[${intent}] Portfolio message from ${name}`
    : `New portfolio message from ${name}`

  // message is already HTML-escaped by the validator; keep a plain-text version
  const plainMessage = message
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")

  const textBody =
    `New message from your portfolio contact form\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Intent:  ${intent}\n\n` +
    `${plainMessage}\n`

  const htmlBody =
    `<h2 style="margin:0 0 12px">New portfolio message</h2>` +
    `<p style="margin:4px 0"><strong>Name:</strong> ${name}</p>` +
    `<p style="margin:4px 0"><strong>Email:</strong> ${email}</p>` +
    `<p style="margin:4px 0"><strong>Intent:</strong> ${intent}</p>` +
    `<hr style="border:none;border-top:1px solid #ddd;margin:14px 0" />` +
    `<p style="white-space:pre-wrap;margin:0">${message}</p>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [RECIPIENT],
        reply_to: email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.warn(`[contact] Resend ${response.status}: ${detail.slice(0, 200)}`)
      return res.status(502).json({ error: 'Couldn’t send right now. Please try again, or email Rany directly.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] send failed —', err.message)
    return res.status(502).json({ error: 'Couldn’t send right now. Please try again, or email Rany directly.' })
  }
}
