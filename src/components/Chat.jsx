import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../services/ai'
import NotDevSprite from './NotDevSprite'
import './Chat.css'

const SUGGESTIONS = [
  "How does Rany handle SAP data migration?",
  "Explain the 9-provider AI gateway architecture",
  "What automation tools does Rany work with?",
  "What projects has Rany built with React & PHP?",
]
function safeHref(value) {
  try {
    const url = new URL(value, window.location.origin)
    return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

function parseText(text) {
  const parts = text.split(/(\[.+?\]\(.+?\)|\*\*.+?\*\*)/g)
  return parts.map((part, i) => {
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
        </a>
      )
    }
    // Bold: **text**
    const boldMatch = part.match(/^\*\*(.+?)\*\*$/)
    if (boldMatch) return <strong key={i}>{boldMatch[1]}</strong>
    return part
  })
}

export default function Chat() {
  const [open,     setOpen]     = useState(false)
  const [input,    setInput]    = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! I'm notDev.ai, Rany's portfolio intelligence assistant. Ask me about Rany's SAP data migration workflows, software projects, automation tools, or technical capabilities.",
      id: 0,
    },
  ])
  const [loading,  setLoading]  = useState(false)
  const [history,  setHistory]  = useState([])
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)
  const idRef      = useRef(1)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened and support Escape to close.
  useEffect(() => {
    if (!open) return undefined
    const timer = setTimeout(() => inputRef.current?.focus(), 150)
    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleEscape)
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

  async function handleSend(text) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    setInput('')
    const userMsg = { role: 'user', text: msg, id: idRef.current++ }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Placeholder streaming message
    const aiId = idRef.current++
    setMessages(prev => [...prev, { role: 'model', text: '', id: aiId, streaming: true }])

    let accumulated = ''
    try {
      await sendMessage(history, msg, (chunk) => {
        accumulated += chunk
        setMessages(prev =>
          prev.map(m => m.id === aiId ? { ...m, text: accumulated } : m)
        )
      })

      setMessages(prev =>
        prev.map(m => m.id === aiId ? { ...m, streaming: false } : m)
      )
      setHistory(prev => [
        ...prev,
        { role: 'user',  text: msg         },
        { role: 'model', text: accumulated },
      ].slice(-8))
    } catch (err) {
      console.error('[Chat error]', err)
      setMessages(prev =>
        prev.map(m => m.id === aiId
          ? { ...m, text: err.message || 'Something went wrong. Please try again.', streaming: false, error: true }
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
      {/* Floating bubble */}
      <button
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close notDev.ai chat' : 'Chat with notDev.ai'}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        title="Ask notDev.ai"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <NotDevSprite size={32} />
        )}
        {!open && <span className="chat-fab__badge">notDev.ai</span>}
      </button>

      {/* Chat window */}
      <div id="portfolio-chat" className={`chat-window${open ? ' chat-window--open' : ''}`} role="dialog" aria-modal="true" aria-label="notDev.ai assistant" hidden={!open}>

        {/* Header */}
        <div className="chat-header">
          <div className="chat-header__info">
            <NotDevSprite size={34} />
            <div>
              <div className="chat-header__title-row">
                <p className="chat-header__name">notDev.ai</p>
                <span className="chat-header__gateway-tag">9-Provider Failover</span>
              </div>
              <p className="chat-header__status">
                <span className="chat-header__dot" />
                SAP Migration · Automation · Software
              </p>
            </div>
          </div>
          <button className="chat-header__close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" aria-live="polite">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg chat-msg--${msg.role}${msg.error ? ' chat-msg--error' : ''}`}>
              {msg.role === 'model' && (
                <div className="chat-msg__avatar-wrap">
                  <NotDevSprite size={24} animated={false} />
                </div>
              )}
              <div className="chat-msg__bubble">
                <div className="chat-msg__text">
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {parseText(line)}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
                {msg.streaming && <span className="chat-msg__cursor">▌</span>}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions — only show when no user messages yet */}
        {messages.length === 1 && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="chat-suggestion" onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-wrap">
          <label htmlFor="chat-input" className="sr-only">Ask notDev.ai about code, data pipelines, or Rany's work</label>
          <input
            ref={inputRef}
            id="chat-input"
            className="chat-input"
            type="text"
            placeholder="Ask notDev.ai about Rany, data pipelines, or software..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            maxLength={500}
          />
          <button
            className="chat-send"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            aria-label="Send"
          >
            {loading ? (
              <span className="chat-send__spinner" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            )}
          </button>
        </div>

      </div>
    </>
  )
}
