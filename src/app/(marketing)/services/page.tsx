import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Six capabilities deployed after diagnosis: web development, process automation, communications automation, AI chatbots, AI agents, and corporate intelligence systems. One team, no handoffs.',
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Blooming Group Services',
  url: 'https://blooming-group.eu/services',
  itemListElement: [
    { name: 'Web Development', position: 1 },
    { name: 'Process Automation', position: 2 },
    { name: 'Communications Automation', position: 3 },
    { name: 'AI Chatbots', position: 4 },
    { name: 'AI Agents', position: 5 },
    { name: 'Corporate Intelligence', position: 6 },
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
