import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { AboutBrief } from '@/components/sections/AboutBrief'
import { CTA } from '@/components/sections/CTA'
import { MetricsBar } from '@/components/sections/MetricsBar'
import { Marquee } from '@/components/ui/Marquee'
import { ParticleField } from '@/components/sections/ParticleField'
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
      <Marquee />
      <Problem />
      <MetricsBar />
      <Services />
      <Process />
      <AboutBrief />
      <CTA />
      <ParticleField height={440} />
    </>
  )
}
