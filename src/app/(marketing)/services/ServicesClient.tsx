'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Workflow, MessageSquare, Bot, Cpu } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, Body, Caption } from '@/components/ui/Typography'

const services = [
  {
    icon: Globe,
    name: 'Web Development',
    tagline: 'Your digital presence is not a brochure. It is infrastructure.',
    body: 'We build websites and digital products engineered for performance, conversion, and brand gravity. Modern stack. Top-tier Lighthouse scores across every category. Every element built to do measurable work — not to look good in a portfolio. For companies that need their digital presence to perform at the level of their ambition.',
    notThis:
      'Not a creative agency deliverable. Not a WordPress site with a premium theme. Not design without engineering behind it.',
    id: 'web',
  },
  {
    icon: Workflow,
    name: 'Process Automation',
    tagline: 'The bottlenecks your team stopped noticing are the ones costing you the most.',
    body: 'Every organisation accumulates operational friction as it grows. Manual processes that made sense at €3M in revenue become expensive at €30M. Approval chains that should take minutes take days. Data that should flow between systems lives in email threads. We map your real workflows — not the ones on the org chart — identify the high-cost bottlenecks, and automate them permanently. Typical payback: under 90 days.',
    notThis:
      'Not a chain of Zapier automations. Not surface-level integrations that break on the first edge case. Systems built to hold under operational pressure.',
    id: 'process-automation',
  },
  {
    icon: MessageSquare,
    name: 'Communications Automation',
    tagline: 'Every channel. One intelligence layer.',
    body: 'Your customer communication channels — email, WhatsApp, Instagram, web — should operate as one unified system, not as independent tools managed by separate people. We architect and deploy automated communication systems that feel personal, respond in real time, and scale without adding headcount. The customer never sees automation. They see attention.',
    notThis:
      'Not bulk email blasts. Not a social media scheduling tool. Not campaigns — architecture.',
    id: 'communications-automation',
  },
  {
    icon: Bot,
    name: 'AI Chatbots',
    tagline: 'The first point of contact that actually knows your business.',
    body: 'We deploy chatbots trained on your documentation, connected to your systems, and tuned to your voice. They handle the questions your team handles manually — with your knowledge, your judgment, and your standards. Every interaction reflects what your company actually knows, not a generic script that routes every real question to a human.',
    notThis:
      'Not a ChatGPT wrapper with your logo on it. Not an FAQ bot. An interface that performs like someone who has worked at your company for years.',
    id: 'ai-chatbots',
  },
  {
    icon: Cpu,
    name: 'AI Agents',
    tagline: "For the cognitive work your best people shouldn't be doing manually.",
    body: 'Some work is too complex for simple automation but too repetitive for the people currently doing it. Research, pre-qualification, classification, drafting, data reconciliation — cognitive tasks that consume senior capacity without producing senior-level value. We build autonomous systems that reason, decide, and act within defined boundaries. Production-grade from day one.',
    notThis:
      'Not a pilot that lives in a sandbox. Not a demo. A production system with measurable output.',
    id: 'ai-agents',
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

function ServiceRow({ service, index }: { service: (typeof services)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = service.icon
  const isEven = index % 2 === 0

  return (
    <div ref={ref} id={service.id} className="scroll-mt-24 py-20">
      <Container>
        <div
          className={`grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 ${
            !isEven ? 'md:[direction:rtl]' : ''
          }`}
        >
          {/* Identity */}
          <motion.div
            className={!isEven ? 'md:[direction:ltr]' : ''}
            initial={{ opacity: 0, x: isEven ? -32 : 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-[--color-border-accent]"
                aria-hidden="true"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <Icon size={18} style={{ color: 'var(--color-accent-primary)' }} />
              </motion.div>
              <Caption>0{index + 1}</Caption>
            </div>

            <H2 className="mb-2">{service.name}</H2>
            <p
              className="mt-2 text-base font-medium"
              style={{ color: 'var(--color-accent-secondary)' }}
            >
              {service.tagline}
            </p>

            <motion.div
              className="mt-6 h-px"
              style={{ background: 'var(--color-accent-primary)', transformOrigin: 'left' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 0.6 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Detail */}
          <motion.div
            className={`space-y-6 ${!isEven ? 'md:[direction:ltr]' : ''}`}
            initial={{ opacity: 0, x: isEven ? 32 : -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <Body>{service.body}</Body>
            <motion.div
              className="border-l-2 border-[--color-border-accent] pl-4"
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            >
              <Caption as="p" className="tracking-normal normal-case">
                <span style={{ color: 'var(--color-mid)' }}>Not this: </span>
                {service.notThis}
              </Caption>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-200"
                style={{ color: 'var(--color-accent-primary)' }}
              >
                Discuss this capability
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}

export function ServicesClient() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="services-page-heading">
        <Container>
          <FadeIn delay={0.05}>
            <Badge className="mb-8">Capabilities</Badge>
          </FadeIn>
          <FadeIn delay={0.15}>
            <H1 id="services-page-heading" className="mb-6 max-w-2xl">
              Five capabilities. One principle: diagnosis first.
            </H1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Body className="max-w-xl">
              We never recommend a capability before understanding the problem. Every service below
              exists because a specific type of operational challenge required it. The right
              combination for your company depends on what the diagnostic reveals — not on what we
              have available.
            </Body>
          </FadeIn>

          {/* Quick-nav pills */}
          <FadeIn delay={0.4}>
            <nav aria-label="Jump to capability" className="mt-10 flex flex-wrap gap-3">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-sm border border-[--color-border-default] px-3 py-1.5 text-xs tracking-wide transition-colors duration-200 hover:border-[--color-border-accent]"
                  style={{ color: 'var(--color-mid)' }}
                >
                  {s.name}
                </a>
              ))}
            </nav>
          </FadeIn>
        </Container>
      </section>

      <Separator />

      {/* Services */}
      <section aria-label="Capability details">
        {services.map((service, i) => (
          <div key={service.name}>
            <ServiceRow service={service} index={i} />
            {i < services.length - 1 && <Separator />}
          </div>
        ))}
      </section>

      <Separator />

      {/* Integration Note */}
      <section className="py-20" aria-labelledby="integration-heading">
        <Container size="narrow">
          <FadeIn>
            <div
              className="mb-4 h-px w-8"
              style={{ background: 'var(--color-accent-primary)' }}
              aria-hidden="true"
            />
            <H2 id="integration-heading" className="mb-6">
              These capabilities don&apos;t exist in isolation.
            </H2>
            <Body>
              Most engagements combine two or three capabilities. The real problem is rarely just a
              technology issue or just a process issue — it&apos;s the interaction between them. The
              diagnostic determines the right combination. That&apos;s why we never recommend a
              service before we understand what&apos;s actually going on.
            </Body>
          </FadeIn>
        </Container>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-24" aria-labelledby="services-cta">
        <Container>
          <FadeIn>
            <div
              className="rounded-sm border border-[--color-border-accent] p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(74,124,111,0.05) 0%, transparent 60%)',
              }}
            >
              <H2 id="services-cta" className="mb-4 max-w-xl">
                Not sure which of these applies to your situation?
              </H2>
              <Body className="mb-10 max-w-lg">
                That&apos;s exactly what the diagnostic session resolves. 45 minutes of questions —
                ours, not yours. You leave knowing what the real problem is and what kind of
                intervention it requires.
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
