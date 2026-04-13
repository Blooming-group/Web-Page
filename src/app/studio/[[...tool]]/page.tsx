'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Force dynamic rendering — the Studio is never static
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
