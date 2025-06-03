import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'parentCategory', type: 'relationship', relationTo: 'categories' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number' },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
}
