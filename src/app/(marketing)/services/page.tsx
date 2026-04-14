import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe, Workflow, MessageSquare, Bot, Cpu } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, Body, Caption } from '@/components/ui/Typography'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Five implementation capabilities. Each one the tangible proof that Blooming executes — not just advises.',
}

const services = [
  {
    icon: Globe,
    name: 'Web Design & Development',
    tagline: 'Your digital presence, engineered.',
    body: 'We build websites and digital products that convert. Not templates, not themes — precision-engineered systems built on modern stacks that perform at the top of every Lighthouse category. Your website is not a brochure. It is infrastructure.',
    notThis: 'Not a creative agency deliverable. Not a WordPress site with a premium theme.',
  },
  {
    icon: Workflow,
    name: 'Process Automation',
    tagline: 'Eliminate the drag your team has stopped noticing.',
    body: 'Every organisation accumulates operational friction over time. Manual processes, redundant approvals, data that lives in email threads. We map your actual workflows, identify the high-cost bottlenecks, and automate them permanently — typically delivering the investment back within 90 days.',
    notThis:
      'Not Zapier automations. Not surface-level integrations that break on the first edge case.',
  },
  {
    icon: MessageSquare,
    name: 'Communications Automation',
    tagline: 'Email, WhatsApp, Instagram — as a coherent system.',
    body: 'Your customer communication channels should work as a unified intelligence layer, not independent tools. We architect and deploy automated communication systems across email, WhatsApp, and Instagram that feel personal, respond in real time, and scale without adding headcount.',
    notThis: 'Not bulk email blasts. Not a social media scheduling tool.',
  },
  {
    icon: Bot,
    name: 'AI Chatbots',
    tagline: 'Conversational interfaces trained on your business.',
    body: 'We deploy AI chatbots that actually know your products, your processes, and your brand voice. Trained on your documentation, connected to your systems, and tuned to handle the conversations your team currently handles manually. Every interaction reflects your intelligence.',
    notThis: 'Not a generic ChatGPT wrapper. Not a FAQ bot that routes every question to a human.',
  },
  {
    icon: Cpu,
    name: 'AI Agents',
    tagline: 'Autonomous systems for your most expensive bottlenecks.',
    body: 'For the cognitive work that is too complex for simple automation but too repetitive for your senior team, we build AI agents — autonomous systems that reason, decide, and act within defined boundaries. Research, qualification, classification, drafting — handled without supervision.',
    notThis:
      'Not an experiment. Not a pilot that lives in a sandbox. A production system with measurable output.',
  },
]

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Blooming Group Services',
  url: 'https://blooming-group.eu/services',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.name,
      description: s.body,
      provider: { '@type': 'Organization', name: 'Blooming Group' },
    },
  })),
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <JsonLd data={servicesSchema} />
      {/* Hero */}
      <section className="py-24" aria-labelledby="services-page-heading">
        <Container>
          <Badge className="mb-8">What we build</Badge>
          <H1 id="services-page-heading" className="mb-6 max-w-2xl">
            Five capabilities. Infinite combinations.
          </H1>
          <Body className="max-w-xl">
            Each service is the tangible proof that Blooming executes — not just advises. Every
            engagement begins with diagnosis. We never recommend a service before we understand your
            problem.
          </Body>
        </Container>
      </section>

      <Separator />

      {/* Services list */}
      <section aria-label="Service details">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <div key={service.name}>
              <div className="py-20">
                <Container>
                  <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
                    {/* Left */}
                    <div>
                      <div className="mb-6 flex items-center gap-4">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-sm border border-[--color-border-accent]"
                          aria-hidden="true"
                        >
                          <Icon size={18} className="text-accent-primary" />
                        </div>
                        <Caption>0{i + 1}</Caption>
                      </div>
                      <H2 className="mb-2">{service.name}</H2>
                      <p
                        className="mt-2 text-base font-[var(--font-geist)] font-medium"
                        style={{ color: 'var(--color-accent-secondary)' }}
                      >
                        {service.tagline}
                      </p>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                      <Body>{service.body}</Body>
                      <div className="border-l-2 border-[--color-border-default] pl-4">
                        <Caption as="p" className="tracking-normal normal-case">
                          <span className="text-mid">Not this: </span>
                          {service.notThis}
                        </Caption>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
              {i < services.length - 1 && <Separator />}
            </div>
          )
        })}
      </section>

      {/* CTA */}
      <section className="py-24" aria-labelledby="services-cta">
        <Container>
          <div className="rounded-sm border border-[--color-border-accent] p-12">
            <H2 id="services-cta" className="mb-4 max-w-xl">
              Not sure which service applies to your situation?
            </H2>
            <Body className="mb-10 max-w-lg">
              That is exactly what the diagnostic session is for. We ask the right questions before
              recommending anything.
            </Body>
            <Button size="lg" asChild>
              <Link href="/contact">
                Book a diagnostic session
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
