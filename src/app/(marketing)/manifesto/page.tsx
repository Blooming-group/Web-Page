import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'Dense Intelligence: the operating principle behind every decision Blooming makes. A manifesto on density, clarity, and why volume is the enemy of value.',
}

const sections = [
  {
    id: 'volume-problem',
    heading: 'The volume problem',
    body: [
      'The consulting industry has a volume problem. Not in the sense of too much work — in the sense of mistaking volume for value. A 200-slide deck is not more rigorous than a 20-slide deck. A six-month engagement is not more valuable than a six-week one. The instinct to produce mass as a signal of effort is the original sin of professional services — and it has compounded into an industry that is, by its own structural design, incapable of delivering the thing it sells: clarity.',
      'When a client receives a 300-page strategic assessment, they do not receive 300 pages of strategic value. They receive a signal: we worked hard on this. The signal justifies the fee. The fee is the product. The assessment is the packaging.',
      "This is not a cynical observation. Most people inside these firms are talented and motivated. The problem is structural: the business model rewards time, not outcomes. Hours billed. Pages produced. Frameworks presented. The metric that drives the firm is not the quality of the client's decision — it is the quantity of the firm's output.",
    ],
  },
  {
    id: 'density-argument',
    heading: 'The density argument',
    body: [
      'Dense Intelligence is the inverse of this model. It begins with a different question: if every element of what we deliver must earn its place — if nothing is decorative, nothing exists for volume, nothing is included because it fills a slide — what remains?',
      'What remains is the work. The actual diagnostic insight. The decision that changes something. The architecture that holds under pressure. The metric that appears on a P&L six months later and traces a direct line back to the intervention.',
      'Dense Intelligence is not about brevity. A diagnosis can be long and dense simultaneously. It is about signal-to-noise ratio. Every sentence carries weight. Every recommendation is defensible. Every deliverable has a direct line to a business outcome.',
    ],
  },
  {
    id: 'in-practice',
    heading: 'What this means in practice',
    body: [
      'At Blooming, Dense Intelligence governs how we ask questions, structure findings, scope engagements, and measure success. It means we do not begin work until we have diagnosed the real problem — not the presented problem. It means we do not produce frameworks that clients must interpret and translate into action; we produce actions. It means we do not report on what happened; we change what happens next.',
      "It also means something uncomfortable: we will tell clients things they don't want to hear. When the real problem is a leadership decision rather than a process failure, we say that. When the proposed solution is the wrong one, we say that too. Clarity requires that the person delivering it have no interest in softening it.",
      "The diagnostic session — free, structured, without a pre-written pitch — is the operational expression of this principle. We do not know before the session whether we can help. We find out during it. If we can't, we say that. If we can, the scope that follows reflects the actual problem, not the one we were hoping to be handed.",
    ],
  },
  {
    id: 'competitive-reality',
    heading: 'The competitive reality',
    body: [
      'The European mid-market is full of capable businesses being served by firms with the wrong operating principle. The major strategy firms charge for the packaging. Technology agencies charge for the output. Neither charges for the outcome — because charging for outcomes requires being precise about what the outcome is before the work begins.',
      'That precision is what Dense Intelligence demands. And it is what most firms are structurally incapable of delivering, because delivering it means being willing to say, occasionally: the engagement you want is not the right one.',
      'Blooming can say that. Because our business model — diagnostic before scope, outcomes not hours — is built around the obligation to say it.',
    ],
  },
  {
    id: 'the-bet',
    heading: 'The bet',
    body: [
      'Dense Intelligence is a bet: that there is a tier of the market — ambitious enough to want real strategic thinking, mature enough to hold a firm accountable for outcomes, and underserved enough that the category has no name yet — that will choose density over volume every time.',
      'We built the firm for that bet.',
    ],
  },
]

export default function ManifestoPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="manifesto-heading">
        <Container size="narrow">
          <Badge className="mb-8" variant="highlight">
            Dense Intelligence
          </Badge>
          <h1
            id="manifesto-heading"
            className="mb-6 text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: 'var(--color-ivory)' }}
          >
            Every element earns its place.
          </h1>
          <p className="text-sm tracking-wide" style={{ color: 'var(--color-mid)' }}>
            Published 2025 · Blooming Group
          </p>
        </Container>
      </section>

      <Separator />

      {/* Essay body */}
      <section className="py-20" aria-label="Manifesto content">
        <Container size="narrow">
          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <div
                  className="mb-4 h-px w-8"
                  style={{ background: 'var(--color-accent-primary)' }}
                  aria-hidden="true"
                />
                <h2
                  className="mb-6 text-xl font-semibold tracking-tight"
                  style={{ color: 'var(--color-ivory)' }}
                >
                  {section.heading}
                </h2>
                <div className="space-y-5">
                  {section.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed"
                      style={{ color: 'var(--color-ivory)', opacity: 0.85 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-24" aria-labelledby="manifesto-cta">
        <Container size="narrow">
          <h2
            id="manifesto-cta"
            className="mb-4 text-2xl font-semibold tracking-tight"
            style={{ color: 'var(--color-ivory)' }}
          >
            If this is the firm you were looking for.
          </h2>
          <p
            className="mb-10 max-w-lg text-base leading-relaxed"
            style={{ color: 'var(--color-mid)' }}
          >
            The diagnostic session is 45 minutes. No pitch. No slides. We ask questions about your
            operation and tell you exactly what we see.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book a diagnostic session
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-200"
              style={{ color: 'var(--color-mid)' }}
            >
              Read about the firm →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
