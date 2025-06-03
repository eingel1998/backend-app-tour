import type { CollectionConfig } from 'payload'

export const Places: CollectionConfig = {
  slug: 'places',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'description', type: 'richText', required: true },
    { name: 'shortDescription', type: 'textarea', maxLength: 300 },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'subcategory', type: 'text' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    // ...otros campos omitidos para ejemplo inicial...
  ],
}
