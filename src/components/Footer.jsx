import { useState, useEffect } from 'react'
import Icon from './Icon'
import './Footer.css'

const EMAIL = 'ranyboytemplado@gmail.com'
const RESUME = '/Rany_Boy_Templado_Resume.pdf'

const INTENTS = [
  { id: 'opportunity', label: '💼 Opportunity / Hiring', subject: 'Opportunity for Rany Boy Templado' },
  { id: 'collaboration', label: '🤝 Project Collaboration', subject: 'Project Collaboration Inquiry' },
  { id: 'hello', label: '👋 Just Saying Hello', subject: 'Hello Rany!' },
]

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedIntent, setSelectedIntent] = useState(INTENTS[0])
  const [currentTime, setCurrentTime] = useState('')
  const [waveCount, setWaveCount] = useState(0)
  const [waved, setWaved] = useState(false)

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

  // Open email client
  function handleSendEmail() {
    const subject = encodeURIComponent(selectedIntent.subject)
    window.location.href = `mailto:${EMAIL}?subject=${subject}`
  }

  // Playful wave interaction
  function handleWave() {
    setWaveCount(c => c + 1)
    setWaved(true)
    setTimeout(() => setWaved(false), 3000)
  }

  // Ask notDev.ai Assistant
  function handleAskAi() {
    window.dispatchEvent(
      new CustomEvent('open-notdev-ai', {
        detail: {
          query: "Hi! Can you give me a summary of Rany's background, skills, and current focus?",
        },
      })
    )
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__container">

        {/* ── Section Header ── */}
        <div className="footer__header">
          <p className="footer__eyebrow">04 / Get In Touch</p>
          <h2 className="footer__title">Let's connect.</h2>
          <p className="footer__lead">
            Open for software engineering opportunities, meaningful collaborations, or just a friendly conversation.
          </p>
        </div>

        {/* ── Minimalist Interactive Hub ── */}
        <div className="footer__card">

          {/* Top Status & Wave Bar */}
          <div className="footer__card-topbar">
            <div className="footer__status-badge">
              <span className="footer__status-dot" />
              <span>Cavite, Philippines · {currentTime || 'GMT+8'}</span>
              <span className="footer__status-pill">Available for opportunities</span>
            </div>

            <button
              type="button"
              className={`footer__wave-btn${waved ? ' footer__wave-btn--active' : ''}`}
              onClick={handleWave}
              title="Send a friendly wave to Rany"
            >
              <span className="footer__wave-emoji" aria-hidden="true">👋</span>
              <span>{waved ? 'Wave received! Thanks for stopping by!' : 'Say hello with a wave'}</span>
              {waveCount > 0 && <span className="footer__wave-counter">({waveCount})</span>}
            </button>
          </div>

          {/* Direct Comms Box (Simple & Human) */}
          <div className="footer__main-action-box">
            <div className="footer__intent-picker">
              <span className="footer__intent-label">I'M REACHING OUT ABOUT:</span>
              <div className="footer__intents" role="radiogroup" aria-label="Reason for reaching out">
                {INTENTS.map(item => {
                  const isSelected = selectedIntent.id === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`footer__intent-pill${isSelected ? ' footer__intent-pill--active' : ''}`}
                      onClick={() => setSelectedIntent(item)}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="footer__action-buttons">
              <button
                type="button"
                className="footer__action-email"
                onClick={handleSendEmail}
              >
                <Icon name="message" size={16} />
                <span>Email Rany</span>
                <span className="footer__arrow" aria-hidden="true">↗</span>
              </button>

              <button
                type="button"
                className="footer__action-copy"
                onClick={handleCopyEmail}
                title="Copy email address"
              >
                {copiedEmail ? <Icon name="check" size={15} /> : <Icon name="article" size={15} />}
                <span>{copiedEmail ? 'Copied to Clipboard ✓' : 'Copy Email Address'}</span>
              </button>
            </div>
          </div>

          {/* AI Companion Callout (Clear Division of Purpose) */}
          <div className="footer__ai-callout">
            <div className="footer__ai-callout-text">
              <span className="footer__ai-callout-title">
                <span className="footer__ai-spark" aria-hidden="true">✦</span> Have questions about my skills, projects, or background?
              </span>
              <p className="footer__ai-callout-desc">
                Ask <strong>notDev.ai</strong> my portfolio assistant is available 24/7 to answer anything immediately.
              </p>
            </div>
            <button
              type="button"
              className="footer__ai-callout-btn"
              onClick={handleAskAi}
            >
              <span>Chat with notDev.ai</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

        </div>

        {/* ── Direct Channels Dock ── */}
        <div className="footer__dock">

          <div className="footer__dock-item">
            <span className="footer__dock-label">Direct Email</span>
            <div className="footer__dock-email-row">
              <a href={`mailto:${EMAIL}`} className="footer__dock-link">
                {EMAIL}
              </a>
              <button
                type="button"
                className="footer__dock-copy-btn"
                onClick={handleCopyEmail}
                title="Copy email address"
              >
                {copiedEmail ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="footer__dock-item">
            <span className="footer__dock-label">Documentation</span>
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__dock-pill"
            >
              <Icon name="article" size={14} />
              <span>View Résumé (PDF)</span>
            </a>
          </div>

          <div className="footer__dock-item">
            <span className="footer__dock-label">Social & Code</span>
            <div className="footer__dock-socials">
              <a
                href="https://github.com/ranyboytemplado"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__dock-social-link"
                aria-label="GitHub Profile"
              >
                <Icon name="github" size={15} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ranyboy-templado/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__dock-social-link"
                aria-label="LinkedIn Profile"
              >
                <Icon name="linkedin" size={15} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

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
