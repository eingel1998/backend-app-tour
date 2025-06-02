import { CollectionConfig } from 'payload/types';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true, // Allow public read access
    create: () => true, // Allow public create access (adjust as needed)
    update: () => true, // Allow public update access (adjust as needed)
    delete: () => true, // Allow public delete access (adjust as needed)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText', // Or 'textarea' for simpler text
    },
  ],
};
