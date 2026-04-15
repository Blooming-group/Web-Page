'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface BloomingMarkAnimatedProps {
  size?: number
  className?: string
}

/**
 * Animated Blooming logomark.
 *
 * Each of the 4 orbital rings rotates at a different speed and direction.
 * The concentric sun circles pulse in opacity and radius, creating a
 * breathing, living sun effect.
 *
 * Used as the persistent ambient element (fixed bottom-left) and
 * as the base for the cursor follower.
 *
 * All animations halt when prefers-reduced-motion is set.
 */
export function BloomingMarkAnimated({ size = 64, className }: BloomingMarkAnimatedProps) {
  const reduce = useReducedMotion()

  // Shared arc paths — each ring uses the same arc geometry, rotated by its group
  const arc1 = 'M 34,-20.3 A 88,22 0 0,1 34,20.3'
  const arc2 = 'M -34,20.3 A 88,22 0 0,1 -34,-20.3'
  const stroke = {
    fill: 'none',
    stroke: '#F2EEE6',
    strokeWidth: 2.6,
    strokeLinecap: 'round' as const,
  }

  const ring = (initialDeg: number, toDeg: number, duration: number) => ({
    initial: { rotate: initialDeg },
    animate: reduce ? {} : { rotate: toDeg },
    transition: { duration, repeat: Infinity, ease: 'linear' as const },
    style: { transformOrigin: '0px 0px' },
  })

  const pulse = (
    r0: number,
    r1: number,
    op0: number,
    op1: number,
    duration: number,
    delay = 0
  ) => ({
    animate: reduce
      ? {}
      : {
          r: [r0, r1, r0],
          fillOpacity: [op0, op1, op0],
        },
    transition: { duration, repeat: Infinity, ease: 'easeInOut' as const, delay },
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g transform="translate(110,110)">
        {/* Ring 0 — clockwise 18s */}
        <motion.g {...ring(0, 360, 18)}>
          <path d={arc1} {...stroke} />
          <path d={arc2} {...stroke} />
        </motion.g>

        {/* Ring 45 — counter-clockwise 24s */}
        <motion.g {...ring(45, -315, 24)}>
          <path d={arc1} {...stroke} />
          <path d={arc2} {...stroke} />
        </motion.g>

        {/* Ring 90 — clockwise 20s */}
        <motion.g {...ring(90, 450, 20)}>
          <path d={arc1} {...stroke} />
          <path d={arc2} {...stroke} />
        </motion.g>

        {/* Ring 135 — counter-clockwise 28s */}
        <motion.g {...ring(135, -225, 28)}>
          <path d={arc1} {...stroke} />
          <path d={arc2} {...stroke} />
        </motion.g>

        {/* Sun base — clear background so rings aren't visible through it */}
        <circle cx="0" cy="0" r="33" fill="#09090E" />

        {/* Sun rings — pulsing outward from core, staggered delays */}
        <motion.circle
          cx="0"
          cy="0"
          fill="#C8A96E"
          stroke="#4A7C6F"
          strokeWidth={1.1}
          {...pulse(28, 29.8, 0.08, 0.2, 4.0, 0.0)}
        />
        <motion.circle
          cx="0"
          cy="0"
          fill="#C8A96E"
          stroke="#4A7C6F"
          strokeWidth={1.4}
          {...pulse(22, 23.8, 0.18, 0.38, 3.3, 0.4)}
        />
        <motion.circle
          cx="0"
          cy="0"
          fill="#C8A96E"
          stroke="#4A7C6F"
          strokeWidth={1.7}
          {...pulse(16, 18.0, 0.38, 0.65, 2.6, 0.8)}
        />
        <motion.circle
          cx="0"
          cy="0"
          fill="#C8A96E"
          stroke="#4A7C6F"
          strokeWidth={1.2}
          {...pulse(10, 12.0, 0.72, 0.95, 2.0, 1.1)}
        />

        {/* Core — strongest pulse */}
        <motion.circle
          cx="0"
          cy="0"
          fill="#C8A96E"
          animate={reduce ? {} : { r: [5.5, 8, 5.5], fillOpacity: [1, 1, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>
    </svg>
  )
}
