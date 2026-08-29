import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import './Articles.css'

const articles = [
  {
    id: 1,
    title: 'Why I Left BPO to Become a Software Engineer',
    excerpt: 'After months of answering calls and entering data, I made the leap back to tech. Here\'s the honest story of how I navigated career uncertainty, imposter syndrome, and finally landed where I belonged.',
    date: 'Jun 2026',
    readTime: '6 min read',
    tags: ['Career', 'Personal'],
    icon: 'briefcase',
  },
  {
    id: 2,
    title: 'Building an AI Chatbot with Multi-Provider Fallback',
    excerpt: 'How I built a resilient AI chatbot that gracefully falls back across 8+ providers when one goes down. Lessons on rate limits, streaming responses, and keeping costs at zero.',
    date: 'May 2026',
    readTime: '8 min read',
    tags: ['AI', 'Web Dev'],
    icon: 'spark',
  },
  {
    id: 3,
    title: 'From PHP to React: My Frontend Evolution',
    excerpt: 'I started with raw PHP and MySQL — no frameworks, no package managers, just vibes. Here\'s how I evolved from server-rendered pages to component-driven React apps.',
    date: 'Apr 2026',
    readTime: '5 min read',
    tags: ['Web Dev', 'Learning'],
    icon: 'code',
  },
  {
    id: 4,
    title: 'What SAP Taught Me About Enterprise Software',
    excerpt: 'Working with SAP systems changed how I think about scale. Data migration, validation pipelines, and why careful change management matters in enterprise software.',
    date: 'Jun 2026',
    readTime: '7 min read',
    tags: ['Enterprise', 'SAP'],
    icon: 'flow',
  },
  {
    id: 5,
    title: 'Self-Taught Developer Playbook: What Actually Works',
    excerpt: 'Forget the 100-day challenges and tutorial hell. Here\'s the realistic approach that took me from zero to employed — including the mistakes that wasted months.',
    date: 'Mar 2026',
    readTime: '9 min read',
    tags: ['Career', 'Learning'],
    icon: 'article',
  },
  {
    id: 6,
    title: 'Dark Mode Done Right: CSS Variables & Design Tokens',
    excerpt: 'A deep dive into building a proper theming system with CSS custom properties. No libraries needed — just clean, maintainable code that scales.',
    date: 'Feb 2026',
    readTime: '4 min read',
    tags: ['CSS', 'Web Dev'],
    icon: 'layers',
  },
]

export default function Articles() {
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
    <section className="articles" id="articles" ref={sectionRef}>
      <div className="articles__container">

        {/* Section header */}
        <div className="articles__header">
          <span className="articles__prompt">&gt;</span>
          <h2 className="articles__heading">Articles & Insights</h2>
          <span className="articles__line" />
        </div>

        <p className="articles__subtitle">
          Thoughts on career transitions, building software, and lessons learned along the way.
        </p>

        {/* Articles grid */}
        <div className="articles__grid">
          {articles.map((article, i) => (
            <article
              className={`articles__card${revealed ? ' articles__card--visible' : ''}`}
              key={article.id}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
            >
              <div className="articles__card-top">
                <span className="articles__card-icon"><Icon name={article.icon} size={23} /></span>
                <div className="articles__card-meta">
                  <span className="articles__card-date">{article.date}</span>
                  <span className="articles__card-dot">·</span>
                  <span className="articles__card-time">{article.readTime}</span>
                </div>
              </div>

              <h3 className="articles__card-title">{article.title}</h3>
              <p className="articles__card-excerpt">{article.excerpt}</p>

              <div className="articles__card-footer">
                <div className="articles__card-tags">
                  {article.tags.map(tag => (
                    <span className="articles__card-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="articles__card-read">Read →</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
