import { useEffect, useState } from 'react'
import './Hero.css'

const roles = [
  { label: 'Associate Software Engineer',  prefix: 'Currently:' },
  { label: 'Freelance Web Developer',      prefix: 'Currently:' },
  { label: 'Full-Stack Engineer',          prefix: 'Aspiring:'  },
]

const openTo = [
  { key: 'role',   value: 'Associate Software Engineer @ Accenture' },
  { key: 'focus',  value: 'SAP · Data Migration · System Integration' },
  { key: 'stack',  value: 'JavaScript · React · PHP · Python · SQL' },
  { key: 'status', value: 'Open to Opportunities ✓'           },
]

export default function Hero({ theme = 'dark', toggleTheme }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const current = roles[roleIndex].label
    let t
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 1800)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIndex])

  return (
    <section className="hero" id="hero">

      {/* ── Background ── */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--primary" />
        <div className="hero__glow hero__glow--secondary" />
        <div className="hero__noise" />
      </div>

      {/* Theme toggle */}
      <button
        className="hero__theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>

      <div className="hero__layout">

        {/* ════ TOP — Main headline area ════ */}
        <div className="hero__headline">
          {/* Status badge */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span className="hero__badge-text">Available for opportunities</span>
          </div>

          <h1 className="hero__title">
            I build software that<br />
            <span className="hero__title-gradient">solves real problems.</span>
          </h1>

          <p className="hero__subtitle">
            Associate Software Engineer at Accenture, working with SAP enterprise systems.
            Self-taught developer and BSIT graduate with 5+ shipped projects —
            from AI chatbots to healthcare management systems used by real businesses.
          </p>

          {/* CTA Buttons */}
          <div className="hero__ctas">
            <a href="#projects" className="hero__cta hero__cta--primary">
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="#contact" className="hero__cta hero__cta--secondary">
              Get in Touch
            </a>
          </div>

          {/* Credibility markers */}
          <div className="hero__credibility">
            <span className="hero__credibility-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Accenture Engineer
            </span>
            <span className="hero__credibility-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              DataCamp AI Certified
            </span>
            <span className="hero__credibility-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Real Client Projects
            </span>
          </div>
        </div>

        {/* ════ BOTTOM — Two columns: Info + Terminal ════ */}
        <div className="hero__content">

          {/* Left — profile card */}
          <div className="hero__profile">
            <div className="hero__profile-top">
              <div className="hero__photo-wrap">
                <div className="hero__photo-ring" aria-hidden="true" />
                <img
                  src="/profile_darkmode.png"
                  alt="Rany Boy Templado"
                  className={`hero__photo${theme === 'dark' ? ' hero__photo--active' : ''}`}
                />
                <img
                  src="/profile_lightmode.png"
                  alt="Rany Boy Templado"
                  className={`hero__photo hero__photo--light${theme === 'light' ? ' hero__photo--active' : ''}`}
                />
                <span className="hero__online-dot" title="Open to work" />
              </div>

              <div className="hero__profile-info">
                <h2 className="hero__name">Rany Boy Templado</h2>
                <p className="hero__location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Cavite, Philippines
                </p>
                {/* Typewriter role */}
                <div className="hero__typewriter">
                  <span className="hero__tw-prefix">{roles[roleIndex].prefix}</span>
                  <span className="hero__tw-text">
                    {displayed}<span className="hero__cursor">|</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">5+</span>
                <span className="hero__stat-label">Projects Shipped</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">8</span>
                <span className="hero__stat-label">Certifications</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">4+</span>
                <span className="hero__stat-label">Years Coding</span>
              </div>
            </div>

            {/* Previous roles */}
            <div className="hero__prev">
              <p className="hero__prev-label">// previous roles</p>
              <div className="hero__prev-pills">
                {['Customer Service Rep','Data Entry','BSIT Graduate','Freelance Dev'].map(r => (
                  <span className="hero__prev-pill" key={r}>{r}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="hero__terminal">
            <div className="hero__term-bar">
              <span className="hero__term-dot hero__term-dot--r" />
              <span className="hero__term-dot hero__term-dot--y" />
              <span className="hero__term-dot hero__term-dot--g" />
              <span className="hero__term-file">open-to.config.js</span>
            </div>
            <div className="hero__term-body">
              <p className="hero__term-line">
                <span className="ht-kw">const</span>{' '}
                <span className="ht-var">openTo</span>{' '}
                <span className="ht-op">=</span>{' '}
                <span className="ht-op">{'{'}</span>
              </p>
              {openTo.map(item => (
                <p className="hero__term-line hero__term-indent" key={item.key}>
                  <span className="ht-key">"{item.key}"</span>
                  <span className="ht-op">: </span>
                  <span className="ht-str">"{item.value}"</span>
                  <span className="ht-op">,</span>
                </p>
              ))}
              <p className="hero__term-line"><span className="ht-op">{'};'}</span></p>
            </div>
          </div>

        </div>

        {/* ════ Navigation row ════ */}
        <div className="hero__nav-row">
          <div className="hero__nav-links">
            <a href="#about" className="hero__nav-link">About</a>
            <a href="#projects" className="hero__nav-link">Projects</a>
            <a href="#articles" className="hero__nav-link">Articles</a>
            <a href="#certifications" className="hero__nav-link">Certs</a>
            <a href="#contact" className="hero__nav-link">Contact</a>
          </div>
          <div className="hero__scroll-hint" aria-hidden="true">
            <span className="hero__scroll-text">scroll to explore</span>
            <span className="hero__scroll-arrow">↓</span>
          </div>
        </div>

      </div>
    </section>
  )
}
