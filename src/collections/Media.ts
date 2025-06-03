import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 150, height: 150, position: 'centre' },
      { name: 'medium', width: 600, height: 400, position: 'centre' },
      { name: 'large', width: 1200, height: 800, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/mov'],
  },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'contentInfo',
      type: 'group',
      fields: [
        { name: 'photographer', type: 'text' },
        { name: 'location', type: 'text' },
        { name: 'takenAt', type: 'date' },
        { name: 'camera', type: 'text' },
        { name: 'license', type: 'text' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'category',
      type: 'select',
      options: ['place', 'event', 'business', 'user', 'promotion', 'document'],
    },
    { name: 'isPublic', type: 'checkbox', defaultValue: true },
    { name: 'isApproved', type: 'checkbox', defaultValue: true },
    {
      name: 'usageStats',
      type: 'group',
      admin: { readOnly: true },
      fields: [
        { name: 'usedInPlaces', type: 'number', admin: { readOnly: true } },
        { name: 'usedInEvents', type: 'number', admin: { readOnly: true } },
        { name: 'usedInBusinesses', type: 'number', admin: { readOnly: true } },
        { name: 'totalViews', type: 'number', admin: { readOnly: true } },
      ],
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
