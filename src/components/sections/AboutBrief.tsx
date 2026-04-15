'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { H2, Body } from '@/components/ui/Typography'
import { Separator } from '@/components/ui/Separator'

export function AboutBrief() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[--spacing-section-lg]"
      aria-labelledby="about-brief-heading"
    >
      {/* Green gradient top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(74,124,111,0.3) 50%, transparent)',
        }}
        aria-hidden="true"
      />
      <Container size="narrow">
        <Separator className="mb-16" />

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <H2 id="about-brief-heading">Not another AI company.</H2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Body>
              Blooming is not a creative agency. Not a generic consultancy. Not a wrapper around a
              large language model. It is the firm that combines real strategic thinking with real
              implementation capability — accessible for European mid-market companies that can no
              longer afford to wait for results measured in quarters.
            </Body>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-200"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              The full picture
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
