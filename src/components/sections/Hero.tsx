'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const headline = ['Strategic thinking.', 'Real technology.']

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center pt-20" aria-label="Hero">
      {/* Subtle radial gradient — base atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,124,111,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 pt-16 pb-24">
        <div className="max-w-4xl">
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
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: lineIdx * 0.15 + wordIdx * 0.08,
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
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          >
            The European mid-market firm that bridges strategy and execution. No decks. No delays.
            Measurable outcomes.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
          >
            <Button size="lg" asChild>
              <Link href="/contact">
                Start the conversation
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
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
