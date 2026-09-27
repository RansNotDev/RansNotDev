import { useState, useEffect, lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import './App.css'

// Chat widget is not needed for first paint; load it separately
const Chat = lazy(() => import('./components/Chat'))

function getInitialTheme() {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Smooth cross-fade via the View Transitions API where supported
  const toggleTheme = () => {
    const next = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(next)
    else next()
  }

  return (
    <div className="app">
      {/* Custom cursor overlay — mouse users only; no-ops on touch */}
      <Cursor />

      {/* Nav shows on scroll; theme is toggled by clicking the hero photo */}
      <Nav />

      <main>
        <Hero theme={theme} toggleTheme={toggleTheme} />
        <AboutSection />
        <Projects />
        <Certifications />
      </main>
      <Footer />

      {/* AI Chat — bottom right */}
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </div>
  )
}

export default App
