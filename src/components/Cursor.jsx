import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

/**
 * Modern Interactive Velocity & Context-Aware Cursor
 * - Smooth spring physics with dynamic velocity squash & stretch
 * - Intelligent contextual badges (Theme, Enlarge, PDF, Verify, GitHub, Explore)
 * - Restores native I-beam on inputs/textareas for flawless UX
 * - Ripple shockwave on click
 * - Automatically disabled on touch screens and prefers-reduced-motion
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const labelRef = useRef(null)
  const rippleRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return undefined

    const dot = dotRef.current
    const follower = followerRef.current
    const label = labelRef.current
    const ripple = rippleRef.current
    if (!dot || !follower) return undefined

    document.body.classList.add('has-custom-cursor')

    // Physics state
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let followerX = targetX
    let followerY = targetY
    let prevX = targetX
    let prevY = targetY
    let currentAngle = 0
    let currentStretch = 0
    let isVisible = false
    let isDown = false
    let currentMode = 'normal' // 'normal' | 'hover' | 'badge' | 'text'
    let currentLabelText = ''
    let rafId = 0

    const updateContext = (target) => {
      if (!target || !(target instanceof Element)) {
        if (currentMode !== 'normal') {
          currentMode = 'normal'
          follower.className = 'cursor-follower'
          if (label) label.textContent = ''
        }
        return
      }

      // 1. Text Inputs / Editable areas: restore native cursor completely
      if (target.closest('input, textarea, select, [contenteditable="true"], code, pre')) {
        currentMode = 'text'
        follower.className = 'cursor-follower cursor-follower--hidden'
        dot.style.opacity = '0'
        return
      }

      dot.style.opacity = '1'

      // 2. High-intent contextual badges
      let badgeText = ''
      if (target.closest('.hero__photo-toggle')) {
        badgeText = 'Psst... Click Me! ✨'
      } else if (target.closest('.projects__featured-visual, .projects__card-visual, .lightbox__content')) {
        badgeText = 'Enlarge ⤢'
      } else if (target.closest('a[href*="Resume"], a[href$=".pdf"]')) {
        badgeText = 'PDF ↗'
      } else if (target.closest('.certs__card, .certs__verify-btn')) {
        badgeText = 'Verify ↗'
      } else if (target.closest('a[href^="mailto:"]')) {
        badgeText = 'Email ✉'
      } else if (target.closest('a[href*="github.com"]')) {
        badgeText = 'GitHub ↗'
      } else if (target.closest('a[href*="linkedin.com"]')) {
        badgeText = 'LinkedIn ↗'
      } else if (target.closest('.hero__action--primary, a[href="#projects"]')) {
        badgeText = 'Explore ↘'
      } else if (target.closest('.chat-fab, .chat__trigger, .chat__widget-btn')) {
        badgeText = 'Ask AI 💬'
      }

      if (badgeText) {
        currentMode = 'badge'
        if (currentLabelText !== badgeText && label) {
          label.textContent = badgeText
          currentLabelText = badgeText
        }
        follower.className = 'cursor-follower cursor-follower--badge'
        return
      }

      // 3. Standard interactive links / buttons
      if (target.closest('a, button, [role="button"], summary, label[for], .about__tech-chip')) {
        currentMode = 'hover'
        follower.className = 'cursor-follower cursor-follower--hover'
        if (label) label.textContent = ''
        currentLabelText = ''
        return
      }

      // 4. Default state
      currentMode = 'normal'
      follower.className = 'cursor-follower'
      if (label) label.textContent = ''
      currentLabelText = ''
    }

    const onPointerMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY

      // Dot tracks instantly with zero lag
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`

      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        follower.style.opacity = '1'
      }

      updateContext(e.target)
    }

    const onPointerDown = () => {
      isDown = true
      follower.classList.add('cursor-follower--down')
    }

    const onPointerUp = (e) => {
      isDown = false
      follower.classList.remove('cursor-follower--down')

      // Trigger click ripple
      if (ripple) {
        ripple.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        ripple.classList.remove('cursor-ripple--active')
        void ripple.offsetWidth // force reflow
        ripple.classList.add('cursor-ripple--active')
      }
    }

    const onPointerLeave = () => {
      isVisible = false
      dot.style.opacity = '0'
      follower.style.opacity = '0'
    }

    // Animation Loop with Spring & Aerodynamic Velocity Deformation
    const tick = () => {
      // Smooth spring interpolation
      const ease = currentMode === 'badge' ? 0.22 : 0.16
      followerX += (targetX - followerX) * ease
      followerY += (targetY - followerY) * ease

      // Velocity calculation
      const vx = followerX - prevX
      const vy = followerY - prevY
      prevX = followerX
      prevY = followerY

      const speed = Math.hypot(vx, vy)
      
      if (currentMode === 'normal') {
        // Dynamic squash and stretch based on movement velocity
        const targetAngle = Math.atan2(vy, vx)
        const targetStretch = Math.min(speed * 0.045, 0.45)
        
        currentAngle += (targetAngle - currentAngle) * 0.25
        currentStretch += (targetStretch - currentStretch) * 0.2

        const scaleX = 1 + currentStretch
        const scaleY = 1 - currentStretch * 0.45

        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) rotate(${currentAngle}rad) scale(${scaleX}, ${scaleY})`
      } else {
        // Keep horizontal and upright when displaying badges or hovering
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1, 1)`
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={rippleRef} className="cursor-ripple" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
