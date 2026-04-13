import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, H3, Body, Caption } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: 'About',
  description: "Blooming Group — the firm European mid-market companies needed and didn't have.",
}

const notVs = [
  { not: 'Creative agency', is: 'Strategically driven' },
  { not: 'Generic consultancy', is: 'Precision-specific' },
  { not: 'Another AI wrapper', is: 'Real implementation capability' },
  { not: 'Big 4 satellite', is: 'Built for mid-market speed' },
  { not: 'Deck factory', is: 'Measurable outcomes in weeks' },
]

const principles = [
  {
    title: 'Clarity as a weapon',
    body: 'In a market where complexity is sold as a proxy for value, the firm that delivers clarity wins. We convert operational chaos into decisions with consequences — not frameworks for thinking about decisions.',
  },
  {
    title: 'Strategy earns its keep through execution',
    body: 'The gap between strategic intent and operational reality is where value is destroyed. We exist in that gap. Our diagnostics are not academic exercises — they are prerequisites for systems we then build and deploy.',
  },
  {
    title: 'Dense over verbose',
    body: 'Every element of our work carries weight. Every recommendation is defensible. Every deliverable has a direct line to a business outcome. We do not produce volume. We produce density.',
  },
  {
    title: 'The right problem before the right solution',
    body: 'We do not recommend services before we understand the problem. Every engagement begins with a diagnostic session. We ask questions that make clients uncomfortable — because the discomfort is where the real problem lives.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="about-page-heading">
        <Container>
          <Badge className="mb-8">Who we are</Badge>
          <H1 id="about-page-heading" className="mb-6 max-w-3xl">
            The firm the market needed.
          </H1>
          <Body className="max-w-2xl">
            European mid-market companies operate at the intersection of two broken markets:
            strategy consultancies that think but don&apos;t build, and technology agencies that
            build without thinking. Blooming was built to occupy the space between them — and make
            it permanent.
          </Body>
        </Container>
      </section>

      <Separator />

      {/* Positioning */}
      <section className="py-20" aria-labelledby="positioning-heading">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <H2 id="positioning-heading" className="mb-6">
                What Blooming is. And is not.
              </H2>
              <Body>
                Positioning is not a marketing exercise. It is a decision about who you are willing
                to lose. Blooming has made that decision clearly.
              </Body>
            </div>

            <div className="space-y-0">
              {notVs.map((row) => (
                <div
                  key={row.not}
                  className="grid grid-cols-2 gap-4 border-b border-[--color-border-default] py-4 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-mid text-xs">✗</span>
                    <Caption as="p" className="tracking-normal normal-case line-through opacity-40">
                      {row.not}
                    </Caption>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--color-accent-primary)' }}>
                      ✓
                    </span>
                    <Caption
                      as="p"
                      className="tracking-normal normal-case"
                      style={{ color: 'var(--color-ivory)' }}
                    >
                      {row.is}
                    </Caption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Dense Intelligence */}
      <section className="py-20" aria-labelledby="dense-intelligence-heading">
        <Container size="narrow">
          <Badge className="mb-8" variant="highlight">
            Dense Intelligence
          </Badge>
          <H2 id="dense-intelligence-heading" className="mb-6">
            The territory we own.
          </H2>
          <div className="space-y-6">
            <Body>
              Dense Intelligence is not a tagline. It is the operating principle behind every
              decision Blooming makes — for itself and for its clients.
            </Body>
            <Body>
              It means: every element carries weight. Nothing is decorative. Nothing exists without
              function. The opposite of the consulting industry&apos;s instinct to produce volume as
              a signal of effort.
            </Body>
            <Body>
              Our clients don&apos;t need more information. They need the right information,
              structured in a way that makes the next decision obvious. That is what we deliver.
            </Body>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Principles */}
      <section className="py-20" aria-labelledby="principles-heading">
        <Container>
          <H2 id="principles-heading" className="mb-16 max-w-sm">
            How we think.
          </H2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="space-y-3">
                <H3>{p.title}</H3>
                <Body>{p.body}</Body>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24" aria-labelledby="about-cta">
        <Container>
          <div className="rounded-sm border border-[--color-border-accent] p-12">
            <H2 id="about-cta" className="mb-4 max-w-xl">
              If this resonates, we should talk.
            </H2>
            <Body className="mb-10 max-w-lg">
              The diagnostic session is 45 minutes. No pitch. No slides. We ask questions about your
              operation and tell you exactly what we see — whether or not Blooming is the answer.
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
