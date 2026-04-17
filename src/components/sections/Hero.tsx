'use client'

import * as React from 'react'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { BloomingMarkAnimated } from '@/components/ui/BloomingMarkAnimated'

const headline = ['Most companies know they have a problem.', 'Very few know which one.']

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const markY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const markScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center pt-20"
      aria-label="Hero"
    >
      {/* Layer 1: Dot grid dense */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'var(--dot-grid-dense)',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Teal radial glow — 0.14 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(74,124,111,0.14) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Gold radial glow — 0.06 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 75% 35%, rgba(200,169,110,0.06) 0%, transparent 70%)',
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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left — content (7 cols) */}
          <div className="lg:col-span-7">
            {/* Label */}
            <motion.p
              className="mb-10 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-accent-primary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              Blooming Group
            </motion.p>

            {/* Animated headline */}
            <h1 className="type-display mb-10" aria-label={headline.join(' ')}>
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
              className="type-body mb-14 max-w-2xl"
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
                  Start Diagnosis
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

          {/* Right — BloomingMarkAnimated (5 cols) */}
          <motion.div
            className="hidden items-start justify-center lg:col-span-5 lg:-mt-12 lg:flex"
            style={{ y: markY, scale: markScale }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <BloomingMarkAnimated size={480} />
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
