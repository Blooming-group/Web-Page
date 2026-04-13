import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon name (Lucide)',
      type: 'string',
      description: 'Lucide icon name — e.g. Globe, Workflow, Bot',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'One line — shown on the homepage card',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'longDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full service description shown on the Services page',
    }),
    defineField({
      name: 'problemStatement',
      title: 'Problem It Solves',
      type: 'text',
      rows: 3,
      description: 'What operational pain does this service address?',
    }),
    defineField({
      name: 'differentiator',
      title: 'What It Is Not',
      type: 'text',
      rows: 3,
      description: 'How Blooming differs from generic providers',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'shortDescription' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
