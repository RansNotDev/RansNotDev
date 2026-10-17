import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Bridges a Vercel-style serverless handler into the Vite dev server so that
// `npm run dev` exercises the real /api functions locally (no `vercel dev` needed).
function mountApi(server, route, importer) {
  server.middlewares.use(route, async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }

    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', async () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        const body = raw ? JSON.parse(raw) : {}
        const { default: handler } = await importer()
        const vercelReq = {
          ...req,
          method: req.method,
          headers: req.headers,
          socket: req.socket,
          body,
        }
        const vercelRes = {
          setHeader(key, value) {
            res.setHeader(key, value)
          },
          status(code) {
            res.statusCode = code
            return this
          },
          json(payload) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
          },
          end(payload) {
            res.end(payload)
            return this
          },
        }
        await handler(vercelReq, vercelRes)
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: error.message || 'Local API failed.' }))
      }
    })
    req.on('error', next)
  })
}

function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      mountApi(server, '/api/chat', () => import('./api/chat.js'))
      mountApi(server, '/api/visitors', () => import('./api/visitors.js'))
      mountApi(server, '/api/contact', () => import('./api/contact.js'))
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith('VITE_')) process.env[key] = value
  }

  return {
    plugins: [react(), localApi()],
  }
})
