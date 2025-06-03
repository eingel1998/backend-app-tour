// Configuración de variables de entorno para testing
Object.assign(process.env, {
  NODE_ENV: 'test',
  PAYLOAD_SECRET: 'test-secret-key-for-jest-testing-123456789',
  DATABASE_URI: 'file:./test-database.db',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
})
