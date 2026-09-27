import { useEffect, useRef, useState } from 'react'
import TechIcon, { techMeta } from './TechIcon'
import './AboutSection.css'

// Each item = a brand key defined in TechIcon.jsx
const techCategories = [
  {
    id: 'frontend', title: 'Frontend', note: 'Interfaces and web foundations',
    techs: ['html5', 'css', 'js', 'bootstrap', 'react', 'vite'],
  },
  {
    id: 'backend', title: 'Backend', note: 'Application logic and services',
    techs: ['php', 'java', 'cpp', 'node', 'python'],
  },
  {
    id: 'database', title: 'Databases', note: 'Where the data lives',
    techs: ['mysql', 'sqlite', 'mongodb', 'firebase'],
  },
  {
    id: 'sap', title: 'SAP ecosystem', note: 'Enterprise data migration',
    techs: ['sap', 'sapgui', 'ltmc', 'ltmom'],
  },
  {
    id: 'cloud', title: 'AWS cloud', note: 'Where things run and scale',
    techs: ['awsconsole', 's3', 'bedrock', 'quicksight'],
  },
  {
    id: 'agents', title: 'AI coding agents', note: 'Tools I pair with day to day', wide: true,
    techs: ['copilot', 'claude', 'cursor', 'windsurf', 'kiro', 'codex', 'antigravity', 'hermes', 'gemini', 'grok', 'qwen'],
  },
  {
    id: 'platforms', title: 'Tools & platforms', note: 'How I plan, ship, and collaborate', wide: true,
    techs: ['vscode', 'linux', 'jira', 'teams', 'git', 'github', 'vercel'],
  },
]

const experiences = [
  {
    title: 'Associate Software Engineer',
    period: '2026 — Present',
    desc: 'Specializing in SAP Data Migration, with a focus on mapping, validation, cleansing, and dependable enterprise data workflows.',
    current: true,
  },
  {
    title: 'Data Operations Associate',
    period: '2026',
    desc: 'Processed high-volume billing records, investigated inconsistencies, and maintained quality and confidentiality standards.',
  },
  {
    title: 'Customer Support Representative',
    period: '2025 — 2026',
    desc: 'Resolved customer issues, documented interactions, and developed calm, precise communication under pressure.',
  },
  {
    title: 'BS Information Technology',
    period: '2021 — 2025',
    desc: 'Studied systems analysis, databases, software development, and web technologies while building practical projects.',
  },
  {
    title: 'Freelance Web Developer',
    period: '2022 — Present',
    desc: 'Built scheduling, property, weather, and portfolio applications for practical use cases.',
  },
]

export default function AboutSection() {
  const [revealed, setRevealed] = useState(false)
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

  // Soft glow that follows the cursor across a category card
  function handleCardMove(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <section className={`about${revealed ? ' about--revealed' : ''}`} id="about" ref={sectionRef}>
      {/* Ambient drifting glows — pure CSS motion */}
      <div className="about__aurora" aria-hidden="true">
        <span className="about__aurora-blob about__aurora-blob--1" />
        <span className="about__aurora-blob about__aurora-blob--2" />
        <span className="about__aurora-blob about__aurora-blob--3" />
      </div>

      <div className="about__container">
        <header className="about__header">
          <p className="about__index">01 / About</p>
          <h2>A practical developer shaped by operations, support, and software.</h2>
        </header>

        <div className="about__story-grid">
          <div className="about__story">
            <p className="about__lead">I learned software by building for real constraints: limited time, imperfect data, and people who need the result to simply work.</p>
            <p>My path moved through customer support and data operations before software engineering. That background still shapes how I work: ask clear questions, document decisions, verify the data, and design for the person using the system.</p>
            <p>Today I focus on SAP Data Migration and continue building web applications that turn repetitive processes into clear, useful workflows.</p>
          </div>

          <div className="about__timeline" aria-label="Experience timeline">
            <span className="about__timeline-progress" aria-hidden="true" />
            {experiences.map((item, i) => (
              <article
                className="about__timeline-item"
                key={`${item.title}-${item.period}`}
                style={{ transitionDelay: revealed ? `${i * 90}ms` : '0ms' }}
              >
                <span className={`about__timeline-marker${item.current ? ' about__timeline-marker--current' : ''}`} />
                <div>
                  <div className="about__timeline-heading">
                    <h3>{item.title}</h3>
                    <time>{item.period}</time>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="about__stack" aria-labelledby="stack-title">
          <div className="about__stack-heading">
            <p className="about__index">02 / Capabilities</p>
            <h2 id="stack-title">The stack I build with.</h2>
          </div>
          <div className="about__stack-grid">
            {techCategories.map((category, i) => (
              <article
                className="about__stack-card"
                key={category.id}
                style={{ transitionDelay: revealed ? `${i * 80}ms` : '0ms' }}
                onPointerMove={handleCardMove}
              >
                <div className="about__stack-card-head">
                  <span className="about__stack-count">{String(category.techs.length).padStart(2, '0')}</span>
                  <h3>{category.title}</h3>
                  <p>{category.note}</p>
                </div>
                <ul className="about__tech-grid">
                  {category.techs.map((tech, j) => {
                    const meta = techMeta(tech)
                    return (
                      <li
                        className="about__tech"
                        key={tech}
                        style={{
                          '--brand': meta.hex,
                          transitionDelay: revealed ? `${i * 80 + j * 40}ms` : '0ms',
                        }}
                      >
                        <span className="about__tech-badge">
                          <TechIcon name={tech} size={24} />
                        </span>
                        <span className="about__tech-name">{meta.title}</span>
                      </li>
                    )
                  })}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
