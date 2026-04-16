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
    'The 45-minute session that replaces the sales call. We find the real problem, not the presented one, and tell you honestly whether we can help.',
}

const phases = [
  {
    time: '0 – 20 min',
    title: 'We ask questions.',
    body: "About your operation, your team structure, your metrics, your friction points, and where time is actually going. The questions are specific. Some will be uncomfortable, because the real problem rarely lives where it's comfortable to look.",
  },
  {
    time: '20 – 35 min',
    title: 'We reflect what we heard.',
    body: 'We summarise our read of your situation, often framing it differently than you framed it. That reframing is not a technique. It is value: seeing the same facts from a different angle changes which decisions look obvious.',
  },
  {
    time: '35 – 45 min',
    title: 'We tell you what we see.',
    body: "Our honest assessment. Where the real problem is. What kind of intervention it requires. Whether Blooming is the right firm for it. If we're not, we say that and describe the type of provider you should be looking for.",
  },
]

const outcomes = [
  {
    number: '01',
    label: 'Clear match',
    description:
      'The problem and the required intervention align with what Blooming does. We deliver a scoped proposal within 5 business days: defined outcomes, timeline, and cost.',
  },
  {
    number: '02',
    label: 'Wrong provider',
    description:
      'The problem is real but it requires a different kind of firm. We tell you that directly and describe the category of provider that fits.',
  },
  {
    number: '03',
    label: 'Wrong problem',
    description:
      'What you presented is not the real problem. We tell you what we think it actually is. This is often the most valuable outcome of the session, and it costs nothing.',
  },
]

const faqs = [
  {
    q: 'Who should be on the call?',
    a: "The person closest to the problem, whether that's the CEO, a department head, or an operations lead. The session works best with someone who has both operational context and the authority to act on what we find. If that's two people, both are welcome.",
  },
  {
    q: 'Is there any obligation?',
    a: "None. The diagnostic is not a discovery call with a proposal already written. If the engagement isn't a match, both sides leave with more clarity than they arrived with.",
  },
  {
    q: 'Why is it free?',
    a: "Because we don't know yet if we can help. Charging for the diagnostic would create pressure to produce a recommendation, and that pressure would compromise the honesty of the session. We'd rather tell you we're not the right firm than sell you something we can't deliver.",
  },
  {
    q: "What's the format?",
    a: 'Video call. No slides. No preparation required on your end. We lead the conversation. You answer the questions as directly as you can.',
  },
  {
    q: 'How quickly can we schedule?',
    a: 'We confirm sessions within 48 hours of your request. Send a message through the contact form and we respond with available times.',
  },
  {
    q: 'What if the problem is sensitive?',
    a: "Every diagnostic session is confidential. We share nothing from the conversation with any third party. If a proposal follows, it reflects only what's relevant to the engagement.",
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
            The session that replaces the sales call.
          </H1>
          <Body className="mb-12 max-w-xl">
            45 minutes. No pitch. No slides. We ask questions about your operation, your team, and
            your constraints — and we tell you exactly what we see. You leave with a clear
            diagnosis, regardless of whether we end up working together.
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

      {/* Why It Exists */}
      <section className="py-20" aria-labelledby="why-heading">
        <Container size="narrow">
          <H2 id="why-heading" className="mb-6">
            Why we start here.
          </H2>
          <Body>
            Most consulting engagements begin with a proposal. The problem: proposals are written
            before the firm understands the problem. The result is a scope that addresses what was
            presented, not what&apos;s real. The diagnostic exists to find the real problem first.
            It&apos;s the most honest 45 minutes you&apos;ll spend with any firm, because we have no
            interest in softening what we find.
          </Body>
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
                There is no fourth option. We don&apos;t leave sessions open-ended. One of these
                three is true, and we tell you which one before the call ends.
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
              The session costs nothing. The clarity stays.
            </H2>
            <Body className="mb-10 max-w-lg">
              Send a brief description of your situation. We respond within 24 hours to confirm a
              time. Come with the real problem, or let us find it.
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
