import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import './Certifications.css'

const categories = [
  { id: 'all', label: 'All Credentials' },
  { id: 'ai-data', label: 'AI & Enterprise Data' },
  { id: 'swe', label: 'Software Engineering' },
  { id: 'web', label: 'Web & Frontend' },
]

const certifications = [
  {
    id: 1,
    title: 'AI Engineer for Developers Associate',
    category: 'ai-data',
    issuer: 'DataCamp',
    issuerBadge: 'DATACAMP',
    issuerColor: '#059669',
    credentialId: 'AIEDA0017740117938',
    date: 'Verified Credential',
    skills: ['LLM Application Dev', 'Prompt Engineering', 'AI APIs & Tool Calling', 'Model Evaluation'],
    appliedIn: { label: 'High-Availability AI Gateway', href: '#projects' },
    icon: 'spark',
    featured: true,
    externalUrl: 'https://www.datacamp.com/certificate/AIEDA0017740117938',
    summary: 'Professional credential validating competency in architecting generative AI workflows, prompt chains, and production model integrations.',
  },
  {
    id: 2,
    title: 'SQL (Basics)',
    category: 'ai-data',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '7e3c14302fd7',
    date: 'Verified Skill',
    skills: ['Relational Schemas', 'Complex Joins', 'Aggregations', 'Data Integrity'],
    appliedIn: { label: 'SAP Data Migration Workbench', href: '#projects' },
    icon: 'database',
    featured: false,
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/7e3c14302fd7',
    externalUrl: 'https://www.hackerrank.com/certificates/7e3c14302fd7',
    summary: 'Assessment confirming mastery of relational database queries, multi-table joins, aggregations, and constraint validation.',
  },
  {
    id: 3,
    title: 'Problem Solving (Basics)',
    category: 'swe',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '14230d101784',
    date: 'Verified Skill',
    skills: ['Data Structures', 'Algorithmic Optimization', 'Edge Cases', 'Time Complexity'],
    icon: 'check',
    featured: false,
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/14230d101784',
    externalUrl: 'https://www.hackerrank.com/certificates/14230d101784',
    summary: 'Standardized assessment evaluating algorithmic problem solving, array manipulations, and computational optimization.',
  },
  {
    id: 4,
    title: 'JavaScript (Basics)',
    category: 'swe',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '2e7b687cd1ed',
    date: 'Verified Skill',
    skills: ['ES6+ Standards', 'Asynchronous Promises', 'Closures & Scopes', 'Event Loop'],
    icon: 'code',
    featured: false,
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/2e7b687cd1ed',
    externalUrl: 'https://www.hackerrank.com/certificates/2e7b687cd1ed',
    summary: 'Language proficiency assessment covering modern ECMAScript standards, async control flow, and object models.',
  },
  {
    id: 5,
    title: 'Java (Basics)',
    category: 'swe',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '7725b91e13dc',
    date: 'Verified Skill',
    skills: ['Object-Oriented Design', 'Polymorphism', 'Collections Framework', 'Exception Handling'],
    icon: 'code',
    featured: false,
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/7725b91e13dc',
    externalUrl: 'https://www.hackerrank.com/certificates/7725b91e13dc',
    summary: 'Assessment of OOP principles, class structures, memory management, and standard Java library conventions.',
  },
  {
    id: 6,
    title: 'CodeChum National Programming Challenge 2024',
    category: 'swe',
    issuer: 'CodeChum',
    issuerBadge: 'CODECHUM',
    issuerColor: '#3b82f6',
    credentialId: 'CC-NAT-2024',
    date: 'National Finalist / Participant',
    skills: ['Competitive Coding', 'Speed Problem Solving', 'Real-Time Debugging', 'Algorithm Testing'],
    icon: 'award',
    featured: false,
    externalUrl: null,
    summary: 'National collegiate programming challenge testing rapid algorithm development under strict time constraints and test cases.',
  },
  {
    id: 7,
    title: 'Responsive Web Design',
    category: 'web',
    issuer: 'freeCodeCamp',
    issuerBadge: 'FREECODECAMP',
    issuerColor: '#f59e0b',
    credentialId: 'fcc-rwd-cert',
    date: 'Developer Certification',
    skills: ['CSS Flexbox & Grid', 'Semantic HTML5', 'Accessibility (a11y)', 'Mobile-First Design'],
    icon: 'layers',
    featured: false,
    externalUrl: 'https://www.freecodecamp.org/certification/fcc-responsive-web-design',
    summary: 'Certification certifying 300 hours of responsive web layout engineering, accessibility, and modern responsive standards.',
  },
  {
    id: 8,
    title: 'Front End Development Libraries',
    category: 'web',
    issuer: 'freeCodeCamp',
    issuerBadge: 'FREECODECAMP',
    issuerColor: '#f59e0b',
    credentialId: 'fcc-fedl-cert',
    date: 'Developer Certification',
    skills: ['React State & Hooks', 'Redux Architecture', 'Bootstrap 5', 'SASS Styling'],
    icon: 'code',
    featured: false,
    externalUrl: 'https://www.freecodecamp.org/certification/fcc-front-end-libraries',
    summary: 'Certification certifying 300 hours building dynamic single-page applications with React, state management, and modern UI tooling.',
  },
]

export default function Certifications() {
  const [revealed, setRevealed] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIframe, setActiveIframe] = useState(null)
  const sectionRef = useRef(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Modal: Escape to close, lock scroll
  useEffect(() => {
    if (!activeIframe) return
    const handleKey = (e) => { if (e.key === 'Escape') setActiveIframe(null) }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      triggerRef.current?.focus()
    }
  }, [activeIframe])

  function handleOpenModal(cert, e) {
    triggerRef.current = e.currentTarget
    setActiveIframe(cert)
  }

  const filteredCerts = activeCategory === 'all'
    ? certifications
    : certifications.filter(c => c.category === activeCategory)

  const featuredCert = certifications.find(c => c.featured)

  return (
    <section className={`certs${revealed ? ' certs--revealed' : ''}`} id="certifications" ref={sectionRef}>
      <div className="certs__container">

        <div className="certs__header">
          <span className="certs__prompt">&gt;</span>
          <h2 className="certs__heading">Verified Credentials & Certifications</h2>
          <span className="certs__line" />
          <span className="certs__count">{certifications.length} verified</span>
        </div>

        {/* Featured Tier 1 Credential Showcase */}
        {featuredCert && (
          <article className="certs__featured" style={{ transitionDelay: revealed ? '80ms' : '0ms' }}>
            <div className="certs__featured-badge-col">
              <span className="certs__featured-icon" style={{ borderColor: featuredCert.issuerColor }}>
                <Icon name={featuredCert.icon} size={32} />
              </span>
              <span className="certs__featured-issuer-tag" style={{ color: featuredCert.issuerColor }}>
                {featuredCert.issuerBadge}
              </span>
            </div>
            <div className="certs__featured-body">
              <div className="certs__featured-top">
                <span className="certs__verified-badge">
                  <span className="certs__status-dot" /> {featuredCert.date}
                </span>
                <span className="certs__cred-id">ID: {featuredCert.credentialId}</span>
              </div>
              <h3 className="certs__featured-title">{featuredCert.title}</h3>
              <p className="certs__featured-summary">{featuredCert.summary}</p>
              
              <ul className="certs__skills" aria-label="Skills validated">
                {featuredCert.skills.map(skill => (
                  <li key={skill} className="certs__skill-tag">{skill}</li>
                ))}
              </ul>

              <div className="certs__featured-actions">
                {featuredCert.externalUrl && (
                  <a
                    href={featuredCert.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certs__action-btn certs__action-btn--primary"
                  >
                    Verify Credential Online <span aria-hidden="true">↗</span>
                  </a>
                )}
                {featuredCert.appliedIn && (
                  <a href={featuredCert.appliedIn.href} className="certs__applied-link">
                    Applied in: {featuredCert.appliedIn.label} →
                  </a>
                )}
              </div>
            </div>
          </article>
        )}

        {/* Filter Categories */}
        <div className="certs__filters" role="tablist" aria-label="Certification categories">
          {categories.map(cat => {
            const count = cat.id === 'all'
              ? certifications.length
              : certifications.filter(c => c.category === cat.id).length
            return (
              <button
                type="button"
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`certs__filter-tab${activeCategory === cat.id ? ' certs__filter-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label} <span className="certs__tab-count">({count})</span>
              </button>
            )
          })}
        </div>

        {/* All Certificates Grid — Completely Visible */}
        <div className="certs__grid">
          {filteredCerts.map((cert, i) => (
            <article
              className="certs__card"
              key={cert.id}
              style={{ transitionDelay: revealed ? `${120 + i * 60}ms` : '0ms' }}
            >
              <div className="certs__card-header">
                <div className="certs__issuer-wrap">
                  <span className="certs__card-icon">
                    <Icon name={cert.icon} size={20} />
                  </span>
                  <div className="certs__issuer-info">
                    <span className="certs__issuer-name">{cert.issuer}</span>
                    <span className="certs__cred-status">● {cert.date}</span>
                  </div>
                </div>
                <span className="certs__issuer-badge" style={{ color: cert.issuerColor }}>
                  {cert.issuerBadge}
                </span>
              </div>

              <div className="certs__card-body">
                <h3 className="certs__title">{cert.title}</h3>
                <p className="certs__card-desc">{cert.summary}</p>
                <div className="certs__cred-id-row">
                  <span className="certs__cred-label">Credential ID:</span>
                  <code className="certs__cred-code">{cert.credentialId}</code>
                </div>

                <div className="certs__card-skills">
                  {cert.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="certs__card-skill-chip">{skill}</span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="certs__card-skill-more">+{cert.skills.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="certs__card-footer">
                {cert.iframeUrl ? (
                  <button
                    type="button"
                    className="certs__btn certs__btn--preview"
                    onClick={(e) => handleOpenModal(cert, e)}
                  >
                    Inspect Certificate
                  </button>
                ) : null}
                {cert.externalUrl ? (
                  <a
                    href={cert.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certs__btn certs__btn--verify"
                  >
                    Verify ↗
                  </a>
                ) : (
                  <span className="certs__verified-stamp">Verified Completion</span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* ── Interactive Modal for Verified Hackerrank Certificates ── */}
      {activeIframe && (
        <div className="certs-modal" onClick={() => setActiveIframe(null)}>
          <div
            className="certs-modal__container"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeIframe.title} certificate`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="certs-modal__header">
              <div className="certs-modal__dots" aria-hidden="true">
                <span /><span /><span />
              </div>
              <span className="certs-modal__title">{activeIframe.title} — {activeIframe.issuer}</span>
              <div className="certs-modal__actions">
                {activeIframe.externalUrl && (
                  <a
                    href={activeIframe.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certs-modal__external"
                  >
                    Open Official Link ↗
                  </a>
                )}
                <button
                  ref={closeRef}
                  className="certs-modal__close"
                  onClick={() => setActiveIframe(null)}
                  aria-label="Close certificate viewer"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="certs-modal__body">
              <iframe
                src={activeIframe.iframeUrl}
                title={activeIframe.title}
                className="certs-modal__iframe"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
