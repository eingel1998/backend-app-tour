import { buildConfig } from 'payload' // Corrected: payload instead of @payloadcms/core
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nextBuildadmin } from '@payloadcms/next/routes'; // Corrected: Changed bundler
import path from 'path';
import sharp from 'sharp'; // Added sharp import
import { fileURLToPath } from 'url'; // Added to keep __dirname replacement working

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    // user: Users.slug, // Removed: No Users collection yet
    bundler: nextBuildadmin(), // Added: as per typical Next.js setup
  },
  editor: lexicalEditor({}),
  collections: [
    // Add collections here later
  ],
  globals: [
    // Add globals here later
  ],
  secret: process.env.PAYLOAD_SECRET || 'default-secret-key-please-change', // Default secret
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      // Default to payload.db, will be overridden by DATABASE_URI from .env
      url: process.env.DATABASE_URI || path.resolve(dirname, 'payload.db'), 
    },
  }),
  sharp, // Payload 3 includes sharp by default
  plugins: [
    // Plugins will be added in later tasks
  ],
});
