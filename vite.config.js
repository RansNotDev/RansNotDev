import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function localChatApi() {
  return {
    name: 'local-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
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
            const { default: handler } = await import('./api/chat.js')
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
            }
            await handler(vercelReq, vercelRes)
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error.message || 'Local chat API failed.' }))
          }
        })
        req.on('error', next)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith('VITE_')) process.env[key] = value
  }

  return {
    plugins: [react(), localChatApi()],
  }
})
