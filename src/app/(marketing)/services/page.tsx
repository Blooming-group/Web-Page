import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Five implementation capabilities. Each one the tangible proof that Blooming executes — not just advises. Web design, process automation, communications, AI chatbots, AI agents.',
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Blooming Group Services',
  url: 'https://blooming-group.eu/services',
  itemListElement: [
    { name: 'Web Design & Development', position: 1 },
    { name: 'Process Automation', position: 2 },
    { name: 'Communications Automation', position: 3 },
    { name: 'AI Chatbots', position: 4 },
    { name: 'AI Agents', position: 5 },
  ].map((s) => ({
    '@type': 'ListItem',
    position: s.position,
    item: {
      '@type': 'Service',
      name: s.name,
      provider: { '@type': 'Organization', name: 'Blooming Group' },
    },
  })),
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <ServicesClient />
    </>
  )
}
