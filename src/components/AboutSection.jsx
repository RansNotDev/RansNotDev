import { useState, useEffect, useRef } from 'react'
import './AboutSection.css'

// ── Tech stack ────────────────────────────────────────────────────────────────
const techCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    techs: [
      { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Bootstrap',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Languages',
    techs: [
      { name: 'PHP',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C++',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'MySQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Productivity',
    techs: [
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Vite',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'Git',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Canva',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise & Data',
    techs: [
      { name: 'SAP',             icon: null, emoji: '🔷' },
      { name: 'Data Migration',  icon: null, emoji: '📦' },
      { name: 'Data Validation', icon: null, emoji: '✅' },
      { name: 'ETL Concepts',   icon: null, emoji: '🔄' },
      { name: 'ABAP',           icon: null, emoji: '⚙️' },
      { name: 'REST APIs',      icon: null, emoji: '🔗' },
    ],
  },
  {
    id: 'professional',
    title: 'Professional Skills',
    techs: [
      { name: 'Communication',   icon: null, emoji: '🗣️' },
      { name: 'Problem-Solving', icon: null, emoji: '🧩' },
      { name: 'Adaptability',    icon: null, emoji: '🔄' },
      { name: 'Team Work',       icon: null, emoji: '🤝' },
      { name: 'Time Mgmt',       icon: null, emoji: '⏱️' },
      { name: 'Multi-tasking',   icon: null, emoji: '⚡' },
    ],
  },
]

// ── Experience ────────────────────────────────────────────────────────────────
const experiences = [
  {
    id: 0,
    title: 'Associate Software Engineer — Accenture',
    period: 'May 2026',
    desc: 'Working on enterprise SAP systems — data migration, validation, and system integrations across teams.',
    tag: 'dev',
    current: true,
  },
  {
    id: 1,
    title: 'Data Entry Associate — Global Strategic',
    period: 'Mar–May 2026',
    desc: 'Processed 500+ billing records daily, flagged data inconsistencies, maintained quality benchmarks.',
    tag: 'operations',
  },
  {
    id: 2,
    title: 'Customer Service Rep — Foundever',
    period: 'Feb–Mar 2026',
    desc: 'Completed full technical onboarding in record time. Sharpened communication and documentation skills.',
    tag: 'bpo',
  },
  {
    id: 3,
    title: 'Customer Service Rep — Teleperformance',
    period: 'Oct 2025–Jan 2026',
    desc: 'Resolved 40+ daily inquiries, consistently hit quality targets. Learned to stay calm under pressure.',
    tag: 'bpo',
  },
  {
    id: 4,
    title: 'BS Information Technology — Perpetual Help College',
    period: 'Aug 2021–Jun 2025',
    desc: 'Graduated with focus on systems analysis, databases, and web tech. Built multiple capstone projects.',
    tag: 'education',
  },
  {
    id: 5,
    title: 'Freelance Web Developer',
    period: '2022–Present',
    desc: 'Shipped 5+ client projects — from dental clinics to real estate platforms. Self-taught, self-motivated.',
    tag: 'dev',
  },
  {
    id: 6,
    title: 'Hello, World!',
    period: '2021',
    desc: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!";\n  return 0;\n}`,
    tag: 'milestone',
    isCode: true,
  },
]

const tagColors = {
  dev:        '#22c55e',
  bpo:        '#f59e0b',
  operations: '#3b82f6',
  education:  '#a78bfa',
  internship: '#06b6d4',
  milestone:  '#f43f5e',
}

// ── Bio text for typewriter ───────────────────────────────────────────────────
const bioText = [
  "I'm a self-taught developer who turned a curiosity for code into a career. After graduating with a BSIT degree, I jumped between roles — answering calls, entering data, building freelance projects on the side — until I landed where I always wanted: writing software full-time.",
  "Now at Accenture, I work with SAP systems, data migration, and enterprise integrations. But outside of work hours, I'm still the same person who builds random side projects at 2 AM because I had an idea I couldn't let go.",
  "What sets me apart? I actually ship things. Not just tutorials or half-finished repos — real products that real people use. I'm detail-oriented, I communicate clearly, and I thrive under pressure (thanks, BPO career).",
]

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text, speed = 18, startDelay = 300) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]           = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const start = setTimeout(() => {
      ref.current = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(ref.current)
          // Keep cursor for 5 seconds then hide it
          setTimeout(() => setDone(true), 5000)
        }
      }, speed)
    }, startDelay)
    return () => { clearTimeout(start); clearInterval(ref.current) }
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ── Bio paragraph component ───────────────────────────────────────────────────
function TypedBio({ text, delay = 0 }) {
  const [active, setActive] = useState(false)
  const elRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (elRef.current) observer.observe(elRef.current)
    return () => observer.disconnect()
  }, [])

  const { displayed, done } = useTypewriter(active ? text : '', 12, delay)

  return (
    <p className="about__bio" ref={elRef}>
      {active ? displayed : ''}
      {active && !done && <span className="about__bio-cursor">|</span>}
    </p>
  )
}

export default function AboutSection() {
  const [hoveredExp, setHoveredExp] = useState(null)

  return (
    <section className="about" id="about">
      <div className="about__container">

        {/* ══ LEFT COLUMN ══ */}
        <div className="about__left">

          {/* ── Section intro ── */}
          <div className="about__section-header">
            <span className="about__section-prompt">&gt;</span>
            <h2 className="about__section-title">About Me</h2>
            <span className="about__section-line" />
          </div>

          {/* ── Terminal About Me ── */}
          <div className="about__terminal">
            <div className="about__terminal-bar">
              <span className="about__terminal-dot about__terminal-dot--red" />
              <span className="about__terminal-dot about__terminal-dot--yellow" />
              <span className="about__terminal-dot about__terminal-dot--green" />
              <span className="about__terminal-filename">about-me.json</span>
            </div>
            <div className="about__terminal-body">
              <pre className="about__code"><code>
<span className="c-keyword">const</span> <span className="c-var">aboutRany</span> <span className="c-op">=</span> {'{'}{'\n'}
{'  '}<span className="c-key">"name"</span><span className="c-op">:</span> <span className="c-str">"Rany Boy Templado"</span>,{'\n'}
{'  '}<span className="c-key">"role"</span><span className="c-op">:</span> <span className="c-str">"Associate Software Engineer @ Accenture"</span>,{'\n'}
{'  '}<span className="c-key">"education"</span><span className="c-op">:</span> <span className="c-str">"BSIT Graduate, Cavite"</span>,{'\n'}
{'  '}<span className="c-key">"selfTaught"</span><span className="c-op">:</span> <span className="c-bool">true</span>,{'\n'}
{'  '}<span className="c-key">"background"</span><span className="c-op">:</span> <span className="c-str">"BPO → Accenture (SAP)"</span>,{'\n'}
{'  '}<span className="c-key">"interests"</span><span className="c-op">:</span> [{'\n'}
{'    '}<span className="c-str">"Web Development"</span>,{'\n'}
{'    '}<span className="c-str">"System Design"</span>,{'\n'}
{'    '}<span className="c-str">"Process Automation"</span>,{'\n'}
{'    '}<span className="c-str">"Technical Support"</span>,{'\n'}
{'  '}],{'\n'}
{'  '}<span className="c-key">"bio"</span><span className="c-op">:</span> <span className="c-str">"Self-taught developer and BSIT graduate. Went from answering calls to writing code."</span>{'\n'}
{'}'}<span className="c-op">;</span>
              </code></pre>
            </div>
          </div>

          {/* ── Bio paragraphs — typewriter on scroll ── */}
          <div className="about__bio-block">
            {bioText.map((text, i) => (
              <TypedBio key={i} text={text} delay={i * 200} />
            ))}
          </div>

          {/* ── Tech Stack ── */}
          <div className="about__techs">
            <div className="about__section-header">
              <span className="about__section-prompt">&gt;</span>
              <h2 className="about__section-title">Tech Stack</h2>
              <span className="about__section-line" />
            </div>

            {techCategories.map((cat) => (
              <div className="about__tech-group" key={cat.id}>
                <p className="about__tech-label">{cat.title}</p>
                <div className="about__tech-grid">
                  {cat.techs.map((tech) => (
                    <div className="about__tech-card" key={tech.name}>
                      <div className="about__tech-icon">
                        {tech.icon
                          ? <img src={tech.icon} alt={tech.name} />
                          : <span className="about__tech-emoji">{tech.emoji}</span>
                        }
                      </div>
                      {/* Tooltip-style name on hover */}
                      <span className="about__tech-tooltip">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT COLUMN — Experience ══ */}
        <div className="about__right">
          <div className="about__section-header">
            <span className="about__section-prompt">&gt;</span>
            <h2 className="about__section-title">Experience</h2>
            <span className="about__section-line" />
          </div>

          <div className="about__timeline">
            {experiences.map((exp, index) => (
              <div
                className={`about__timeline-item${hoveredExp === exp.id || exp.current ? ' about__timeline-item--active' : ''}`}
                key={exp.id}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
              >
                <div className="about__timeline-marker">
                  <div
                    className="about__timeline-square"
                    style={{
                      borderColor: tagColors[exp.tag],
                      background: (hoveredExp === exp.id || exp.current) ? tagColors[exp.tag] : 'transparent',
                      boxShadow: exp.current ? `0 0 8px ${tagColors[exp.tag]}` : undefined,
                    }}
                  />
                  {index < experiences.length - 1 && <div className="about__timeline-line" />}
                </div>

                <div className="about__timeline-content">
                  <div className="about__timeline-row">
                    <h3 className="about__timeline-title">
                      {exp.title}
                      {exp.current && <span className="about__timeline-current-badge">current</span>}
                    </h3>
                    <span className="about__timeline-year">{exp.period}</span>
                  </div>

                  <div className={`about__timeline-desc${(hoveredExp === exp.id || exp.current) ? ' about__timeline-desc--visible' : ''}`}>
                    {exp.isCode ? (
                      <pre className="about__timeline-code" style={{ color: tagColors[exp.tag] }}>
                        {exp.desc}
                      </pre>
                    ) : (
                      <span className="about__timeline-desc-text" style={{ color: tagColors[exp.tag] }}>
                        {exp.desc}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
