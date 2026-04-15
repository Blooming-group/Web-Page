'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/ui/Container'

const metrics = [
  {
    value: '5',
    unit: '',
    label: 'Implementation capabilities',
    description: 'From web to autonomous AI agents',
  },
  {
    value: '< 90',
    unit: 'days',
    label: 'Average time to ROI',
    description: 'Delivery measured in weeks, not quarters',
  },
  {
    value: '45',
    unit: 'min',
    label: 'Diagnostic session',
    description: 'No pitch. No slides. Just questions.',
  },
  {
    value: '€5M+',
    unit: '',
    label: 'Revenue range we serve',
    description: 'Mid-market companies across Europe',
  },
]

export function MetricsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative py-[--spacing-section-lg]"
      style={{
        background:
          'radial-gradient(ellipse 90% 100% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 100%)',
      }}
      aria-label="Key metrics"
    >
      {/* Gold gradient frame — top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(200,169,110,0.32) 50%, transparent)',
        }}
        aria-hidden="true"
      />
      {/* Gold gradient frame — bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(200,169,110,0.2) 50%, transparent)',
        }}
        aria-hidden="true"
      />
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-[--color-border-default] md:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="bg-base flex flex-col gap-2 p-6 md:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="text-3xl font-light tracking-tight md:text-4xl"
                  style={{ color: 'var(--color-ivory)' }}
                >
                  {metric.value}
                </span>
                {metric.unit && (
                  <span
                    className="text-sm font-medium tracking-wide"
                    style={{ color: 'var(--color-accent-primary)' }}
                  >
                    {metric.unit}
                  </span>
                )}
              </div>
              <p
                className="text-xs font-semibold tracking-[0.12em] uppercase"
                style={{ color: 'var(--color-ivory)' }}
              >
                {metric.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-mid)' }}>
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
