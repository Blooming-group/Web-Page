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

// ─── Articles ─────────────────────────────────────────────────────────────
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    readTime,
    featured
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    category,
    readTime
  }
`

export const allArticleSlugsQuery = groq`
  *[_type == "article"] { slug }
`
