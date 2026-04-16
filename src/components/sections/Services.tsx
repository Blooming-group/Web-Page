'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Globe, Workflow, MessageSquare, Bot, Cpu } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { H2, Body, Caption } from '@/components/ui/Typography'

const services = [
  {
    icon: Globe,
    name: 'Web Development',
    description:
      'Not a brochure — infrastructure. Engineered for performance, conversion, and the kind of credibility that lets a growing company compete above its weight class.',
  },
  {
    icon: Workflow,
    name: 'Process Automation',
    description:
      'Every company has three or four processes consuming 40% of someone\u2019s time that shouldn\u2019t exist. We find them, eliminate them, and your team does the work that actually matters.',
  },
  {
    icon: MessageSquare,
    name: 'Communications Automation',
    description:
      'Email, WhatsApp, Instagram — orchestrated as one system. Not campaigns. Not blasts. A coherent layer that responds to each customer as if someone is paying attention. Because something is.',
  },
  {
    icon: Bot,
    name: 'AI Chatbots',
    description:
      'Trained on your business, connected to your systems, built with your tone. The first touchpoint that actually knows your company — instead of routing every real question to a human.',
  },
  {
    icon: Cpu,
    name: 'AI Agents',
    description:
      'For the cognitive work too complex for simple rules but too repetitive for your best people. Research, qualification, classification — handled without supervision. Production-grade, not experimental.',
  },
]

export function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[--spacing-section-lg]"
      aria-labelledby="services-heading"
    >
      {/* Green gradient top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(74,124,111,0.38) 50%, transparent)',
        }}
        aria-hidden="true"
      />
      <Container>
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6">What we build</Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <H2 id="services-heading">The proof is in what ships.</H2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Body className="mt-4">
                Every capability below exists because a specific type of problem required it. We
                don&apos;t sell services — we deploy the right combination after we understand
                what&apos;s actually wrong.
              </Body>
            </motion.div>
          </div>

          {/* "View all" CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="shrink-0"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-200"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              All capabilities
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: 0.15 + i * 0.08,
                }}
              >
                <Link
                  href="/services"
                  className="group block h-full rounded-sm border border-[--color-border-default] p-6 transition-all duration-300 hover:border-[--color-border-accent]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                  aria-label={`Learn about ${service.name}`}
                >
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm border border-[--color-border-accent] transition-colors duration-300 group-hover:border-[--color-accent-primary]"
                    aria-hidden="true"
                  >
                    <Icon size={16} style={{ color: 'var(--color-accent-primary)' }} />
                  </div>
                  <h3
                    className="group-hover:text-ivory mb-2 text-sm font-medium tracking-wide transition-colors duration-200"
                    style={{ color: 'var(--color-ivory)' }}
                  >
                    {service.name}
                  </h3>
                  <Caption as="p" className="text-mid tracking-normal normal-case">
                    {service.description}
                  </Caption>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: 'var(--color-accent-primary)' }}
                  >
                    Learn more <ArrowRight size={12} aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
