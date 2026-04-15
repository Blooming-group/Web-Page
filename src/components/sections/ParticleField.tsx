'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ParticleType = 'logo' | 'dot' | 'line' | 'flower'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  type: ParticleType
  size: number // orbital radius for logo, px for others
  rotation: number
  rotationSpeed: number
  opacity: number
  cr: number
  cg: number
  cb: number
  phase: number
  phaseSpeed: number
}

// ─── Draw: full mini Blooming logomark ────────────────────────────────────────
// s = size / 88  (88px = orbital radius in the original 220×220 viewBox)

function drawLogo(ctx: CanvasRenderingContext2D, p: Particle): void {
  const s = p.size / 88
  const alpha = p.opacity * (0.8 + 0.2 * Math.sin(p.phase))

  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)

  // 4 orbital rings at 0°/45°/90°/135°
  ctx.strokeStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`
  ctx.lineWidth = 0.75
  ctx.lineCap = 'round'

  const ROTATIONS = [0, 45, 90, 135]
  for (const deg of ROTATIONS) {
    ctx.save()
    ctx.rotate((deg * Math.PI) / 180)
    ctx.beginPath()
    ctx.ellipse(0, 0, 88 * s, 22 * s, 0, 0.2, Math.PI - 0.2)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(0, 0, 88 * s, 22 * s, 0, Math.PI + 0.2, 2 * Math.PI - 0.2)
    ctx.stroke()
    ctx.restore()
  }

  // Sun base (clear so rings are hidden behind it)
  ctx.beginPath()
  ctx.arc(0, 0, 33 * s, 0, Math.PI * 2)
  ctx.fillStyle = '#09090E'
  ctx.fill()

  // Sun rings — concentric gold circles
  const SUN: Array<[number, number]> = [
    [28, 0.1],
    [22, 0.22],
    [16, 0.45],
    [10, 0.8],
    [5.5, 1.0],
  ]
  for (const [r, fo] of SUN) {
    ctx.beginPath()
    ctx.arc(0, 0, r * s, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(200,169,110,${fo * alpha * 2.2})`
    ctx.fill()
  }

  ctx.restore()
}

// ─── Draw: abstract dot ───────────────────────────────────────────────────────

function drawDot(ctx: CanvasRenderingContext2D, p: Particle): void {
  const alpha = p.opacity * (0.65 + 0.35 * Math.sin(p.phase))
  ctx.beginPath()
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`
  ctx.fill()
}

// ─── Draw: abstract line ──────────────────────────────────────────────────────

function drawLine(ctx: CanvasRenderingContext2D, p: Particle): void {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.beginPath()
  ctx.moveTo(-p.size * 0.5, 0)
  ctx.lineTo(p.size * 0.5, 0)
  ctx.strokeStyle = `rgba(${p.cr},${p.cg},${p.cb},${p.opacity})`
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.restore()
}

// ─── Draw: organic flower ─────────────────────────────────────────────────────

function drawFlower(ctx: CanvasRenderingContext2D, p: Particle): void {
  const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.phase))
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`
  for (let i = 0; i < 5; i++) {
    ctx.save()
    ctx.rotate((i / 5) * Math.PI * 2)
    ctx.beginPath()
    ctx.ellipse(0, -p.size * 0.55, p.size * 0.28, p.size * 0.5, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  ctx.beginPath()
  ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${Math.min(alpha * 1.5, 0.95)})`
  ctx.fill()
  ctx.restore()
}

// ─── Particle factory ─────────────────────────────────────────────────────────

function makeParticle(w: number, h: number, mobile: boolean): Particle {
  // Distribution: ~30% logo, ~38% dot, ~16% line, ~16% flower
  const roll = Math.random()
  const type: ParticleType =
    roll < 0.3 ? 'logo' : roll < 0.68 ? 'dot' : roll < 0.84 ? 'line' : 'flower'

  // Colour — weighted per type
  const c = Math.random()
  let cr: number, cg: number, cb: number
  if (type === 'flower') {
    ;[cr, cg, cb] = c < 0.62 ? [200, 169, 110] : [242, 238, 230]
  } else if (type === 'logo') {
    ;[cr, cg, cb] = c < 0.7 ? [242, 238, 230] : [74, 124, 111]
  } else {
    ;[cr, cg, cb] = c < 0.55 ? [242, 238, 230] : c < 0.8 ? [74, 124, 111] : [200, 169, 110]
  }

  // Size — logo uses orbital radius (22–36px so the full mark is legible)
  const sizes: Record<ParticleType, [number, number]> = {
    logo: mobile ? [14, 22] : [20, 34],
    dot: [1.2, 2.8],
    line: mobile ? [7, 15] : [10, 20],
    flower: mobile ? [3.5, 7] : [5, 9],
  }
  const opacities: Record<ParticleType, [number, number]> = {
    logo: [0.28, 0.55],
    dot: [0.22, 0.45],
    line: [0.15, 0.28],
    flower: [0.18, 0.32],
  }

  const [sMin, sMax] = sizes[type]
  const [oMin, oMax] = opacities[type]

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    type,
    size: sMin + Math.random() * (sMax - sMin),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.006,
    opacity: oMin + Math.random() * (oMax - oMin),
    cr,
    cg,
    cb,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.007 + Math.random() * 0.013,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ParticleFieldProps {
  /**
   * 'section': standalone section with explicit height (home page use)
   * 'background': absolute inset-0, fills whatever container it's placed in
   */
  mode?: 'section' | 'background'
  /** Only applies to mode='section'. Default 460px. */
  height?: number
}

export function ParticleField({ mode = 'section', height = 460 }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const activeRef = useRef(false)

  const initParticles = useCallback((w: number, h: number) => {
    const mobile = w < 768
    const count = mobile ? 36 : 82
    particlesRef.current = Array.from({ length: count }, () => makeParticle(w, h, mobile))
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const getDpr = () => Math.min(window.devicePixelRatio ?? 1, 2)

    const resize = () => {
      const dpr = getDpr()
      const w = container.offsetWidth
      const h = container.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(w, h)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      mouseRef.current = inBounds
        ? { x: e.clientX - rect.left, y: e.clientY - rect.top }
        : { x: null, y: null }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    io.observe(container)

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      if (!activeRef.current) return

      const dpr = getDpr()
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const { x: mx, y: my } = mouseRef.current
      const REPEL_R = 160
      const MAX_SPD = 1.5

      ctx.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        // Mouse repulsion
        if (mx !== null && my !== null) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.hypot(dx, dy)
          if (dist < REPEL_R && dist > 1) {
            const f = ((REPEL_R - dist) / REPEL_R) * 0.6
            const ang = Math.atan2(dy, dx)
            p.vx += Math.cos(ang) * f * 0.5
            p.vy += Math.sin(ang) * f * 0.5
          }
        }

        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.phase += p.phaseSpeed

        // Friction + gentle drift
        p.vx = p.vx * 0.964 + (Math.random() - 0.5) * 0.016
        p.vy = p.vy * 0.964 + (Math.random() - 0.5) * 0.016

        const spd = Math.hypot(p.vx, p.vy)
        if (spd > MAX_SPD) {
          p.vx = (p.vx / spd) * MAX_SPD
          p.vy = (p.vy / spd) * MAX_SPD
        }

        // Wrap
        const pad = 40
        if (p.x < -pad) p.x = w + pad
        else if (p.x > w + pad) p.x = -pad
        if (p.y < -pad) p.y = h + pad
        else if (p.y > h + pad) p.y = -pad

        switch (p.type) {
          case 'logo':
            drawLogo(ctx, p)
            break
          case 'dot':
            drawDot(ctx, p)
            break
          case 'line':
            drawLine(ctx, p)
            break
          case 'flower':
            drawFlower(ctx, p)
            break
        }
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [initParticles])

  // ─── Render ──────────────────────────────────────────────────────────────────

  if (mode === 'background') {
    return (
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
          }}
        />
      </div>
    )
  }

  // mode === 'section'
  return (
    <section aria-hidden="true">
      <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        />
        <span
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-[0.3em] uppercase select-none"
          style={{ color: 'rgba(106,106,114,0.3)' }}
        >
          Dense Intelligence
        </span>
      </div>
    </section>
  )
}
