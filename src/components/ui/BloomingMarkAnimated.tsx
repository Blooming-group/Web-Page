'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface BloomingMarkAnimatedProps {
  size?: number
  className?: string
}

/**
 * Animated Blooming logomark — 3D orbital rings + pulsing sun.
 *
 * Each ring lives in its own div with CSS perspective applied to the
 * container, so the browser handles correct 3D foreshortening.
 * Rings alternate between rotateX and rotateY axes at different speeds
 * to create the atomic orbital appearance.
 *
 * The sun core pulses with high-amplitude opacity waves, staggered
 * per layer, creating a breathing energy effect.
 */
export function BloomingMarkAnimated({ size = 64, className }: BloomingMarkAnimatedProps) {
  const reduce = useReducedMotion()

  const arc1 = 'M 34,-20.3 A 88,22 0 0,1 34,20.3'
  const arc2 = 'M -34,20.3 A 88,22 0 0,1 -34,-20.3'
  const strokeAttrs = {
    fill: 'none',
    stroke: '#F2EEE6',
    strokeWidth: 2.6,
    strokeLinecap: 'round' as const,
  }

  // Each ring: initial SVG rotation (its plane orientation),
  // CSS 3D rotation axis, speed, direction
  const rings = [
    { svgRot: 0, axis: 'Y' as const, duration: 18, dir: 1 },
    { svgRot: 45, axis: 'X' as const, duration: 24, dir: -1 },
    { svgRot: 90, axis: 'Y' as const, duration: 20, dir: -1 },
    { svgRot: 135, axis: 'X' as const, duration: 28, dir: 1 },
  ]

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        // Perspective makes the 3D rotation look correct (not flat affine)
        perspective: `${size * 5}px`,
        perspectiveOrigin: '50% 50%',
      }}
      aria-hidden="true"
    >
      {/* 3D orbital rings */}
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
          }}
          animate={
            reduce
              ? {}
              : ring.axis === 'Y'
                ? { rotateY: ring.dir > 0 ? [0, 360] : [0, -360] }
                : { rotateX: ring.dir > 0 ? [0, 360] : [0, -360] }
          }
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width={size} height={size} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
            <g transform={`translate(110,110) rotate(${ring.svgRot})`}>
              <path d={arc1} {...strokeAttrs} />
              <path d={arc2} {...strokeAttrs} />
            </g>
          </svg>
        </motion.div>
      ))}

      {/* Sun — rendered in a separate layer on top of rings */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <svg width={size} height={size} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(110,110)">
            {/* Clear background so rings behind sun are hidden */}
            <circle cx="0" cy="0" r="33" fill="#09090E" />

            {/* r=28 — outermost, slow wide pulse */}
            <motion.circle
              cx="0"
              cy="0"
              fill="#C8A96E"
              stroke="#4A7C6F"
              strokeWidth={1.1}
              animate={reduce ? {} : { r: [28, 31, 28], fillOpacity: [0.12, 0.45, 0.12] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            />
            {/* r=22 */}
            <motion.circle
              cx="0"
              cy="0"
              fill="#C8A96E"
              stroke="#4A7C6F"
              strokeWidth={1.4}
              animate={reduce ? {} : { r: [22, 24.5, 22], fillOpacity: [0.22, 0.58, 0.22] }}
              transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
            />
            {/* r=16 */}
            <motion.circle
              cx="0"
              cy="0"
              fill="#C8A96E"
              stroke="#4A7C6F"
              strokeWidth={1.7}
              animate={reduce ? {} : { r: [16, 18.5, 16], fillOpacity: [0.42, 0.82, 0.42] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            />
            {/* r=10 */}
            <motion.circle
              cx="0"
              cy="0"
              fill="#C8A96E"
              stroke="#4A7C6F"
              strokeWidth={1.2}
              animate={reduce ? {} : { r: [10, 12.5, 10], fillOpacity: [0.76, 1, 0.76] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
            />
            {/* Core — most intense pulse */}
            <motion.circle
              cx="0"
              cy="0"
              fill="#C8A96E"
              animate={reduce ? {} : { r: [5.5, 9, 5.5], fillOpacity: [1, 1, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
