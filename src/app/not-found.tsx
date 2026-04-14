import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Container>
        <div className="mx-auto max-w-2xl py-32">
          {/* Accent line */}
          <div className="mb-12 h-px w-12 bg-[--color-accent-primary]" />

          <p
            className="mb-4 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            404
          </p>

          <h1
            className="mb-6 text-4xl leading-tight font-light tracking-tight md:text-5xl"
            style={{ color: 'var(--color-ivory)' }}
          >
            This page doesn&apos;t exist.
          </h1>

          <p
            className="mb-12 max-w-md text-lg leading-relaxed"
            style={{ color: 'var(--color-mid)' }}
          >
            The URL you followed may be broken, or the page may have been removed. Either way,
            there&apos;s nothing here.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="primary">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Start a conversation</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  )
}
