import { useEffect, useRef } from 'react'
import './Cursor.css'

// A custom cursor: a dot that tracks the pointer 1:1, and a ring that eases
// behind it. The ring grows when hovering interactive elements. Rendered as a
// fixed overlay so it never touches the rest of the layout or markup.
// No-ops on touch / coarse-pointer devices and when reduced motion is preferred.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    document.body.classList.add('has-custom-cursor')

    // Target = real pointer position. Ring position eases toward the target.
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    let visible = false
    let hovering = false
    let raf = 0

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      // Dot tracks instantly
      dot.style.transform = `translate(${targetX}px, ${targetY}px)`
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onDown = () => ring.classList.add('cursor-ring--down')
    const onUp = () => ring.classList.remove('cursor-ring--down')

    // Grow the ring over anything clickable / interactive
    const interactiveSelector = 'a, button, input, textarea, select, summary, [role="button"], label[for], .about__tech, .certs__card--clickable'
    const onOver = (e) => {
      if (e.target.closest?.(interactiveSelector)) {
        if (!hovering) { hovering = true; ring.classList.add('cursor-ring--hover') }
      } else if (hovering) {
        hovering = false
        ring.classList.remove('cursor-ring--hover')
      }
    }

    const tick = () => {
      // Linear interpolation toward the target for a smooth trailing ring
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
