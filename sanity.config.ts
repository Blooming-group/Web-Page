import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'
import { SANITY_DATASET, SANITY_PROJECT_ID, SANITY_API_VERSION } from './src/sanity/lib/client'

export default defineConfig({
  name: 'blooming-studio',
  title: 'Blooming Group',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem().title('Services').child(S.documentTypeList('service').title('Services')),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
