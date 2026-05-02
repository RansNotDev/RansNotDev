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
      { name: 'Git',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Canva',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
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
    id: 1,
    title: 'Data Entry Specialist',
    period: '2026',
    desc: '// Processed and validated high-volume data records with accuracy and speed.',
    tag: 'operations',
    current: true,
  },
  {
    id: 2,
    title: 'Customer Service Representative',
    period: '2026',
    desc: '// Handled inbound queries, learned CRM tools, and resolved client concerns.',
    tag: 'bpo',
  },
  {
    id: 3,
    title: 'Customer Service Representative',
    period: '2025',
    desc: '// Managed high-volume calls, improved CSAT scores, and documented resolutions.',
    tag: 'bpo',
  },
  {
    id: 4,
    title: 'BS Information Technology',
    period: '2025',
    desc: '// Graduated with focus on systems analysis, databases, and web technologies.',
    tag: 'education',
  },
  {
    id: 5,
    title: 'IT Intern',
    period: '2024',
    desc: '// Supported IT operations at Municipal Accounting Office — systems & documentation.',
    tag: 'internship',
  },
  {
    id: 6,
    title: 'Freelance Web Developer',
    period: '2022',
    desc: '// Built and deployed web projects for clients — self-taught, shipped real products.',
    tag: 'dev',
  },
  {
    id: 7,
    title: 'Hello, World!',
    period: '2021',
    // C++ Hello World shown on hover
    desc: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!";\n  return 0;\n}`,
    tag: 'milestone',
    isCode: true,
  },
  {
    id: 8,
    title: 'Enrolled in BSIT',
    period: '2021',
    desc: '// Started the IT journey. Chose to bet on technology.',
    tag: 'education',
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
  "A self-taught developer and a BSIT graduate with a drive to build systems that actually solve problems. My foundation spans systems analysis, databases, web technologies, and structured problem-solving — built through both formal education and years of real-world tinkering.",
  "I've supported web-based systems, streamlined documentation workflows using Google Workspace and Microsoft Office, and troubleshot technical issues in live environments. I take ownership of what I build and collaborate well across teams.",
  "My BPO background isn't a detour — it sharpened my communication, adaptability, and ability to stay sharp under pressure. I'm detail-oriented, process-driven, and committed to shipping practical solutions that improve performance and efficiency.",
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
{'  '}<span className="c-key">"role"</span><span className="c-op">:</span> <span className="c-str">"Aspiring Software Engineer"</span>,{'\n'}
{'  '}<span className="c-key">"education"</span><span className="c-op">:</span> <span className="c-str">"BSIT Graduate, Cavite"</span>,{'\n'}
{'  '}<span className="c-key">"selfTaught"</span><span className="c-op">:</span> <span className="c-bool">true</span>,{'\n'}
{'  '}<span className="c-key">"background"</span><span className="c-op">:</span> <span className="c-str">"BPO → Tech"</span>,{'\n'}
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
