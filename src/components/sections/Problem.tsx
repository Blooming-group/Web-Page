'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/ui/Container'

const statements = [
  'Strategy consultants produce frameworks.',
  'Agencies produce output.',
  'Neither produces results.',
]

export function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="py-[--spacing-section-lg]"
      style={{
        background:
          'radial-gradient(ellipse 60% 35% at 50% 0%, rgba(74,124,111,0.07) 0%, transparent 80%)',
      }}
      aria-labelledby="problem-heading"
    >
      <Container size="narrow">
        <div className="space-y-10 text-center">
          {/* Opening */}
          <motion.p
            id="problem-heading"
            className="type-h2 text-ivory"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Most firms either think or build.
          </motion.p>

          {/* Statements */}
          <div className="space-y-3">
            {statements.map((s, i) => (
              <motion.p
                key={s}
                className="type-body text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: 0.15 + i * 0.1,
                }}
              >
                {s}
              </motion.p>
            ))}
          </div>

          {/* Position claim */}
          <motion.p
            className="type-h3 mx-auto max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            Blooming occupies the position{' '}
            <span style={{ color: 'var(--color-accent-secondary)' }}>
              no competitor currently holds.
            </span>
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
