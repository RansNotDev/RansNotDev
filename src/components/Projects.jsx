import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Advanced Appointment System',
    tags: ['Healthcare', 'Scheduling'],
    description: 'Dental clinic system with automated scheduling, patient records, and reminders.',
    stack: ['PHP', 'MySQL', 'JavaScript'],
    status: 'completed',
  },
  {
    id: 2,
    title: 'Real Estate Appointment System',
    tags: ['Property Management'],
    description: 'Listings, client management, and transaction tracking in a single dashboard.',
    stack: ['PHP', 'MySQL', 'CSS3'],
    status: 'completed',
  },
  {
    id: 3,
    title: 'School Club Event System',
    tags: ['Education', 'Events'],
    description: 'Event scheduling, member registration, and notifications for student organizations.',
    stack: ['JavaScript', 'PHP', 'MySQL'],
    status: 'completed',
  },
  {
    id: 4,
    title: 'Weather App',
    tags: ['Web', 'API'],
    description: 'Real-time weather information with automatic location detection.',
    stack: ['JavaScript', 'HTML5', 'CSS3'],
    status: 'completed',
  },
]

const statusColor = { completed: '#22c55e', 'in-progress': '#f59e0b', planned: '#6366f1' }

export default function Projects() {
  return (
    <section className="projects" id="projects">
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
            <article className="projects__card" key={project.id}>

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
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
