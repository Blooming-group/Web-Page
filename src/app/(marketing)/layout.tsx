import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/JsonLd'

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
      {/* Skip-to-content — visible on focus only, for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-sm focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        style={{ background: 'var(--color-accent-primary)', color: 'var(--color-ivory)' }}
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
