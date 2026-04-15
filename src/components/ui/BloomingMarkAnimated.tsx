'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface BloomingMarkAnimatedProps {
  size?: number
  className?: string
}

// Full ellipse (rx=88, ry=22) as two semicircular arcs — closed path
const ELLIPSE = 'M 88,0 A 88,22 0 1 0 -88,0 A 88,22 0 1 0 88,0 Z'

// Ramanujan approximation of ellipse perimeter: π(3(a+b) − √((3a+b)(a+3b)))
const CIRC = Math.round(Math.PI * (3 * (88 + 22) - Math.sqrt((3 * 88 + 22) * (88 + 3 * 22)))) // 377
const SPOT = 46 // bright segment length (SVG units)
const GAP = CIRC - SPOT // 331

// 4 orbital rings — static 2D orientations, bright segment animates via dashoffset
const RINGS = [
  { rot: 0, dur: 18, dir: 1, delay: 0, r: '242,238,230', a: 0.88 },
  { rot: 45, dur: 24, dir: -1, delay: 0.18, r: '74,124,111', a: 1.0 },
  { rot: 90, dur: 21, dir: 1, delay: 0.4, r: '242,238,230', a: 0.88 },
  { rot: 135, dur: 28, dir: -1, delay: 0.07, r: '200,169,110', a: 1.0 },
] as const

/**
 * Animated Blooming logomark — orbital rings with stroke-dashoffset illusion + 3D spherical sun.
 *
 * Each ring is fixed at its 2D orientation (0°/45°/90°/135°) and has a bright
 * traveling segment that moves via `stroke-dashoffset` animation. The motion
 * illusion is more natural than 3D CSS transforms: the segment appears to orbit
 * the sun along each elliptical track.
 *
 * The sun uses a radial gradient with an offset focal point (top-left) to simulate
 * spherical illumination, with a specular highlight and concentric pulsing halos.
 */
export function BloomingMarkAnimated({ size = 64, className }: BloomingMarkAnimatedProps) {
  const reduce = useReducedMotion()
  // Unique ID per instance to avoid gradient ID collisions
  const uid = React.useId().replace(/:/g, 'u')
  const gradId = `sg-${uid}`

  return (
    <div className={className} style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Off-center radial gradient simulates top-left light source on the sphere */}
          <radialGradient id={gradId} cx="38%" cy="33%" r="65%" fx="35%" fy="30%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="18%" stopColor="#F2EEE6" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#C8A96E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <g transform="translate(110,110)">
          {/* ── Orbital rings ──────────────────────────────────────── */}
          {RINGS.map((ring, i) => (
            <g key={i} transform={`rotate(${ring.rot})`}>
              {/* Dim orbit track — always visible, low opacity */}
              <path
                d={ELLIPSE}
                fill="none"
                stroke={`rgb(${ring.r})`}
                strokeWidth={0.9}
                strokeOpacity={0.14}
              />
              {/* Bright segment traveling along the orbit */}
              {!reduce && (
                <motion.path
                  d={ELLIPSE}
                  fill="none"
                  stroke={`rgba(${ring.r},${ring.a})`}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeDasharray={`${SPOT} ${GAP}`}
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
              )}
            </g>
          ))}

          {/* ── Sun ────────────────────────────────────────────────── */}

          {/* Background disc — masks orbital rings behind the sun */}
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

          {/* Sun surface — spherical radial gradient, pulsing radius */}
          <motion.circle
            cx="0"
            cy="0"
            fill={`url(#${gradId})`}
            animate={reduce ? {} : { r: [11, 13.5, 11] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
          />

          {/* Hot core — brightest center point */}
          <motion.circle
            cx="0"
            cy="0"
            fill="#FFF8E7"
            animate={reduce ? {} : { r: [4.5, 7, 4.5], fillOpacity: [0.88, 1, 0.88] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Specular highlight — simulates top-left point light source */}
          <circle cx="-4" cy="-5" r="2.8" fill="rgba(255,255,255,0.52)" />
        </g>
      </svg>
    </div>
  )
}
