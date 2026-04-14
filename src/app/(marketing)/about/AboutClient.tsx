'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, H3, Body, Caption } from '@/components/ui/Typography'

const notVs = [
  { not: 'Creative agency', is: 'Strategically driven' },
  { not: 'Generic consultancy', is: 'Precision-specific' },
  { not: 'Another AI wrapper', is: 'Real implementation capability' },
  { not: 'Big 4 satellite', is: 'Built for mid-market speed' },
  { not: 'Deck factory', is: 'Measurable outcomes in weeks' },
]

const principles = [
  {
    title: 'Clarity as a weapon',
    body: 'In a market where complexity is sold as a proxy for value, the firm that delivers clarity wins. We convert operational chaos into decisions with consequences — not frameworks for thinking about decisions.',
  },
  {
    title: 'Strategy earns its keep through execution',
    body: 'The gap between strategic intent and operational reality is where value is destroyed. We exist in that gap. Our diagnostics are not academic exercises — they are prerequisites for systems we then build and deploy.',
  },
  {
    title: 'Dense over verbose',
    body: 'Every element of our work carries weight. Every recommendation is defensible. Every deliverable has a direct line to a business outcome. We do not produce volume. We produce density.',
  },
  {
    title: 'The right problem before the right solution',
    body: 'We do not recommend services before we understand the problem. Every engagement begins with a diagnostic session. We ask questions that make clients uncomfortable — because the discomfort is where the real problem lives.',
  },
]

const values = [
  {
    title: 'Say what you see',
    body: "We don't adjust findings to protect a relationship. A diagnosis that has been softened is not a diagnosis — it is a reassurance. The value of honesty is destroyed the moment it is conditional.",
  },
  {
    title: 'No engagement without a diagnosed problem',
    body: 'We do not sell services. We diagnose problems and recommend the right response — which may not involve us. If the diagnostic session reveals Blooming is not the right firm, we say that.',
  },
  {
    title: 'Execution is the unit of measurement',
    body: 'Clarity is not the output. Change is the output. Clarity is the precondition. An engagement that produces a well-argued strategy and no operational change has delivered nothing.',
  },
  {
    title: 'Mid-market is not a compromise',
    body: 'We are not here because we were priced out of the top tier. The European mid-market — €5M to €200M — is where leverage is highest, competition for real thinking is lowest, and the opportunity to create lasting operational change is greatest. That is a strategy, not a constraint.',
  },
]

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function AboutClient() {
  const positioningRef = useRef<HTMLDivElement>(null)
  const positioningInView = useInView(positioningRef, { once: true, margin: '-60px' })

  const principlesRef = useRef<HTMLDivElement>(null)
  const principlesInView = useInView(principlesRef, { once: true, margin: '-60px' })

  const valuesRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-60px' })

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="about-page-heading">
        <Container>
          <FadeIn delay={0.05}>
            <Badge className="mb-8">Who we are</Badge>
          </FadeIn>
          <FadeIn delay={0.15}>
            <H1 id="about-page-heading" className="mb-6 max-w-3xl">
              The firm the market needed.
            </H1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Body className="max-w-2xl">
              European mid-market companies operate at the intersection of two broken markets:
              strategy consultancies that think but don&apos;t build, and technology agencies that
              build without thinking. Blooming was built to occupy the space between them — and make
              it permanent.
            </Body>
          </FadeIn>
        </Container>
      </section>

      <Separator />

      {/* Positioning */}
      <section className="py-20" aria-labelledby="positioning-heading">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <FadeIn>
              <H2 id="positioning-heading" className="mb-6">
                What Blooming is. And is not.
              </H2>
              <Body>
                Positioning is not a marketing exercise. It is a decision about who you are willing
                to lose. Blooming has made that decision clearly.
              </Body>
            </FadeIn>

            <div ref={positioningRef} className="space-y-0">
              {notVs.map((row, i) => (
                <motion.div
                  key={row.not}
                  className="grid grid-cols-2 gap-4 border-b border-[--color-border-default] py-4 last:border-b-0"
                  initial={{ opacity: 0, x: -16 }}
                  animate={positioningInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-mid text-xs">✗</span>
                    <Caption as="p" className="tracking-normal normal-case line-through opacity-40">
                      {row.not}
                    </Caption>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--color-accent-primary)' }}>
                      ✓
                    </span>
                    <Caption
                      as="p"
                      className="tracking-normal normal-case"
                      style={{ color: 'var(--color-ivory)' }}
                    >
                      {row.is}
                    </Caption>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Origin */}
      <section className="py-20" aria-labelledby="origin-heading">
        <Container size="narrow">
          <FadeIn>
            <Badge className="mb-8">Origin</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <H2 id="origin-heading" className="mb-6">
              Why Blooming exists.
            </H2>
          </FadeIn>
          <div className="space-y-6">
            {[
              'European mid-market companies — those operating between €5M and €200M in revenue — are systematically underserved by both ends of the professional services market. Strategy consultancies at the top operate at a scale and price point built for global multinationals. Technology agencies at the commodity end build without strategic context. Between them sits a generation of capable, ambitious businesses that have grown past the point where generic service providers are useful, but have not reached the threshold where the major firms pay attention.',
              'The gap exists because no firm was built to own it. Blooming was.',
              'We are not a downsized version of a big firm. We are not an upgraded agency. We are the category-defining firm for this tier of the market — one that thinks and builds at the same time, without separation, and measures success in outcomes that appear on a P&L.',
            ].map((text, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1}>
                <Body>{text}</Body>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      {/* Dense Intelligence */}
      <section className="py-20" aria-labelledby="dense-intelligence-heading">
        <Container size="narrow">
          <FadeIn>
            <Badge className="mb-8" variant="highlight">
              Dense Intelligence
            </Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <H2 id="dense-intelligence-heading" className="mb-6">
              The territory we own.
            </H2>
          </FadeIn>
          <div className="space-y-6">
            {[
              'Dense Intelligence is not a tagline. It is the operating principle behind every decision Blooming makes — for itself and for its clients.',
              "It means: every element carries weight. Nothing is decorative. Nothing exists without function. The opposite of the consulting industry's instinct to produce volume as a signal of effort.",
              "Our clients don't need more information. They need the right information, structured in a way that makes the next decision obvious. That is what we deliver.",
            ].map((text, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1}>
                <Body>{text}</Body>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <Link
              href="/manifesto"
              className="mt-8 inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-200"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              Read the full manifesto
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </FadeIn>
        </Container>
      </section>

      <Separator />

      {/* Principles */}
      <section className="py-20" aria-labelledby="principles-heading">
        <Container>
          <FadeIn>
            <H2 id="principles-heading" className="mb-16 max-w-sm">
              How we think.
            </H2>
          </FadeIn>
          <div ref={principlesRef} className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                className="space-y-3"
                initial={{ opacity: 0, y: 24 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              >
                <div
                  className="mb-4 h-px w-8"
                  style={{ background: 'var(--color-accent-primary)' }}
                  aria-hidden="true"
                />
                <H3>{p.title}</H3>
                <Body>{p.body}</Body>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      {/* Vision */}
      <section className="py-20" aria-labelledby="vision-heading">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <FadeIn>
              <Badge className="mb-8">Vision</Badge>
              <H2 id="vision-heading" className="mb-6">
                Where this ends up.
              </H2>
            </FadeIn>
            <div className="space-y-8">
              <FadeIn delay={0.1}>
                <div>
                  <p
                    className="mb-2 text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'var(--color-mid)' }}
                  >
                    The ambition
                  </p>
                  <Body>
                    A European mid-market that competes on operational intelligence — not capital
                    advantage, not headcount, not positioning inherited from a previous decade.
                    Every engagement Blooming completes is a data point in the argument that clarity
                    is a competitive weapon.
                  </Body>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div>
                  <p
                    className="mb-2 text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'var(--color-mid)' }}
                  >
                    The practical measure
                  </p>
                  <Body>
                    In ten years, we want to point to a hundred companies that grew faster and built
                    better because their operations were precise. That is the legacy we are building
                    toward.
                  </Body>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Values */}
      <section className="py-20" aria-labelledby="values-heading">
        <Container>
          <FadeIn>
            <H2 id="values-heading" className="mb-16 max-w-sm">
              What we will not compromise on.
            </H2>
          </FadeIn>
          <div ref={valuesRef} className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="space-y-3"
                initial={{ opacity: 0, y: 24 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              >
                <span
                  className="block text-xs font-medium tracking-[0.15em]"
                  style={{ color: 'var(--color-accent-secondary)' }}
                >
                  0{i + 1}
                </span>
                <H3>{v.title}</H3>
                <Body>{v.body}</Body>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24" aria-labelledby="about-cta">
        <Container>
          <FadeIn>
            <div
              className="rounded-sm border border-[--color-border-accent] p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(74,124,111,0.05) 0%, transparent 60%)',
              }}
            >
              <H2 id="about-cta" className="mb-4 max-w-xl">
                If this resonates, we should talk.
              </H2>
              <Body className="mb-10 max-w-lg">
                The diagnostic session is 45 minutes. No pitch. No slides. We ask questions about
                your operation and tell you exactly what we see — whether or not Blooming is the
                answer.
              </Body>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Book a diagnostic session
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}
