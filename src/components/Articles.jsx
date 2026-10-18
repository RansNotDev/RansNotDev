import { useEffect, useRef, useState } from 'react'
import { articles, articleCategories } from '../data/articles'
import './Articles.css'

function ArticleBody({ blocks }) {
  return (
    <div className="articles-reader__body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h':
            return <h3 key={i} className="articles-reader__h">{block.text}</h3>
          case 'callout':
            return (
              <blockquote key={i} className="articles-reader__callout">
                {block.text}
              </blockquote>
            )
          case 'list':
            return (
              <ul key={i} className="articles-reader__list">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )
          case 'links':
            return (
              <div key={i} className="articles-reader__links">
                {block.items.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="articles-reader__link-card"
                  >
                    <span className="articles-reader__link-label">{link.label}</span>
                    {link.note && <span className="articles-reader__link-note">{link.note}</span>}
                    <span className="articles-reader__link-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )
          case 'next':
            return <p key={i} className="articles-reader__next">{block.text}</p>
          case 'p':
          default:
            return <p key={i} className="articles-reader__p">{block.text}</p>
        }
      })}
    </div>
  )
}

export default function Articles() {
  const [revealed, setRevealed] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeArticle, setActiveArticle] = useState(null)
  const sectionRef = useRef(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Reader modal: Escape to close, lock scroll, restore focus
  useEffect(() => {
    if (!activeArticle) return undefined
    const handleKey = (e) => { if (e.key === 'Escape') setActiveArticle(null) }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      triggerRef.current?.focus()
    }
  }, [activeArticle])

  function openArticle(article, e) {
    if (e) triggerRef.current = e.currentTarget
    setActiveArticle(article)
  }

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const featured = articles.find(a => a.featured)
  const showFeatured = activeCategory === 'all' && featured
  const gridArticles = showFeatured ? filtered.filter(a => !a.featured) : filtered

  return (
    <section className={`articles${revealed ? ' articles--revealed' : ''}`} id="articles" ref={sectionRef}>
      <div className="articles__container">

        <div className="articles__header">
          <span className="articles__prompt">&gt;</span>
          <h2 className="articles__heading">Writing & Career Notes</h2>
          <span className="articles__line" />
          <span className="articles__count">{articles.length}-part series</span>
        </div>

        <p className="articles__lead">
          A practical, non-technical series for IT/CS students and junior developers—on the
          mindset, communication, and operational discipline that turn academic work into
          enterprise engineering.
        </p>

        {/* Filter tabs */}
        <div className="articles__filters" role="tablist" aria-label="Article categories">
          {articleCategories.map(cat => {
            const count = cat.id === 'all'
              ? articles.length
              : articles.filter(a => a.category === cat.id).length
            return (
              <button
                type="button"
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`articles__filter-tab${activeCategory === cat.id ? ' articles__filter-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label} <span className="articles__tab-count">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Featured article */}
        {showFeatured && (
          <article
            className="articles__featured"
            style={{ transitionDelay: revealed ? '80ms' : '0ms' }}
            onClick={(e) => openArticle(featured, e)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openArticle(featured, e) } }}
            aria-label={`Read: ${featured.title}`}
          >
            <div className="articles__featured-top">
              <span className="articles__featured-badge">★ Start here · Part {featured.number}</span>
              <span className="articles__meta-pill">{featured.readTime}</span>
            </div>
            <span className="articles__cat-tag">{featured.categoryLabel}</span>
            <h3 className="articles__featured-title">{featured.title}</h3>
            <p className="articles__featured-excerpt">{featured.excerpt}</p>
            <div className="articles__takeaway">
              <span className="articles__takeaway-label">KEY TAKEAWAY</span>
              <p>{featured.takeaway}</p>
            </div>
            <span className="articles__read-link">Read article <span aria-hidden="true">→</span></span>
          </article>
        )}

        {/* Grid */}
        <div className="articles__grid">
          {gridArticles.map((article, i) => (
            <article
              className="articles__card"
              key={article.id}
              style={{ transitionDelay: revealed ? `${120 + i * 50}ms` : '0ms' }}
              onClick={(e) => openArticle(article, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openArticle(article, e) } }}
              aria-label={`Read: ${article.title}`}
            >
              <div className="articles__card-top">
                <span className="articles__card-number">Part {article.number}</span>
                <span className="articles__meta-pill">{article.readTime}</span>
              </div>
              <span className="articles__cat-tag">{article.categoryLabel}</span>
              <h3 className="articles__card-title">{article.title}</h3>
              <p className="articles__card-excerpt">{article.excerpt}</p>
              <span className="articles__read-link">Read article <span aria-hidden="true">→</span></span>
            </article>
          ))}
        </div>
      </div>

      {/* Reader modal */}
      {activeArticle && (
        <div className="articles-reader" onClick={() => setActiveArticle(null)}>
          <div
            className="articles-reader__container"
            role="dialog"
            aria-modal="true"
            aria-label={activeArticle.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="articles-reader__bar">
              <div className="articles-reader__dots" aria-hidden="true">
                <span /><span /><span />
              </div>
              <span className="articles-reader__bar-title">Part {activeArticle.number} · {activeArticle.readTime}</span>
              <button
                ref={closeRef}
                className="articles-reader__close"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            <div className="articles-reader__scroll">
              <span className="articles-reader__cat">{activeArticle.categoryLabel}</span>
              <h2 className="articles-reader__title">{activeArticle.title}</h2>
              <p className="articles-reader__byline">
                By Rany Boy Templado · <em>{activeArticle.readTime}</em>
              </p>

              <blockquote className="articles-reader__takeaway">
                <strong>Key Takeaway:</strong> {activeArticle.takeaway}
              </blockquote>

              <ArticleBody blocks={activeArticle.body} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
