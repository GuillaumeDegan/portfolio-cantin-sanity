import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerInfosType = defineType({
  name: 'footerInfos',
  title: 'Informations du footer',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socials',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerSocial',
          fields: [
            defineField({
              name: 'url',
              title: 'Lien',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description:
                'Privilégier un fichier PNG au format carré avec un logo du réseau en blanc (idéalement sur fond transparent) avec une taille maximale 400 × 400 px.',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Texte alternatif',
                  type: 'string',
                  description: "Important pour l'accessibilité.",
                  validation: (rule) => rule.required(),
                }),
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'url', media: 'image'},
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
