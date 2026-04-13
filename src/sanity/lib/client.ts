import { createClient } from 'next-sanity'

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'z040qeme'
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const SANITY_API_VERSION = '2025-01-01'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  // useCdn: true means cached responses (fast, for production reads)
  // useCdn: false means live data (for Studio and draft previews)
  useCdn: true,
  // Stega is used for Visual Editing overlays — disable for production reads
  stega: false,
})

// Use this client in Server Components to fetch content
export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params ?? {}, {
    next: {
      // Revalidate every hour — adjust per content type if needed
      revalidate: 3600,
    },
  })
}
