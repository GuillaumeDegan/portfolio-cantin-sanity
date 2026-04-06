import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          const current = slug?.current?.trim()
          if (!current) return true

          const client = context.getClient({apiVersion: '2024-01-01'})
          const documentId = context.document?._id
          const baseId = documentId?.replace(/^drafts\./, '') ?? ''
          const excludeIds =
            baseId.length > 0 ? [`drafts.${baseId}`, baseId] : []

          const duplicateCount = await client.fetch<number>(
            excludeIds.length > 0
              ? `count(*[_type == "project" && slug.current == $slug && !(_id in $excludeIds)])`
              : `count(*[_type == "project" && slug.current == $slug])`,
            excludeIds.length > 0
              ? {slug: current, excludeIds}
              : {slug: current},
          )

          return duplicateCount === 0 || 'Ce slug est déjà utilisé par un autre projet.'
        }),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: '2D', value: '2d'},
          {title: '3D', value: '3d'},
          {title: 'Motion design', value: 'motion-design'},
          {title: 'Film', value: 'film'},
          {title: 'Peinture', value: 'painting'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
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
    defineField({
      name: 'gallery',
      title: 'Médias du projet',
      description: 'Images et vidéos optionnelles pour illustrer le projet.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'youtubeVideo',
          title: 'Vidéo YouTube',
          fields: [
            defineField({
              name: 'url',
              title: 'Lien YouTube',
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
          preview: {
            select: {url: 'url'},
            prepare({url}) {
              return {
                title: 'Vidéo YouTube',
                subtitle: url || 'Lien manquant',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
