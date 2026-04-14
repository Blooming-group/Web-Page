import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, H3, Body } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: 'The Diagnostic',
  description:
    'A free 45-minute structured session to identify the real operational problem — not the presented one. No pitch. No slides. Just questions and a clear diagnosis.',
}

const phases = [
  {
    time: '0 – 20 min',
    title: 'We ask questions.',
    body: 'About your operation, your team structure, your current metrics, your biggest friction points, and where your time is actually going. We are not qualifying you as a client. We are building an operational picture. The questions will be specific — and some will be uncomfortable, because the discomfort is where the real problem lives.',
  },
  {
    time: '20 – 35 min',
    title: 'We reflect back what we heard.',
    body: 'We summarise our read of your situation and test whether we understood it correctly. This is not a mirror exercise — we will often frame what we heard differently than you framed it. That reframing is itself the first value delivery of the session.',
  },
  {
    time: '35 – 45 min',
    title: 'We tell you what we see.',
    body: "Our honest read. Where the real problem is. What kind of intervention it requires. Whether that intervention is something Blooming is positioned to deliver. If it isn't, we say that — and where possible, point you toward the right category of solution.",
  },
]

const outcomes = [
  {
    number: '01',
    label: 'Clear match',
    description:
      'The problem and the required intervention are aligned with what Blooming does. We produce a scoped proposal within 5 business days.',
  },
  {
    number: '02',
    label: 'Wrong provider',
    description:
      "The problem exists but it requires a different type of firm. We'll say that honestly and point you toward the right category of solution.",
  },
  {
    number: '03',
    label: 'Wrong problem',
    description:
      'The presented problem is not the real problem. We will tell you what we think it actually is. This is the most valuable outcome of the session — and it is free.',
  },
]

const faqs = [
  {
    q: 'Who should attend?',
    a: 'The person who makes decisions — not the person who coordinates them. If there is a CEO, COO, or founder, that is the right person. Coordinators and assistants can observe, but the session requires someone with operational authority.',
  },
  {
    q: 'Is there any obligation after the session?',
    a: 'None. The diagnostic is not a discovery call with a pre-written proposal attached. If the engagement is not a match, both parties walk away with more clarity than they arrived with.',
  },
  {
    q: 'Why is it free?',
    a: "We don't charge for the diagnostic because we don't yet know if we can help you. A fee would create an obligation to produce something — and that obligation would compromise the honesty of the session.",
  },
  {
    q: 'What is the format?',
    a: 'Video call. We share no slides. You need no preparation. The session is structured by us — you simply answer the questions as fully as you can.',
  },
  {
    q: 'How quickly can we schedule?',
    a: 'We confirm a session within 48 hours of your request. Simply send a message through the contact form and we will respond with available slots.',
  },
  {
    q: 'What if the problem is sensitive?',
    a: 'All diagnostic sessions are treated as confidential. We do not share information from a diagnostic session with any third party. If a proposal follows, the scope reflects only what is relevant to the engagement.',
  },
]

export default function DiagnosticPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="diagnostic-heading">
        <Container>
          <Badge className="mb-8">The Diagnostic</Badge>
          <H1 id="diagnostic-heading" className="mb-6 max-w-2xl">
            45 minutes. No agenda. Just questions.
          </H1>
          <Body className="mb-12 max-w-xl">
            The diagnostic session is not a sales call. It is a structured session designed to get
            from the presented problem to the real one. We ask the questions. You leave with a clear
            diagnosis — regardless of whether we work together.
          </Body>
          <Button size="lg" asChild>
            <Link href="/contact">
              Book your session
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>

      <Separator />

      {/* Session structure */}
      <section className="py-20" aria-labelledby="session-structure-heading">
        <Container>
          <H2 id="session-structure-heading" className="mb-16 max-w-sm">
            What happens in the session.
          </H2>
          <div className="grid grid-cols-1 gap-px bg-[--color-border-default] md:grid-cols-3">
            {phases.map((phase, i) => (
              <div
                key={i}
                className="space-y-4 p-8 md:p-10"
                style={{ background: 'var(--color-base)' }}
              >
                <span
                  className="block text-xs font-medium tracking-[0.12em] uppercase"
                  style={{ color: 'var(--color-accent-primary)' }}
                >
                  {phase.time}
                </span>
                <H3>{phase.title}</H3>
                <Body className="text-sm">{phase.body}</Body>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      {/* Outcomes */}
      <section className="py-20" aria-labelledby="outcomes-heading">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <H2 id="outcomes-heading" className="mb-6">
                Every session ends with one of three outcomes.
              </H2>
              <Body>
                There is no fourth outcome. We do not leave sessions ambiguous. One of these three
                things is true — and we will tell you which one before the call ends.
              </Body>
            </div>
            <div className="space-y-8">
              {outcomes.map((outcome) => (
                <div key={outcome.number} className="flex gap-5">
                  <span
                    className="mt-0.5 shrink-0 text-xs font-medium tracking-[0.12em]"
                    style={{ color: 'var(--color-accent-primary)' }}
                  >
                    {outcome.number}
                  </span>
                  <div>
                    <p
                      className="mb-1.5 text-sm font-semibold tracking-wide"
                      style={{ color: 'var(--color-ivory)' }}
                    >
                      {outcome.label}
                    </p>
                    <Body className="text-sm">{outcome.description}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* FAQ */}
      <section className="py-20" aria-labelledby="faq-heading">
        <Container>
          <H2 id="faq-heading" className="mb-16 max-w-sm">
            Before you book.
          </H2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <div key={i} className="space-y-3">
                <div
                  className="h-px w-8"
                  style={{ background: 'var(--color-border-default)' }}
                  aria-hidden="true"
                />
                <H3 className="text-base">{faq.q}</H3>
                <Body className="text-sm">{faq.a}</Body>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      {/* Final CTA */}
      <section className="py-24" aria-labelledby="diagnostic-cta">
        <Container>
          <div
            className="rounded-sm border border-[--color-border-accent] p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(74,124,111,0.05) 0%, transparent 60%)',
            }}
          >
            <H2 id="diagnostic-cta" className="mb-4 max-w-xl">
              The session costs nothing. The clarity is permanent.
            </H2>
            <Body className="mb-10 max-w-lg">
              Request a session and we will confirm your slot within 48 hours. Come with the real
              problem — or let us find it.
            </Body>
            <Button size="lg" asChild>
              <Link href="/contact">
                Request your diagnostic
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
