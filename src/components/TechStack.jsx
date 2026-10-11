import { useState, useMemo } from 'react'
import TechIcon, { techMeta } from './TechIcon'
import './TechStack.css'

const techCatalog = {
  // AI Agents & Autonomous
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

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'agents', label: 'AI & Autonomous', match: ['AI Agent'] },
  { id: 'enterprise', label: 'SAP & Enterprise', match: ['Enterprise'] },
  { id: 'automation', label: 'Automation', match: ['Automation'] },
  { id: 'frontend', label: 'Frontend', match: ['Frontend'] },
  { id: 'backend', label: 'Backend & DB', match: ['Backend', 'Database'] },
  { id: 'cloud', label: 'Cloud & DevOps', match: ['Cloud', 'Tooling'] },
]

const workflows = [
  {
    id: 'ai-loop',
    name: 'Agentic AI Loop',
    icon: '⚡',
    summary: 'Autonomous cascade refactoring, multi-agent reasoning, and CLI execution.',
    tools: ['antigravity', 'windsurf', 'codex', 'claude', 'github'],
  },
  {
    id: 'sap-migration',
    name: 'SAP S/4HANA Migration',
    icon: '🏢',
    summary: 'Legacy data extraction, Python auditing, LTMC staging, and target ERP reconciliation.',
    tools: ['excel', 'python', 'ltmom', 'ltmc', 'sap'],
  },
  {
    id: 'event-automation',
    name: 'Webhook Automation',
    icon: '🔄',
    summary: 'Cloud triggers routed through self-hosted n8n nodes into database sync & alerts.',
    tools: ['zapier', 'n8n', 'python', 'mysql', 'teams'],
  },
  {
    id: 'fullstack-web',
    name: 'Modern Full-Stack',
    icon: '🌐',
    summary: 'Component hierarchy, custom state engines, normalized DB, and edge delivery.',
    tools: ['react', 'vite', 'js', 'php', 'mysql', 'vercel'],
  },
]

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeWorkflow, setActiveWorkflow] = useState(null)
  const [activeTech, setActiveTech] = useState('windsurf')
  const [search, setSearch] = useState('')

  // Current inspected tool
  const currentCatalog = techCatalog[activeTech] || techCatalog.windsurf
  const currentMeta = techMeta(activeTech)

  // Filter tools
  const allKeys = useMemo(() => Object.keys(techCatalog), [])

  const filteredKeys = useMemo(() => {
    return allKeys.filter(key => {
      const tool = techCatalog[key]
      const meta = techMeta(key)

      // Search match
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchTitle = meta.title.toLowerCase().includes(q)
        const matchRole = tool.role.toLowerCase().includes(q)
        const matchCat = tool.cat.toLowerCase().includes(q)
        if (!matchTitle && !matchRole && !matchCat) return false
      }

      // Category match
      if (activeCategory !== 'all') {
        const catObj = categories.find(c => c.id === activeCategory)
        if (catObj?.match && !catObj.match.includes(tool.cat)) return false
      }

      return true
    })
  }, [allKeys, search, activeCategory])

  // Active workflow object if selected
  const activeWfObj = workflows.find(w => w.id === activeWorkflow)

  function toggleWorkflow(wfId) {
    if (activeWorkflow === wfId) {
      setActiveWorkflow(null)
    } else {
      setActiveWorkflow(wfId)
      const wf = workflows.find(w => w.id === wfId)
      if (wf && wf.tools.length > 0) {
        setActiveTech(wf.tools[0])
      }
    }
  }

  return (
    <div className="tech-minimal" aria-labelledby="tech-heading">
      {/* ── Section Header ── */}
      <div className="tech-minimal__header">
        <div className="tech-minimal__header-title-wrap">
          <p className="tech-minimal__eyebrow">&gt; 02 / Tech Stack</p>
          <h2 id="tech-heading" className="tech-minimal__heading">
            Tools, Autonomous Workflows & Systems.
          </h2>
        </div>
        <p className="tech-minimal__lead">
          A minimalist index of daily drivers across agentic software engineering, enterprise ERP data migration, and full-stack systems.
        </p>
      </div>

      {/* ── Interactive Workflow Rail Presets ── */}
      <div className="tech-minimal__workflows-bar">
        <span className="tech-minimal__workflows-label">INTERACTIVE FLOWS:</span>
        <div className="tech-minimal__workflows-pills" role="tablist" aria-label="Workflow presets">
          {workflows.map(wf => {
            const isActive = activeWorkflow === wf.id
            return (
              <button
                key={wf.id}
                type="button"
                className={`tech-wf-pill${isActive ? ' tech-wf-pill--active' : ''}`}
                onClick={() => toggleWorkflow(wf.id)}
                aria-pressed={isActive}
              >
                <span className="tech-wf-pill__icon">{wf.icon}</span>
                <span className="tech-wf-pill__name">{wf.name}</span>
                {isActive && <span className="tech-wf-pill__dot" />}
              </button>
            )
          })}
          {activeWorkflow && (
            <button
              type="button"
              className="tech-wf-pill tech-wf-pill--reset"
              onClick={() => setActiveWorkflow(null)}
              title="Clear active workflow highlight"
            >
              ✕ Clear Flow
            </button>
          )}
        </div>
      </div>

      {/* ── Flow Breadcrumb Strip (if workflow active) ── */}
      {activeWfObj && (
        <div className="tech-flow-banner" role="region" aria-label={`${activeWfObj.name} sequence`}>
          <div className="tech-flow-banner__info">
            <span className="tech-flow-banner__badge">{activeWfObj.icon} {activeWfObj.name}</span>
            <span className="tech-flow-banner__summary">{activeWfObj.summary}</span>
          </div>
          <div className="tech-flow-banner__rail">
            {activeWfObj.tools.map((toolKey, index) => {
              const meta = techMeta(toolKey)
              const isCurrent = activeTech === toolKey
              return (
                <div key={toolKey} className="tech-flow-step-wrap">
                  <button
                    type="button"
                    className={`tech-flow-step${isCurrent ? ' tech-flow-step--active' : ''}`}
                    onClick={() => setActiveTech(toolKey)}
                    title={`Inspect ${meta.title}`}
                  >
                    <span className="tech-flow-step__num">0{index + 1}</span>
                    <TechIcon name={toolKey} size={16} />
                    <span className="tech-flow-step__title">{meta.title}</span>
                  </button>
                  {index < activeWfObj.tools.length - 1 && (
                    <span className="tech-flow-step__arrow" aria-hidden="true">→</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Control Bar: Categories & Instant Search ── */}
      <div className="tech-controls">
        <div className="tech-controls__categories" role="tablist" aria-label="Technology categories">
          {categories.map(cat => {
            const count = cat.id === 'all'
              ? allKeys.length
              : allKeys.filter(k => cat.match?.includes(techCatalog[k]?.cat)).length
            const isSelected = activeCategory === cat.id

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`tech-cat-btn${isSelected ? ' tech-cat-btn--active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setActiveWorkflow(null)
                }}
              >
                {cat.label}
                <span className="tech-cat-btn__count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="tech-controls__search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search tools (e.g. react, sap, claude)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tools"
          />
          {search && (
            <button
              type="button"
              className="tech-controls__clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Interactive Grid of Tech Tiles ── */}
      <div className="tech-grid" role="region" aria-label="Interactive technologies grid">
        {filteredKeys.length === 0 ? (
          <div className="tech-grid__empty">
            <p>No technologies found matching &ldquo;{search}&rdquo;</p>
            <button
              type="button"
              className="tech-grid__reset-btn"
              onClick={() => { setSearch(''); setActiveCategory('all'); setActiveWorkflow(null) }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredKeys.map(key => {
            const tool = techCatalog[key]
            const meta = techMeta(key)
            const isInspected = activeTech === key
            const isWorkflowStep = activeWfObj?.tools.includes(key)
            const isDimmed = activeWfObj && !isWorkflowStep

            const stepIndex = isWorkflowStep ? activeWfObj.tools.indexOf(key) + 1 : null

            return (
              <button
                key={key}
                type="button"
                className={`tech-card${isInspected ? ' tech-card--active' : ''}${isWorkflowStep ? ' tech-card--flow-highlight' : ''}${isDimmed ? ' tech-card--dimmed' : ''}`}
                style={{ '--brand': meta.hex }}
                onClick={() => setActiveTech(key)}
                onMouseEnter={() => setActiveTech(key)}
                aria-label={`Inspect ${meta.title}`}
              >
                {stepIndex && (
                  <span className="tech-card__step-badge" title={`Step 0${stepIndex} of ${activeWfObj.name}`}>
                    0{stepIndex}
                  </span>
                )}
                <div className="tech-card__icon-wrap">
                  <TechIcon name={key} size={24} />
                </div>
                <div className="tech-card__meta">
                  <span className="tech-card__name">{meta.title}</span>
                  <span className="tech-card__cat">{tool.cat}</span>
                </div>
                <span className="tech-card__glow" />
              </button>
            )
          })
        )}
      </div>

      {/* ── Minimalist Tactile Inspector Dock ── */}
      <div className="tech-dock" aria-live="polite">
        <div className="tech-dock__left">
          <div className="tech-dock__badge" style={{ '--brand': currentMeta.hex }}>
            <TechIcon name={activeTech} size={30} />
          </div>
          <div className="tech-dock__info">
            <div className="tech-dock__title-row">
              <h3 className="tech-dock__title">{currentMeta.title}</h3>
              <span className="tech-dock__cat-pill">{currentCatalog.cat}</span>
              <span className="tech-dock__pulse">
                <span className="tech-dock__dot" /> In Production
              </span>
            </div>
            <p className="tech-dock__role">{currentCatalog.role}</p>
          </div>
        </div>

        <div className="tech-dock__right">
          <span className="tech-dock__pairs-label">COUPLED WITH:</span>
          <div className="tech-dock__pairs">
            {currentCatalog.pairs?.map(pairKey => {
              const pMeta = techMeta(pairKey)
              return (
                <button
                  key={pairKey}
                  type="button"
                  className="tech-dock__pair-btn"
                  onClick={() => setActiveTech(pairKey)}
                  title={`Jump focus to ${pMeta.title}`}
                >
                  <TechIcon name={pairKey} size={15} />
                  <span>{pMeta.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
