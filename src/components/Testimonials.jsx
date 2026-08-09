import { useEffect, useRef, useState } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    quote: "Rany delivered our clinic's scheduling system ahead of deadline. The interface was clean, the admin panel was intuitive, and he communicated clearly throughout the project.",
    author: 'Dr. M. Santos',
    role: 'Dental Clinic Owner',
    type: 'client',
  },
  {
    id: 2,
    quote: "One of the most adaptable new hires I've worked with. Picked up SAP concepts quickly and contributed to data migration scripts within his first month.",
    author: 'Team Lead',
    role: 'Accenture SAP Team',
    type: 'colleague',
  },
  {
    id: 3,
    quote: "Built our property viewing platform from scratch. Handled three user roles, real-time scheduling, and even added email notifications we didn't ask for.",
    author: 'J. Reyes',
    role: 'Real Estate Agent',
    type: 'client',
  },
]

const highlights = [
  { label: 'Lighthouse Performance', value: '95+', icon: '⚡' },
  { label: 'Projects Delivered', value: '5+', icon: '📦' },
  { label: 'AI Providers Integrated', value: '8', icon: '🤖' },
  { label: 'Active Certifications', value: '8', icon: '🏅' },
]

export default function Testimonials() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <div className="testimonials__container">

        {/* Header */}
        <div className="testimonials__header">
          <span className="testimonials__prompt">&gt;</span>
          <h2 className="testimonials__heading">What People Say</h2>
          <span className="testimonials__line" />
        </div>

        {/* Highlights row */}
        <div className={`testimonials__highlights${revealed ? ' testimonials__highlights--visible' : ''}`}>
          {highlights.map((h) => (
            <div className="testimonials__highlight" key={h.label}>
              <span className="testimonials__highlight-icon">{h.icon}</span>
              <span className="testimonials__highlight-value">{h.value}</span>
              <span className="testimonials__highlight-label">{h.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <blockquote
              className={`testimonials__card${revealed ? ' testimonials__card--visible' : ''}`}
              key={t.id}
              style={{ transitionDelay: revealed ? `${i * 120}ms` : '0ms' }}
            >
              <div className="testimonials__quote-mark" aria-hidden="true">"</div>
              <p className="testimonials__quote">{t.quote}</p>
              <footer className="testimonials__footer">
                <div className="testimonials__avatar">
                  {t.author.charAt(0)}
                </div>
                <div className="testimonials__meta">
                  <cite className="testimonials__author">{t.author}</cite>
                  <span className="testimonials__role">{t.role}</span>
                </div>
                <span className="testimonials__type">{t.type}</span>
              </footer>
            </blockquote>
          ))}
        </div>

      </div>
    </section>
  )
}
