import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Body } from '@/components/ui/Typography'

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center">
      <Container size="narrow">
        <p
          className="mb-8 text-[clamp(5rem,15vw,10rem)] leading-none font-light tabular-nums"
          style={{ color: 'var(--color-ivory)', opacity: 0.1 }}
          aria-hidden="true"
        >
          404
        </p>
        <h1
          className="mb-4 text-2xl font-semibold tracking-tight"
          style={{ color: 'var(--color-ivory)' }}
        >
          This page doesn&apos;t exist.
        </h1>
        <Body className="mb-10 max-w-md">
          Whatever brought you here is no longer where it was. The diagnostic session, however, is
          always in the same place.
        </Body>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/">
              Back to home
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Book a diagnostic</Link>
          </Button>
        </div>
      </Container>
    </main>
  )
}
