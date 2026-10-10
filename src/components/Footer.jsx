import { useState, useEffect } from 'react'
import Icon from './Icon'
import './Footer.css'

const EMAIL = 'ranyboytemplado@gmail.com'
const RESUME = '/Rany_Boy_Templado_Resume.pdf'

const OBJECTIVES = [
  {
    id: 'sap',
    label: 'SAP Data Migration',
    icon: 'database',
    subject: '[Inquiry] SAP S/4HANA Migration & Data Integrity',
    note: "Hi Rany, I'd like to discuss an SAP S/4HANA data migration project involving LTMC/LTMOM mapping, legacy cleansing, or reconciliation.",
  },
  {
    id: 'automation',
    label: 'Workflow Automation',
    icon: 'flow',
    subject: '[Inquiry] Headless Workflow Automation & Webhooks',
    note: "Hi Rany, I'm looking to build automated ETL or webhook workflows using n8n, Zapier, and Python scripts.",
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Web App',
    icon: 'code',
    subject: '[Inquiry] Full-Stack Web Application Engineering',
    note: "Hi Rany, we're planning a web application and need full-stack engineering across React, PHP/Node, and relational databases.",
  },
  {
    id: 'role',
    label: 'Full-Time / Contract Role',
    icon: 'briefcase',
    subject: '[Opportunity] Software Engineering Position',
    note: "Hi Rany, we have an open engineering position or contract opportunity that aligns well with your background.",
  },
  {
    id: 'chat',
    label: 'Technical Chat',
    icon: 'message',
    subject: '[Connect] Technical Chat & Engineering Insights',
    note: "Hi Rany, reaching out to connect about software engineering, agentic AI development, or technology collaboration.",
  },
]

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedNote, setCopiedNote] = useState(false)
  const [selectedObjective, setSelectedObjective] = useState(OBJECTIVES[0])
  const [customNote, setCustomNote] = useState(OBJECTIVES[0].note)
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

  // Auto reset copied note
  useEffect(() => {
    if (!copiedNote) return undefined
    const t = setTimeout(() => setCopiedNote(false), 2000)
    return () => clearTimeout(t)
  }, [copiedNote])

  // Select objective
  function handleSelectObjective(obj) {
    setSelectedObjective(obj)
    setCustomNote(obj.note)
  }

  // Copy email
  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopiedEmail(true)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  // Copy formatted note
  async function handleCopyNote() {
    try {
      await navigator.clipboard.writeText(customNote)
      setCopiedNote(true)
    } catch {
      handleSendEmail()
    }
  }

  // Open mailto
  function handleSendEmail() {
    const subject = encodeURIComponent(selectedObjective.subject)
    const body = encodeURIComponent(customNote)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
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
          query: `I'm interested in discussing ${selectedObjective.label}. What is Rany's availability and typical process?`,
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
          <h2 className="footer__title">Let's build something deliberate.</h2>
          <p className="footer__lead">
            Whether you are planning an SAP migration, building automated workflows, or exploring a software engineering role — I'm always open to discussing new challenges.
          </p>
        </div>

        {/* ── Interactive Minimalist Dispatcher ── */}
        <div className="footer__card">

          {/* Top telemetry bar */}
          <div className="footer__card-topbar">
            <div className="footer__status-badge">
              <span className="footer__status-dot" />
              <span>Cavite, Philippines · {currentTime || 'GMT+8'}</span>
            </div>

            <button
              type="button"
              className={`footer__wave-btn${waved ? ' footer__wave-btn--active' : ''}`}
              onClick={handleWave}
              title="Send a friendly wave to Rany"
            >
              <span className="footer__wave-emoji" aria-hidden="true">👋</span>
              <span>{waved ? 'Wave received! Ready to connect.' : 'Say hello with a wave'}</span>
              {waveCount > 0 && <span className="footer__wave-counter">({waveCount})</span>}
            </button>
          </div>

          {/* Objective selection */}
          <div className="footer__objectives-section">
            <span className="footer__section-label">SELECT YOUR TOPIC:</span>
            <div className="footer__objectives" role="radiogroup" aria-label="Inquiry topics">
              {OBJECTIVES.map(obj => {
                const isSelected = selectedObjective.id === obj.id
                return (
                  <button
                    key={obj.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`footer__objective-pill${isSelected ? ' footer__objective-pill--active' : ''}`}
                    onClick={() => handleSelectObjective(obj)}
                  >
                    <Icon name={obj.icon} size={14} />
                    <span>{obj.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Pre-composed Note box */}
          <div className="footer__note-box">
            <div className="footer__note-header">
              <span className="footer__note-subject">Subject: {selectedObjective.subject}</span>
              <span className="footer__note-editable-hint">editable draft</span>
            </div>
            <textarea
              className="footer__note-textarea"
              rows={3}
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              placeholder="Type your message here..."
              aria-label="Message brief draft"
            />
          </div>

          {/* Dispatch actions */}
          <div className="footer__card-actions">
            <button
              type="button"
              className="footer__action-primary"
              onClick={handleSendEmail}
            >
              <Icon name="message" size={15} />
              <span>Send via Email Client</span>
              <span className="footer__arrow" aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              className="footer__action-secondary"
              onClick={handleCopyNote}
            >
              {copiedNote ? <Icon name="check" size={14} /> : <Icon name="article" size={14} />}
              <span>{copiedNote ? 'Copied to Clipboard' : 'Copy Draft'}</span>
            </button>

            <button
              type="button"
              className="footer__action-ai"
              onClick={handleAskAi}
              title="Open notDev.ai chatbot to ask questions about Rany"
            >
              <span className="footer__ai-spark" aria-hidden="true">✦</span>
              <span>Ask notDev.ai</span>
            </button>
          </div>

        </div>

        {/* ── Direct Comms & Channels Dock ── */}
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
                href="https://www.linkedin.com/in/rany-boy-templado-b3a532306/"
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
