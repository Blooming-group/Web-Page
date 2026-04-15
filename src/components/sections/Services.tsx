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
    name: 'Web Design & Development',
    description:
      'Precision-engineered digital presence. Built for performance, conversion, and brand gravity.',
  },
  {
    icon: Workflow,
    name: 'Process Automation',
    description:
      'Eliminate operational drag. We identify the bottlenecks others miss and automate them permanently.',
  },
  {
    icon: MessageSquare,
    name: 'Communications Automation',
    description:
      'Email, WhatsApp, Instagram — orchestrated as a coherent system. Not campaigns. Architecture.',
  },
  {
    icon: Bot,
    name: 'AI Chatbots',
    description:
      'Conversational interfaces trained on your business. Every interaction reflects your intelligence.',
  },
  {
    icon: Cpu,
    name: 'AI Agents',
    description:
      "Autonomous systems that handle the cognitive work your team shouldn't be doing manually.",
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
              <H2 id="services-heading">Implementation is the proof.</H2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Body className="mt-4">
                These are not commodities. They are the tangible evidence that Blooming executes —
                not just advises.
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
              Explore all services
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
