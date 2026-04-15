'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface BloomingMarkAnimatedProps {
  size?: number
  className?: string
}

// Ellipse (rx=88, ry=22) — same geometry as the static mark
const ELLIPSE = 'M 88,0 A 88,22 0 1 0 -88,0 A 88,22 0 1 0 88,0 Z'

// Ramanujan perimeter approximation
const CIRC = Math.round(Math.PI * (3 * (88 + 22) - Math.sqrt((3 * 88 + 22) * (88 + 3 * 22)))) // 377

const IVORY = '242,238,230'

// Small spark particle: 8 units (≈2% of circumference) — fast, alive
const SPOT = 8

/**
 * 4 rings at 0°/45°/90°/135° — all identical geometry, matching the static mark.
 * Each has a clearly visible ivory track + a tiny fast spark (glow halo + bright core).
 * Durations 2.4–3.2 s = particle-like speed, not a slow crawl.
 */
const RINGS = [
  { rot: 0, dur: 2.8, dir: 1, delay: 0.0 },
  { rot: 45, dur: 2.4, dir: -1, delay: 0.4 },
  { rot: 90, dur: 3.2, dir: 1, delay: 0.7 },
  { rot: 135, dur: 2.6, dir: -1, delay: 0.15 },
] as const

export function BloomingMarkAnimated({ size = 64, className }: BloomingMarkAnimatedProps) {
  const reduce = useReducedMotion()
  const uid = React.useId().replace(/:/g, 'u')
  const gradId = `sg-${uid}`

  return (
    <div className={className} style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Off-center radial gradient — top-left light source → 3D sphere illusion */}
          <radialGradient id={gradId} cx="38%" cy="33%" r="65%" fx="35%" fy="30%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="18%" stopColor="#F2EEE6" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#C8A96E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <g transform="translate(110,110)">
          {/* ── Orbital rings ─────────────────────────────────── */}
          {RINGS.map((ring, i) => {
            const gap = CIRC - SPOT
            const glowSpot = SPOT * 2.5
            const glowGap = CIRC - glowSpot

            return (
              <g key={i} transform={`rotate(${ring.rot})`}>
                {/* Always-visible ivory track */}
                <path d={ELLIPSE} fill="none" stroke={`rgba(${IVORY},0.42)`} strokeWidth={0.85} />

                {/* Animated spark: glow halo + bright core */}
                {!reduce && (
                  <>
                    {/* Soft glow halo — wider, translucent, trails behind the core */}
                    <motion.path
                      d={ELLIPSE}
                      fill="none"
                      stroke={`rgba(${IVORY},0.18)`}
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeDasharray={`${glowSpot} ${glowGap}`}
                      animate={{
                        strokeDashoffset: ring.dir > 0 ? [0, -CIRC] : [0, CIRC],
                      }}
                      transition={{
                        duration: ring.dur,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: ring.delay,
                      }}
                    />
                    {/* Bright core spark */}
                    <motion.path
                      d={ELLIPSE}
                      fill="none"
                      stroke={`rgba(${IVORY},0.95)`}
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeDasharray={`${SPOT} ${gap}`}
                      animate={{
                        strokeDashoffset: ring.dir > 0 ? [0, -CIRC] : [0, CIRC],
                      }}
                      transition={{
                        duration: ring.dur,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: ring.delay,
                      }}
                    />
                  </>
                )}
              </g>
            )
          })}

          {/* ── Sun ──────────────────────────────────────────── */}

          {/* Background disc — masks rings behind the sun */}
          <circle cx="0" cy="0" r="34" fill="#09090E" />

          {/* Energy radiation — pulsing gold halos */}
          <motion.circle
            cx="0"
            cy="0"
            fill="#C8A96E"
            animate={reduce ? {} : { r: [28, 31, 28], fillOpacity: [0.06, 0.28, 0.06] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="0"
            cy="0"
            fill="#C8A96E"
            animate={reduce ? {} : { r: [22, 24.5, 22], fillOpacity: [0.14, 0.46, 0.14] }}
            transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
          />
          <motion.circle
            cx="0"
            cy="0"
            fill="#C8A96E"
            animate={reduce ? {} : { r: [16, 18.5, 16], fillOpacity: [0.32, 0.68, 0.32] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />

          {/* Sun surface — spherical gradient, pulsing */}
          <motion.circle
            cx="0"
            cy="0"
            fill={`url(#${gradId})`}
            animate={reduce ? {} : { r: [11, 13.5, 11] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
          />

          {/* Hot core */}
          <motion.circle
            cx="0"
            cy="0"
            fill="#FFF8E7"
            animate={reduce ? {} : { r: [4.5, 7, 4.5], fillOpacity: [0.88, 1, 0.88] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Specular highlight — top-left point light */}
          <circle cx="-4" cy="-5" r="2.8" fill="rgba(255,255,255,0.52)" />
        </g>
      </svg>
    </div>
  )
}
