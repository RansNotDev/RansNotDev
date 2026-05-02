import { useEffect, useState } from 'react'
import './Loader.css'

const steps = [
  { label: 'Enrolled in BSIT. The journey begins.',          pct: 8  },
  { label: 'Wrote first Hello World in C++.....',      pct: 18 },
  { label: 'Building web projects as a freelancer...',   pct: 30 },
  { label: 'IT Intern at Municipal Accounting Office. ✓',      pct: 42 },
  { label: 'Graduated. BSIT done. ✓',                    pct: 54 },
  { label: 'Landed in BPO. Customer Service Rep.',       pct: 65 },
  { label: 'Still coding on the side. Never stopped.',   pct: 76 },
  { label: 'Transitioning back to tech industry...',     pct: 87 },
  { label: 'Loading portfolio...',                       pct: 95 },
  { label: 'Welcome. RansnotDEV is ready.',              pct: 100 },
]

export default function Loader({ onDone }) {
  const [step,     setStep]     = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting,  setExiting]  = useState(false)

  useEffect(() => {
    const totalMs  = 5000
    const interval = totalMs / steps.length

    const timer = setInterval(() => {
      setStep(prev => {
        const next = prev + 1
        if (next >= steps.length) {
          clearInterval(timer)
          setTimeout(() => setExiting(true), 400)
          setTimeout(() => onDone(), 1000)
          return prev
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onDone])

  useEffect(() => {
    const target = steps[step]?.pct ?? 100
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= target) { clearInterval(id); return target }
        return p + 1
      })
    }, 14)
    return () => clearInterval(id)
  }, [step])

  return (
    <div className={`loader${exiting ? ' loader--exit' : ''}`}>
      <div className="loader__inner">

        {/* Brand name */}
        <div className="loader__brand">
          <span className="loader__brand-name">RansnotDEV</span>
          <span className="loader__brand-cursor">&gt;_</span>
          <span className="loader__brand-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="loader__subtitle">// coded → graduated → BPO → back to tech</p>

        {/* Terminal log */}
        <div className="loader__log">
          {steps.slice(0, step + 1).map((s, i) => (
            <div key={i} className="loader__log-line">
              <span className="loader__log-prompt">$</span>
              <span className="loader__log-text">{s.label}</span>
              {i < step && <span className="loader__log-ok">✓</span>}
              {i === step && <span className="loader__log-cursor">▌</span>}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="loader__bar-wrap">
          <div className="loader__bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader__footer">
          <span className="loader__pct">{progress}%</span>
          <span className="loader__status">
            {progress < 100 ? 'compiling...' : 'ready ✓'}
          </span>
        </div>

      </div>
    </div>
  )
}
