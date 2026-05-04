import {defineField, defineType} from 'sanity'

export const homeBackgroundVideoType = defineType({
  name: 'homeBackgroundVideo',
  title: "Vidéo de fond de la page d'accueil",
  type: 'document',
  fields: [
    defineField({
      name: 'url',
      title: 'URL youtube de la vidéo',
      type: 'string',
      description:
        'Coller l’URL complète (page watch, youtu.be ou lien embed). Le stockage vidéo reste sur YouTube.',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.trim()) return true
          const v = value.trim().toLowerCase()
          const isYoutube = v.includes('youtube.com/') || v.includes('youtu.be/')
          return isYoutube || 'Utilisez une URL YouTube (youtube.com ou youtu.be)'
        }),
    }),
  ],
})
