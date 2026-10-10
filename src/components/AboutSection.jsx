import { useEffect, useRef, useState } from 'react'
import TechIcon, { techMeta } from './TechIcon'
import './AboutSection.css'

// Brand keys defined in TechIcon.jsx with bespoke engineering telemetry
const techCatalog = {
  // AI Augmented Workflow
  windsurf: { role: 'Primary agentic IDE for multi-file refactoring, cascade edits & codebase scaffolding', pairs: ['claude', 'cursor', 'git'], cat: 'AI Agent' },
  antigravity: { role: 'Autonomous agent workspace & deep multi-agent workflow orchestration', pairs: ['codex', 'claude', 'vscode'], cat: 'AI Agent' },
  codex: { role: 'CLI coding agent for rapid file edits, terminal automation & script executions', pairs: ['antigravity', 'linux', 'git'], cat: 'AI Agent' },
  claude: { role: 'Deep architectural reasoning, code reviews, complex logic & security analysis', pairs: ['windsurf', 'cursor', 'antigravity'], cat: 'AI Agent' },
  cursor: { role: 'In-editor diff generation, workspace-aware AI search & context autocomplete', pairs: ['vscode', 'claude', 'copilot'], cat: 'AI Agent' },
  copilot: { role: 'Inline autocomplete and repetitive syntax generation across daily workflows', pairs: ['vscode', 'github'], cat: 'AI Agent' },
  hermes: { role: 'Autonomous workflow execution and reasoning agent integration', pairs: ['antigravity', 'python'], cat: 'AI Agent' },
  gemini: { role: 'Multimodal analysis, large context parsing, and documentation research', pairs: ['antigravity', 'claude'], cat: 'AI Agent' },
  grok: { role: 'Real-time knowledge synthesis and fast alternative perspective generation', pairs: ['claude', 'gemini'], cat: 'AI Agent' },
  qwen: { role: 'Multilingual and code reasoning model evaluation across benchmarks', pairs: ['python', 'hermes'], cat: 'AI Agent' },
  kiro: { role: 'Specialized agentic workflow and task acceleration tool', pairs: ['antigravity', 'windsurf'], cat: 'AI Agent' },

  // SAP & Enterprise Data Migration
  sap: { role: 'Enterprise ERP core for business operations, transactional ledgers & master data', pairs: ['sapgui', 'ltmc', 'ltmom'], cat: 'Enterprise' },
  sapgui: { role: 'Native transactional UI for SAP systems navigation, table inspection & BAPIs', pairs: ['sap', 'ltmc'], cat: 'Enterprise' },
  ltmc: { role: 'Migration Cockpit for structured legacy file uploads and target mapping runs', pairs: ['ltmom', 'sap', 'excel'], cat: 'Enterprise' },
  ltmom: { role: 'Migration Object Modeler for custom rules, structures, and field transforms', pairs: ['ltmc', 'sap'], cat: 'Enterprise' },

  // Workflow & Process Automation
  excel: { role: 'Spreadsheet formula automation, discrepancy audits, and legacy data prep', pairs: ['python', 'n8n', 'ltmc'], cat: 'Automation' },
  n8n: { role: 'Node-based webhook orchestration and headless data synchronization', pairs: ['zapier', 'python', 'mysql'], cat: 'Automation' },
  zapier: { role: 'Cloud-based multi-app trigger automation and instant notifications', pairs: ['n8n', 'excel', 'teams'], cat: 'Automation' },
  python: { role: 'Data transformation scripts, file parsers, and API glue logic', pairs: ['excel', 'mysql', 'n8n'], cat: 'Automation' },

  // Frontend & UI
  react: { role: 'Declarative component hierarchies, custom hooks & reactive state interfaces', pairs: ['vite', 'js', 'html5'], cat: 'Frontend' },
  vite: { role: 'Lightning-fast ES module dev server and optimized production bundler', pairs: ['react', 'js'], cat: 'Frontend' },
  js: { role: 'Modern ECMAScript standards, asynchronous workflows & DOM interaction', pairs: ['react', 'node', 'html5'], cat: 'Frontend' },
  html5: { role: 'Semantic page structure, accessibility standards, and SEO markup', pairs: ['css', 'js', 'react'], cat: 'Frontend' },
  css: { role: 'Custom responsive design, CSS variables, flexbox/grid & keyframe animations', pairs: ['html5', 'bootstrap'], cat: 'Frontend' },
  bootstrap: { role: 'Rapid UI prototyping and grid framework foundations', pairs: ['css', 'html5', 'js'], cat: 'Frontend' },

  // Backend & Databases
  php: { role: 'Server-side application logic, session handling, and RESTful APIs', pairs: ['mysql', 'html5'], cat: 'Backend' },
  node: { role: 'Event-driven JavaScript runtime for microservices and build tooling', pairs: ['js', 'vite', 'react'], cat: 'Backend' },
  java: { role: 'Object-oriented programming, enterprise structures, and design patterns', pairs: ['mysql', 'cpp'], cat: 'Backend' },
  cpp: { role: 'Low-level memory management, algorithms, and computational efficiency', pairs: ['java', 'linux'], cat: 'Backend' },
  mysql: { role: 'Relational database schema design, indexing, foreign keys, and queries', pairs: ['php', 'python', 'sqlite'], cat: 'Database' },
  sqlite: { role: 'Embedded lightweight zero-configuration storage for local data', pairs: ['python', 'mysql'], cat: 'Database' },
  mongodb: { role: 'Document-oriented NoSQL storage for flexible JSON data models', pairs: ['node', 'js'], cat: 'Database' },
  firebase: { role: 'Real-time database, authentication, and cloud messaging services', pairs: ['react', 'js'], cat: 'Database' },

  // Cloud & Tooling
  awsconsole: { role: 'Management console for provisioning and monitoring AWS cloud resources', pairs: ['s3', 'linux'], cat: 'Cloud' },
  s3: { role: 'Scalable object storage for static assets, backups, and media files', pairs: ['awsconsole', 'react'], cat: 'Cloud' },
  vercel: { role: 'Zero-config edge deployment, serverless functions, and CI previews', pairs: ['react', 'vite', 'github'], cat: 'Cloud' },
  linux: { role: 'POSIX shell scripting, file permissions, and server administration', pairs: ['git', 'python', 'node'], cat: 'Cloud' },
  git: { role: 'Distributed version control, branch management, and commit integrity', pairs: ['github', 'vscode'], cat: 'Tooling' },
  github: { role: 'Repository hosting, collaborative reviews, and CI/CD pipelines', pairs: ['git', 'vercel'], cat: 'Tooling' },
  vscode: { role: 'Extensible core code editor with language servers and debuggers', pairs: ['git', 'node', 'react'], cat: 'Tooling' },
  jira: { role: 'Agile sprint tracking, ticket lifecycles, and engineering issue management', pairs: ['github', 'teams'], cat: 'Tooling' },
  teams: { role: 'Enterprise stakeholder communication and cross-functional sync', pairs: ['jira', 'zapier'], cat: 'Tooling' },
}

const techBanks = [
  { id: 'all', label: 'ALL MODULES' },
  { id: 'agents', label: 'AI AGENTS' },
  { id: 'automation', label: 'AUTOMATION' },
  { id: 'enterprise', label: 'SAP & DATA' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND & DB' },
  { id: 'cloud', label: 'CLOUD & TOOLS' },
]

const techCategories = [
  {
    id: 'agents',
    num: 'BANK 01',
    title: 'AI Augmented Workflow',
    note: 'Next-gen autonomous coding agents, multi-file refactoring & architecture review',
    techs: ['windsurf', 'antigravity', 'codex', 'claude', 'cursor', 'hermes', 'gemini', 'grok', 'qwen', 'kiro', 'copilot'],
  },
  {
    id: 'automation',
    num: 'BANK 02',
    title: 'Workflow & Process Automation',
    note: 'Headless webhook pipelines, automated data extraction & spreadsheet discrepancy audits',
    techs: ['excel', 'n8n', 'zapier', 'python'],
  },
  {
    id: 'enterprise',
    num: 'BANK 03',
    title: 'SAP Data Migration & Integrity',
    note: 'Enterprise ERP staging, LTMC/LTMOM transformation & zero-loss ledger validation',
    techs: ['sap', 'sapgui', 'ltmc', 'ltmom'],
  },
  {
    id: 'frontend',
    num: 'BANK 04',
    title: 'Frontend & UI Engineering',
    note: 'Component architectures, reactive systems, accessibility standards & fluid motion',
    techs: ['react', 'vite', 'js', 'html5', 'css', 'bootstrap'],
  },
  {
    id: 'backend',
    num: 'BANK 05',
    title: 'Backend, Databases & Schemas',
    note: 'Application logic, relational schema normalization, NoSQL & systems programming',
    techs: ['php', 'node', 'mysql', 'sqlite', 'mongodb', 'firebase', 'java', 'cpp'],
  },
  {
    id: 'cloud',
    num: 'BANK 06',
    title: 'Cloud, Infrastructure & Tooling',
    note: 'Serverless edge hosting, S3 buckets, distributed version control & agile tracking',
    techs: ['git', 'github', 'vscode', 'linux', 'vercel', 'awsconsole', 's3', 'jira', 'teams'],
  },
]

const signalPipelines = [
  {
    id: 'sap-migration',
    name: 'Enterprise SAP S/4HANA Migration Pipeline',
    badge: 'PRODUCTION ENTERPRISE',
    desc: 'Automated legacy extraction, discrepancy profiling, LTMC transformation, and pre-load validation into target SAP ERP.',
    steps: [
      { step: '01', title: 'Raw Ingestion', tool: 'excel', label: 'Legacy Data / Sheets', note: 'Column profiling & null audits' },
      { step: '02', title: 'Data Cleansing', tool: 'python', label: 'Python Automation', note: 'Regex normalization & deduplication' },
      { step: '03', title: 'Schema Mapping', tool: 'ltmom', label: 'Migration Modeler', note: 'Custom structure & field rules' },
      { step: '04', title: 'Cockpit Staging', tool: 'ltmc', label: 'Migration Cockpit', note: 'Dry-run mock conversions' },
      { step: '05', title: 'Target ERP', tool: 'sap', label: 'SAP S/4HANA', note: 'Verified zero-loss ledger signoff' },
    ],
  },
  {
    id: 'process-automation',
    name: 'Headless Workflow & Webhook Router',
    badge: 'EVENT-DRIVEN AUTOMATION',
    desc: 'Connecting enterprise triggers to self-hosted orchestration and instant multi-app execution without manual touchpoints.',
    steps: [
      { step: '01', title: 'Event Trigger', tool: 'zapier', label: 'Cloud Webhooks', note: 'Inbound forms & service events' },
      { step: '02', title: 'Orchestration', tool: 'n8n', label: 'n8n Hub Engine', note: 'Conditional routing & JSON transforms' },
      { step: '03', title: 'Script Execution', tool: 'python', label: 'Automated Worker', note: 'Custom ETL & computation' },
      { step: '04', title: 'Data Sink', tool: 'mysql', label: 'Relational Records', note: 'Audited database persistence' },
      { step: '05', title: 'Alerts & Ops', tool: 'teams', label: 'MS Teams Sync', note: 'Real-time engineering alerts' },
    ],
  },
  {
    id: 'ai-development',
    name: 'Agentic AI Software Engineering Loop',
    badge: 'AUTONOMOUS WORKFLOW',
    desc: 'Next-generation development harness pairing autonomous agents with human architecture review and CI validation.',
    steps: [
      { step: '01', title: 'Agent Workspace', tool: 'antigravity', label: 'Antigravity IDE', note: 'Multi-agent coordination' },
      { step: '02', title: 'Cascade Refactor', tool: 'windsurf', label: 'Windsurf IDE', note: 'Multi-file context edits' },
      { step: '03', title: 'CLI & Scripting', tool: 'codex', label: 'Codex CLI', note: 'Automated script generation' },
      { step: '04', title: 'Deep Reasoning', tool: 'claude', label: 'Claude Architecture', note: 'Edge-case & security review' },
      { step: '05', title: 'Version Control', tool: 'github', label: 'GitHub CI/CD', note: 'Automated tests & deploy' },
    ],
  },
  {
    id: 'fullstack-web',
    name: 'Full-Stack Web Architecture',
    badge: 'CLIENT SOLUTIONS',
    desc: 'Modern reactive frontend wired to robust server-side processing, secure database storage, and edge distribution.',
    steps: [
      { step: '01', title: 'Client UI', tool: 'react', label: 'React 18 + Vite', note: 'Component architectures & state' },
      { step: '02', title: 'Service Layer', tool: 'php', label: 'PHP / REST APIs', note: 'Validation & business logic' },
      { step: '03', title: 'Data Tier', tool: 'mysql', label: 'MySQL Relational', note: 'Normalized schemas & indexes' },
      { step: '04', title: 'Asset Storage', tool: 's3', label: 'AWS S3 Storage', note: 'Secure document & media bucket' },
      { step: '05', title: 'Edge Delivery', tool: 'vercel', label: 'Vercel Platform', note: 'Global edge cache & SSL' },
    ],
  },
]

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
  const [activeTech, setActiveTech] = useState('windsurf')
  const [viewMode, setViewMode] = useState('matrix') // 'matrix' | 'pipeline'
  const [activeBank, setActiveBank] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
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

  // Filtered categories and search logic for workbench
  const q = searchQuery.trim().toLowerCase()
  const filteredCategories = techCategories
    .filter(cat => activeBank === 'all' || cat.id === activeBank)
    .map(cat => {
      if (!q) return cat
      const matchingTechs = cat.techs.filter(tech => {
        const meta = techMeta(tech)
        const info = techCatalog[tech] || {}
        return (
          tech.toLowerCase().includes(q) ||
          meta.title.toLowerCase().includes(q) ||
          (info.role && info.role.toLowerCase().includes(q)) ||
          (info.cat && info.cat.toLowerCase().includes(q))
        )
      })
      return { ...cat, techs: matchingTechs }
    })
    .filter(cat => cat.techs.length > 0)

  const currentMeta = techMeta(activeTech)
  const currentCatalog = techCatalog[activeTech] || {
    role: 'Core engineering tool integrated into software workflows',
    pairs: ['git', 'github'],
    cat: 'Engineering',
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
                      aria-label={`${item.phase}: ${item.title} (${item.period})`}
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

        {/* ── Capabilities: Interactive Signal Matrix & Pipelines ── */}
        <div className="about__stack" aria-labelledby="stack-title">
          <div className="about__stack-heading">
            <div>
              <p className="about__index">02 / Technical Workbench</p>
              <h2 id="stack-title">Interactive Signal Matrix & Pipelines.</h2>
            </div>
            <p className="about__stack-lead">
              A tactile telemetry console indexing tools across Enterprise SAP Data Migration, Headless Webhook Automation, Full-Stack Systems, and Autonomous AI Agent loops.
            </p>
          </div>

          {/* ── Active Inspector HUD Readout ── */}
          <div className="tech-hud" aria-live="polite">
            <div className="tech-hud__left">
              <div className="tech-hud__badge" style={{ '--brand': currentMeta.hex }}>
                <TechIcon name={activeTech} size={32} />
              </div>
              <div className="tech-hud__info">
                <div className="tech-hud__title-row">
                  <h3 className="tech-hud__title">{currentMeta.title}</h3>
                  <span className="tech-hud__category">{currentCatalog.cat}</span>
                  <span className="tech-hud__status">
                    <span className="tech-hud__pulse-dot" /> LIVE TELEMETRY
                  </span>
                </div>
                <p className="tech-hud__role">{currentCatalog.role}</p>
              </div>
            </div>

            <div className="tech-hud__right">
              <span className="tech-hud__pairs-label">CIRCUIT COUPLING:</span>
              <div className="tech-hud__pairs">
                {currentCatalog.pairs.map(pairKey => {
                  const pMeta = techMeta(pairKey)
                  return (
                    <button
                      key={pairKey}
                      type="button"
                      className="tech-hud__pair-pill"
                      onClick={() => setActiveTech(pairKey)}
                      title={`Jump inspection to ${pMeta.title}`}
                    >
                      <TechIcon name={pairKey} size={14} />
                      <span>{pMeta.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Workbench Navigation & Mode Deck ── */}
          <div className="tech-workbench__deck">
            <div className="tech-workbench__modes" role="tablist" aria-label="Workbench view modes">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'matrix'}
                className={`tech-mode-btn${viewMode === 'matrix' ? ' tech-mode-btn--active' : ''}`}
                onClick={() => setViewMode('matrix')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>MODULE MATRIX</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'pipeline'}
                className={`tech-mode-btn${viewMode === 'pipeline' ? ' tech-mode-btn--active' : ''}`}
                onClick={() => setViewMode('pipeline')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9v3a6 6 0 0 0 6 6h3"/></svg>
                <span>SIGNAL PIPELINES</span>
              </button>
            </div>

            <div className="tech-workbench__search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Filter tools (e.g. windsurf, sap, n8n)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter technologies"
              />
              {searchQuery && (
                <button type="button" className="tech-workbench__clear-search" onClick={() => setSearchQuery('')} aria-label="Clear filter">✕</button>
              )}
            </div>
          </div>

          {/* ── View 1: Module Matrix ── */}
          {viewMode === 'matrix' && (
            <div className="tech-workbench__matrix-view">
              <div className="tech-workbench__banks" role="tablist" aria-label="Tool banks">
                {techBanks.map(b => (
                  <button
                    key={b.id}
                    type="button"
                    role="tab"
                    aria-selected={activeBank === b.id}
                    className={`tech-bank-pill${activeBank === b.id ? ' tech-bank-pill--active' : ''}`}
                    onClick={() => setActiveBank(b.id)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {filteredCategories.length === 0 ? (
                <div className="tech-workbench__empty">
                  <p>No matching technologies found for &ldquo;{searchQuery}&rdquo;</p>
                  <button type="button" onClick={() => { setSearchQuery(''); setActiveBank('all') }} className="about__timeline-btn">
                    RESET FILTERS
                  </button>
                </div>
              ) : (
                <div className="tech-workbench__banks-grid">
                  {filteredCategories.map((cat) => (
                    <div key={cat.id} className="tech-bank-card">
                      <div className="tech-bank-card__head">
                        <div className="tech-bank-card__meta">
                          <span className="tech-bank-card__num">{cat.num}</span>
                          <span className="tech-bank-card__count">{cat.techs.length} NODES</span>
                        </div>
                        <h3 className="tech-bank-card__title">{cat.title}</h3>
                        <p className="tech-bank-card__note">{cat.note}</p>
                      </div>

                      <div className="tech-bank-card__tiles">
                        {cat.techs.map(techKey => {
                          const meta = techMeta(techKey)
                          const isInspected = activeTech === techKey
                          const isPaired = currentCatalog.pairs?.includes(techKey)
                          return (
                            <button
                              key={techKey}
                              type="button"
                              className={`tech-tile${isInspected ? ' tech-tile--active' : ''}${isPaired ? ' tech-tile--paired' : ''}`}
                              style={{ '--brand': meta.hex }}
                              onMouseEnter={() => setActiveTech(techKey)}
                              onClick={() => setActiveTech(techKey)}
                              aria-label={`Inspect ${meta.title}`}
                            >
                              <span className="tech-tile__badge">
                                <TechIcon name={techKey} size={22} />
                              </span>
                              <span className="tech-tile__name">{meta.title}</span>
                              {isPaired && <span className="tech-tile__link-dot" title="Coupled circuit connection" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── View 2: Signal Architecture Pipelines ── */}
          {viewMode === 'pipeline' && (
            <div className="tech-workbench__pipelines-view">
              <div className="tech-pipelines-list">
                {signalPipelines.map((pipeline) => (
                  <div key={pipeline.id} className="tech-pipeline-card">
                    <div className="tech-pipeline-card__head">
                      <div className="tech-pipeline-card__badge-row">
                        <span className="tech-pipeline-card__badge">{pipeline.badge}</span>
                        <span className="tech-pipeline-card__indicator">SIGNAL ACTIVE</span>
                      </div>
                      <h3 className="tech-pipeline-card__title">{pipeline.name}</h3>
                      <p className="tech-pipeline-card__desc">{pipeline.desc}</p>
                    </div>

                    <div className="tech-pipeline-flow" aria-label={`Steps for ${pipeline.name}`}>
                      {pipeline.steps.map((st, stepIdx) => {
                        const sMeta = techMeta(st.tool)
                        const isCurrentInspected = activeTech === st.tool
                        return (
                          <div key={st.step} className="tech-pipeline-node-wrap">
                            <button
                              type="button"
                              className={`tech-pipeline-node${isCurrentInspected ? ' tech-pipeline-node--active' : ''}`}
                              style={{ '--brand': sMeta.hex }}
                              onClick={() => setActiveTech(st.tool)}
                              onMouseEnter={() => setActiveTech(st.tool)}
                              title={`Inspect ${sMeta.title}: ${st.note}`}
                            >
                              <div className="tech-pipeline-node__top">
                                <span className="tech-pipeline-node__step">{st.step}</span>
                                <span className="tech-pipeline-node__phase">{st.title}</span>
                              </div>
                              <div className="tech-pipeline-node__icon-row">
                                <span className="tech-pipeline-node__badge">
                                  <TechIcon name={st.tool} size={22} />
                                </span>
                                <span className="tech-pipeline-node__label">{st.label}</span>
                              </div>
                              <p className="tech-pipeline-node__note">{st.note}</p>
                            </button>

                            {stepIdx < pipeline.steps.length - 1 && (
                              <div className="tech-pipeline-arrow" aria-hidden="true">
                                <div className="tech-pipeline-arrow__line">
                                  <span className="tech-pipeline-arrow__pulse" />
                                </div>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
