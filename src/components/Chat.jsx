import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../services/ai'
import NotDevSprite from './NotDevSprite'
import './Chat.css'

const CONTINUOUS_SUGGESTIONS = [
  "What is Rany's core tech stack?",
  "Tell me about Rany's SAP migration experience",
  "What automation workflows has Rany built?",
  "Show me Rany's featured projects",
  "How did Rany transition into software engineering?",
  "What certifications does Rany hold?",
  "How can I contact or hire Rany?",
]

function safeHref(value) {
  try {
    const url = new URL(value, window.location.origin)
    return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

function parseMarkdown(text) {
  const lines = text.split('\n')

  return lines.map((line, lineIndex) => {
    const isBullet = /^(\s*[-*•]|\s*\d+\.)\s+/.test(line)
    const cleanLine = isBullet ? line.replace(/^(\s*[-*•]|\s*\d+\.)\s+/, '') : line

    const parts = cleanLine.split(/(`[^`]+`|\[.+?\]\(.+?\)|\*\*.+?\*\*)/g)
    const parsedContent = parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code key={i} className="chat-msg__inline-code">
            {part.slice(1, -1)}
          </code>
        )
      }
      const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/)
      if (linkMatch) {
        const href = safeHref(linkMatch[2])
        if (!href) return linkMatch[1]
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-msg__link"
          >
            {linkMatch[1]}
            <span className="chat-msg__link-arrow" aria-hidden="true">↗</span>
          </a>
        )
      }
      const boldMatch = part.match(/^\*\*(.+?)\*\*$/)
      if (boldMatch) {
        return <strong key={i} className="chat-msg__strong">{boldMatch[1]}</strong>
      }
      return part
    })

    if (isBullet) {
      return (
        <div key={lineIndex} className="chat-msg__list-item">
          <span className="chat-msg__bullet-point" aria-hidden="true">▹</span>
          <span>{parsedContent}</span>
        </div>
      )
    }

    return (
      <span key={lineIndex}>
        {parsedContent}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    )
  })
}

const STORAGE_KEY_MESSAGES = 'notdev_chat_messages_v2'
const STORAGE_KEY_HISTORY = 'notdev_chat_history_v2'

const DEFAULT_MESSAGE = {
  role: 'model',
  text: "Hi! I'm **notDev.ai**. Ask me anything about Rany's work, tech stack, or career.",
  id: 0,
  timestamp: 'Online',
}

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(m => ({ ...m, streaming: false }))
        }
      }
    } catch (e) {
      console.warn('Failed to restore chat messages from storage', e)
    }
    return [DEFAULT_MESSAGE]
  })
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn('Failed to restore chat history from storage', e)
    }
    return []
  })
  const [copiedId, setCopiedId] = useState(null)

  // Continuous falling suggestions near header
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [animState, setAnimState] = useState('enter')
  const [isPaused, setIsPaused] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const idRef = useRef(
    messages.reduce((max, m) => Math.max(max, typeof m.id === 'number' ? m.id : 0), 0) + 1
  )

  // Persist messages across page reloads & closing chat
  useEffect(() => {
    try {
      const completed = messages.filter(m => !m.streaming)
      if (completed.length > 0) {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(completed))
      }
    } catch (e) {
      console.warn('Failed to save chat messages', e)
    }
  }, [messages])

  // Persist conversation context for multi-turn coherence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history))
    } catch (e) {
      console.warn('Failed to save chat history', e)
    }
  }, [history])

  // Smooth continuous falling suggestion cycle
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setAnimState('exit')
      setTimeout(() => {
        setSuggestionIndex(prev => (prev + 1) % CONTINUOUS_SUGGESTIONS.length)
        setAnimState('enter')
      }, 350)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPaused])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Keyboard shortcut listener (ESC to close, Ctrl+K / Cmd+K to toggle)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [open])

  // Auto focus input on open
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Support opening chat from other components via custom event
  useEffect(() => {
    const handleOpenAi = (e) => {
      setOpen(true)
      if (e.detail?.query) {
        handleSend(e.detail.query)
      }
    }
    window.addEventListener('open-notdev-ai', handleOpenAi)
    return () => window.removeEventListener('open-notdev-ai', handleOpenAi)
  }, [loading])

  function handleResetChat() {
    try {
      localStorage.removeItem(STORAGE_KEY_MESSAGES)
      localStorage.removeItem(STORAGE_KEY_HISTORY)
    } catch (e) {
      console.warn('Failed to clear chat storage', e)
    }
    setMessages([
      {
        role: 'model',
        text: "Conversation reset. What would you like to know about Rany?",
        id: idRef.current++,
        timestamp: 'Online',
      },
    ])
    setHistory([])
    inputRef.current?.focus()
  }

  async function handleCopyMessage(id, text) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.warn('Copy failed', err)
    }
  }

  async function handleSend(text) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    setInput('')
    const userMsg = {
      role: 'user',
      text: msg,
      id: idRef.current++,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    const aiId = idRef.current++
    setMessages(prev => [
      ...prev,
      {
        role: 'model',
        text: '',
        id: aiId,
        streaming: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])

    let accumulated = ''
    try {
      await sendMessage(history, msg, (chunk) => {
        accumulated += chunk
        setMessages(prev =>
          prev.map(m => (m.id === aiId ? { ...m, text: accumulated } : m))
        )
      })

      setMessages(prev =>
        prev.map(m => (m.id === aiId ? { ...m, streaming: false } : m))
      )
      setHistory(prev => [
        ...prev,
        { role: 'user', text: msg },
        { role: 'model', text: accumulated },
      ].slice(-8))
    } catch (err) {
      console.error('[Chat error]', err)
      setMessages(prev =>
        prev.map(m =>
          m.id === aiId
            ? {
                ...m,
                text: err.message || 'The assistant encountered a temporary failure. Please try again.',
                streaming: false,
                error: true,
              }
            : m
        )
      )
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* ── Floating Action Summoner (FAB) ── */}
      <button
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close notDev.ai chat' : 'Open notDev.ai chat (Ctrl+K)'}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        title={open ? 'Close chat (ESC)' : 'Ask notDev.ai (Ctrl+K)'}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="chat-fab__inner">
            <NotDevSprite size={30} />
            <span className="chat-fab__badge">
              <span className="chat-fab__badge-dot" />
              notDev.ai
            </span>
            <span className="chat-fab__shortcut-hint" aria-hidden="true">⌘K</span>
          </div>
        )}
      </button>

      {/* ── Minimalist Chat Window ── */}
      <div
        id="portfolio-chat"
        className={`chat-window${open ? ' chat-window--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="notDev.ai chat"
        hidden={!open}
      >

        {/* ── Minimalist Header ── */}
        <div className="chat-header">
          <div className="chat-header__info">
            <div className="chat-header__sprite-box">
              <NotDevSprite size={28} />
            </div>
            <div className="chat-header__meta">
              <span className="chat-header__name">notDev.ai</span>
              <span className="chat-header__status">
                <span className="chat-header__dot" />
                <span>Online</span>
              </span>
            </div>
          </div>

          <div className="chat-header__actions">
            <button
              type="button"
              className="chat-header__btn"
              onClick={handleResetChat}
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>

            <button
              type="button"
              className="chat-header__close"
              onClick={() => setOpen(false)}
              aria-label="Close notDev.ai window"
              title="Close (ESC)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Falling Continuous Suggestions Bar ── */}
        <div
          className="chat-suggestion-ticker"
          onClick={() => handleSend(CONTINUOUS_SUGGESTIONS[suggestionIndex])}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          title="Click to ask this question"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend(CONTINUOUS_SUGGESTIONS[suggestionIndex])
          }}
        >
          <div className="chat-suggestion-ticker__content">
            <span className="chat-suggestion-ticker__sparkle" aria-hidden="true">✦</span>
            <span
              key={suggestionIndex}
              className={`chat-suggestion-ticker__text chat-suggestion-ticker__text--${animState}`}
            >
              {CONTINUOUS_SUGGESTIONS[suggestionIndex]}
            </span>
          </div>
          <span className="chat-suggestion-ticker__hint" aria-hidden="true">
            Ask ↵
          </span>
        </div>

        {/* ── Message Stream ── */}
        <div className="chat-messages" aria-live="polite">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-msg chat-msg--${msg.role}${msg.error ? ' chat-msg--error' : ''}`}
            >
              {msg.role === 'model' && (
                <div className="chat-msg__avatar-wrap">
                  <NotDevSprite size={22} animated={msg.streaming} />
                </div>
              )}

              <div className="chat-msg__bubble-container">
                <div className="chat-msg__bubble">
                  <div className="chat-msg__text">
                    {parseMarkdown(msg.text)}
                  </div>
                  {msg.streaming && <span className="chat-msg__cursor">▌</span>}
                </div>

                {msg.role === 'model' && !msg.streaming && !msg.error && (
                  <div className="chat-msg__meta-row">
                    <span className="chat-msg__timestamp">{msg.timestamp || 'Online'}</span>
                    <button
                      type="button"
                      className="chat-msg__copy-btn"
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg chat-msg--model chat-msg--thinking">
              <div className="chat-msg__avatar-wrap">
                <NotDevSprite size={22} animated />
              </div>
              <div className="chat-thinking-bubble">
                <span className="chat-thinking-dot" />
                <span className="chat-thinking-dot" />
                <span className="chat-thinking-dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Minimalist Input Dock ── */}
        <div className="chat-input-container">
          <div className="chat-input-wrap">
            <input
              ref={inputRef}
              id="chat-input"
              className="chat-input"
              type="text"
              placeholder="Ask anything about Rany..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              maxLength={500}
              autoComplete="off"
            />
            <button
              type="button"
              className="chat-send"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              title="Send (Enter)"
            >
              {loading ? (
                <span className="chat-send__spinner" />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
