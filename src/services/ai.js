const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_ITEMS = 8

async function streamText(text, onChunk, delay = 12) {
  const parts = text.split(/(\s+)/)
  for (const part of parts) {
    onChunk(part)
    if (part.trim()) await new Promise(resolve => setTimeout(resolve, delay))
  }
  return text
}

function cleanHistory(history) {
  return history.slice(-MAX_HISTORY_ITEMS).map(item => ({
    role: item.role === 'model' ? 'assistant' : 'user',
    content: String(item.text || '').slice(0, 1000),
  }))
}

// Shape of the private admin reset command, WITHOUT the secret itself.
// The actual phrase/token lives only in a server-side env var — it is never
// shipped to the browser — so inspecting this bundle reveals nothing usable.
// We recognize the *structure* locally only to avoid sending ordinary chat
// messages to the reset endpoint; the server is the sole authority.
const RESET_COMMAND_SHAPE = /^remove all time visit .+ here$/

async function resetVisitCounter(phrase) {
  const res = await fetch('/api/visitors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'portfolio-chat' },
    body: JSON.stringify({ reset: phrase }),
  })
  const data = await res.json().catch(() => ({}))
  return Boolean(data && data.ok)
}

export async function sendMessage(history, userMessage, onChunk) {
  // If the input looks like the admin reset command, forward the RAW text to
  // the server (which checks it against the secret) instead of the AI. The
  // client never knows whether the phrase is correct — only the server does.
  if (RESET_COMMAND_SHAPE.test(String(userMessage))) {
    const ok = await resetVisitCounter(String(userMessage))
    const reply = ok
      ? 'Done. The all-time visit counter has been reset to zero.'
      : 'That command could not be completed.'
    return streamText(reply, onChunk)
  }

  const message = String(userMessage || '').trim()
  if (!message) throw new Error('Please enter a question.')
  if (message.length > MAX_MESSAGE_LENGTH) throw new Error(`Please keep questions under ${MAX_MESSAGE_LENGTH} characters.`)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 16000)

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'portfolio-chat' },
      body: JSON.stringify({ message, history: cleanHistory(history) }),
      signal: controller.signal,
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.error || 'The assistant is unavailable right now.')
    return streamText(String(data.text || 'No response was returned.'), onChunk)
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The assistant took too long to respond. Please try again.')
    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export function getProviderStatus() {
  return [{ name: 'Server-managed AI', configured: true, exhausted: false }]
}
