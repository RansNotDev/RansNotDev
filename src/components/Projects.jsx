import { useEffect, useRef, useState } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'SAP S/4HANA Migration & Reconciliation Workbench',
    tags: ['Enterprise', 'SAP ERP', 'Data Migration'],
    description: 'Enterprise data migration workbench facilitating legacy ERP extraction, field mapping, format harmonization, pre-load validation simulation, and audit-ready row-level reconciliation.',
    stack: ['SAP S/4HANA', 'LTMC / LTMOM', 'Data Cleansing', 'Validation Rules', 'SQL'],
    status: 'completed',
    demo: null,
    featured: true,
    image: '/projects/sap-migration.png',
    impact: '99.8% validation accuracy · Zero data loss · Automated field mapping',
  },
  {
    id: 2,
    title: 'PhysiCapital — Physical Asset & Capital Portal',
    tags: ['FinTech', 'Full-Stack', 'React'],
    description: 'Investment and capital management web platform providing physical asset valuation, interactive portfolio telemetry, automated reporting, and modern dark-mode responsive dashboards.',
    stack: ['React', 'Node.js', 'Vite', 'CSS3', 'REST API'],
    status: 'completed',
    demo: null,
    image: '/projects/physicapital.png',
    impact: 'Interactive asset valuation · Real-time metrics · High-responsiveness UI',
  },
  {
    id: 3,
    title: 'High-Availability Multi-Provider AI Gateway',
    tags: ['AI Proxy', 'Serverless', 'Cloud'],
    description: 'Serverless AI proxy routing chat requests across an ordered 9-provider fallback chain (Gemini, Groq, Mistral, HuggingFace, etc.) with automatic cooldowns, per-provider timeouts, and server-side secret isolation.',
    stack: ['Vercel Serverless', 'Node.js', 'Edge Routing', 'Resilience Pattern'],
    status: 'completed',
    demo: 'https://ransnotdev.vercel.app',
    image: '/projects/ai-gateway.png',
    impact: '9-provider failover · Zero exposed keys · Sub-200ms intelligent routing',
  },
  {
    id: 4,
    title: 'DentalCare Clinical & Appointment Workflow Portal',
    tags: ['Healthcare', 'Full-Stack', 'Relational DB'],
    description: 'Role-based dental clinic management system streamlining appointment booking, real-time doctor schedule conflict prevention, automated patient reminders, and HIPAA-conscious records.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    status: 'completed',
    demo: null,
    image: '/projects/dental-clinic.png',
    impact: 'Conflict-free scheduling · Normalized records · Automated reminders',
  },
  {
    id: 5,
    title: 'Urban & Co. Multi-Role Real Estate Property Platform',
    tags: ['Property Platform', 'Multi-Tenant', 'Capstone'],
    description: 'Multi-role property platform synchronizing client viewing reservations, agent listing curation, and administrative transaction analytics with role-based access control.',
    stack: ['PHP', 'MySQL', 'Bootstrap', 'AJAX'],
    status: 'completed',
    demo: null,
    image: '/projects/real-estate.png',
    impact: '3 synchronized roles (Client / Agent / Admin) · Real-time schedule sync',
  },
  {
    id: 6,
    title: 'Computer Vision Live Object Detection & Tracking',
    tags: ['AI', 'Computer Vision', 'Deep Learning'],
    description: 'Real-time video processing pipeline utilizing YOLO deep learning models and OpenCV for multi-class object detection, bounding-box tracking, and visual telemetry data streams.',
    stack: ['Python', 'YOLO', 'OpenCV', 'NumPy'],
    status: 'completed',
    demo: null,
    image: null,
    isVisionHud: true,
    impact: 'Real-time multi-class detection · Visual bounding telemetry · Reusable pipeline',
  },
]

const statusLabel = { completed: 'Completed', 'in-progress': 'In progress', planned: 'Planned' }

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function DemoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>
  )
}

function ProjectLinks({ project, onPreview }) {
  return (
    <div className="projects__links">
      {project.image && (
        <button
          type="button"
          className="projects__link projects__link--preview"
          onClick={() => onPreview(project)}
          aria-label={`View full preview of ${project.title}`}
        >
          <ExpandIcon />
          Inspect UI
        </button>
      )}

      {/* Private repository indicator with hover protection tooltip */}
      <div className="projects__private-wrapper">
        <button
          type="button"
          className="projects__link projects__link--private"
          disabled
          aria-disabled="true"
          aria-label={`${project.title} source code is private and protected`}
        >
          <LockIcon />
          <span>Private Repository</span>
        </button>
        <div className="projects__private-tooltip" role="tooltip">
          <span className="projects__private-tooltip-badge">🔒 Restricted Repository</span>
          <span>This repository is private under NDA & client confidentiality and cannot be opened.</span>
        </div>
      </div>

      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="projects__link projects__link--primary"
          aria-label={`View ${project.title} live demo`}
        >
          <DemoIcon />
          Live demo
        </a>
      )}
    </div>
  )
}

function VisionHudVisual() {
  return (
    <div className="projects__vision-hud" aria-hidden="true">
      <div className="projects__vision-overlay" />
      <div className="projects__vision-header">
        <span className="projects__vision-indicator">REC ● 60 FPS</span>
        <span className="projects__vision-model">YOLOv8-Darknet</span>
      </div>
      <div className="projects__vision-frame">
        <div className="projects__vision-box box--car" style={{ top: '22%', left: '18%', width: '38%', height: '46%' }}>
          <span className="projects__vision-label">car 98.4%</span>
        </div>
        <div className="projects__vision-box box--person" style={{ top: '35%', left: '68%', width: '22%', height: '52%' }}>
          <span className="projects__vision-label">person 96.1%</span>
        </div>
      </div>
      <div className="projects__vision-footer">
        <span>Inference: 14.2ms</span>
        <span>Objects: 2</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const [revealed, setRevealed] = useState(false)
  const [activeImage, setActiveImage] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveImage(null)
    }
    if (activeImage) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeImage])

  const featured = projects.find(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section className={`projects${revealed ? ' projects--revealed' : ''}`} id="projects" ref={sectionRef}>
      <div className="projects__bg-glow" aria-hidden="true" />

      <div className="projects__container">

        <div className="projects__header">
          <span className="projects__prompt">&gt;</span>
          <h2 className="projects__heading">Featured Systems & Projects</h2>
          <span className="projects__line" />
          <span className="projects__count">{projects.length} verified projects</span>
        </div>

        {/* Featured project — Enterprise SAP S/4HANA Workbench */}
        {featured && (
          <article className="projects__featured" style={{ transitionDelay: revealed ? '60ms' : '0ms' }}>
            <div
              className="projects__featured-visual"
              onClick={() => featured.image && setActiveImage(featured)}
              title="Click to expand high-resolution UI preview"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveImage(featured) }}
            >
              <img
                src={featured.image}
                alt={`${featured.title} UI preview`}
                className="projects__featured-img"
                loading="lazy"
              />
              <div className="projects__visual-overlay">
                <span className="projects__visual-zoom"><ExpandIcon /> Click to enlarge</span>
              </div>
            </div>
            <div className="projects__featured-body">
              <div className="projects__card-bar">
                <span className="projects__badge projects__badge--featured">★ Primary Enterprise Project</span>
                <span className={`projects__status projects__status--${featured.status}`}>
                  <span aria-hidden="true">●</span> {statusLabel[featured.status]}
                </span>
              </div>
              <h3 className="projects__featured-title">{featured.title}</h3>
              <p className="projects__desc">{featured.description}</p>
              {featured.impact && (
                <p className="projects__impact">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  {featured.impact}
                </p>
              )}
              <div className="projects__stack">
                {featured.stack.map(s => <span className="projects__stack-item" key={s}>{s}</span>)}
              </div>
              <ProjectLinks project={featured} onPreview={setActiveImage} />
            </div>
          </article>
        )}

        {/* Project grid with high-resolution visual previews */}
        <div className="projects__grid">
          {rest.map((project, i) => (
            <article
              className="projects__card"
              key={project.id}
              style={{ transitionDelay: revealed ? `${140 + i * 80}ms` : '0ms' }}
            >
              <div
                className="projects__card-visual"
                onClick={() => project.image && setActiveImage(project)}
                title={project.image ? 'Click to expand high-resolution UI preview' : undefined}
                role={project.image ? 'button' : undefined}
                tabIndex={project.image ? 0 : undefined}
                onKeyDown={(e) => {
                  if (project.image && (e.key === 'Enter' || e.key === ' ')) setActiveImage(project)
                }}
              >
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="projects__card-img"
                      loading="lazy"
                    />
                    <div className="projects__visual-overlay">
                      <span className="projects__visual-zoom"><ExpandIcon /> Enlarge UI</span>
                    </div>
                  </>
                ) : project.isVisionHud ? (
                  <VisionHudVisual />
                ) : null}
              </div>

              <div className="projects__card-body">
                <div className="projects__card-bar">
                  <div className="projects__tags">
                    {project.tags.slice(0, 2).map(tag => (
                      <span className="projects__tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className={`projects__status projects__status--${project.status}`}>
                    <span aria-hidden="true">●</span> {statusLabel[project.status]}
                  </span>
                </div>

                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__desc">{project.description}</p>

                {project.impact && (
                  <p className="projects__impact">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                    {project.impact}
                  </p>
                )}

                <div className="projects__stack">
                  {project.stack.map(s => <span className="projects__stack-item" key={s}>{s}</span>)}
                </div>

                <ProjectLinks project={project} onPreview={setActiveImage} />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* High-Resolution Screenshot Modal Lightbox */}
      {activeImage && (
        <div
          className="projects__lightbox"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
        >
          <div className="projects__lightbox-inner" onClick={e => e.stopPropagation()}>
            <header className="projects__lightbox-header">
              <div>
                <h4>{activeImage.title}</h4>
                <p>{activeImage.impact}</p>
              </div>
              <button
                type="button"
                className="projects__lightbox-close"
                onClick={() => setActiveImage(null)}
                aria-label="Close preview"
              >
                ✕
              </button>
            </header>
            <div className="projects__lightbox-media">
              <img src={activeImage.image} alt={activeImage.title} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
