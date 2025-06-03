import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'description', type: 'richText', required: true },
    { name: 'shortDescription', type: 'textarea', maxLength: 300 },
    {
      name: 'eventType',
      type: 'select',
      options: [
        'festival',
        'concert',
        'exhibition',
        'sport',
        'cultural',
        'religious',
        'business',
        'educational',
      ],
    },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'schedule',
      type: 'group',
      fields: [
        { name: 'startDate', type: 'date', required: true },
        { name: 'endDate', type: 'date' },
        { name: 'startTime', type: 'text' },
        { name: 'endTime', type: 'text' },
        { name: 'timezone', type: 'text', defaultValue: 'America/Bogota' },
        { name: 'duration', type: 'text' },
        { name: 'isRecurring', type: 'checkbox' },
        { name: 'recurrencePattern', type: 'text' },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'locationType',
          type: 'select',
          options: ['place', 'custom', 'multiple', 'online'],
        },
        { name: 'place', type: 'relationship', relationTo: 'places' },
        {
          name: 'customLocation',
          type: 'group',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'address', type: 'text' },
            { name: 'latitude', type: 'number' },
            { name: 'longitude', type: 'number' },
            { name: 'city', type: 'text', defaultValue: 'Riohacha' },
          ],
        },
        {
          name: 'onlineDetails',
          type: 'group',
          fields: [
            { name: 'platform', type: 'text' },
            { name: 'url', type: 'text' },
            { name: 'accessCode', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'organizer',
      type: 'group',
      fields: [
        {
          name: 'organizerType',
          type: 'select',
          options: ['business', 'government', 'ngo', 'individual'],
        },
        { name: 'organizer', type: 'relationship', relationTo: 'users' },
        { name: 'organizerName', type: 'text' },
        {
          name: 'contact',
          type: 'group',
          fields: [
            { name: 'email', type: 'email' },
            { name: 'phone', type: 'text' },
            { name: 'website', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        { name: 'isFree', type: 'checkbox', defaultValue: true },
        { name: 'ticketPrice', type: 'number' },
        { name: 'currency', type: 'select', options: ['COP', 'USD'] },
        { name: 'hasDiscounts', type: 'checkbox' },
        { name: 'discountDescription', type: 'text' },
        { name: 'requiresReservation', type: 'checkbox' },
        { name: 'maxAttendees', type: 'number' },
        { name: 'currentAttendees', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'videos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    { name: 'poster', type: 'upload', relationTo: 'media' },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'cancelled', 'postponed', 'completed'],
      defaultValue: 'draft',
    },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    { name: 'isRecurring', type: 'checkbox', defaultValue: false },
    { name: 'cancellationReason', type: 'textarea' },
    { name: 'isApproved', type: 'checkbox', defaultValue: false },
  ],
}
