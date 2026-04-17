'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

function formatWithThinSpace(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F')
}

export function DisplayNumber({
  value,
  suffix = '',
  prefix = '',
  className,
  animate = true,
}: {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  animate?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState(animate ? 0 : value)

  useEffect(() => {
    if (!animate || !isInView) return
    const duration = 820
    const start = performance.now()
    let raf: number

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplayed(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, animate])

  return (
    <span ref={ref} className={cn('display-number tabular-nums', className)}>
      {prefix}
      {formatWithThinSpace(displayed)}
      {suffix && (
        <span className="ml-[0.15em]" style={{ fontSize: '0.6em' }}>
          {suffix}
        </span>
      )}
    </span>
  )
}

export function TabularNumber({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={cn('tabular-nums', className)}>{children}</span>
}
