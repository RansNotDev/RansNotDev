import { useEffect, useRef, useState } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Personal Portfolio with AI Chatbot',
    tags: ['Web', 'AI', 'Full-Stack'],
    description: 'Portfolio with a focused assistant, theme support, responsive navigation, and server-side AI routing designed for graceful fallback.',
    stack: ['React', 'Vite', 'Vercel'],
    status: 'in-progress',
    github: 'https://github.com/ranyboytemplado',
    demo: 'https://ransnotdev.vercel.app',
    featured: true,
    impact: '9-provider AI fallback · Server-side keys · Accessible themes',
  },
  {
    id: 2,
    title: 'Computer Vision Object Detection',
    tags: ['AI', 'Machine Learning'],
    description: 'Object detection workflow using YOLO and OpenCV with video input, bounding-box visualization, and class labeling.',
    stack: ['Python', 'YOLO', 'OpenCV', 'NumPy'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
    impact: 'Video detection · Visual labels · Reusable pipeline',
  },
  {
    id: 3,
    title: 'Dental Clinic Management System',
    tags: ['Healthcare', 'Full-Stack'],
    description: 'Appointment workflow for a dental clinic, covering patient records, booking, reminders, and administrative reporting.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
    impact: 'Patient records · Scheduling · Administration',
  },
  {
    id: 4,
    title: 'Real Estate Property Platform',
    tags: ['Property', 'Full-Stack'],
    description: 'Multi-role platform for property viewings with agent dashboards, client scheduling, and property listing management. Built as capstone project.',
    stack: ['PHP', 'MySQL', 'Bootstrap', 'AJAX'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
    impact: '3 user roles · Agent + Client + Admin',
  },
  {
    id: 5,
    title: 'Weather Forecast Dashboard',
    tags: ['Web', 'API Integration'],
    description: 'Interactive weather dashboard with geolocation, 7-day forecasts, hourly breakdowns, and animated weather conditions using OpenWeather API.',
    stack: ['JavaScript', 'OpenWeather API', 'CSS3'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
    impact: '7-day forecast · Geolocation · Responsive',
  },
]

// True when the URL points at a specific repository, not just the GitHub profile.
const isRepoLink = url => /github\.com\/[^/]+\/[^/]+/.test(url || '')

const statusLabel = { completed: 'Completed', 'in-progress': 'In progress', planned: 'Planned' }

// Two initials from the title for the visual monogram
function initials(title) {
  return title.replace(/[^a-zA-Z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
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

function ProjectLinks({ project }) {
  return (
    <div className="projects__links">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="projects__link"
          aria-label={isRepoLink(project.github) ? `View ${project.title} source on GitHub (opens in new tab)` : 'View Rany Templado on GitHub (opens in new tab)'}
        >
          <GithubIcon />
          {isRepoLink(project.github) ? 'Code' : 'GitHub'}
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="projects__link projects__link--primary"
          aria-label={`View ${project.title} live demo (opens in new tab)`}
        >
          <DemoIcon />
          Live demo
        </a>
      )}
    </div>
  )
}

export default function Projects() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const featured = projects.find(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section className={`projects${revealed ? ' projects--revealed' : ''}`} id="projects" ref={sectionRef}>
      <div className="projects__bg-glow" aria-hidden="true" />

      <div className="projects__container">

        <div className="projects__header">
          <span className="projects__prompt">&gt;</span>
          <h2 className="projects__heading">Selected Work</h2>
          <span className="projects__line" />
          <span className="projects__count">{projects.length} projects</span>
        </div>

        {/* Featured project — large hero card */}
        {featured && (
          <article className="projects__featured" style={{ transitionDelay: revealed ? '60ms' : '0ms' }}>
            <div className="projects__featured-visual" aria-hidden="true">
              <span className="projects__featured-mono">{initials(featured.title)}</span>
              <div className="projects__featured-grid-lines" />
            </div>
            <div className="projects__featured-body">
              <div className="projects__card-bar">
                <span className="projects__badge projects__badge--featured">★ Featured</span>
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
              <ProjectLinks project={featured} />
            </div>
          </article>
        )}

        {/* Rest — clean card grid */}
        <div className="projects__grid">
          {rest.map((project, i) => (
            <article
              className="projects__card"
              key={project.id}
              style={{ transitionDelay: revealed ? `${140 + i * 90}ms` : '0ms' }}
            >
              <div className="projects__card-visual" aria-hidden="true">
                <span className="projects__card-mono">{initials(project.title)}</span>
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

                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
