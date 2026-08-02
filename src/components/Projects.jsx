import { useEffect, useRef, useState } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Personal Portfolio',
    tags: ['Web', 'AI', 'Full-Stack'],
    description: 'Responsive portfolio with AI chatbot, multi-provider fallback, dark/light mode. Deployed on Vercel.',
    stack: ['React', 'AI APIs', 'Vercel'],
    status: 'Under Construction',
    github: 'https://github.com/ranyboytemplado',
    demo: 'https://ransnotdev.vercel.app',
  },
  {
    id: 2,
    title: 'Computer Vision Object Detection',
    tags: ['AI', 'Machine Learning'],
    description: 'Object detection experiments using YOLO and OpenCV, leveraging Kiro for AI-assisted development.',
    stack: ['Python', 'YOLO', 'OpenCV'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
  },
  {
    id: 3,
    title: 'Dental Appointment Management System',
    tags: ['Healthcare', 'Scheduling'],
    description: 'Web-based system that replaced manual appointment scheduling for a local dental clinic.',
    stack: ['PHP', 'MySQL', 'JavaScript'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
  },
  {
    id: 4,
    title: 'Real Estate Appointment System',
    tags: ['Property Management'],
    description: 'Online scheduling platform for property viewings with centralized appointment management.',
    stack: ['PHP', 'MySQL'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
  },
  {
    id: 5,
    title: 'Weather Forecast Application',
    tags: ['Web', 'API'],
    description: 'Weather application using a public API with location search and real-time forecasts.',
    stack: ['JavaScript', 'Weather API'],
    status: 'completed',
    github: 'https://github.com/ranyboytemplado',
    demo: null,
  },
]

const statusColor = { completed: '#22c55e', 'in-progress': '#f59e0b', planned: '#6366f1' }

export default function Projects() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects__bg-glow" aria-hidden="true" />

      <div className="projects__container">

        {/* Section header — terminal style */}
        <div className="projects__header">
          <span className="projects__prompt">&gt;</span>
          <h2 className="projects__heading">Recent Projects</h2>
          <span className="projects__line" />
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <article
              className={`projects__card${revealed ? ' projects__card--visible' : ''}`}
              key={project.id}
              style={{ transitionDelay: revealed ? `${i * 120}ms` : '0ms' }}
            >

              {/* Card top bar */}
              <div className="projects__card-bar">
                <div className="projects__card-dots">
                  <span /><span /><span />
                </div>
                <span className="projects__card-index">
                  {String(i + 1).padStart(2, '0')}.js
                </span>
                <span
                  className="projects__card-status"
                  style={{ color: statusColor[project.status] }}
                >
                  ● {project.status}
                </span>
              </div>

              {/* Card body */}
              <div className="projects__card-body">
                <div className="projects__tags">
                  {project.tags.map(tag => (
                    <span className="projects__tag" key={tag}>{tag}</span>
                  ))}
                </div>

                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__desc">{project.description}</p>

                {/* Stack pills */}
                <div className="projects__stack">
                  {project.stack.map(s => (
                    <span className="projects__stack-item" key={s}>{s}</span>
                  ))}
                </div>

                {/* Project links */}
                <div className="projects__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="projects__link" aria-label={`View ${project.title} on GitHub`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="projects__link" aria-label={`View ${project.title} live demo`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
