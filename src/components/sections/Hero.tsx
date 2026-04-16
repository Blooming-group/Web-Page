'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const headline = ['Most companies know they have a problem.', 'Very few know which one.']

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center pt-20" aria-label="Hero">
      {/* Dot grid — architectural depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(242,238,230,0.045) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Radial green glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,124,111,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Accent line — top left */}
      <motion.div
        className="absolute top-24 left-0 h-px"
        style={{
          transformOrigin: 'left',
          background: 'linear-gradient(to right, rgba(74,124,111,0.5), transparent)',
          width: '15vw',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        aria-hidden="true"
      />

      <Container className="relative z-10 pt-16 pb-24">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.p
            className="mb-8 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-accent-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Blooming Group
          </motion.p>

          {/* Animated headline */}
          <h1 className="type-display mb-8" aria-label={headline.join(' ')}>
            {headline.map((line, lineIdx) => (
              <span key={lineIdx} className="block overflow-hidden">
                {line.split(' ').map((word, wordIdx) => (
                  <motion.span
                    key={`${lineIdx}-${wordIdx}`}
                    className="mr-[0.25em] inline-block"
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.2 + lineIdx * 0.15 + wordIdx * 0.08,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <motion.p
            className="type-body mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
          >
            We find the real problem first. Then we build the solution, in weeks, not quarters.{' '}
            <span style={{ color: 'var(--color-mid)' }}>
              Strategy and technology, same team, no handoffs.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          >
            <Button size="lg" asChild>
              <Link href="/contact">
                Start with a diagnosis
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
            <Link
              href="/services"
              className="text-sm tracking-wide transition-colors duration-200"
              style={{ color: 'var(--color-mid)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-mid)')}
            >
              See what we build →
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="h-10 w-px bg-[--color-border-default]"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
