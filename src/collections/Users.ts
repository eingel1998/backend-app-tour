import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => data?.userType !== 'admin',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => data?.userType !== 'admin',
      },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'loginAttempts',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'isBlocked',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'userType',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Usuario', value: 'user' },
        { label: 'Empresa', value: 'business' },
        { label: 'Administrador', value: 'admin' },
      ],
    },
    // Preferencias de viaje
    {
      name: 'travelPreferences',
      type: 'group',
      admin: {
        condition: (data) => data?.userType === 'user',
        hidden: true,
      },
      fields: [
        {
          name: 'budgetRange',
          type: 'select',
          options: ['low', 'medium', 'high'],
        },
        {
          name: 'travelType',
          type: 'select',
          options: ['adventure', 'cultural', 'relaxation', 'business', 'family'],
        },
        {
          name: 'accommodationType',
          type: 'select',
          options: ['hotel', 'hostel', 'apartment', 'resort', 'camping'],
        },
        {
          name: 'transportation',
          type: 'select',
          options: ['car', 'public', 'walking', 'bike', 'motorcycle'],
        },
        {
          name: 'interests',
          type: 'array',
          fields: [{ name: 'interest', type: 'text' }],
        },
        {
          name: 'favoriteCategories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
        },
      ],
    },
    // Configuración de contacto
    {
      name: 'contactPreferences',
      type: 'group',
      admin: {
        condition: (data) => data?.userType === 'user',
        hidden: true,
      },
      fields: [
        { name: 'emailNotifications', type: 'checkbox', defaultValue: true },
        { name: 'smsNotifications', type: 'checkbox', defaultValue: false },
        { name: 'pushNotifications', type: 'checkbox', defaultValue: true },
        { name: 'marketingEmails', type: 'checkbox', defaultValue: false },
      ],
    },
    // businessData condicional
    {
      name: 'businessData',
      type: 'group',
      admin: {
        condition: (data) => data?.userType === 'business',
      },
      fields: [
        { name: 'businessName', type: 'text', required: true },
        {
          name: 'businessType',
          type: 'select',
          options: [
            'hotel',
            'restaurant',
            'tour_operator',
            'transport',
            'attraction',
            'guide',
            'shop',
          ],
        },
        { name: 'description', type: 'richText' },
        { name: 'shortDescription', type: 'textarea', maxLength: 200 },
        { name: 'address', type: 'text' },
        { name: 'city', type: 'text', defaultValue: 'Riohacha' },
        { name: 'department', type: 'text', defaultValue: 'La Guajira' },
        { name: 'website', type: 'text' },
        { name: 'rut', type: 'text' },
        { name: 'taxId', type: 'text' },
        // ...otros grupos: socialMedia, businessHours, multimedia, services, location, businessSettings, statistics
      ],
    },
    // Favoritos embebidos
    {
      name: 'favoritesList',
      type: 'array',
      admin: {
        condition: (data) => data?.userType === 'user',
        hidden: true,
      },
      fields: [
        { name: 'place', type: 'relationship', relationTo: 'places' },
        { name: 'addedAt', type: 'date', admin: { readOnly: true } },
        { name: 'notes', type: 'text' },
      ],
    },
  ],
}
