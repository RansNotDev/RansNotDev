import { useEffect, useRef, useState } from 'react'

const DIRECTIONS = [
  'right',
  'down-right',
  'down',
  'down-left',
  'left',
  'up-left',
  'up',
  'up-right',
]

export default function InteractivePortrait({ isDark, toggleTheme, nextLabel }) {
  const [direction, setDirection] = useState('center')
  const photoRef = useRef(null)
  const loadedPortraits = useRef(new Set())
  const frameRef = useRef(0)
  const mousePosRef = useRef(null)

  // 1. Preload all 9 gaze portraits in background on mount
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const allDirs = ['center', ...DIRECTIONS]
    allDirs.forEach(dir => {
      const img = new Image()
      img.src = `/profile-gaze/${dir}.webp`
      if (img.complete) {
        loadedPortraits.current.add(dir)
      } else {
        img.onload = () => {
          loadedPortraits.current.add(dir)
        }
      }
    })
  }, [])

  // 2. Global gaze tracking (flat card, eyes and head follow cursor in dark mode)
  useEffect(() => {
    const photo = photoRef.current
    if (!photo) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function update() {
      frameRef.current = 0
      const pos = mousePosRef.current

      // Reset state if no pointer, reduced motion, or in light mode
      if (!pos || prefersReduced || !isDark) {
        setDirection('center')
        return
      }

      const rect = photo.getBoundingClientRect()
      
      // Eye level in Rany's bust portrait is at approx 35% from the top
      const eyeX = rect.left + rect.width * 0.5
      const eyeY = rect.top + rect.height * 0.35
      const dx = pos.x - eyeX
      const dy = pos.y - eyeY
      const dist = Math.hypot(dx, dy)

      // Deadzone: if mouse is hovering directly over his face, look straight ahead
      if (dist < rect.width * 0.16) {
        setDirection('center')
      } else {
        // 8-way compass sector division (PI / 4 radians per sector)
        const sector = Math.round(Math.atan2(dy, dx) / (Math.PI / 4))
        const targetDir = DIRECTIONS[(sector + 8) % 8]
        // Switch immediately once loaded (or default if cached)
        if (loadedPortraits.current.has(targetDir) || loadedPortraits.current.size >= 5) {
          setDirection(targetDir)
        }
      }
    }

    function scheduleUpdate() {
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(update)
      }
    }

    function handlePointerMove(e) {
      if (e.pointerType === 'touch') return
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      scheduleUpdate()
    }

    function handlePointerDown(e) {
      // Support tap-to-look on touch screens
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      scheduleUpdate()
    }

    function handleReset() {
      mousePosRef.current = null
      scheduleUpdate()
    }

    // Attach global window listeners
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    document.documentElement.addEventListener('pointerleave', handleReset)
    window.addEventListener('blur', handleReset)
    document.addEventListener('visibilitychange', handleReset)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      document.documentElement.removeEventListener('pointerleave', handleReset)
      window.removeEventListener('blur', handleReset)
      document.removeEventListener('visibilitychange', handleReset)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isDark])

  const imageSrc = isDark
    ? `/profile-gaze/${direction}.webp`
    : '/profile_lightmode.png'

  return (
    <div className="hero__stage">
      <button
        type="button"
        className="hero__photo-toggle"
        onClick={toggleTheme}
        aria-label={nextLabel}
        aria-describedby="hero-theme-bubble"
      >
        <img
          ref={photoRef}
          src={imageSrc}
          alt="Portrait of Rany Boy Templado, Associate Software Engineer"
          width="400"
          height="400"
          fetchpriority="high"
          className="hero__portrait"
          draggable="false"
        />
        <span id="hero-theme-bubble" className="hero__bubble" role="tooltip">
          {isDark ? 'Wanna go light?' : 'Back to the dark side?'}
        </span>
        <span className="hero__tap-hint" aria-hidden="true">
          Tap me
        </span>
      </button>
    </div>
  )
}
