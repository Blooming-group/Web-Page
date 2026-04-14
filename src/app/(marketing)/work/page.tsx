import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, Body, Caption } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Engagement patterns and outcomes from Blooming Group. The proof is in progress — anonymised until clients consent to attribution.',
}

const patterns = [
  {
    context: 'Manufacturing — €40M revenue',
    timeline: '11 weeks',
    problem:
      'Six departments operating without a shared data layer. Four tools, three databases, no single operational view. Senior management making decisions from reports that were outdated before they were printed.',
    outcome:
      'Unified operational dashboard. Automated reporting stack. Cross-departmental data pipeline eliminating manual reconciliation.',
  },
  {
    context: 'Professional Services — €18M revenue',
    timeline: '8 weeks',
    problem:
      '40% of senior staff time consumed by tasks that existed because the firm had grown faster than its processes. Client onboarding took three weeks. Invoice cycles were manual. Nothing automated, everything urgent.',
    outcome:
      'Client onboarding reduced to 4 hours. Invoice pipeline rebuilt. Two senior hires repurposed to revenue-generating work.',
  },
  {
    context: 'Regional Retail Brand — €60M revenue',
    timeline: '6 weeks',
    problem:
      'Strong offline presence, five-year-old digital infrastructure. Email list of 80,000 contacts generating less conversion than the physical stores. No automation. No segmentation. No measurement framework.',
    outcome:
      'Full communications architecture deployed. Segmented flows live. Post-purchase, win-back, and re-engagement sequences generating measurable incremental revenue.',
  },
  {
    context: 'B2B Technology Company — €25M revenue',
    timeline: '9 weeks',
    problem:
      'Sales team spending 60% of time on pre-qualification that should not require human judgment. CRM populated with incomplete records. No lead scoring. No automated follow-up discipline.',
    outcome:
      'AI-assisted pre-qualification deployed. CRM hygiene enforced at the point of entry. Sales team cycle time reduced by 35%.',
  },
]

export default function WorkPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="work-heading">
        <Container>
          <Badge className="mb-8">The work</Badge>
          <H1 id="work-heading" className="mb-6 max-w-2xl">
            The proof is not always publishable.
          </H1>
          <Body className="max-w-xl">
            Our first clients are mid-engagement or have not yet consented to named attribution.
            What follows is the pattern of problems we solve and outcomes we deliver — without the
            names.
          </Body>
        </Container>
      </section>

      <Separator />

      {/* Engagement patterns */}
      <section className="py-20" aria-labelledby="patterns-heading">
        <Container>
          <H2 id="patterns-heading" className="mb-16 max-w-sm">
            Engagement patterns.
          </H2>
          <div className="space-y-0">
            {patterns.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-10 border-b border-[--color-border-default] py-12 last:border-b-0 md:grid-cols-3"
              >
                {/* Context + timeline */}
                <div>
                  <Caption className="mb-3 block">{p.context}</Caption>
                  <span
                    className="inline-block rounded-sm border border-[--color-border-default] px-2.5 py-1 text-xs tracking-wide"
                    style={{ color: 'var(--color-accent-primary)' }}
                  >
                    {p.timeline}
                  </span>
                </div>

                {/* Problem */}
                <div>
                  <p
                    className="mb-2 text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'var(--color-mid)' }}
                  >
                    The problem
                  </p>
                  <Body className="text-sm">{p.problem}</Body>
                </div>

                {/* Outcome */}
                <div>
                  <p
                    className="mb-2 text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'var(--color-mid)' }}
                  >
                    The outcome
                  </p>
                  <Body className="text-sm">{p.outcome}</Body>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      {/* Case studies note */}
      <section className="py-20" aria-labelledby="case-studies-note">
        <Container size="narrow">
          <div
            className="mb-8 h-px w-8"
            style={{ background: 'var(--color-accent-primary)' }}
            aria-hidden="true"
          />
          <H2 id="case-studies-note" className="mb-6">
            Full case studies are in progress.
          </H2>
          <Body className="mb-6">
            We are working with our first clients to develop documented case studies — with named
            attribution, before-and-after metrics, and full methodology. They will appear here as
            each client approves publication.
          </Body>
          <Body>
            If you want to speak directly with a client who has completed an engagement, ask us
            during the diagnostic session. We will arrange a reference call where we have
            permission.
          </Body>
        </Container>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-24" aria-labelledby="work-cta">
        <Container>
          <div
            className="rounded-sm border border-[--color-border-accent] p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(74,124,111,0.05) 0%, transparent 60%)',
            }}
          >
            <H2 id="work-cta" className="mb-4 max-w-xl">
              Every engagement above started with a diagnosis.
            </H2>
            <Body className="mb-10 max-w-lg">
              45 minutes. No pitch. We ask questions about your operation and tell you exactly what
              we see — whether or not Blooming is the right response.
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
