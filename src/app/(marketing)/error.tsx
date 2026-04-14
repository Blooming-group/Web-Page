'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Container>
        <div className="mx-auto max-w-2xl py-32">
          <div className="mb-12 h-px w-12" style={{ background: 'var(--color-accent-primary)' }} />

          <p
            className="mb-4 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            Something went wrong
          </p>

          <h1
            className="mb-6 text-4xl leading-tight font-light tracking-tight md:text-5xl"
            style={{ color: 'var(--color-ivory)' }}
          >
            An error occurred.
          </h1>

          <p
            className="mb-12 max-w-md text-lg leading-relaxed"
            style={{ color: 'var(--color-mid)' }}
          >
            The page failed to load. The team has been notified. You can try again or return to the
            home page.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button onClick={reset}>Try again</Button>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  )
}
