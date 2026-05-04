import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Catégorie',
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
          const excludeIds = baseId.length > 0 ? [`drafts.${baseId}`, baseId] : []

          const duplicateCount = await client.fetch<number>(
            excludeIds.length > 0
              ? `count(*[_type == "category" && slug.current == $slug && !(_id in $excludeIds)])`
              : `count(*[_type == "category" && slug.current == $slug])`,
            excludeIds.length > 0 ? {slug: current, excludeIds} : {slug: current},
          )

          return duplicateCount === 0 || 'Ce slug est déjà utilisé par une autre catégorie.'
        }),
    }),
  ],
})
