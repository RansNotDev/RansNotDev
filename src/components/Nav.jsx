import { useEffect, useState, useRef } from 'react'
import Icon from './Icon'
import VisitorCounter from './VisitorCounter'
import './Nav.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav({ theme = 'dark', toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDark = theme === 'dark'
  const navRef = useRef(null)

  // Track scroll position to apply glassmorphism when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)

      // Active section scroll spy logic
      if (window.scrollY < 160) {
        setActiveSection('')
        return
      }

      // If at very bottom of document, activate 'contact'
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact')
        return
      }

      const sections = ['contact', 'certifications', 'projects', 'about']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Check if section is in reading zone
          if (rect.top <= 220 && rect.bottom >= 120) {
            setActiveSection(id)
            return
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key or window resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileOpen) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleBrandClick = (e) => {
    e.preventDefault()
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState(null, '', '#hero')
    setActiveSection('')
  }

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const targetId = href.replace('#', '')
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', href)
      setActiveSection(targetId)
    }
  }

  return (
    <>
      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`} ref={navRef}>
        <div className="nav__inner">
          <a href="#hero" className="nav__brand" onClick={handleBrandClick} aria-label="RansnotDEV, back to top">
            <span className="nav__brand-name">RansnotDEV</span>
            <span className="nav__brand-cursor">&gt;_</span>
          </a>

          {/* Desktop Navigation links */}
          <nav className="nav__menu" aria-label="Main navigation">
            <ul className="nav__links">
              {navLinks.map(link => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav__link${isActive ? ' nav__link--active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="nav__actions">
            <VisitorCounter compact />

            {toggleTheme && (
              <button
                type="button"
                className="nav__theme-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <Icon name={isDark ? 'sun' : 'moon'} size={18} />
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="nav__hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-links"
            >
              <span className={`nav__hamburger-line${mobileOpen ? ' nav__hamburger-line--open' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="nav__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-nav-links"
        className={`nav__mobile-drawer${mobileOpen ? ' nav__mobile-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="nav__mobile-links">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav__mobile-link${isActive ? ' nav__mobile-link--active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span>{link.label}</span>
                  <span className="nav__mobile-arrow">→</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
