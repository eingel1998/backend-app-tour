import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users', required: true },
    { name: 'place', type: 'relationship', relationTo: 'places', required: true },
    { name: 'rating', type: 'number', required: true, min: 1, max: 5 },
    { name: 'title', type: 'text', maxLength: 100 },
    { name: 'comment', type: 'textarea', required: true, maxLength: 1000 },
    { name: 'pros', type: 'textarea' },
    { name: 'cons', type: 'textarea' },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: { description: 'Máx 5 imágenes' },
    },
    { name: 'visitDate', type: 'date' },
    {
      name: 'tripType',
      type: 'select',
      options: ['solo', 'couple', 'family', 'friends', 'business'],
    },
    {
      name: 'ratings',
      type: 'group',
      fields: [
        { name: 'cleanliness', type: 'number', min: 1, max: 5 },
        { name: 'service', type: 'number', min: 1, max: 5 },
        { name: 'value', type: 'number', min: 1, max: 5 },
        { name: 'accessibility', type: 'number', min: 1, max: 5 },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'approved', 'rejected', 'flagged'],
      defaultValue: 'pending',
    },
    { name: 'isVerified', type: 'checkbox', defaultValue: false },
    { name: 'isVisible', type: 'checkbox', defaultValue: true },
    { name: 'moderationNotes', type: 'textarea' },
    { name: 'flagReason', type: 'text' },
    { name: 'helpfulVotes', type: 'number', defaultValue: 0 },
    { name: 'notHelpfulVotes', type: 'number', defaultValue: 0 },
    { name: 'reportCount', type: 'number', defaultValue: 0 },
    {
      name: 'responses',
      type: 'array',
      fields: [
        { name: 'user', type: 'relationship', relationTo: 'users' },
        { name: 'response', type: 'textarea' },
        { name: 'responseDate', type: 'date' },
        { name: 'isOfficial', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
