import type { CollectionConfig } from 'payload'

export const Recommendations: CollectionConfig = {
  slug: 'recommendations',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'recommendationType',
      type: 'select',
      required: true,
      options: ['place', 'itinerary', 'experience', 'route'],
      defaultValue: 'place',
    },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'source',
      type: 'group',
      fields: [
        { name: 'generatedBy', type: 'select', options: ['ai', 'admin', 'user', 'business'] },
        { name: 'sourceConversation', type: 'relationship', relationTo: 'conversations' },
        { name: 'prompt', type: 'textarea' },
        { name: 'algorithm', type: 'text' },
      ],
    },
    { name: 'context', type: 'json' },
    {
      name: 'placeRecommendation',
      type: 'group',
      admin: { condition: (data) => data.recommendationType === 'place' },
      fields: [
        { name: 'places', type: 'relationship', relationTo: 'places', hasMany: true },
        { name: 'reason', type: 'richText' },
        { name: 'score', type: 'number' },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'tag', type: 'text' }],
        },
        {
          name: 'visitOrder',
          type: 'array',
          fields: [
            { name: 'place', type: 'relationship', relationTo: 'places' },
            { name: 'orderIndex', type: 'number' },
            { name: 'estimatedTime', type: 'number' },
            { name: 'notes', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'itineraryRecommendation',
      type: 'group',
      admin: { condition: (data) => data.recommendationType === 'itinerary' },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'duration', type: 'number' },
        { name: 'difficulty', type: 'select', options: ['easy', 'moderate', 'hard'] },
        {
          name: 'theme',
          type: 'select',
          options: ['cultural', 'adventure', 'relaxation', 'gastronomic', 'natural', 'mixed'],
        },
        {
          name: 'dailySchedule',
          type: 'array',
          dbName: 'itinerary_days', // nombre corto para la tabla
          fields: [
            { name: 'day', type: 'number' },
            { name: 'date', type: 'date' },
            {
              name: 'activities',
              type: 'array',
              dbName: 'itinerary_acts', // nombre corto para la tabla
              fields: [
                { name: 'time', type: 'text' },
                { name: 'place', type: 'relationship', relationTo: 'places' },
                { name: 'activity', type: 'text' },
                { name: 'duration', type: 'number' },
                { name: 'cost', type: 'number' },
                { name: 'notes', type: 'text' },
                { name: 'transportation', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'estimatedCosts',
          type: 'group',
          fields: [
            { name: 'accommodation', type: 'number' },
            { name: 'food', type: 'number' },
            { name: 'transportation', type: 'number' },
            { name: 'activities', type: 'number' },
            { name: 'total', type: 'number' },
            { name: 'currency', type: 'select', options: ['COP', 'USD'], dbName: 'curr' },
          ],
        },
        {
          name: 'includedServices',
          type: 'array',
          fields: [
            { name: 'service', type: 'text' },
            { name: 'isIncluded', type: 'checkbox' },
            { name: 'additionalCost', type: 'number' },
          ],
        },
        {
          name: 'recommendations',
          type: 'group',
          fields: [
            { name: 'bestTimeToVisit', type: 'text' },
            {
              name: 'packingList',
              type: 'array',
              dbName: 'pack_list',
              fields: [{ name: 'item', type: 'text' }],
            },
            {
              name: 'tips',
              type: 'array',
              dbName: 'tips_arr',
              fields: [{ name: 'tip', type: 'text' }],
            },
            {
              name: 'warnings',
              type: 'array',
              dbName: 'warn_arr',
              fields: [{ name: 'warning', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      name: 'experienceRecommendation',
      type: 'group',
      admin: { condition: (data) => data.recommendationType === 'experience' },
      fields: [
        {
          name: 'experienceType',
          type: 'select',
          options: ['adventure', 'cultural', 'gastronomic', 'wellness', 'educational'],
        },
        { name: 'provider', type: 'relationship', relationTo: 'users' },
        { name: 'places', type: 'relationship', relationTo: 'places', hasMany: true },
        {
          name: 'activities',
          type: 'array',
          dbName: 'exp_acts',
          fields: [
            { name: 'activity', type: 'text' },
            { name: 'duration', type: 'text' },
            {
              name: 'difficulty',
              type: 'select',
              options: ['easy', 'moderate', 'hard'],
              dbName: 'diff',
            },
          ],
        },
        {
          name: 'price',
          type: 'group',
          fields: [
            { name: 'amount', type: 'number' },
            { name: 'currency', type: 'select', options: ['COP', 'USD'] },
            {
              name: 'includes',
              type: 'array',
              fields: [{ name: 'item', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'active', 'expired', 'archived'],
      defaultValue: 'active',
    },
    { name: 'isPublic', type: 'checkbox', defaultValue: false },
    { name: 'isBookable', type: 'checkbox', defaultValue: false },
    { name: 'expiresAt', type: 'date' },
    {
      name: 'engagement',
      type: 'group',
      admin: { readOnly: true },
      fields: [
        { name: 'wasViewed', type: 'checkbox', defaultValue: false },
        { name: 'wasAccepted', type: 'checkbox' },
        { name: 'wasBooked', type: 'checkbox', defaultValue: false },
        { name: 'wasShared', type: 'checkbox', defaultValue: false },
        { name: 'viewedAt', type: 'date' },
        { name: 'acceptedAt', type: 'date' },
        { name: 'sharedCount', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'feedback',
      type: 'group',
      fields: [
        { name: 'rating', type: 'number' },
        { name: 'comment', type: 'textarea' },
        { name: 'ratedAt', type: 'date' },
      ],
    },
  ],
}
