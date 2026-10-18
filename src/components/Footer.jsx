import { useState, useEffect } from 'react'
import Icon from './Icon'
import { socialLinks } from '../data/socials'
import './Footer.css'

const EMAIL = 'ranyboytemplado001@gmail.com'
const RECIPIENT = 'Rany Templado'

// Client-side format check (the server re-validates and does an MX lookup too)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Compose form state
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent

  // Live GMT+8 Clock
  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      })
      setCurrentTime(timeStr)
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto reset copied email
  useEffect(() => {
    if (!copiedEmail) return undefined
    const t = setTimeout(() => setCopiedEmail(false), 2000)
    return () => clearTimeout(t)
  }, [copiedEmail])

  // Copy email
  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopiedEmail(true)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  // Submit the message to the serverless contact API, which validates the
  // email (format + live MX-record lookup) and emails it to Rany via Resend.
  async function handleSend(e) {
    e.preventDefault()
    if (status === 'sending') return

    const fromValue = from.trim()
    const nameValue = name.trim()
    const bodyValue = body.trim()

    if (nameValue && (nameValue.length < 2 || nameValue.length > 50)) {
      setError('Please enter your name (2–50 characters).')
      return
    }
    if (!fromValue) {
      setError('Please enter your email so Rany can reply.')
      return
    }
    if (!EMAIL_PATTERN.test(fromValue)) {
      setError('That email doesn’t look right. Try name@example.com.')
      return
    }
    if (bodyValue.length < 15) {
      setError('Please write a short message (at least 15 characters).')
      return
    }
    setError('')
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'portfolio-contact' },
        body: JSON.stringify({
          name: name.trim(),
          email: fromValue,
          subject: subject.trim(),
          message: body.trim(),
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        setStatus('idle')
        setError(data.error || 'Couldn’t send right now. Please try again.')
        return
      }

      // Success — clear the form and show confirmation
      setStatus('sent')
      setName('')
      setFrom('')
      setSubject('')
      setBody('')
    } catch {
      setStatus('idle')
      setError('Network error. Please check your connection and try again.')
    }
  }

  // Keyboard shortcut: Ctrl/Cmd + Enter sends
  function handleBodyKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSend(e)
    }
  }

  // Ask the personal AI assistant about Rany
  function handleAskAi() {
    window.dispatchEvent(
      new CustomEvent('open-notdev-ai', {
        detail: {
          query: "Hi! Can you give me a summary of Rany's background, skills, and current focus?",
        },
      })
    )
  }

  const socialIconFor = { github: 'github', linkedin: 'linkedin', instagram: 'instagram' }

  return (
    <footer className="footer" id="contact">
      <div className="footer__container">

        {/* ── Section Header ── */}
        <div className="footer__header">
          <p className="footer__eyebrow">04 / Get In Touch</p>
          <h2 className="footer__title">Let's connect.</h2>
        </div>

        {/* ── Two-Column Contact Console ── */}
        <div className="footer__console">

          {/* ── Left: Pitch + Direct Channels ── */}
          <div className="footer__pitch">
            <h3 className="footer__pitch-title">
              If you want to hire me,
              <br />
              <span className="footer__pitch-accent">send the details or contact me here.</span>
            </h3>
            <p className="footer__pitch-lead">
              Open for software engineering roles, freelance work, and project
              collaborations. Fill out the message and it lands straight in my inbox.
            </p>

            <div className="footer__status-badge">
              <span className="footer__status-dot" />
              <span>Local time · {currentTime || 'GMT+8'}</span>
              <span className="footer__status-pill">Available for opportunities</span>
            </div>

            {/* Copyable email chip */}
            <button
              type="button"
              className="footer__email-chip"
              onClick={handleCopyEmail}
              title="Copy email address"
            >
              <Icon name="message" size={15} />
              <span className="footer__email-chip-addr">{EMAIL}</span>
              <span className="footer__email-chip-copy">
                {copiedEmail ? 'Copied ✓' : 'Copy'}
              </span>
            </button>

            {/* Social circles */}
            <div className="footer__socials">
              {socialLinks.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-circle"
                  aria-label={s.name}
                  title={s.name}
                >
                  <Icon name={socialIconFor[s.icon] || 'message'} size={16} />
                </a>
              ))}
              <button
                type="button"
                className="footer__social-circle footer__social-circle--disabled"
                disabled
                aria-disabled="true"
                aria-label="Résumé is temporarily unavailable"
                title="Résumé is temporarily unavailable"
              >
                <Icon name="article" size={16} />
              </button>
            </div>
          </div>

          {/* ── Right: Mail-client Compose Card ── */}
          <form className="footer__compose" onSubmit={handleSend} noValidate>
            <div className="footer__compose-bar">
              <div className="footer__compose-dots" aria-hidden="true">
                <span /><span /><span />
              </div>
              <span className="footer__compose-heading">New Message</span>
              <button
                type="submit"
                className="footer__compose-send-top"
                disabled={status === 'sending'}
              >
                <span aria-hidden="true">➤</span>
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
            </div>

            <div className="footer__field footer__field--to">
              <label className="footer__field-label">To:</label>
              <span className="footer__to-pill">{RECIPIENT}</span>
            </div>

            <div className="footer__field">
              <label htmlFor="cf-name" className="footer__field-label">Name:</label>
              <input
                id="cf-name"
                type="text"
                className="footer__field-input"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="footer__field">
              <label htmlFor="cf-from" className="footer__field-label">
                From: <span className="footer__required" aria-hidden="true">*</span>
              </label>
              <input
                id="cf-from"
                type="email"
                required
                className="footer__field-input"
                placeholder="your@email.com"
                value={from}
                onChange={e => { setFrom(e.target.value); if (error) setError('') }}
                autoComplete="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'cf-error' : undefined}
              />
            </div>

            <div className="footer__field">
              <label htmlFor="cf-subject" className="footer__field-label">Subject:</label>
              <input
                id="cf-subject"
                type="text"
                className="footer__field-input"
                placeholder="What it's about"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>

            <textarea
              className="footer__compose-body"
              placeholder="Hi Rany,"
              value={body}
              onChange={e => setBody(e.target.value)}
              onKeyDown={handleBodyKeyDown}
              rows={5}
            />

            {error && (
              <p id="cf-error" className="footer__compose-error" role="alert">
                {error}
              </p>
            )}

            {status === 'sent' && (
              <p className="footer__compose-success" role="status">
                ✓ Message sent — thanks! Rany will reply to your email soon.
              </p>
            )}

            <div className="footer__compose-foot">
              <span className="footer__compose-hint">
                <kbd>Ctrl</kbd> <kbd>Return</kbd> to send
              </span>
            </div>
          </form>
        </div>

        {/* ── Personal AI Assistant Callout ── */}
        <div className="footer__ai-callout">
          <div className="footer__ai-callout-text">
            <span className="footer__ai-callout-title">
              <span className="footer__ai-spark" aria-hidden="true">✦</span> Want to know about Rany? Ask here.
            </span>
            <p className="footer__ai-callout-desc">
              <strong>notDev.ai</strong> my personal AI assistant can answer anything about my
              skills, projects, and background, 24/7.
            </p>
          </div>
          <button
            type="button"
            className="footer__ai-callout-btn"
            onClick={handleAskAi}
          >
            <span>Ask notDev.ai</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* ── Minimalist Bottom Navigation ── */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Rany Boy Templado. All rights reserved.
          </p>

          <nav className="footer__nav" aria-label="Footer Navigation">
            <a href="#about" className="footer__nav-link">About</a>
            <a href="#projects" className="footer__nav-link">Projects</a>
            <a href="#certifications" className="footer__nav-link">Credentials</a>
            <a href="#hero" className="footer__nav-top" aria-label="Back to top">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              <span>Back to top</span>
            </a>
          </nav>
        </div>

      </div>
    </footer>
  )
}
