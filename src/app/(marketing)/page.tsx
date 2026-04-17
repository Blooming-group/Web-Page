import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Services } from '@/components/sections/Services'
import { DataViz } from '@/components/sections/DataViz'
import { Process } from '@/components/sections/Process'
import { CTA } from '@/components/sections/CTA'
import { SilenceBlock } from '@/components/ui/SilenceBlock'
import { JsonLd } from '@/components/JsonLd'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Blooming Group',
  url: 'https://blooming-group.eu',
  description:
    "Strategic thinking. Real technology. The firm European mid-market companies needed and didn't have.",
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://blooming-group.eu/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <Hero />
      <SilenceBlock variant="section" />
      <Problem />
      <SilenceBlock variant="section" />
      <Services />
      <SilenceBlock variant="section" />
      <DataViz />
      <SilenceBlock variant="section" />
      <Process />
      <SilenceBlock variant="breath" />
      <CTA />
    </>
  )
}
