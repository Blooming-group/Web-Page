import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/JsonLd'
import { CursorFollower } from '@/components/ui/CursorFollower'
import { BloomingMarkAnimated } from '@/components/ui/BloomingMarkAnimated'
import { ParticleField } from '@/components/sections/ParticleField'

// Organization schema — present on every marketing page
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blooming Group',
  url: 'https://blooming-group.eu',
  logo: 'https://blooming-group.eu/opengraph-image.png',
  description:
    'European mid-market strategy and technology firm. Web design, process automation, AI chatbots, AI agents, and communications automation.',
  email: 'hello@blooming-group.eu',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'EU',
  },
  sameAs: ['https://linkedin.com/company/blooming-group'],
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={organizationSchema} />

      {/* Skip-to-content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-sm focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        style={{ background: 'var(--color-accent-primary)', color: 'var(--color-ivory)' }}
      >
        Skip to main content
      </a>

      {/* Cursor follower — logomark trails the pointer on desktop */}
      <CursorFollower />

      {/* Persistent animated logomark — fixed bottom-left, desktop only */}
      <div
        className="pointer-events-none fixed bottom-6 left-6 z-30 hidden opacity-70 md:block"
        aria-hidden="true"
      >
        <BloomingMarkAnimated size={88} />
      </div>

      <Header />
      <main id="main-content">{children}</main>

      {/*
        Footer wrapper — ParticleField is an absolute-positioned canvas
        behind the footer content. The footer has no explicit background,
        so particles show through from the relative-positioned parent.
      */}
      <div className="relative" style={{ background: 'var(--color-base)' }}>
        <ParticleField mode="background" />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  )
}
