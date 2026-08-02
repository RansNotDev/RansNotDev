import { useEffect, useRef, useState } from 'react'
import './Certifications.css'

const certifications = [
  {
    id: 1,
    title: 'AI Engineer for Developers Associate',
    issuer: 'DataCamp',
    icon: '🤖',
    iframeUrl: null,
    externalUrl: 'https://www.datacamp.com/certificate/AIEDA0017740117938',
  },
  {
    id: 2,
    title: 'JavaScript (Basics)',
    issuer: 'HackerRank',
    icon: '📜',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/2e7b687cd1ed',
    externalUrl: null,
  },
  {
    id: 3,
    title: 'SQL (Basics)',
    issuer: 'HackerRank',
    icon: '📜',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/7e3c14302fd7',
    externalUrl: null,
  },
  {
    id: 4,
    title: 'Java (Basics)',
    issuer: 'HackerRank',
    icon: '📜',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/7725b91e13dc',
    externalUrl: null,
  },
  {
    id: 5,
    title: 'Problem Solving (Basics)',
    issuer: 'HackerRank',
    icon: '📜',
    iframeUrl: 'https://www.hackerrank.com/certificates/iframe/14230d101784',
    externalUrl: null,
  },
  {
    id: 6,
    title: 'CodeChum National Programming Challenge 2024',
    issuer: 'Participant',
    icon: '🏆',
    iframeUrl: null,
    externalUrl: null,
  },
  {
    id: 7,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    icon: '🎓',
    iframeUrl: null,
    externalUrl: null,
  },
  {
    id: 8,
    title: 'Front End Development Libraries',
    issuer: 'freeCodeCamp',
    icon: '🎓',
    iframeUrl: null,
    externalUrl: null,
  },
]

export default function Certifications() {
  const [revealed, setRevealed] = useState(false)
  const [activeIframe, setActiveIframe] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!activeIframe) return
    const handleKey = (e) => { if (e.key === 'Escape') setActiveIframe(null) }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [activeIframe])

  function handleCardClick(cert) {
    if (cert.iframeUrl) {
      setActiveIframe(cert)
    } else if (cert.externalUrl) {
      window.open(cert.externalUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="certs" id="certifications" ref={sectionRef}>
      <div className="certs__container">

        {/* Section header */}
        <div className="certs__header">
          <span className="certs__prompt">&gt;</span>
          <h2 className="certs__heading">Certifications</h2>
          <span className="certs__line" />
        </div>

        {/* Grid */}
        <div className="certs__grid">
          {certifications.map((cert, i) => (
            <button
              className={`certs__card${revealed ? ' certs__card--visible' : ''}${(cert.iframeUrl || cert.externalUrl) ? ' certs__card--clickable' : ''}`}
              key={cert.id}
              style={{ transitionDelay: revealed ? `${i * 80}ms` : '0ms' }}
              onClick={() => handleCardClick(cert)}
              aria-label={cert.iframeUrl ? `View ${cert.title} certificate` : cert.externalUrl ? `Open ${cert.title} certificate` : cert.title}
              type="button"
            >
              <span className="certs__icon">{cert.icon}</span>
              <div className="certs__info">
                <h3 className="certs__title">{cert.title}</h3>
                <p className="certs__issuer">{cert.issuer}</p>
              </div>
              {cert.iframeUrl && (
                <span className="certs__view-badge">View</span>
              )}
              {cert.externalUrl && (
                <span className="certs__view-badge">Open ↗</span>
              )}
            </button>
          ))}
        </div>

      </div>

      {/* ── Iframe Modal ── */}
      {activeIframe && (
        <div className="certs-modal" onClick={() => setActiveIframe(null)}>
          <div className="certs-modal__container" onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div className="certs-modal__header">
              <div className="certs-modal__dots">
                <span /><span /><span />
              </div>
              <span className="certs-modal__title">{activeIframe.title}</span>
              <button
                className="certs-modal__close"
                onClick={() => setActiveIframe(null)}
                aria-label="Close certificate viewer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Iframe */}
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
