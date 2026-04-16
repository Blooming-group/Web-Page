import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { H1, H2, Body, Caption } from '@/components/ui/Typography'
import { sanityFetch } from '@/sanity/lib/client'
import { articlesQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Thinking',
  description:
    'Blooming Group on strategy, technology, operations, and the European mid-market. We write when there is something worth saying.',
}

type Article = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  category: string
  readTime?: number
  featured?: boolean
}

const categoryLabels: Record<string, string> = {
  strategy: 'Strategy',
  technology: 'Technology',
  operations: 'Operations',
  'ai-automation': 'AI & Automation',
  'european-business': 'European Business',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ThinkingPage() {
  let articles: Article[] = []
  try {
    articles = await sanityFetch<Article[]>(articlesQuery)
  } catch {
    // Sanity unavailable — degrade gracefully to empty state
  }

  const featured = articles.find((a) => a.featured)
  const rest = articles.filter((a) => !a.featured)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24" aria-labelledby="thinking-heading">
        <Container>
          <Badge className="mb-8">Thinking</Badge>
          <H1 id="thinking-heading" className="mb-6 max-w-2xl">
            We write when the market is wrong about something.
          </H1>
          <Body className="max-w-xl">
            On strategy, technology, operations, and the companies navigating all three at the same
            time. Each piece takes a position. If no one could disagree with it, we don&apos;t
            publish it.
          </Body>
        </Container>
      </section>

      <Separator />

      {articles.length === 0 ? (
        /* ── Empty state ── */
        <section className="py-24" aria-label="Articles coming soon">
          <Container size="narrow">
            <div className="space-y-10">
              <div>
                <div
                  className="mb-6 h-px w-8"
                  style={{ background: 'var(--color-accent-primary)' }}
                  aria-hidden="true"
                />
                <H2 className="mb-4">First articles in development.</H2>
                <Body>
                  We&apos;re working on pieces that cover the gap between strategic intent and
                  operational reality, what AI adoption actually looks like for a company with 80
                  employees, and why most automation projects fail before they&apos;re deployed.
                  They&apos;ll appear here when they&apos;re ready — not before.
                </Body>
              </div>

              <div className="flex flex-wrap gap-3" aria-label="Upcoming topics">
                {Object.values(categoryLabels).map((label) => (
                  <span
                    key={label}
                    className="rounded-sm border border-[--color-border-default] px-3 py-1.5 text-xs tracking-wide"
                    style={{ color: 'var(--color-mid)' }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="border-t border-[--color-border-default] pt-10">
                <p className="mb-2 text-sm font-medium" style={{ color: 'var(--color-ivory)' }}>
                  We publish when there&apos;s something worth saying.
                </p>
                <Body className="mb-6">
                  No schedule. No filler. When a new piece is ready, we send it once.
                </Body>
                <Button asChild variant="outline">
                  <Link href="/contact">
                    Get notified
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        /* ── Article listing ── */
        <section className="py-20" aria-label="Articles">
          <Container>
            {/* Featured */}
            {featured && (
              <div className="mb-16">
                <Link
                  href={`/thinking/${featured.slug.current}`}
                  className="group block border border-[--color-border-default] p-8 transition-all duration-300 hover:border-[--color-border-accent] md:p-12"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <Badge variant="highlight">
                      {categoryLabels[featured.category] ?? featured.category}
                    </Badge>
                    <Caption>{formatDate(featured.publishedAt)}</Caption>
                    {featured.readTime && <Caption>{featured.readTime} min read</Caption>}
                  </div>
                  <h2
                    className="mb-4 text-2xl leading-tight font-semibold tracking-tight transition-opacity duration-200 group-hover:opacity-75 md:text-3xl"
                    style={{ color: 'var(--color-ivory)' }}
                  >
                    {featured.title}
                  </h2>
                  <Body className="mb-6 max-w-2xl">{featured.excerpt}</Body>
                  <div
                    className="inline-flex items-center gap-2 text-sm tracking-wide"
                    style={{ color: 'var(--color-accent-primary)' }}
                    aria-hidden="true"
                  >
                    Read article <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <Link
                    key={article._id}
                    href={`/thinking/${article.slug.current}`}
                    className="group block border border-[--color-border-default] p-6 transition-all duration-300 hover:border-[--color-border-accent]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <span
                      className="mb-4 block text-xs font-medium tracking-[0.1em] uppercase"
                      style={{ color: 'var(--color-accent-primary)' }}
                    >
                      {categoryLabels[article.category] ?? article.category}
                    </span>
                    <h3
                      className="mb-3 text-base leading-snug font-semibold tracking-tight transition-opacity duration-200 group-hover:opacity-75"
                      style={{ color: 'var(--color-ivory)' }}
                    >
                      {article.title}
                    </h3>
                    <Caption as="p" className="mb-4 line-clamp-3 tracking-normal normal-case">
                      {article.excerpt}
                    </Caption>
                    <div className="flex items-center justify-between">
                      <Caption>{formatDate(article.publishedAt)}</Caption>
                      {article.readTime && <Caption>{article.readTime} min</Caption>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}
    </div>
  )
}
