'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ParticleType = 'orbital' | 'dot' | 'line' | 'flower'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  type: ParticleType
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  cr: number // color RGB
  cg: number
  cb: number
  phase: number // sinusoidal breathing phase
  phaseSpeed: number
}

// ─── Draw functions ────────────────────────────────────────────────────────────

function drawOrbital(ctx: CanvasRenderingContext2D, p: Particle): void {
  const alpha = p.opacity * (0.75 + 0.25 * Math.sin(p.phase))
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.strokeStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`
  ctx.lineWidth = 0.75
  ctx.lineCap = 'round'
  // Arc pair — mimics the orbital ring of the logomark
  ctx.beginPath()
  ctx.ellipse(0, 0, p.size, p.size * 0.26, 0, 0.22, Math.PI - 0.22)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(0, 0, p.size, p.size * 0.26, 0, Math.PI + 0.22, 2 * Math.PI - 0.22)
  ctx.stroke()
  // Tiny core dot — the sun echo
  ctx.beginPath()
  ctx.arc(0, 0, 1.2, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(200,169,110,${alpha * 0.9})`
  ctx.fill()
  ctx.restore()
}

function drawDot(ctx: CanvasRenderingContext2D, p: Particle): void {
  const alpha = p.opacity * (0.65 + 0.35 * Math.sin(p.phase))
  ctx.beginPath()
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`
  ctx.fill()
}

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

function drawFlower(ctx: CanvasRenderingContext2D, p: Particle): void {
  const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.phase))
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`
  // 5 petals — each is a small ellipse rotated around center
  for (let i = 0; i < 5; i++) {
    ctx.save()
    ctx.rotate((i / 5) * Math.PI * 2)
    ctx.beginPath()
    ctx.ellipse(0, -p.size * 0.55, p.size * 0.28, p.size * 0.5, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  // Center
  ctx.beginPath()
  ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${Math.min(alpha * 1.4, 0.9)})`
  ctx.fill()
  ctx.restore()
}

// ─── Particle factory ─────────────────────────────────────────────────────────

function makeParticle(w: number, h: number, mobile: boolean): Particle {
  // Type distribution: ~35% orbital, ~35% dot, ~15% line, ~15% flower
  const roll = Math.random()
  const type: ParticleType =
    roll < 0.35 ? 'orbital' : roll < 0.7 ? 'dot' : roll < 0.85 ? 'line' : 'flower'

  // Color palette — weighted by type
  const colorRoll = Math.random()
  let cr: number, cg: number, cb: number
  if (type === 'flower') {
    // flowers: mostly gold, some ivory
    if (colorRoll < 0.65) {
      cr = 200
      cg = 169
      cb = 110
    } else {
      cr = 242
      cg = 238
      cb = 230
    }
  } else if (type === 'orbital') {
    // orbitals: mostly ivory, some green
    if (colorRoll < 0.72) {
      cr = 242
      cg = 238
      cb = 230
    } else {
      cr = 74
      cg = 124
      cb = 111
    }
  } else {
    // dots/lines: ivory, green, rare gold
    if (colorRoll < 0.55) {
      cr = 242
      cg = 238
      cb = 230
    } else if (colorRoll < 0.82) {
      cr = 74
      cg = 124
      cb = 111
    } else {
      cr = 200
      cg = 169
      cb = 110
    }
  }

  const sizeRange: Record<ParticleType, [number, number]> = {
    orbital: mobile ? [5, 11] : [8, 16],
    dot: [1, 2.5],
    line: mobile ? [6, 14] : [9, 18],
    flower: mobile ? [3, 6] : [4, 8],
  }
  const opacityRange: Record<ParticleType, [number, number]> = {
    orbital: [0.16, 0.38],
    dot: [0.14, 0.32],
    line: [0.08, 0.18],
    flower: [0.1, 0.22],
  }

  const [sMin, sMax] = sizeRange[type]
  const [oMin, oMax] = opacityRange[type]

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    type,
    size: sMin + Math.random() * (sMax - sMin),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.007,
    opacity: oMin + Math.random() * (oMax - oMin),
    cr,
    cg,
    cb,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.007 + Math.random() * 0.014,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ParticleFieldProps {
  /** Section height in px. Default 480 desktop / auto mobile. */
  height?: number
}

export function ParticleField({ height = 480 }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const activeRef = useRef(false)

  const initParticles = useCallback((w: number, h: number) => {
    const mobile = w < 768
    const count = mobile ? 24 : 55
    particlesRef.current = Array.from({ length: count }, () => makeParticle(w, h, mobile))
  }, [])

  useEffect(() => {
    // Respect prefers-reduced-motion
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
      const h = height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      // Reset transform to avoid accumulation on multiple resizes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(w, h)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // Mouse tracking — only counts when inside the canvas rect
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

    // Intersection observer — pause animation when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    io.observe(container)

    // ─── Animation loop ──────────────────────────────────────────────────────
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      if (!activeRef.current) return

      const dpr = getDpr()
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const { x: mx, y: my } = mouseRef.current
      const REPEL_R = 155
      const MAX_SPEED = 1.4

      ctx.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        // Mouse repulsion
        if (mx !== null && my !== null) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_R && dist > 1) {
            const f = ((REPEL_R - dist) / REPEL_R) * 0.55
            const ang = Math.atan2(dy, dx)
            p.vx += Math.cos(ang) * f * 0.55
            p.vy += Math.sin(ang) * f * 0.55
          }
        }

        // Integrate
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.phase += p.phaseSpeed

        // Friction + gentle drift
        p.vx = p.vx * 0.965 + (Math.random() - 0.5) * 0.018
        p.vy = p.vy * 0.965 + (Math.random() - 0.5) * 0.018

        // Speed cap
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > MAX_SPEED) {
          p.vx = (p.vx / spd) * MAX_SPEED
          p.vy = (p.vy / spd) * MAX_SPEED
        }

        // Wrap edges
        const pad = 24
        if (p.x < -pad) p.x = w + pad
        else if (p.x > w + pad) p.x = -pad
        if (p.y < -pad) p.y = h + pad
        else if (p.y > h + pad) p.y = -pad

        // Draw
        switch (p.type) {
          case 'orbital':
            drawOrbital(ctx, p)
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
  }, [height, initParticles])

  return (
    <section aria-hidden="true">
      <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
          }}
        />
        {/* Very subtle brand label at the bottom */}
        <span
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-[0.3em] uppercase select-none"
          style={{ color: 'rgba(106,106,114,0.35)' }}
        >
          Dense Intelligence
        </span>
      </div>
    </section>
  )
}
