'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticWrapperProps {
  children: React.ReactNode
  /** 0–1: how strongly the element is attracted. Default 0.35 */
  strength?: number
  className?: string
}

/**
 * Wraps any element with a magnetic attraction effect.
 *
 * When the cursor moves over the element, it translates slightly toward
 * the cursor position using spring physics — creating the "alive" feeling
 * seen on premium sites like Cuberto.
 *
 * Apply to primary CTAs, not every button (would feel overwhelming).
 *
 * Usage:
 *   <MagneticWrapper>
 *     <Button size="lg" asChild>
 *       <Link href="/contact">Start conversation</Link>
 *     </Button>
 *   </MagneticWrapper>
 */
export function MagneticWrapper({ children, strength = 0.35, className }: MagneticWrapperProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.8 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.8 })

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
    },
    [x, y, strength]
  )

  const handleMouseLeave = React.useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
