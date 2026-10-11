import Icon from './Icon'
import { socialLinks } from '../data/socials'
import InteractivePortrait from './InteractivePortrait'
import './Hero.css'

export default function Hero({ theme = 'dark', toggleTheme }) {
  const isDark = theme === 'dark'
  const nextLabel = `Switch to ${isDark ? 'light' : 'dark'} mode`

  return (
    <section className="hero" id="hero">
      <div className="hero__layout">
        <div className="hero__intro">
          <div className="hero__status">
            <span className="hero__status-dot" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>

          <h1 className="hero__title">
            Hi, I'm <em>Rany</em>.
          </h1>

          <p className="hero__role">
            Associate Software Engineer
          </p>

          <p className="hero__bio">
            Specializing in SAP data migration, automated ETL pipelines, and resilient full-stack web applications.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="hero__action hero__action--primary">
              View Work <span aria-hidden="true">↘</span>
            </a>
            <a
              href="/Rany_Boy_Templado_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__action hero__action--resume"
            >
              Résumé <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero__socials-wrap">
            <ul className="hero__socials" aria-label="Social profiles">
              {socialLinks.map(s => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Rany Templado on ${s.name} (opens in new tab)`}
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:ranyboytemplado@gmail.com" aria-label="Email Rany Templado">
                  <Icon name="message" size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <aside className="hero__visual" aria-label="Profile">
          <InteractivePortrait
            isDark={isDark}
            toggleTheme={toggleTheme}
            nextLabel={nextLabel}
          />
        </aside>
      </div>
    </section>
  )
}
