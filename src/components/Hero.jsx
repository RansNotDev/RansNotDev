import { useRef } from 'react'
import Icon from './Icon'
import { socialLinks } from '../data/socials'
import './Hero.css'

const focusAreas = [
  { label: 'Consultant Migration Architect', detail: 'Investigation, Mapping, validation, cleansing', icon: 'flow' },
  { label: 'Web Applications', detail: 'Accessible, responsive interfaces', icon: 'code' },
  { label: 'Data Quality', detail: 'Reliable workflows and checks', icon: 'check' },
]

const MAX_TILT = 12 // degrees

export default function Hero({ theme = 'dark', toggleTheme }) {
  const isDark = theme === 'dark'
  const nextLabel = `Switch to ${isDark ? 'light' : 'dark'} mode`
  const stageRef = useRef(null)

  // Mouse-driven 3D tilt on the portrait (mouse users only; touch is unaffected).
  function handleStageMove(e) {
    const el = stageRef.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width   // 0..1
    const py = (e.clientY - rect.top) / rect.height   // 0..1
    el.style.setProperty('--ry', `${(px - 0.5) * 2 * MAX_TILT}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * 2 * MAX_TILT}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
    el.style.setProperty('--active', '1')
  }

  function handleStageLeave() {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--active', '0')
  }

  return (
    <section className="hero" id="hero">
      <div className="hero__topbar">
        <a href="#hero" className="hero__wordmark" aria-label="RansnotDEV, home">RansnotDEV<span>.</span></a>
      </div>

      <div className="hero__layout">
        <div className="hero__intro">
          <p className="hero__tagline">
            Investigate <span aria-hidden="true">•</span> BUILD <span aria-hidden="true">•</span> Migrate  <span aria-hidden="true">•</span>
          </p>
          <h1 className="hero__title">Hi, I'm<br/><em>Rany Templado</em></h1>
          <p className="hero__role">I'm passionate about researching, building systems, and learning new technology.</p>
          <p className="hero__summary">As an Associate Software Engineer, Im a Consultant Migration Architect and also i build practical web apps turning real-world problems into software business can rely on.</p>
          <div className="hero__actions">
            <a href="#projects" className="hero__action hero__action--primary">View my work <span aria-hidden="true">↘</span></a>
          </div>
        </div>

        <aside className="hero__visual" aria-label="Profile">
          <div className="hero__practice-card">
            <span className="hero__practice-label">Primary practice</span>
            <span className="hero__practice-role">Associate Software Engineer</span>
          </div>

          <div
            className="hero__stage"
            ref={stageRef}
            onMouseMove={handleStageMove}
            onMouseLeave={handleStageLeave}
          >
            <button
              type="button"
              className="hero__photo-toggle"
              onClick={toggleTheme}
              aria-label={nextLabel}
              aria-describedby="hero-theme-bubble"
            >
              <img
                src={isDark ? '/profile_darkmode.png' : '/profile_lightmode.png'}
                alt="Portrait of Rany Boy Templado, Associate Software Engineer"
                width="420"
                height="520"
                fetchpriority="high"
                className="hero__portrait"
              />
              <span id="hero-theme-bubble" className="hero__bubble" role="tooltip">
                {isDark ? 'Wanna go light?' : 'Back to the dark side?'}
              </span>
              <span className="hero__tap-hint" aria-hidden="true">Tap me</span>
            </button>
          </div>

          <p className="hero__availability"><span aria-hidden="true" /> Open to opportunities</p>

          <ul className="hero__socials" aria-label="Social profiles">
            {socialLinks.map(s => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Rany Templado on ${s.name} (opens in new tab)`}>
                  <Icon name={s.icon} size={19} />
                </a>
              </li>
            ))}
            <li>
              <a href="mailto:ranyboytemplado@gmail.com" aria-label="Email Rany Templado">
                <Icon name="message" size={19} />
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <div className="hero__focus" aria-label="Areas of focus">
        {focusAreas.map(item => (
          <a href={item.label === 'Web Applications' ? '#projects' : '#about'} className="hero__focus-item" key={item.label}>
            <Icon name={item.icon} size={22} />
            <span><strong>{item.label}</strong><small>{item.detail}</small></span>
            <span className="hero__focus-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
