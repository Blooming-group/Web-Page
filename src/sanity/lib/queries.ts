import { groq } from 'next-sanity'

// ─── Services ─────────────────────────────────────────────────────────────
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    slug,
    name,
    icon,
    shortDescription,
    longDescription,
    problemStatement,
    differentiator,
    order
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    slug,
    name,
    icon,
    shortDescription,
    longDescription,
    problemStatement,
    differentiator
  }
`

// ─── Site Settings ────────────────────────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    tagline,
    metaDescription,
    openGraphImage
  }
`
