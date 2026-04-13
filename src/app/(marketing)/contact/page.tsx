import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, Body, Caption } from '@/components/ui/Typography'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a diagnostic session with Blooming Group. 45 minutes. No pitch. No slides.',
}

const whatToExpect = [
  {
    step: '01',
    title: '45 minutes',
    description: 'A focused conversation about your operation. We come prepared.',
  },
  {
    step: '02',
    title: 'No pitch',
    description: 'We will not sell you anything in this session. We will ask questions.',
  },
  {
    step: '03',
    title: 'Honest assessment',
    description: 'We tell you what we see — including if we are not the right fit.',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="contact-page-heading">
        <Container>
          <Badge className="mb-8">Start here</Badge>
          <H1 id="contact-page-heading" className="mb-4 max-w-xl">
            Not a contact form.
          </H1>
          <p
            className="mb-6 text-xl font-[var(--font-geist)] font-light"
            style={{ color: 'var(--color-accent-secondary)' }}
          >
            A diagnostic session.
          </p>
          <Body className="max-w-lg">
            Tell us about your situation. We will review it and respond within 24 hours to confirm a
            time for your session.
          </Body>
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
              <H2 className="mb-12">What to expect.</H2>
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
