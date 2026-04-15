'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { BloomingMarkAnimated } from './BloomingMarkAnimated'

/**
 * The Blooming logomark follows the cursor with spring-based lag.
 *
 * Rules:
 * - Only renders on pointer:fine devices (desktop, stylus — not touch)
 * - Never replaces the system cursor
 * - pointer-events:none so it never interferes with clicks
 * - Spring physics (low stiffness) creates a natural trailing distance
 * - Fades in/out when cursor enters/leaves the window
 * - Starts off-screen at (-200,-200) until the first mousemove
 */
export function CursorFollower() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Slower spring = longer trail, more dramatic follow
  const springX = useSpring(mouseX, { stiffness: 52, damping: 17, mass: 0.7 })
  const springY = useSpring(mouseY, { stiffness: 52, damping: 17, mass: 0.7 })

  useEffect(() => {
    setMounted(true)
    // Only activate on pointer:fine (mouse/stylus, not touch)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY])

  // SSR guard — don't render until mounted (avoids hydration mismatch)
  if (!mounted) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-40"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: visible ? 0.62 : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <BloomingMarkAnimated size={72} />
    </motion.div>
  )
}
