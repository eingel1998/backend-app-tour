import type { CollectionConfig } from 'payload'

export const Conversations: CollectionConfig = {
  slug: 'conversations',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users', required: true },
    { name: 'sessionId', type: 'text', unique: true },
    { name: 'title', type: 'text' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'language', type: 'select', options: ['es', 'en', 'wayuu'], defaultValue: 'es' },
    { name: 'lastInteraction', type: 'date' },
    {
      name: 'userContext',
      type: 'json',
    },
    {
      name: 'assistantSettings',
      type: 'group',
      fields: [
        {
          name: 'personality',
          type: 'select',
          options: ['friendly', 'professional', 'casual'],
          defaultValue: 'friendly',
        },
        {
          name: 'responseLength',
          type: 'select',
          options: ['short', 'medium', 'detailed'],
          defaultValue: 'medium',
        },
        { name: 'includeRecommendations', type: 'checkbox', defaultValue: true },
        { name: 'autoTranslate', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'messages',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'sender', type: 'select', options: ['user', 'assistant'], required: true },
        { name: 'message', type: 'textarea', required: true },
        {
          name: 'messageType',
          type: 'select',
          options: ['text', 'recommendation', 'itinerary', 'question', 'greeting'],
          defaultValue: 'text',
        },
        {
          name: 'processingData',
          type: 'group',
          fields: [
            { name: 'aiModel', type: 'text' },
            { name: 'processingTime', type: 'number' },
            { name: 'confidence', type: 'number' },
            { name: 'tokens', type: 'number' },
          ],
        },
        { name: 'metadata', type: 'json' },
        { name: 'isRead', type: 'checkbox', defaultValue: false },
        { name: 'isEdited', type: 'checkbox', defaultValue: false },
        { name: 'editedAt', type: 'date' },
        { name: 'timestamp', type: 'date' },
      ],
    },
    {
      name: 'statistics',
      type: 'group',
      admin: { readOnly: true },
      fields: [
        { name: 'totalMessages', type: 'number' },
        { name: 'avgResponseTime', type: 'number' },
        { name: 'satisfactionRating', type: 'number' },
        { name: 'lastRating', type: 'date' },
      ],
    },
    { name: 'isArchived', type: 'checkbox', defaultValue: false },
    { name: 'archivedAt', type: 'date' },
  ],
}
