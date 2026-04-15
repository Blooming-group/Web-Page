'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { H2, Body } from '@/components/ui/Typography'

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-[--spacing-section-lg]" aria-labelledby="cta-heading">
      {/* Gold gradient top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(200,169,110,0.28) 50%, transparent)',
        }}
        aria-hidden="true"
      />
      <Container>
        <div
          className="rounded-sm border border-[--color-border-accent] p-12 md:p-20"
          style={{
            background: 'linear-gradient(135deg, rgba(74,124,111,0.05) 0%, transparent 60%)',
          }}
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <H2 id="cta-heading">Ready to be clear about what&apos;s next?</H2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Body className="mt-4 mb-10">
                Not a sales call. A diagnostic session. We identify what is holding your growth back
                — and whether Blooming is the right firm to fix it.
              </Body>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start the conversation
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
