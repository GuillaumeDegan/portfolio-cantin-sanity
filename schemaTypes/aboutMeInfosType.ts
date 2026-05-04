import {defineField, defineType} from 'sanity'

export const aboutMeInfosType = defineType({
  name: 'aboutMeInfos',
  title: 'Informations de la page "About me"',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: "Image d'illustration",
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Important pour l’accessibilité et le SEO.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})
