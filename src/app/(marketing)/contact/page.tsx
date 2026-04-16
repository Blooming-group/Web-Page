import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, Body, Caption } from '@/components/ui/Typography'
import { BloomingMark } from '@/components/ui/BloomingMark'
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
      <section className="py-24" aria-labelledby="contact-page-heading">
        <Container>
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

            {/* Mark — brand signature */}
            <div className="flex shrink-0 items-start justify-center md:justify-end md:pt-2">
              <BloomingMark size={120} className="opacity-80" />
            </div>
          </div>
        </Container>
      </section>

      <Separator />

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
                {whatToExpect.map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span
                      className="mt-1 shrink-0 text-xs font-[var(--font-geist)] font-medium tracking-[0.15em]"
                      style={{ color: 'var(--color-accent-primary)' }}
                      aria-hidden="true"
                    >
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-ivory mb-2 text-sm font-[var(--font-geist)] font-semibold tracking-wide">
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
