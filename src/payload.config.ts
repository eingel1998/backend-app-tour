// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Places } from './collections/Places'
import { Reviews } from './collections/Reviews'
import { Conversations } from './collections/Conversations'
import { Recommendations } from './collections/Recommendations'
import { Events } from './collections/Events'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Places, Reviews, Conversations, Recommendations, Events],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  }, // Configuración optimizada para producción
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors:
    process.env.CORS_ORIGINS?.split(',') ||
    (process.env.NODE_ENV === 'production'
      ? [process.env.NEXT_PUBLIC_SERVER_URL || '']
      : ['http://localhost:3000']),
  csrf: process.env.NODE_ENV === 'production' ? [process.env.NEXT_PUBLIC_SERVER_URL || ''] : [],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
