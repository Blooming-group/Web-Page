/**
 * BloomingLogo — Componente React de producción
 * Blooming Group · Sistema de Identidad v1.0
 *
 * USO:
 *   import BloomingLogo from './BloomingLogo'
 *
 *   // Solo mark
 *   <BloomingLogo size={40} />
 *
 *   // Mark + wordmark horizontal
 *   <BloomingLogo size={40} showWordmark />
 *
 *   // Sobre fondo claro
 *   <BloomingLogo size={40} showWordmark variant="light" />
 *
 *   // Solo mark, sin fondo
 *   <BloomingLogo size={40} transparent />
 */

import React from 'react'

const COLORS = {
  dark: {
    bg: '#09090E',
    rings: '#F2EEE6',
    wordmark: '#F2EEE6',
    sub: '#6A6A72',
  },
  light: {
    bg: '#F2EEE6',
    rings: '#09090E',
    wordmark: '#09090E',
    sub: '#8A8A78',
  },
}

const GOLD = '#C8A96E'
const GREEN = '#4A7C6F'

function BloomingMark({ size = 40, bg, rings }) {
  const vb = 220
  const cx = 110
  const cy = 110

  // Arco: M 34,-20.3 A 88,22 0 0,1 34,20.3
  // Arco inv: M -34,20.3 A 88,22 0 0,1 -34,-20.3
  const arc = 'M 34,-20.3 A 88,22 0 0,1 34,20.3'
  const arcInv = 'M -34,20.3 A 88,22 0 0,1 -34,-20.3'
  const angles = [0, 45, 90, 135]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Blooming Group"
    >
      <title>Blooming Group</title>
      <rect width={vb} height={vb} fill={bg} />
      <g transform={`translate(${cx},${cy})`}>

        {/* Anillos — 4 elipses con apertura central */}
        {angles.map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path d={arc} fill="none" stroke={rings} strokeWidth="2.6" strokeLinecap="round" />
            <path d={arcInv} fill="none" stroke={rings} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        ))}

        {/* Sol — fondo limpio */}
        <circle cx="0" cy="0" r="33" fill={bg} />

        {/* Degradado de oro: 8% → 18% → 38% → 72% → 100% */}
        <circle cx="0" cy="0" r="28" fill={GOLD} fillOpacity="0.08" stroke={GREEN} strokeWidth="1.1" />
        <circle cx="0" cy="0" r="22" fill={GOLD} fillOpacity="0.18" stroke={GREEN} strokeWidth="1.4" />
        <circle cx="0" cy="0" r="16" fill={GOLD} fillOpacity="0.38" stroke={GREEN} strokeWidth="1.7" />
        <circle cx="0" cy="0" r="10" fill={GOLD} fillOpacity="0.72" stroke={GREEN} strokeWidth="1.2" />
        <circle cx="0" cy="0" r="5.5" fill={GOLD} />

      </g>
    </svg>
  )
}

export default function BloomingLogo({
  size = 40,
  variant = 'dark',       // 'dark' | 'light'
  showWordmark = false,
  transparent = false,
  className = '',
  style = {},
}) {
  const colors = COLORS[variant]
  const bg = transparent ? 'transparent' : colors.bg

  if (!showWordmark) {
    return (
      <BloomingMark
        size={size}
        bg={bg}
        rings={colors.rings}
      />
    )
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: Math.round(size * 0.35) + 'px',
        background: transparent ? 'transparent' : colors.bg,
        padding: transparent ? 0 : `${Math.round(size * 0.2)}px ${Math.round(size * 0.3)}px`,
        ...style,
      }}
    >
      <BloomingMark size={size} bg={bg} rings={colors.rings} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontFamily: "'Söhne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
            fontSize: Math.round(size * 0.35) + 'px',
            letterSpacing: Math.round(size * 0.18) + 'px',
            color: colors.wordmark,
            lineHeight: 1,
          }}
        >
          BLOOMING
        </span>
        <span
          style={{
            fontFamily: "'Söhne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
            fontSize: Math.round(size * 0.14) + 'px',
            letterSpacing: Math.round(size * 0.12) + 'px',
            color: colors.sub,
            lineHeight: 1,
          }}
        >
          GROUP
        </span>
      </div>
    </div>
  )
}
