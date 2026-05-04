import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'cantin-portfolio',

  projectId: 'fhumllcy',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.divider().title('Contenu statique des pages'),
            S.listItem()
              .title('Vidéo accueil')
              .child(
                S.document().schemaType('homeBackgroundVideo').documentId('homeBackgroundVideo'),
              ),
            S.listItem()
              .title('Contenu de la page "About me"')
              .child(S.document().schemaType('aboutMeInfos').documentId('aboutMeInfos')),
            S.listItem()
              .title('Informations du footer')
              .child(S.document().schemaType('footerInfos').documentId('footerInfos')),

            S.divider().title('Contenu dynamique'),

            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
