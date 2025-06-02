import { buildConfig } from 'payload/config';
import path from 'path';
import { sqliteAdapter } from '@payloadcms/db-sqlite'; // Import SQLite adapter
// import { Users } from './collections/Users'; // Will be uncommented later
import { Posts } from './collections/Posts'; // Import Posts collection

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    // user: Users.slug, // Will be uncommented later
    bundler: 'webpack', // or 'vite'
  },
  // editor: lexicalEditor({}), // Example editor
  collections: [
    // Users, // Will be uncommented later
    Posts,   // Add Posts collection
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: sqliteAdapter({ // Configure SQLite adapter
    dbName: path.resolve(__dirname, '../payload.db'), // Save DB in project root
  }),
});
