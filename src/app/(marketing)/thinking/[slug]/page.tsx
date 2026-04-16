import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from '@portabletext/react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Caption } from '@/components/ui/Typography'
import { sanityFetch } from '@/sanity/lib/client'
import { articleBySlugQuery, allArticleSlugsQuery } from '@/sanity/lib/queries'

type ArticleDetail = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  body: PortableTextBlock[]
  publishedAt: string
  category: string
  readTime?: number
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

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p
        className="mb-6 text-base leading-relaxed"
        style={{ color: 'var(--color-ivory)', opacity: 0.85 }}
      >
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="mt-12 mb-4 text-2xl font-semibold tracking-tight"
        style={{ color: 'var(--color-ivory)' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-lg font-semibold" style={{ color: 'var(--color-ivory)' }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 border-l-2 pl-6 text-lg font-light italic"
        style={{
          borderColor: 'var(--color-accent-primary)',
          color: 'var(--color-ivory)',
          opacity: 0.9,
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold" style={{ color: 'var(--color-ivory)' }}>
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="transition-opacity duration-200 hover:opacity-75"
        style={{
          color: 'var(--color-accent-primary)',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 space-y-2 pl-5" style={{ listStyleType: 'disc' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 space-y-2 pl-5" style={{ listStyleType: 'decimal' }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        className="text-base leading-relaxed"
        style={{ color: 'var(--color-ivory)', opacity: 0.85 }}
      >
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li
        className="text-base leading-relaxed"
        style={{ color: 'var(--color-ivory)', opacity: 0.85 }}
      >
        {children}
      </li>
    ),
  },
  types: {
    callout: ({ value }: { value: { heading?: string; body?: string; ctaText?: string } }) => (
      <div
        className="my-10 border-l-2 py-5 pr-4 pl-6"
        style={{
          background: 'rgba(74, 124, 111, 0.1)',
          borderColor: 'var(--color-accent-primary)',
        }}
      >
        {value.heading && (
          <p className="mb-2 text-base font-semibold" style={{ color: 'var(--color-ivory)' }}>
            {value.heading}
          </p>
        )}
        {value.body && (
          <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
            {value.body}
          </p>
        )}
        {value.ctaText && (
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-opacity duration-200 hover:opacity-75"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            {value.ctaText}
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        )}
      </div>
    ),
  },
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<Array<{ slug: { current: string } }>>(allArticleSlugsQuery)
    return slugs.map((s) => ({ slug: s.slug.current }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = await sanityFetch<ArticleDetail | null>(articleBySlugQuery, { slug })
    if (!article) return { title: 'Article not found' }
    return {
      title: article.title,
      description: article.excerpt,
    }
  } catch {
    return { title: 'Article' }
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let article: ArticleDetail | null = null
  try {
    article = await sanityFetch<ArticleDetail | null>(articleBySlugQuery, { slug })
  } catch {
    // Sanity unavailable
  }
  if (!article) notFound()

  return (
    <div className="pt-20">
      {/* Article header */}
      <section className="py-16" aria-labelledby="article-title">
        <Container size="narrow">
          <Link
            href="/thinking"
            className="mb-12 inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-200"
            style={{ color: 'var(--color-mid)' }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All articles
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Badge>{categoryLabels[article.category] ?? article.category}</Badge>
            <Caption>{formatDate(article.publishedAt)}</Caption>
            {article.readTime && <Caption>{article.readTime} min read</Caption>}
          </div>

          <h1
            id="article-title"
            className="mb-6 text-3xl leading-tight font-semibold tracking-tight md:text-4xl"
            style={{ color: 'var(--color-ivory)' }}
          >
            {article.title}
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-mid)' }}>
            {article.excerpt}
          </p>
        </Container>
      </section>

      <Separator />

      {/* Article body */}
      <section className="py-16" aria-label="Article content">
        <Container size="narrow">
          <PortableText value={article.body} components={ptComponents} />
        </Container>
      </section>

      <Separator />

      {/* Post-article CTA */}
      <section className="py-20" aria-label="Post-article CTA">
        <Container size="narrow">
          <div
            className="mb-8 h-px w-8"
            style={{ background: 'var(--color-accent-primary)' }}
            aria-hidden="true"
          />
          <h2
            className="mb-4 text-2xl font-semibold tracking-tight"
            style={{ color: 'var(--color-ivory)' }}
          >
            If this prompted a question.
          </h2>
          <p
            className="mb-8 max-w-md text-base leading-relaxed"
            style={{ color: 'var(--color-mid)' }}
          >
            The diagnostic session exists for exactly this — turning a question that good analysis
            raises into a specific, actionable answer for your operation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contact">Book a diagnostic session</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/thinking">
                <ArrowLeft size={14} aria-hidden="true" />
                More articles
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
