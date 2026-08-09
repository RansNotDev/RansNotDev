import { useEffect, useState } from 'react'
import './Nav.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Articles', href: '#articles' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav({ theme, toggleTheme }) {
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(!entry.isIntersecting) },
      { threshold: 0.1 }
    )
    if (heroEl) observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  // Track active section for highlighting
  useEffect(() => {
    const sections = ['about', 'projects', 'articles', 'certifications', 'contact']
    const observers = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <nav className={`nav${visible ? ' nav--visible' : ''}`}>
      <div className="nav__inner">
        <a href="#hero" className="nav__brand">
          <span className="nav__brand-name">RansnotDEV</span>
          <span className="nav__brand-cursor">&gt;_</span>
        </a>

        {/* Navigation links */}
        <ul className={`nav__links${mobileOpen ? ' nav__links--open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav__link${activeSection === link.href.slice(1) ? ' nav__link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          {/* Theme toggle */}
          <button
            className="nav__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="nav__hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className={`nav__hamburger-line${mobileOpen ? ' nav__hamburger-line--open' : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  )
}
