import type { Metadata } from 'next'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Blooming is, why we exist, and the principles that govern every engagement. The firm European mid-market companies needed, and now have.',
}

export default function AboutPage() {
  return <AboutClient />
}
