import { useEffect, useState } from 'react'
import './Hero.css'

const roles = [
  { label: 'Freelance Web Developer',         prefix: 'Currently:' },
  { label: 'Customer Service Representative', prefix: 'Currently:' },
  { label: 'Software Engineer',               prefix: 'Aspiring:'  },
]

const openTo = [
  { key: 'role',   value: 'Web Developer / Software Engineer' },
  { key: 'type',   value: 'Full-time · Freelance · Remote'    },
  { key: 'stack',  value: 'PHP · JavaScript · Python · MySQL' },
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
        <div className="hero__glow hero__glow--tr" />
        <div className="hero__glow hero__glow--bl" />
        <div className="hero__grid" />
      </div>

      {/* Theme toggle — pinned top-right, only visible on hero */}
      <button
        className="hero__theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>

      <div className="hero__layout">

        {/* ════ LEFT COLUMN ════ */}
        <div className="hero__left">

          {/* Photo — crossfades between dark and light mode versions */}
          <div className="hero__photo-wrap">
            <div className="hero__photo-ring" aria-hidden="true" />

            {/* Dark mode photo */}
            <img
              src="/profile_darkmode.png"
              alt="Rany Boy Templado"
              className={`hero__photo hero__photo--dark${theme === 'dark' ? ' hero__photo--active' : ''}`}
            />

            {/* Light mode photo — sunglasses version */}
            <img
              src="/profile_lightmode.png"
              alt="Rany Boy Templado"
              className={`hero__photo hero__photo--light${theme === 'light' ? ' hero__photo--active' : ''}`}
            />

            <span className="hero__online-dot" title="Open to work" />
          </div>

          {/* Name + location */}
          <div className="hero__identity">
            <h1 className="hero__name">Rany Boy<br />Templado</h1>
            <p className="hero__location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Trece Martires City, Cavite, PH
            </p>
          </div>

          {/* Previous roles */}
          <div className="hero__prev">
            <p className="hero__prev-label">// previously</p>
            <div className="hero__prev-pills">
              {['Customer Service Rep','Data Entry Specialist','IT Intern','Freelance Dev'].map(r => (
                <span className="hero__prev-pill" key={r}>{r}</span>
              ))}
            </div>
          </div>

          {/* Quote */}
          <blockquote className="hero__quote">
            <span className="hero__quote-mark">"</span>
            From answering calls to writing code — every role taught me something the next one needed.
            <span className="hero__quote-mark">"</span>
          </blockquote>

        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <div className="hero__right">

          {/* Typewriter */}
          <div className="hero__typewriter">
            <span className="hero__tw-prefix">{roles[roleIndex].prefix}&nbsp;</span>
            <span className="hero__tw-text">
              {displayed}<span className="hero__cursor">|</span>
            </span>
          </div>

          {/* Terminal open-to */}
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

          {/* Scroll hint */}
          <div className="hero__scroll-hint" aria-hidden="true">
            <span className="hero__scroll-text">scroll to explore</span>
            <span className="hero__scroll-arrow">↓</span>
          </div>

        </div>
      </div>
    </section>
  )
}
