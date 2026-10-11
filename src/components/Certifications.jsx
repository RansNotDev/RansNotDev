import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import './Certifications.css'

const categories = [
  { id: 'all', label: 'All Credentials' },
  { id: 'ai-data', label: 'AI, Cloud & Data' },
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
    image: '/certificates/AIengineerDevelopersassociatecertificate-1.png',
    skills: ['LLM Architectures', 'Prompt Engineering', 'Agentic Tool Calling', 'Model Evaluation'],
    appliedIn: { label: 'High-Availability AI Gateway', href: '#projects' },
    icon: 'spark',
    featured: true,
    externalUrl: 'https://www.datacamp.com/certificate/AIEDA0017740117938',
    whatIBuilt: 'Engineered the High-Availability Multi-Provider AI Gateway, routing LLM requests across a 9-provider fallback chain (Gemini, Groq, Mistral, HuggingFace) with automated error cooldowns and token secret isolation.',
    summary: 'Professional credential validating core competencies in architecting generative AI workflows, prompt chains, and production model integrations.',
  },
  {
    id: 2,
    title: 'AWS AI Practitioner Specialization',
    category: 'ai-data',
    issuer: 'AWS & Udacity',
    issuerBadge: 'AWS / UDACITY',
    issuerColor: '#f59e0b',
    credentialId: 'AWS-AIP-2024',
    date: 'Verified Graduate',
    image: '/certificates/udacityawsaipractioner.png',
    skills: ['Cloud AI Services', 'Amazon Bedrock', 'SageMaker Workflows', 'Responsible AI'],
    icon: 'spark',
    featured: false,
    externalUrl: null,
    whatIBuilt: 'Architected cloud-native generative AI architectures leveraging AWS foundation models, serverless edge integrations, and enterprise deployment guidelines.',
    summary: 'Graduate specialization covering cloud generative AI services, foundational models, responsible AI principles, and AWS cloud deployment patterns.',
  },
  {
    id: 3,
    title: 'Reinvention with Agentic AI',
    category: 'ai-data',
    issuer: 'Enterprise AI',
    issuerBadge: 'AGENTIC AI',
    issuerColor: '#8b5cf6',
    credentialId: 'AGENTIC-AI-2024',
    date: 'Verified Completion',
    image: '/certificates/reinventionwithagenticai.jpg',
    skills: ['Autonomous Agents', 'Multi-Agent Loops', 'Cascade Refactoring', 'Agentic Scaffolding'],
    icon: 'spark',
    featured: false,
    externalUrl: null,
    whatIBuilt: 'Pioneered autonomous software engineering loops integrating Antigravity, Windsurf, Claude, and Codex CLI to orchestrate multi-file refactoring, cascade edits, and automated validation tests.',
    summary: 'Advanced credential exploring autonomous multi-agent software engineering, agentic loop design, and developer productivity amplification.',
  },
  {
    id: 4,
    title: 'Software Engineer Role Certification',
    category: 'swe',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: 'HR-SWE-ROLE',
    date: 'Role Certified',
    image: '/certificates/softwareengineerrole.png',
    skills: ['Full-Stack Systems', 'System Architecture', 'Data Structures', 'Production Engineering'],
    icon: 'code',
    featured: false,
    externalUrl: null,
    whatIBuilt: 'Architected full-stack enterprise web platforms including role-based access control (RBAC), normalized relational schemas, and asynchronous REST APIs with fault-tolerant error boundaries.',
    summary: 'Comprehensive standardized assessment certifying software engineering capability, full-stack architecture, algorithms, and production problem-solving.',
  },
  {
    id: 5,
    title: 'SQL (Basic)',
    category: 'ai-data',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '7e3c14302fd7',
    date: 'Verified Skill',
    image: '/certificates/sqlbasic.png',
    skills: ['Relational Schemas', 'Complex Joins', 'Aggregations', 'Data Integrity'],
    appliedIn: { label: 'SAP S/4HANA Migration Workbench', href: '#projects' },
    icon: 'database',
    featured: false,
    externalUrl: 'https://www.hackerrank.com/certificates/7e3c14302fd7',
    whatIBuilt: 'Designed extraction, transform, and reconciliation queries for the SAP S/4HANA Migration Workbench, validating hundreds of thousands of legacy records with 99.8% precision.',
    summary: 'Assessment confirming mastery of relational database queries, multi-table joins, aggregations, and constraint validation.',
  },
  {
    id: 6,
    title: 'Problem Solving (Basic)',
    category: 'swe',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '14230d101784',
    date: 'Verified Skill',
    image: '/certificates/problemsolvingbasic.png',
    skills: ['Data Structures', 'Algorithmic Optimization', 'Edge Cases', 'Time Complexity'],
    icon: 'check',
    featured: false,
    externalUrl: 'https://www.hackerrank.com/certificates/14230d101784',
    whatIBuilt: 'Engineered high-performance algorithmic data transformation filters and reconciliation logic, ensuring zero data loss and conflict-free schedules in production systems.',
    summary: 'Standardized assessment evaluating algorithmic problem solving, array manipulations, and computational optimization.',
  },
  {
    id: 7,
    title: 'JavaScript (Basic)',
    category: 'web',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '2e7b687cd1ed',
    date: 'Verified Skill',
    image: '/certificates/javascriptbasic.png',
    skills: ['ES6+ Standards', 'Async / Promises', 'Closures & Scopes', 'Event Loop'],
    icon: 'code',
    featured: false,
    externalUrl: 'https://www.hackerrank.com/certificates/2e7b687cd1ed',
    whatIBuilt: 'Built reactive client-side state engines, interactive real-time gaze-tracking modules, and continuous falling tickers for dynamic single-page web experiences.',
    summary: 'Language proficiency assessment covering modern ECMAScript standards, async control flow, and object models.',
  },
  {
    id: 8,
    title: 'Java (Basic)',
    category: 'swe',
    issuer: 'HackerRank',
    issuerBadge: 'HACKERRANK',
    issuerColor: '#10b981',
    credentialId: '7725b91e13dc',
    date: 'Verified Skill',
    image: '/certificates/javabasic.png',
    skills: ['OOP Architecture', 'Collections Framework', 'Polymorphism', 'Exception Handling'],
    icon: 'code',
    featured: false,
    externalUrl: 'https://www.hackerrank.com/certificates/7725b91e13dc',
    whatIBuilt: 'Implemented object-oriented backend service layers and class hierarchies for structured data handling, polymorphism, and robust transactional processing.',
    summary: 'Assessment of OOP principles, class structures, memory management, and standard Java library conventions.',
  },
  {
    id: 9,
    title: 'Front End Development Libraries',
    category: 'web',
    issuer: 'freeCodeCamp',
    issuerBadge: 'FREECODECAMP',
    issuerColor: '#0ea5e9',
    credentialId: 'fcc-fedl-cert',
    date: '300 Hours Certified',
    image: '/certificates/frontendlibraries.png',
    skills: ['React 18', 'State Management', 'Component Hooks', 'Bootstrap 5'],
    appliedIn: { label: 'PhysiCapital Platform', href: '#projects' },
    icon: 'code',
    featured: false,
    externalUrl: 'https://www.freecodecamp.org/certification/fcc-front-end-libraries',
    whatIBuilt: 'Engineered the PhysiCapital asset investment dashboard and modern web applications featuring multi-theme state systems, smooth view transitions, and reactive data tables.',
    summary: 'Certification certifying 300 hours building dynamic single-page applications with React, state management, and modern UI tooling.',
  },
  {
    id: 10,
    title: 'Responsive Web Design',
    category: 'web',
    issuer: 'freeCodeCamp',
    issuerBadge: 'FREECODECAMP',
    issuerColor: '#0ea5e9',
    credentialId: 'fcc-rwd-cert',
    date: '300 Hours Certified',
    image: '/certificates/legacy_responsive_cert.png',
    skills: ['CSS Flexbox & Grid', 'Mobile-First UX', 'WCAG Accessibility', 'Media Queries'],
    icon: 'layers',
    featured: false,
    externalUrl: 'https://www.freecodecamp.org/certification/fcc-responsive-web-design',
    whatIBuilt: 'Architected fully fluid, mobile-first responsive interfaces adapting seamlessly across all viewport widths from 320px mobile screens to 4K desktop displays with WCAG accessibility.',
    summary: 'Certification certifying 300 hours of responsive web layout engineering, accessibility, and modern responsive standards.',
  },
  {
    id: 11,
    title: 'CodeChum National Programming Challenge 2024',
    category: 'swe',
    issuer: 'CodeChum',
    issuerBadge: 'CODECHUM',
    issuerColor: '#3b82f6',
    credentialId: 'CC-NAT-2024',
    date: 'National Finalist',
    image: '/certificates/certificate_codechum.png',
    skills: ['Competitive Programming', 'Speed Algorithms', 'Real-Time Debugging', 'Edge Cases'],
    icon: 'award',
    featured: false,
    externalUrl: null,
    whatIBuilt: 'Competed against top programmers nationwide, solving complex algorithmic challenges and optimizing code execution time under strict competitive testing constraints.',
    summary: 'National collegiate programming challenge testing rapid algorithm development under strict time constraints and test cases.',
  },
]

export default function Certifications() {
  const [revealed, setRevealed] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeImageCert, setActiveImageCert] = useState(null)
  const sectionRef = useRef(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Modal: Escape to close, lock scroll
  useEffect(() => {
    if (!activeImageCert) return
    const handleKey = (e) => { if (e.key === 'Escape') setActiveImageCert(null) }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      triggerRef.current?.focus()
    }
  }, [activeImageCert])

  function handleOpenLightbox(cert, e) {
    if (e) triggerRef.current = e.currentTarget
    setActiveImageCert(cert)
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
          <span className="certs__count">{certifications.length} verified credentials</span>
        </div>

        {/* Featured Tier 1 Credential Showcase */}
        {featuredCert && (
          <article className="certs__featured" style={{ transitionDelay: revealed ? '80ms' : '0ms' }}>
            <div
              className="certs__featured-visual"
              onClick={(e) => handleOpenLightbox(featuredCert, e)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${featuredCert.title} certificate image`}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenLightbox(featuredCert, e)}
            >
              <img
                src={featuredCert.image}
                alt={`${featuredCert.title} Certificate`}
                className="certs__featured-img"
              />
              <div className="certs__featured-overlay">
                <span className="certs__preview-badge">
                  <Icon name="spark" size={14} /> Inspect Full Certificate 🔍
                </span>
              </div>
            </div>

            <div className="certs__featured-body">
              <div className="certs__featured-top">
                <div className="certs__featured-issuer-wrap">
                  <span className="certs__featured-issuer-tag" style={{ color: featuredCert.issuerColor }}>
                    {featuredCert.issuerBadge}
                  </span>
                  <span className="certs__verified-badge">
                    <span className="certs__status-dot" /> {featuredCert.date}
                  </span>
                </div>
                <span className="certs__cred-id">ID: {featuredCert.credentialId}</span>
              </div>

              <h3 className="certs__featured-title">{featuredCert.title}</h3>
              <p className="certs__featured-summary">{featuredCert.summary}</p>

              {/* What I Built Callout */}
              <div className="certs__featured-built">
                <div className="certs__built-header">
                  <span className="certs__built-tag">🛠️ WHAT I BUILT</span>
                  {featuredCert.appliedIn && (
                    <a href={featuredCert.appliedIn.href} className="certs__built-project-link">
                      Applied in: {featuredCert.appliedIn.label} →
                    </a>
                  )}
                </div>
                <p className="certs__built-desc">{featuredCert.whatIBuilt}</p>
              </div>
              
              <ul className="certs__skills" aria-label="Skills validated">
                {featuredCert.skills.map(skill => (
                  <li key={skill} className="certs__skill-tag">{skill}</li>
                ))}
              </ul>

              <div className="certs__featured-actions">
                <button
                  type="button"
                  className="certs__action-btn certs__action-btn--preview"
                  onClick={(e) => handleOpenLightbox(featuredCert, e)}
                >
                  Inspect Certificate 🔍
                </button>
                {featuredCert.externalUrl && (
                  <a
                    href={featuredCert.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certs__action-btn certs__action-btn--primary"
                  >
                    Verify Online <span aria-hidden="true">↗</span>
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

        {/* All Certificates Grid with Images & "What I Built" */}
        <div className="certs__grid">
          {filteredCerts.map((cert, i) => (
            <article
              className="certs__card"
              key={cert.id}
              style={{ transitionDelay: revealed ? `${80 + i * 40}ms` : '0ms' }}
            >
              {/* Certificate Image Preview */}
              <div
                className="certs__card-preview"
                onClick={(e) => handleOpenLightbox(cert, e)}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${cert.title} Certificate`}
                onKeyDown={(e) => e.key === 'Enter' && handleOpenLightbox(cert, e)}
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  className="certs__card-img"
                  loading="lazy"
                />
                <div className="certs__card-preview-overlay">
                  <span className="certs__preview-badge">
                    <Icon name="spark" size={13} /> Inspect Certificate 🔍
                  </span>
                </div>
              </div>

              {/* Card Header */}
              <div className="certs__card-header">
                <div className="certs__issuer-wrap">
                  <span className="certs__card-icon">
                    <Icon name={cert.icon} size={18} />
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

              {/* Card Body */}
              <div className="certs__card-body">
                <h3 className="certs__title">{cert.title}</h3>
                
                {/* ── Prominent "What I Built" Box ── */}
                <div className="certs__built-box">
                  <div className="certs__built-header">
                    <span className="certs__built-tag">🛠️ WHAT I BUILT</span>
                    {cert.appliedIn && (
                      <a href={cert.appliedIn.href} className="certs__built-project-link">
                        {cert.appliedIn.label} →
                      </a>
                    )}
                  </div>
                  <p className="certs__built-desc">{cert.whatIBuilt}</p>
                </div>

                <div className="certs__cred-id-row">
                  <span className="certs__cred-label">ID:</span>
                  <code className="certs__cred-code">{cert.credentialId}</code>
                </div>

                <div className="certs__card-skills">
                  {cert.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="certs__card-skill-chip">{skill}</span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="certs__card-skill-more">+{cert.skills.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="certs__card-footer">
                <button
                  type="button"
                  className="certs__btn certs__btn--preview"
                  onClick={(e) => handleOpenLightbox(cert, e)}
                >
                  Inspect Certificate 🔍
                </button>
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

      {/* ── High-Resolution Certificate Lightbox Modal ── */}
      {activeImageCert && (
        <div className="certs-modal" onClick={() => setActiveImageCert(null)}>
          <div
            className="certs-modal__container"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeImageCert.title} certificate image`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="certs-modal__header">
              <div className="certs-modal__dots" aria-hidden="true">
                <span /><span /><span />
              </div>
              <span className="certs-modal__title">
                {activeImageCert.title} · {activeImageCert.issuer} ({activeImageCert.credentialId})
              </span>
              <div className="certs-modal__actions">
                <a
                  href={activeImageCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certs-modal__external"
                  title="Open original full-size image in new tab"
                >
                  Full Size ↗
                </a>
                {activeImageCert.externalUrl && (
                  <a
                    href={activeImageCert.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certs-modal__external"
                  >
                    Verify Online ↗
                  </a>
                )}
                <button
                  ref={closeRef}
                  className="certs-modal__close"
                  onClick={() => setActiveImageCert(null)}
                  aria-label="Close certificate lightbox"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="certs-modal__body">
              <div className="certs-modal__img-container">
                <img
                  src={activeImageCert.image}
                  alt={`${activeImageCert.title} full certificate`}
                  className="certs-modal__img"
                />
              </div>

              {/* Lightbox Caption with "What I Built" */}
              <div className="certs-modal__caption">
                <div className="certs-modal__caption-tag">
                  <strong>🛠️ What I Built:</strong> {activeImageCert.whatIBuilt}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
