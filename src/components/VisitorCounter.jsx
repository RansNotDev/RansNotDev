import { useState, useEffect, useRef } from 'react'
import './VisitorCounter.css'

const POLL_MS = 20_000

function formatCount(n) {
  return new Intl.NumberFormat('en-US').format(n)
}

export default function VisitorCounter({ compact = false }) {
  const [stats, setStats] = useState(null) // { online, total } | null
  const [visible, setVisible] = useState(false)
  const firstHit = useRef(true)

  useEffect(() => {
    let active = true
    let timer

    async function ping() {
      try {
        // First call POSTs (counts the visit); later calls GET (heartbeat only).
        const method = firstHit.current ? 'POST' : 'GET'
        const res = await fetch('/api/visitors', {
          method,
          headers: { 'X-Requested-With': 'portfolio-visitors' },
        })

        // 204 = not configured or soft-fail → keep the badge hidden.
        if (res.status === 204 || !res.ok) {
          if (active) setVisible(false)
          return
        }

        const data = await res.json().catch(() => null)
        if (active && data && typeof data.total === 'number') {
          firstHit.current = false
          setStats({ online: data.online ?? 1, total: data.total })
          setVisible(true)
        }
      } catch {
        if (active) setVisible(false)
      }
    }

    ping()
    timer = setInterval(ping, POLL_MS)

    return () => {
      active = false
      clearInterval(timer)
    }
  }, [])

  if (!visible || !stats) return null

  return (
    <div
      className={`visitor-counter${compact ? ' visitor-counter--compact' : ''}`}
      aria-live="polite"
    >
      <span className="visitor-counter__group" title="Visitors online right now">
        <span className="visitor-counter__dot" aria-hidden="true" />
        <span className="visitor-counter__num">{formatCount(stats.online)}</span>
        <span className="visitor-counter__label">{compact ? 'online' : 'online now'}</span>
      </span>
      <span className="visitor-counter__divider" aria-hidden="true" />
      <span className="visitor-counter__group" title="All-time visits">
        <span className="visitor-counter__num">{formatCount(stats.total)}</span>
        <span className="visitor-counter__label">{compact ? 'visits' : 'total visits'}</span>
      </span>
    </div>
  )
}
