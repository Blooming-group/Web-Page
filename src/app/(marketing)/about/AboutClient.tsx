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
import { BloomingMark } from '@/components/ui/BloomingMark'

const notVs = [
  { not: 'A creative agency', is: 'A strategically driven firm that builds what it recommends' },
  { not: 'A generic consultancy', is: 'Specific to the problems the mid-market actually has' },
  { not: 'Another AI wrapper', is: 'A firm with end-to-end implementation capability' },
  { not: 'A downsized Big 4', is: 'Built for the speed and economics of growing companies' },
  { not: 'A deck factory', is: 'A firm that measures success on your P&L, not in slides' },
]

const principles = [
  {
    title: 'Clarity is a competitive weapon',
    body: 'In a market that sells complexity as a proxy for value, the firm that delivers clarity wins. We convert operational noise into decisions with consequences — not frameworks for thinking about decisions.',
  },
  {
    title: 'Diagnosis before prescription',
    body: "We don't recommend services before understanding the problem. Every engagement starts with a diagnostic session — and the questions will be uncomfortable, because the real problem rarely lives where it's comfortable to look.",
  },
  {
    title: 'Strategy without execution is entertainment',
    body: 'The gap between strategic intent and operational reality is where value is destroyed. Our diagnostics lead directly to systems we build and deploy — not to a deck someone else has to interpret and implement.',
  },
  {
    title: 'Dense over verbose',
    body: "Every recommendation is defensible. Every deliverable traces a direct line to a business outcome. We don't produce volume to signal effort. We produce density to produce results.",
  },
  {
    title: 'Say what we see',
    body: "We don't adjust findings to protect a relationship. When the real problem is a leadership decision rather than a process failure, we say that. A diagnosis that has been softened is no longer a diagnosis — it's reassurance.",
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

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="about-page-heading">
        <Container>
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            {/* Text */}
            <div className="flex-1">
              <FadeIn delay={0.05}>
                <Badge className="mb-8">Who we are</Badge>
              </FadeIn>
              <FadeIn delay={0.15}>
                <H1 id="about-page-heading" className="mb-6 max-w-2xl">
                  Built for the gap no one was serving.
                </H1>
              </FadeIn>
              <FadeIn delay={0.25}>
                <Body className="max-w-xl">
                  There are firms that think about strategy and firms that build technology. The
                  space between them — where diagnosis, architecture, and execution need to happen
                  as one — was empty. Blooming was built to occupy it.
                </Body>
              </FadeIn>
            </div>

            {/* Mark — large visual anchor */}
            <motion.div
              className="flex shrink-0 items-start justify-center md:justify-end md:pt-2"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <BloomingMark size={168} className="opacity-90" />
            </motion.div>
          </div>
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
                Positioning is a decision about who you&apos;re willing to lose. We made that
                decision.
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
              "Growing European companies face a structural problem when they need strategic and technological help. The major consultancies were built for global multinationals — their pace, their price point, and their model assume a different type of client. Technology vendors at the other end build fast but without strategic context. Between them sits a generation of ambitious businesses that have outgrown generic providers but can't access the thinking they need.",
              "That gap isn't an oversight. It's structural. No firm was built to own it — because owning it requires doing two things the industry separated long ago: thinking and building. At the same time. With the same team.",
              'Blooming was built for exactly that. Not a downsized version of a large firm. Not an upgraded agency. A firm that diagnoses before it prescribes, builds what it recommends, and measures success in outcomes — not in hours billed or pages delivered.',
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
              The operating principle.
            </H2>
          </FadeIn>
          <div className="space-y-6">
            {[
              'Dense Intelligence is not a tagline. It is the decision that governs every engagement, every deliverable, and every conversation at Blooming.',
              "It means: every element earns its place. Nothing is decorative. Nothing exists for volume. The opposite of the consulting industry's instinct to produce mass as proof of effort — the 200-page report, the six-month timeline, the deck that justifies the fee instead of serving the client.",
              "Our clients don't need more information. They need the right information, structured so the next decision becomes obvious.",
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

      {/* How We Operate */}
      <section className="py-20" aria-labelledby="principles-heading">
        <Container>
          <FadeIn>
            <H2 id="principles-heading" className="mb-16 max-w-sm">
              How we operate.
            </H2>
          </FadeIn>
          <div ref={principlesRef} className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                className="space-y-3"
                initial={{ opacity: 0, y: 24 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
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

      {/* People */}
      <section className="py-20" aria-labelledby="people-heading">
        <Container size="narrow">
          <FadeIn>
            <Badge className="mb-8">The team</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <H2 id="people-heading" className="mb-6">
              No handoff between who you meet and who does the work.
            </H2>
          </FadeIn>
          <div className="space-y-6">
            {[
              'The most common failure in consulting is invisible delegation. A senior partner sells the engagement. A junior team delivers it. The person who understood the problem is not the person solving it.',
              'At Blooming, the team that runs the diagnostic is the team that architects the solution, builds the system, and measures the outcome. There is no separate strategy team and implementation team. There is one team — senior from the first conversation to the last deployment.',
              'This is not a staffing preference. It is an operating principle. The quality of the diagnosis depends on the seniority of the person asking the questions. The quality of the execution depends on continuity with the diagnosis. Separating them is how value gets lost.',
            ].map((text, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1}>
                <Body>{text}</Body>
              </FadeIn>
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
                    A generation of European companies that compete on operational intelligence —
                    not inherited position, not capital advantage, not headcount. Every engagement
                    Blooming completes is evidence that clarity, deployed with precision, is the
                    highest-leverage asset a growing company can acquire.
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
                    In ten years, we want to point at a hundred companies across Europe that grew
                    faster, decided better, and built smarter because their operations became
                    precise. That is the firm we are building.
                  </Body>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <Separator />

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
                If this resonates, the diagnostic is the next step.
              </H2>
              <Body className="mb-10 max-w-lg">
                45 minutes. We ask questions about your operation and tell you what we see —
                including whether Blooming is the right firm for the problem. No pitch. No slides.
                No obligation.
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
