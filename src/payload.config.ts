// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { sql } from '@payloadcms/db-sqlite/drizzle'; // For raw SQL queries like SELECT 1
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Configuración optimizada para producción
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  csrf: process.env.NODE_ENV === 'production' ? [process.env.NEXT_PUBLIC_SERVER_URL || ''] : [],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI!,
      authToken: process.env.DATABASE_AUTH_TOKEN, // para Turso en producción
    },
    push: process.env.NODE_ENV === 'development',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  bin: [
    {
      scriptPath: path.resolve(dirname, 'seeds/index.ts'),
      key: 'seed', // This makes `payload seed` execute this script.
    },
  ],
  endpoints: [
    {
      path: '/api/health/database',
      method: 'get',
      handler: async (req, res) => {
        try {
          // Accessing the Drizzle instance from the request object's payload instance
          // req.payload should be available in custom endpoint handlers
          if (req.payload && req.payload.db && req.payload.db.drizzle) {
            // Perform a simple query.
            // Drizzle's execute method can run raw SQL.
            // The exact way to run a raw query that returns results might vary slightly.
            // For a simple 'SELECT 1', we expect a result.
            // Drizzle's `db.get()` or `db.values()` for single row/values might be alternatives.
            await req.payload.db.drizzle.execute(sql`SELECT 1`);
            res.status(200).json({ status: 'ok', message: 'Database connection successful.' });
          } else {
            throw new Error('Payload instance or Drizzle adapter not available on request.');
          }
        } catch (error) {
          req.payload.logger.error(`Database health check failed: ${error.message}`);
          res.status(500).json({ status: 'error', message: 'Database connection failed.', error: error.message });
        }
      },
    },
  ],
  async onInit(payload) {
    if (payload.db.adapterName === 'sqlite' && payload.db.drizzle) {
      payload.logger.info('Applying SQLite PRAGMA settings for performance...');
      try {
        // Direct access to the Drizzle instance; Drizzle's interface for raw SQL execution might vary.
        // payload.db.drizzle.session.client is likely the underlying better-sqlite3 or libsql instance.
        // For @libsql/client used by the current sqliteAdapter, it might be payload.db.drizzle.session.client.batch() or .execute()
        // For better-sqlite3 (if that was the driver), it would be different.
        // The Payload sqlite adapter docs say: "payload.db.drizzle.query.posts.findMany()" for querying.
        // And "import { eq, sql, and } from '@payloadcms/db-sqlite/drizzle'"
        // Let's assume payload.db.drizzle has an `execute` method or similar that can run raw SQL.
        // If not, one might need to access the raw driver instance.
        // The `payload.db.drizzle` object is the Drizzle instance.
        // The actual libSQL client might be accessible via `payload.db.drizzle.driver` or `payload.db.drizzle.session.client`
        // Let's try to get the raw libSQL client, assuming it's accessible.
        // The `db` object on payload is an instance of `DatabaseAdapter`.
        // The `drizzle` property is specific to Drizzle-based adapters.
        // The actual client from `@libsql/client` should be accessible to run `batch`.

        // As per @libsql/client docs, it has an `execute` and `batch` method.
        // The Payload sqlite adapter docs mention `payload.db.drizzle` for querying.
        // Let's assume the `drizzle` instance or its session exposes the `batch` method from `libsql`.
        // This is a common pattern for ORMs wrapping a driver.

        const db = payload.db.drizzle // This is the Drizzle instance

        // Attempting to execute PRAGMAs. The exact method might depend on how Drizzle exposes raw execution for libSQL.
        // Drizzle ORM typically provides a way to execute raw SQL. For example, `db.run(sql`...`)` or `db.exec(...)`.
        // Let's try a generic approach first. `execute` is common.
        // If `payload.db.drizzle.execute` exists and works for PRAGMAs:
        // await db.execute(sql`PRAGMA journal_mode=WAL;`)
        // await db.execute(sql`PRAGMA synchronous=NORMAL;`)
        // await db.execute(sql`PRAGMA cache_size=10000;`)
        // await db.execute(sql`PRAGMA temp_store=memory;`)

        // However, PRAGMA commands are often executed one by one and some might not work well with `sql` template tag
        // if it tries to prepare them as statements.
        // A more direct way, if the underlying client is accessible:
        // `payload.db.raw // hypothetical`
        // The `@payloadcms/db-sqlite` documentation shows `import { sql } from '@payloadcms/db-sqlite/drizzle'`
        // and then using it like `sqllower(${posts.title})`
        // This suggests `sql` is for building parts of queries.
        // For PRAGMAs, we usually want to execute them directly.
        // The `libsql` client has `batch()` which is ideal for this.

        // Accessing the raw libSQL client:
        // The `payload.db` object is the adapter. The `drizzle` instance is `payload.db.drizzle`.
        // The underlying libSQL client instance used by Drizzle might be on `payload.db.drizzle.session.client` or similar.
        // Let's assume `payload.db.pool` holds the raw client, which is a common pattern if Payload manages a pool.
        // Or, the adapter itself might have a method.
        // The docs for `db-sqlite` say `client` options are passed to `createClient` from `@libsql/client`.
        // The `payload.db` is the instance of the `SQLiteAdapter`. Let's see if it exposes the client.
        // `payload.db.sessions` seems to be an internal Drizzle thing. `payload.db.db` is also sometimes used.

        // Given the docs: `payload.db.drizzle` is the Drizzle interface.
        // The underlying driver for Drizzle with `libsql` is `@libsql/client`.
        // Drizzle's `db.session.client` or `db.driver` often holds the raw connection/client.
        // If `payload.db.drizzle` is the Drizzle instance, let's assume it has a way to execute raw statements.
        // `drizzle-orm/libsql` has `driver.execute()` on its LibSQLSession.
        // So, `payload.db.drizzle.session.driver.execute()` might be it.
        // Or more simply, if Drizzle forwards `execute` or `batch`:

        // The most robust way is to use the `batch` execution if available on the drizzle instance,
        // assuming it delegates to the underlying libSQL client's batch method.
        // If not, we'd need to access the raw libSQL client.
        // payload.db.drizzle.batch should work if Drizzle libSQL adapter exposes it.
        // Let's try with `execute` for each, as it's a common method on db drivers/clients.

        // The `execute` method on the libSQL client itself is `(sql: string | TemplateStringsArray, ...params: any[]) => Promise<ResultSet>`
        // or `(config: { sql: string, args: any[] }) => Promise<ResultSet>`.
        // PRAGMAs usually don't take args and are single strings.

        // The `payload.db` object is the adapter. Let's check its type or available methods if possible.
        // Since we can't introspect here, let's rely on the info that `payload.db.drizzle` is the Drizzle instance.
        // Drizzle documentation for `drizzle-orm/better-sqlite3` shows `db.run(sql`PRAGMA journal_mode = WAL`);`
        // For `drizzle-orm/libsql`, it might be similar.
        // The `sql` import from `@payloadcms/db-sqlite/drizzle` is for query building.
        // For raw execution, it might be `payload.db.drizzle.session.client.execute(...)`

        if (typeof (payload.db.drizzle as any)?.batch === 'function') {
          await (payload.db.drizzle as any).batch([
            { sql: 'PRAGMA journal_mode=WAL;' },
            { sql: 'PRAGMA synchronous=NORMAL;' },
            { sql: 'PRAGMA cache_size=10000;' },
            { sql: 'PRAGMA temp_store=memory;' },
          ]);
          payload.logger.info('SQLite PRAGMAs applied using batch().');
        } else if (typeof (payload.db.drizzle as any)?.execute === 'function') {
          // Fallback if batch is not directly on drizzle, try execute for each
          // This is less ideal than batch but better than nothing.
          await (payload.db.drizzle as any).execute('PRAGMA journal_mode=WAL;');
          await (payload.db.drizzle as any).execute('PRAGMA synchronous=NORMAL;');
          await (payload.db.drizzle as any).execute('PRAGMA cache_size=10000;');
          await (payload.db.drizzle as any).execute('PRAGMA temp_store=memory;');
          payload.logger.info('SQLite PRAGMAs applied using execute() for each.');
        } else if (payload.db.drizzle && (payload.db.drizzle as any).session && typeof (payload.db.drizzle as any).session.client?.batch === 'function') {
          // Try accessing via session.client.batch (more likely for libSQL underlying client)
          await (payload.db.drizzle as any).session.client.batch([
            'PRAGMA journal_mode=WAL;',
            'PRAGMA synchronous=NORMAL;',
            'PRAGMA cache_size=10000;',
            'PRAGMA temp_store=memory;',
          ]);
           payload.logger.info('SQLite PRAGMAs applied using session.client.batch().');
        } else if (payload.db.drizzle && (payload.db.drizzle as any).session && typeof (payload.db.drizzle as any).session.client?.execute === 'function') {
          // Try accessing via session.client.execute (more likely for libSQL underlying client)
           await (payload.db.drizzle as any).session.client.execute('PRAGMA journal_mode=WAL;');
           await (payload.db.drizzle as any).session.client.execute('PRAGMA synchronous=NORMAL;');
           await (payload.db.drizzle as any).session.client.execute('PRAGMA cache_size=10000;');
           await (payload.db.drizzle as any).session.client.execute('PRAGMA temp_store=memory;');
           payload.logger.info('SQLite PRAGMAs applied using session.client.execute().');
        }
        else {
          payload.logger.warn('Could not find a method to apply SQLite PRAGMA settings (batch or execute). Performance may not be optimal.');
        }

        // Verify journal_mode (optional, for logging)
        // const result = await (payload.db.drizzle as any).session.client.execute('PRAGMA journal_mode;');
        // payload.logger.info(`SQLite journal_mode after setting: ${JSON.stringify(result)}`);

      } catch (error) {
        payload.logger.error(`Error applying SQLite PRAGMA settings: ${error.message}`);
      }
    }
  },
})
// Note: The example in docs for `bin` uses `path.resolve(dirname, 'seed.ts')`.
// My `dirname` is `path.dirname(fileURLToPath(import.meta.url))`, which should be `src`.
// So `path.resolve(dirname, 'seeds/index.ts')` should correctly point to `src/seeds/index.ts`.
// I'll correct scriptPath to use .ts
