'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Workflow, MessageSquare, Bot, Cpu } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
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
    <section ref={ref} className="py-[--spacing-section-lg]" aria-labelledby="services-heading">
      <Container>
        {/* Header */}
        <div className="mb-16 max-w-xl">
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
              These are not commodities. They are the tangible evidence that Blooming executes — not
              just advises.
            </Body>
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
                <Card hoverable className="h-full">
                  <CardHeader>
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-sm border border-[--color-border-accent]"
                      aria-hidden="true"
                    >
                      <Icon size={16} className="text-accent-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="type-h3 text-ivory mb-2 text-sm font-medium tracking-wide">
                      {service.name}
                    </h3>
                    <Caption as="p" className="text-mid tracking-normal normal-case">
                      {service.description}
                    </Caption>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
