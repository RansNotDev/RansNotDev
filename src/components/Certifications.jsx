import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import './Certifications.css'

const certifications = [
  {
    id: 1,
    title: 'AI Engineer for Developers Associate',
    tier: 1,
    skills: ['LLM application development', 'Prompt engineering', 'AI APIs & integration'],
    appliedIn: { label: 'AI Chatbot project', href: '#projects' },
    issuer: 'DataCamp',
    icon: 'spark',
    iframeUrl: null,
    externalUrl: 'https://www.datacamp.com/certificate/AIEDA0017740117938',
  },
  {
    id: 2,
    title: 'JavaScript (Basics)',
    tier: 3,
    issuer: 'HackerRank',
    icon: 'article',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/2e7b687cd1ed',
    externalUrl: null,
  },
  {
    id: 3,
    title: 'SQL (Basics)',
    tier: 3,
    issuer: 'HackerRank',
    icon: 'database',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/7e3c14302fd7',
    externalUrl: null,
  },
  {
    id: 4,
    title: 'Java (Basics)',
    tier: 3,
    issuer: 'HackerRank',
    icon: 'code',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/7725b91e13dc',
    externalUrl: null,
  },
  {
    id: 5,
    title: 'Problem Solving (Basics)',
    tier: 3,
    issuer: 'HackerRank',
    icon: 'check',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/14230d101784',
    externalUrl: null,
  },
  {
    id: 6,
    title: 'CodeChum National Programming Challenge 2024',
    tier: 2,
    issuer: 'Participant',
    icon: 'award',
    iframeUrl: null,
    externalUrl: null,
  },
  {
    id: 7,
    title: 'Responsive Web Design',
    tier: 2,
    issuer: 'freeCodeCamp',
    icon: 'layers',
    iframeUrl: null,
    externalUrl: null,
  },
  {
    id: 8,
    title: 'Front End Development Libraries',
    tier: 2,
    issuer: 'freeCodeCamp',
    icon: 'code',
    iframeUrl: null,
    externalUrl: null,
  },
]

const isLinked = cert => Boolean(cert.iframeUrl || cert.externalUrl)

// The visual preview at the top of each card
function CertPreview({ cert }) {
  if (cert.iframeUrl) {
    // A scaled-down, non-interactive live thumbnail of the real certificate
    return (
      <span className="certs__thumb" aria-hidden="true">
        <span className="certs__thumb-frame">
          <iframe
            src={cert.iframeUrl}
            title=""
            tabIndex={-1}
            scrolling="no"
            loading="lazy"
            className="certs__thumb-iframe"
          />
        </span>
        <span className="certs__thumb-overlay">
          <span className="certs__thumb-cta">View certificate</span>
        </span>
      </span>
    )
  }
  // Placeholder banner for credentials without an embeddable image
  return (
    <span className={`certs__thumb certs__thumb--placeholder${cert.externalUrl ? ' certs__thumb--linked' : ''}`} aria-hidden="true">
      <Icon name={cert.icon} size={30} />
      {cert.externalUrl && <span className="certs__thumb-overlay"><span className="certs__thumb-cta">Open ↗</span></span>}
    </span>
  )
}

function CertCard({ cert, index, revealed, onOpen }) {
  const content = (
    <>
      <CertPreview cert={cert} />
      <span className="certs__info">
        <span className="certs__title">{cert.title}</span>
        <span className="certs__issuer">{cert.issuer}</span>
      </span>
    </>
  )
  const className = `certs__card${revealed ? ' certs__card--visible' : ''}${isLinked(cert) ? ' certs__card--clickable' : ''}`
  const style = { transitionDelay: revealed ? `${index * 70}ms` : '0ms' }

  if (!isLinked(cert)) return <div className={className} style={style}>{content}</div>
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={e => onOpen(cert, e.currentTarget)}
      aria-label={cert.iframeUrl ? `View ${cert.title} certificate` : `Open ${cert.title} certificate (opens in new tab)`}
    >
      {content}
    </button>
  )
}

export default function Certifications() {
  const [revealed, setRevealed] = useState(false)
  const [activeIframe, setActiveIframe] = useState(null)
  const sectionRef = useRef(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)

  const featured = certifications.filter(c => c.tier === 1)
  const supporting = certifications.filter(c => c.tier === 2)
  const foundational = certifications.filter(c => c.tier === 3)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Modal: Escape to close, lock scroll, move focus in and restore it on close
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

  function handleOpen(cert, trigger) {
    if (cert.iframeUrl) {
      triggerRef.current = trigger
      setActiveIframe(cert)
    } else if (cert.externalUrl) {
      window.open(cert.externalUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="certs" id="certifications" ref={sectionRef}>
      <div className="certs__container">

        <div className="certs__header">
          <span className="certs__prompt">&gt;</span>
          <h2 className="certs__heading">Credentials</h2>
          <span className="certs__line" />
        </div>

        {/* Tier 1 — featured */}
        {featured.map(cert => (
          <article className={`certs__featured${revealed ? ' certs__card--visible' : ''}`} key={cert.id}>
            <span className="certs__featured-icon"><Icon name={cert.icon} size={30} /></span>
            <div className="certs__featured-body">
              <p className="certs__featured-kicker">Featured credential · {cert.issuer}</p>
              <h3 className="certs__featured-title">{cert.title}</h3>
              {cert.skills && (
                <ul className="certs__skills" aria-label="Skills validated">
                  {cert.skills.map(s => <li key={s}>{s}</li>)}
                </ul>
              )}
              <div className="certs__featured-actions">
                {cert.externalUrl && (
                  <a href={cert.externalUrl} target="_blank" rel="noopener noreferrer" className="certs__verify">
                    Verify credential <span aria-hidden="true">↗</span>
                  </a>
                )}
                {cert.appliedIn && (
                  <a href={cert.appliedIn.href} className="certs__applied">Applied in: {cert.appliedIn.label} →</a>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* Tier 2 — supporting */}
        <div className="certs__grid">
          {supporting.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} revealed={revealed} onOpen={handleOpen} />
          ))}
        </div>

        {/* Tier 3 — foundational, collapsed by default */}
        {foundational.length > 0 && (
          <details className="certs__foundational">
            <summary>Show foundational badges ({foundational.length})</summary>
            <div className="certs__grid">
              {foundational.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} revealed={revealed} onOpen={handleOpen} />
              ))}
            </div>
          </details>
        )}

      </div>

      {/* ── Iframe Modal ── */}
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
              <span className="certs-modal__title">{activeIframe.title}</span>
              <button
                ref={closeRef}
                className="certs-modal__close"
                onClick={() => setActiveIframe(null)}
                aria-label="Close certificate viewer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
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
