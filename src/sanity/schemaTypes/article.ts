import { defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: '2–3 sentence summary shown in article cards on the Thinking page.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout / CTA Block',
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Callout' }),
          },
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
            defineField({
              name: 'ctaText',
              title: 'CTA Text',
              type: 'string',
              initialValue: 'Book a diagnostic session',
            }),
          ],
        },
      ],
      description: 'Main article content.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Strategy', value: 'strategy' },
          { title: 'Technology', value: 'technology' },
          { title: 'Operations', value: 'operations' },
          { title: 'AI & Automation', value: 'ai-automation' },
          { title: 'European Business', value: 'european-business' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time. Leave blank to omit.',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this article to the top of the Thinking page.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
    prepare(selection) {
      const { title, subtitle } = selection as { title: string; subtitle?: string }
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString('en-GB', { dateStyle: 'medium' })
        : 'No date set'
      return { title, subtitle: date }
    },
  },
  orderings: [
    {
      title: 'Published: Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
