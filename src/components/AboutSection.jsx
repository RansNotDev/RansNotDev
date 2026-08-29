import Icon from './Icon'
import './AboutSection.css'

const techCategories = [
  {
    id: 'frontend', title: 'Frontend', icon: 'code', note: 'Interfaces and web foundations',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
  },
  {
    id: 'backend', title: 'Backend & Data', icon: 'database', note: 'Applications, APIs, and storage',
    techs: ['PHP', 'Python', 'Java', 'C++', 'MySQL', 'REST APIs'],
  },
  {
    id: 'enterprise', title: 'Enterprise Systems', icon: 'flow', note: 'Reliable migration workflows',
    techs: ['SAP', 'Data Migration', 'Data Validation', 'Data Cleansing', 'ETL', 'ABAP Fundamentals'],
  },
  {
    id: 'workflow', title: 'Development Workflow', icon: 'tool', note: 'Tools used to plan, build, and ship',
    techs: ['Git', 'GitHub', 'VS Code', 'Vite', 'DataCamp', 'Kiro'],
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
  return (
    <section className="about" id="about">
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
            {experiences.map((item) => (
              <article className="about__timeline-item" key={`${item.title}-${item.period}`}>
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
            <h2 id="stack-title">Technology I use to move work forward.</h2>
          </div>
          <div className="about__stack-grid">
            {techCategories.map((category) => (
              <article className="about__stack-card" key={category.id}>
                <div className="about__stack-card-head">
                  <span className="about__stack-icon"><Icon name={category.icon} size={28} /></span>
                  <div><h3>{category.title}</h3><p>{category.note}</p></div>
                </div>
                <ul className="about__tech-list">
                  {category.techs.map((tech) => <li key={tech}><Icon name="check" size={15} />{tech}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
