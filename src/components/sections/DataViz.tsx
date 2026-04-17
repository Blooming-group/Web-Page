'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { DisplayNumber } from '@/components/ui/DisplayNumber'
import { Caption } from '@/components/ui/Typography'

const metrics = [
  {
    value: 6,
    label: 'Integrated capabilities',
    description: 'Strategy through deployment, one team',
  },
  {
    value: 90,
    prefix: '< ',
    suffix: 'days',
    label: 'Diagnosis to measurable ROI',
    description: 'We deliver in weeks. You measure in months.',
  },
  {
    value: 45,
    suffix: 'min',
    label: 'Diagnostic session',
    description: 'No pitch. No slides. Just the real problem.',
  },
  {
    value: 0,
    label: 'Handoffs between teams',
    description: 'The people who diagnose are the people who build.',
  },
]

export function DataViz() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-20" aria-label="Key metrics">
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="card-interactive group relative overflow-hidden rounded-sm border p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <span
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-[--duration-short] group-hover:scale-x-100"
                style={{ background: 'var(--card-topline-color)' }}
                aria-hidden="true"
              />
              <div className="mb-3" style={{ color: 'var(--color-ivory)' }}>
                <DisplayNumber
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  className="text-3xl font-light tracking-tight md:text-4xl"
                />
              </div>
              <p
                className="mb-2 text-xs font-semibold tracking-[0.1em] uppercase"
                style={{ color: 'var(--color-ivory)' }}
              >
                {metric.label}
              </p>
              <Caption as="p" className="tracking-normal normal-case">
                {metric.description}
              </Caption>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
