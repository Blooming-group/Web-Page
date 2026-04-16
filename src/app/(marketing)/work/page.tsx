import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { H1, Body } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Blooming Group client work. Case studies published with full attribution as clients approve.',
}

export default function WorkPage() {
  return (
    <div className="pt-20">
      <section className="py-24" aria-labelledby="work-heading">
        <Container>
          <Badge className="mb-8">The work</Badge>
          <H1 id="work-heading" className="mb-6 max-w-2xl">
            The work speaks when it&apos;s ready.
          </H1>
          <Body className="mb-12 max-w-xl">
            We are building our portfolio of documented engagements. When a client completes an
            engagement and authorises publication, it will appear here — with full specificity, real
            metrics, and no embellishment. In the meantime, the diagnostic session is where you see
            exactly how we think.
          </Body>
          <Button size="lg" asChild>
            <Link href="/contact">
              Book a diagnostic session
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>
    </div>
  )
}
