/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId, token} from './src/utils/sanity/env'
import {schema} from './src/utils/sanity/schema'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  token,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({ type: 'art_page', title: 'Artwork Pages', S, context }),
            orderableDocumentListDeskItem({ type: 'non_art_page', title: 'Non-Artwork Pages', S, context }),
            S.listItem()
              .title('Logo')
              .id('logo')
              .icon(() => '™️')
              .child(
                S.document()
                  .schemaType('logo')
                  .documentId('logo')
              ),
            ...S.documentTypeListItems().filter(listItem => !['art_page', 'non_art_page', 'logo'].includes(listItem.getId())),

          ])
      }
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
