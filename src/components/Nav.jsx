import { useEffect, useState } from 'react'
import './Nav.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
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
    const sections = ['about', 'projects', 'certifications', 'contact']
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
