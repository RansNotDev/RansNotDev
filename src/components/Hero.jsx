import Icon from './Icon'
import './Hero.css'

const focusAreas = [
  { label: 'SAP Data Migration', detail: 'Mapping, validation, cleansing', icon: 'flow' },
  { label: 'Web Applications', detail: 'Accessible, responsive interfaces', icon: 'code' },
  { label: 'Data Quality', detail: 'Reliable workflows and checks', icon: 'check' },
]

export default function Hero({ theme = 'dark', toggleTheme }) {
  return (
    <section className="hero" id="hero">
      <div className="hero__topbar">
        <a href="#hero" className="hero__wordmark" aria-label="Rany Boy Templado, home">Rany Templado<span>.</span></a>
        <button className="hero__theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <Icon name="spark" size={18} /> : <Icon name="clock" size={18} />}
        </button>
      </div>

      <div className="hero__layout">
        <div className="hero__intro">
          <p className="hero__eyebrow"><span /> Based in Cavite, Philippines</p>
          <h1 className="hero__title">Software built with<br/><em>care and context.</em></h1>
          <p className="hero__role">Associate Software Engineer specializing in SAP Data Migration.</p>
          <p className="hero__summary">I turn operational problems into dependable software—combining enterprise data work, practical web development, and clear communication.</p>
          <div className="hero__actions">
            <a href="#projects" className="hero__action hero__action--primary">See selected work <span aria-hidden="true">↘</span></a>
            <a href="/Rany_Boy_Templado_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hero__action">View résumé</a>
          </div>
        </div>

        <aside className="hero__portrait-card" aria-label="Profile summary">
          <div className="hero__portrait-wrap">
            <img src={theme === 'dark' ? '/profile_darkmode.png' : '/profile_lightmode.png'} alt="Rany Boy Templado" className="hero__portrait" />
            <span className="hero__availability"><span /> Open to opportunities</span>
          </div>
          <div className="hero__portrait-copy">
            <p className="hero__portrait-kicker">Current focus</p>
            <h2>Reliable data, useful interfaces, fewer surprises.</h2>
            <p>BSIT graduate, freelance web developer, and enterprise software practitioner.</p>
          </div>
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
