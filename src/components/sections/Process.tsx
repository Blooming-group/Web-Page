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
      'We map your operational reality before touching a tool. No templates. No assumptions. The questions are specific. Some will be uncomfortable, because the real problem rarely lives where it\u2019s comfortable to look.',
  },
  {
    number: '02',
    title: 'Architect',
    description:
      'Every decision documented, defensible, and traceable to a business outcome. You see the blueprint before we write a line of code. Nothing proceeds on faith.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We ship in weeks, not quarters. Delivery is the starting point, not the milestone. If it doesn\u2019t work in production, it doesn\u2019t count.',
  },
  {
    number: '04',
    title: 'Measure',
    description:
      'Success metrics defined before the engagement starts, not after. Results that show up on a P&L, not a slide. If we can\u2019t measure it, we don\u2019t claim it.',
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[--spacing-section-lg]"
      style={{
        background:
          'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(74,124,111,0.03) 0%, transparent 100%)',
      }}
      aria-labelledby="process-heading"
    >
      {/* Gold gradient top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(200,169,110,0.3) 50%, transparent)',
        }}
        aria-hidden="true"
      />
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
            <H2 id="process-heading">Four phases. One rule: nothing ships without a diagnosis.</H2>
          </motion.div>
        </div>

        {/* Connector line — animates left to right on desktop */}
        <div className="relative mb-0 hidden md:block">
          <div
            className="absolute top-0 left-0 h-px w-full"
            style={{ background: 'var(--color-border-default)' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-0 left-0 h-px"
            style={{ background: 'var(--color-accent-primary)', transformOrigin: 'left' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            aria-hidden="true"
          >
            <motion.div
              className="absolute -top-[3px] -right-1 h-[7px] w-[7px] rounded-full"
              style={{ background: 'var(--color-accent-primary)' }}
            />
          </motion.div>
          {/* Width needs to span full container */}
          <div className="h-px w-full opacity-0" aria-hidden="true" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={cn(
                'relative border-[--color-border-default] py-8 md:py-0 md:pt-8',
                'border-t md:border-t-0 md:border-l',
                i === 0 && 'border-t-0 md:border-l-0',
                'md:px-8'
              )}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay: 0.3 + i * 0.12,
              }}
            >
              {/* Step dot on the connector line (desktop) */}
              <motion.div
                className="absolute -top-[5px] left-0 hidden h-[10px] w-[10px] rounded-full border-2 md:block"
                style={{
                  borderColor: 'var(--color-accent-primary)',
                  background: 'var(--color-base)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.12 }}
                aria-hidden="true"
              />

              {/* Step number */}
              <span
                className="mb-4 block text-xs font-medium tracking-[0.15em]"
                style={{ color: 'var(--color-accent-primary)' }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Title */}
              <h3
                className="mb-3 text-base font-semibold tracking-tight"
                style={{ color: 'var(--color-ivory)' }}
              >
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
