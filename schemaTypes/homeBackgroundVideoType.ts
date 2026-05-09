import {defineField, defineType} from 'sanity'

export const homeBackgroundVideoType = defineType({
  name: 'homeBackgroundVideo',
  title: "Vidéo de fond de la page d'accueil",
  type: 'document',
  fields: [
    defineField({
      name: 'video',
      title: 'Vidéo de fond',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description:
        'Uploader une vidéo optimisée pour le web (MP4 recommandé). Évitez les fichiers trop lourds pour garantir un chargement rapide.',
      validation: (rule) => rule.required(),
    }),
  ],
})
