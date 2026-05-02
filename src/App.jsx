import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Loader from './components/Loader'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Chat from './components/Chat'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div className="app" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}>
        {/* Nav shows on scroll — contains theme toggle */}
        <Nav theme={theme} toggleTheme={toggleTheme} />

        <main>
          <Hero theme={theme} toggleTheme={toggleTheme} />
          <AboutSection />
          <Projects />
        </main>
        <Footer />

        {/* AI Chat — bottom right */}
        <Chat />
      </div>
    </>
  )
}

export default App
