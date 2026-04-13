'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { H2, Body } from '@/components/ui/Typography'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    title: 'Diagnose',
    description:
      'We map your operational reality before touching a single tool. No assumptions. No templates.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Architecture before implementation. Every decision is defensible against a Fortune 500 CTO.',
  },
  {
    number: '03',
    title: 'Execute',
    description:
      'We build. In weeks, not quarters. Delivery is not a milestone — it is the starting point.',
  },
  {
    number: '04',
    title: 'Measure',
    description:
      'Results that appear on a P&L, not a slide. We define success metrics before we write a line of code.',
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-[--spacing-section-lg]" aria-labelledby="process-heading">
      <Container>
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6">How we work</Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <H2 id="process-heading">Four steps. Measurable outcome.</H2>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={cn(
                'relative border-[--color-border-default] py-8 md:py-0',
                'border-t md:border-t-0 md:border-l',
                i === 0 && 'border-t-0 md:border-l-0',
                'md:px-8'
              )}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay: 0.1 + i * 0.1,
              }}
            >
              {/* Step number */}
              <span
                className="mb-4 block text-xs font-[var(--font-geist)] font-medium tracking-[0.15em]"
                style={{ color: 'var(--color-accent-primary)' }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-ivory mb-3 text-base font-[var(--font-geist)] font-semibold tracking-tight">
                {step.title}
              </h3>

              {/* Description */}
              <Body className="text-sm">{step.description}</Body>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
