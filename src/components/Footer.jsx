import { useState, useEffect } from 'react'
import Icon from './Icon'
import { socialLinks } from '../data/socials'
import './Footer.css'

const EMAIL = 'ranyboytemplado001@gmail.com'
const RECIPIENT = 'Rany Templado'
const RESUME = '/Rany_Boy_Templado_Resume.pdf'

// Accepts any standard email format (user@domain.tld)
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

  // Compose & send via the visitor's mail client.
  // Email (From) is required; everything else is optional.
  function handleSend(e) {
    e.preventDefault()

    const fromValue = from.trim()
    if (!fromValue) {
      setError('Please enter your email so Rany can reply.')
      return
    }
    if (!EMAIL_PATTERN.test(fromValue)) {
      setError('That email doesn’t look right. Try name@example.com.')
      return
    }
    setError('')

    const subjectLine = subject.trim() || `New message from ${name.trim() || 'your portfolio'}`
    const lines = [
      body.trim() || `Hi Rany,`,
      '',
      '—',
      `From: ${name.trim() || 'A visitor'} <${fromValue}>`,
    ]

    const url =
      `mailto:${EMAIL}` +
      `?subject=${encodeURIComponent(subjectLine)}` +
      `&body=${encodeURIComponent(lines.join('\n'))}`

    window.location.href = url
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
              <span>Cavite, Philippines · {currentTime || 'GMT+8'}</span>
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
              <a
                href={RESUME}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-circle"
                aria-label="View Résumé (PDF)"
                title="View Résumé (PDF)"
              >
                <Icon name="article" size={16} />
              </a>
            </div>
          </div>

          {/* ── Right: Mail-client Compose Card ── */}
          <form className="footer__compose" onSubmit={handleSend} noValidate>
            <div className="footer__compose-bar">
              <div className="footer__compose-dots" aria-hidden="true">
                <span /><span /><span />
              </div>
              <span className="footer__compose-heading">New Message</span>
              <button type="submit" className="footer__compose-send-top">
                <span aria-hidden="true">➤</span> Send
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
