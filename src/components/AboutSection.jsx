import { useEffect, useRef, useState } from 'react'
import TechStack from './TechStack'
import './AboutSection.css'

const experiences = [
  {
    id: 5,
    title: 'Associate Software Engineer',
    period: '2026 — Present',
    icon: '⚡',
    desc: 'Specializing in SAP Data Migration, schema mapping, and validation pipelines for enterprise ERP workflows.',
    tags: ['SAP S/4HANA', 'LTMC / LTMOM', 'Data Cleansing'],
    current: true,
  },
  {
    id: 4,
    title: 'Data Entry Associate',
    period: '2026',
    icon: '📊',
    desc: 'Processed high-volume billing records, investigated data discrepancies, and maintained enterprise quality.',
    tags: ['Data Operations', 'Excel Automation', 'Audit'],
  },
  {
    id: 3,
    title: 'Customer Service Representative',
    period: '2025 — 2026',
    icon: '🎧',
    desc: 'Resolved customer issues, documented interactions, and sharpened clear communication under pressure.',
    tags: ['Support', 'CRM Systems', 'Communication'],
  },
  {
    id: 2,
    title: 'Freelance Web Developer',
    period: '2022 — Present',
    icon: '🌐',
    desc: 'Architected and deployed responsive client portals, booking engines, and custom business solutions.',
    tags: ['React', 'PHP', 'MySQL', 'Full-Stack'],
  },
  {
    id: 1,
    title: 'BS Information Technology (BSIT)',
    period: '2021 — 2025',
    icon: '🎓',
    desc: 'Foundational degree in systems analysis, relational database design, and software engineering.',
    tags: ['Systems Analysis', 'Database Design', 'Software Engineering'],
  },
]

export default function AboutSection() {
  const [revealed, setRevealed] = useState(false)
  const [activeStage, setActiveStage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const sectionRef = useRef(null)

  // Reveal the section the first time it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-play career simulator
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % experiences.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <section className={`about${revealed ? ' about--revealed' : ''}`} id="about" ref={sectionRef}>
      {/* Ambient drifting glows — pure CSS motion */}
      <div className="about__aurora" aria-hidden="true">
        <span className="about__aurora-blob about__aurora-blob--1" />
        <span className="about__aurora-blob about__aurora-blob--2" />
        <span className="about__aurora-blob about__aurora-blob--3" />
      </div>

      <div className="about__container">
        {/* ── Section 01: Story & Interactive Career Timeline ── */}
        <header className="about__header">
          <p className="about__index">&gt; 01 / Trajectory</p>
          <h2>A practical developer shaped by operations, support, and software.</h2>
        </header>

        <div className="about__story-grid">
          <div className="about__story">
            <p className="about__lead">
              I learned software by building for real constraints: limited time, imperfect data, and people who need the result to simply work.
            </p>
            <p>
              My path moved through customer support and data operations before software engineering. That background still shapes how I work: ask clear questions, document decisions, verify the data, and design for the person using the system.
            </p>
            <p>
              Today I focus on SAP Data Migration and continue building web applications that turn repetitive processes into clear, useful workflows.
            </p>
          </div>

          <div className="about__timeline" aria-label="Interactive career journey timeline">
            {/* Interactive Control Deck */}
            <div className="about__timeline-toolbar">
              <div className="about__timeline-status-chip">
                <span className="about__timeline-radar-dot" />
                <span className="about__timeline-status-text">
                  STAGE 0{5 - activeStage} / 05 · <strong>{experiences[activeStage].title}</strong>
                </span>
              </div>

              <div className="about__timeline-controls">
                <button
                  type="button"
                  className="about__timeline-btn"
                  onClick={() => { setIsPlaying(false); setActiveStage(prev => (prev - 1 + experiences.length) % experiences.length) }}
                  aria-label="Previous milestone"
                  title="Previous milestone"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>

                <button
                  type="button"
                  className={`about__timeline-btn about__timeline-btn--play${isPlaying ? ' about__timeline-btn--active' : ''}`}
                  onClick={() => setIsPlaying(p => !p)}
                  aria-label={isPlaying ? 'Pause career simulator' : 'Simulate career journey'}
                  title={isPlaying ? 'Pause simulator' : 'Simulate career journey'}
                >
                  {isPlaying ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      <span>SIMULATE</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="about__timeline-btn"
                  onClick={() => { setIsPlaying(false); setActiveStage(prev => (prev + 1) % experiences.length) }}
                  aria-label="Next milestone"
                  title="Next milestone"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>

            {/* Interactive Timeline Track */}
            <div className="about__timeline-track">
              {/* Glowing circuit spine with light photon */}
              <div className="about__timeline-spine" aria-hidden="true">
                <span className="about__timeline-photon" />
              </div>

              <div className="about__timeline-nodes">
                {experiences.map((item, i) => {
                  const isActive = activeStage === i
                  return (
                    <article
                      key={item.id}
                      className={`about__timeline-station${isActive ? ' about__timeline-station--active' : ''}`}
                      onClick={() => { setIsPlaying(false); setActiveStage(i) }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setIsPlaying(false)
                          setActiveStage(i)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isActive}
                      aria-label={`${item.title} (${item.period})`}
                      style={{ transitionDelay: revealed ? `${i * 65}ms` : '0ms' }}
                    >
                      {/* Interactive Hub Connector */}
                      <div className="about__timeline-hub-wrap">
                        <div className={`about__timeline-hub${isActive ? ' about__timeline-hub--active' : ''}${item.current ? ' about__timeline-hub--current' : ''}`}>
                          <span className="about__timeline-hub-icon" aria-hidden="true">{item.icon}</span>
                          {isActive && <span className="about__timeline-hub-ring" aria-hidden="true" />}
                        </div>
                        <span className="about__timeline-hub-num">0{5 - i}</span>
                      </div>

                      {/* Content Card */}
                      <div className="about__timeline-card">
                        <div className="about__timeline-card-header">
                          <div className="about__timeline-card-title-row">
                            <h3 className="about__timeline-card-title">{item.title}</h3>
                            {item.current && <span className="about__timeline-current-pill">PRESENT</span>}
                          </div>
                          <time className="about__timeline-period">{item.period}</time>
                        </div>

                        <p className="about__timeline-card-desc">{item.desc}</p>

                        <div className="about__timeline-tags" aria-label="Key domains">
                          {item.tags.map(t => (
                            <span key={t} className="about__timeline-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 02: Minimalist Interactive Tech Stack ── */}
        <TechStack />
      </div>
    </section>
  )
}
