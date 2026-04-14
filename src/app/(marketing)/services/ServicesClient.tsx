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
    name: 'Web Design & Development',
    tagline: 'Your digital presence, engineered.',
    body: 'We build websites and digital products that convert. Not templates, not themes — precision-engineered systems built on modern stacks that perform at the top of every Lighthouse category. Your website is not a brochure. It is infrastructure.',
    notThis: 'Not a creative agency deliverable. Not a WordPress site with a premium theme.',
    id: 'web',
  },
  {
    icon: Workflow,
    name: 'Process Automation',
    tagline: 'Eliminate the drag your team has stopped noticing.',
    body: 'Every organisation accumulates operational friction over time. Manual processes, redundant approvals, data that lives in email threads. We map your actual workflows, identify the high-cost bottlenecks, and automate them permanently — typically delivering the investment back within 90 days.',
    notThis:
      'Not Zapier automations. Not surface-level integrations that break on the first edge case.',
    id: 'process-automation',
  },
  {
    icon: MessageSquare,
    name: 'Communications Automation',
    tagline: 'Email, WhatsApp, Instagram — as a coherent system.',
    body: 'Your customer communication channels should work as a unified intelligence layer, not independent tools. We architect and deploy automated communication systems across email, WhatsApp, and Instagram that feel personal, respond in real time, and scale without adding headcount.',
    notThis: 'Not bulk email blasts. Not a social media scheduling tool.',
    id: 'communications-automation',
  },
  {
    icon: Bot,
    name: 'AI Chatbots',
    tagline: 'Conversational interfaces trained on your business.',
    body: 'We deploy AI chatbots that actually know your products, your processes, and your brand voice. Trained on your documentation, connected to your systems, and tuned to handle the conversations your team currently handles manually. Every interaction reflects your intelligence.',
    notThis: 'Not a generic ChatGPT wrapper. Not a FAQ bot that routes every question to a human.',
    id: 'ai-chatbots',
  },
  {
    icon: Cpu,
    name: 'AI Agents',
    tagline: 'Autonomous systems for your most expensive bottlenecks.',
    body: 'For the cognitive work that is too complex for simple automation but too repetitive for your senior team, we build AI agents — autonomous systems that reason, decide, and act within defined boundaries. Research, qualification, classification, drafting — handled without supervision.',
    notThis:
      'Not an experiment. Not a pilot that lives in a sandbox. A production system with measurable output.',
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
                Discuss this service
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
            <Badge className="mb-8">What we build</Badge>
          </FadeIn>
          <FadeIn delay={0.15}>
            <H1 id="services-page-heading" className="mb-6 max-w-2xl">
              Five capabilities. Infinite combinations.
            </H1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Body className="max-w-xl">
              Each service is the tangible proof that Blooming executes — not just advises. Every
              engagement begins with diagnosis. We never recommend a service before we understand
              your problem.
            </Body>
          </FadeIn>

          {/* Quick-nav pills */}
          <FadeIn delay={0.4}>
            <nav aria-label="Jump to service" className="mt-10 flex flex-wrap gap-3">
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
      <section aria-label="Service details">
        {services.map((service, i) => (
          <div key={service.name}>
            <ServiceRow service={service} index={i} />
            {i < services.length - 1 && <Separator />}
          </div>
        ))}
      </section>

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
                Not sure which service applies to your situation?
              </H2>
              <Body className="mb-10 max-w-lg">
                That is exactly what the diagnostic session is for. We ask the right questions
                before recommending anything.
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
