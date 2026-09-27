import { useEffect, useState } from 'react'
import Icon from './Icon'
import './Footer.css'

const EMAIL = 'ranyboytemplado@gmail.com'
const RESUME = '/Rany_Boy_Templado_Resume.pdf'

const details = [
  { label: 'Location', value: 'Cavite, Philippines (GMT+8)' },
  { label: 'Focus', value: 'SAP Data Migration · Web Apps' },
  { label: 'Work type', value: 'Full-time · Freelance · Remote' },
]

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#certifications' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  // Reset the "Copied" state after a short delay
  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (permissions / insecure context); fall back to mail client
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__container">

        {/* ── Terminal header ── */}
        <div className="footer__terminal-header" aria-hidden="true">
          <div className="footer__terminal-dots">
            <span /><span /><span />
          </div>
          <span className="footer__terminal-file">contact.config.js</span>
        </div>

        <div className="footer__body">

          {/* Left — CTA */}
          <div className="footer__cta">
            <p className="footer__cta-label">
              <span className="footer__prompt" aria-hidden="true">&gt;</span> Let's build something together
            </p>
            <h2 className="footer__cta-heading">Have a project or role in mind?</h2>
            <p className="footer__cta-sub">
              I'm open to full-time, freelance, and remote opportunities. Send a short note about what
              you're working on and I'll get back to you.
            </p>

            <div className="footer__cta-actions">
              <a href={`mailto:${EMAIL}`} className="footer__email-btn">
                <Icon name="message" size={16} />
                Email me
              </a>
              <button type="button" className="footer__copy-btn" onClick={copyEmail}>
                {copied ? <Icon name="check" size={15} /> : <Icon name="article" size={15} />}
                {copied ? 'Copied' : EMAIL}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
            </div>
          </div>

          {/* Right — details, résumé, navigation */}
          <div className="footer__links">

            <div className="footer__block">
              <p className="footer__label">// at a glance</p>
              <dl className="footer__details">
                {details.map(d => (
                  <div className="footer__detail" key={d.label}>
                    <dt>{d.label}</dt>
                    <dd>{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="footer__block">
              <p className="footer__label">// resume</p>
              <div className="footer__resume-actions">
                <a href={RESUME} target="_blank" rel="noopener noreferrer" className="footer__resume-btn" aria-label="View résumé (opens in new tab)">
                  View résumé
                </a>
               
              </div>
            </div>

            <nav className="footer__block" aria-label="Footer">
              <p className="footer__label">// navigate</p>
              <ul className="footer__nav">
                {quickLinks.map(l => (
                  <li key={l.href}><a href={l.href} className="footer__nav-link">{l.label}</a></li>
                ))}
                <li>
                  <a href="#hero" className="footer__back-top">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                    Back to top
                  </a>
                </li>
              </ul>
            </nav>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer__bottom">
          <p className="footer__copy">
            <span className="footer__copy-comment">// </span>
            © {new Date().getFullYear()} Rany Boy Templado
          </p>
          
        </div>

      </div>
    </footer>
  )
}
