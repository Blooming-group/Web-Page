import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { SilenceBlock } from '@/components/ui/SilenceBlock'
import { H1, H2, Body, Caption } from '@/components/ui/Typography'
import { BloomingMarkAnimated } from '@/components/ui/BloomingMarkAnimated'
import { ContactForm } from '@/components/sections/ContactForm'
import { JsonLd } from '@/components/JsonLd'

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Blooming Group — Diagnostic Session',
  url: 'https://blooming-group.eu/contact',
  description: 'Book a 45-minute diagnostic session with Blooming Group.',
}

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a diagnostic session with Blooming Group. 45 minutes. No pitch. No slides.',
}

const whatToExpect = [
  {
    step: '01',
    title: 'We respond within 24 hours',
    description:
      'With available times for your diagnostic session. Not an automated reply. A real response from a real person.',
  },
  {
    step: '02',
    title: '45-minute session',
    description: 'We ask questions about your operation. No preparation needed. We come prepared.',
  },
  {
    step: '03',
    title: 'Honest assessment',
    description:
      'We tell you what we see, including whether we are the right firm for the problem.',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-20">
      <JsonLd data={contactSchema} />
      {/* Hero */}
      <section className="relative py-24" aria-labelledby="contact-page-heading">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'var(--dot-grid-sparse)',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Gold glow — conversion intent */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 45% 40% at 75% 30%, rgba(200,169,110,0.05) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            {/* Text */}
            <div className="flex-1">
              <Badge className="mb-8">Start here</Badge>
              <H1 id="contact-page-heading" className="mb-4 max-w-xl">
                Not a contact form.
              </H1>
              <p
                className="mb-6 text-xl font-light"
                style={{ color: 'var(--color-accent-secondary)' }}
              >
                A diagnostic request.
              </p>
              <Body className="max-w-lg">
                Describe your situation in a few sentences. We review every message personally and
                respond within 24 hours to confirm your session.
              </Body>
            </div>

            {/* Animated mark */}
            <div className="hidden shrink-0 items-start justify-center md:flex md:justify-end md:pt-2">
              <BloomingMarkAnimated size={140} />
            </div>
          </div>
        </Container>
      </section>

      <SilenceBlock variant="section" />

      {/* Form + What to expect */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* What to expect */}
            <div>
              <H2 className="mb-12">What happens next.</H2>
              <div className="space-y-10">
                {whatToExpect.map((item, i) => (
                  <div
                    key={item.step}
                    className="card-interactive group relative flex gap-6 overflow-hidden rounded-sm border p-5"
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-[--duration-short] group-hover:scale-x-100"
                      style={{ background: 'var(--card-topline-color)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="mt-0.5 shrink-0 text-xs font-medium tracking-[0.15em]"
                      style={{ color: 'var(--color-accent-primary)' }}
                      aria-hidden="true"
                    >
                      {item.step}
                    </span>
                    <div>
                      <h3
                        className="mb-2 text-sm font-semibold tracking-wide"
                        style={{ color: 'var(--color-ivory)' }}
                      >
                        {item.title}
                      </h3>
                      <Caption as="p" className="text-mid tracking-normal normal-case">
                        {item.description}
                      </Caption>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
