import { defineField, defineType } from 'sanity'

// Singleton document — only one instance should exist.
// Use the custom Studio structure (sanity.config.ts) to enforce this.
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
      description: 'Shown in the hero section',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Used in SEO meta tags when no page-specific description exists',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Default social share image (1200×630px recommended)',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'tagline' },
    prepare({ title }: { title?: string }) {
      return { title: title ?? 'Site Settings' }
    },
  },
})
