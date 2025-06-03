/* eslint-disable @typescript-eslint/no-explicit-any */
import payload from 'payload'

let isInitialized = false

/**
 * Inicializa Payload para testing
 */
export async function initPayload(options: any = {}) {
  if (isInitialized) {
    return payload
  }

  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'test-secret',
    local: true,
    ...options,
  } as any)

  isInitialized = true
  return payload
}

/**
 * Limpia la base de datos después de los tests
 */
export async function cleanupPayload() {
  if (isInitialized && payload.db) {
    await payload.db.destroy?.()
    isInitialized = false
  }
}

/**
 * Crea un usuario de prueba
 */
export async function createTestUser(data: Record<string, unknown> = {}) {
  await initPayload()

  const defaultUser = {
    email: 'test@example.com',
    password: 'test123456',
    ...data,
  }

  return await payload.create({
    collection: 'users',
    data: defaultUser,
  })
}

/**
 * Helper para hacer login y obtener token
 */
export async function loginTestUser(email = 'test@example.com', password = 'test123456') {
  await initPayload()

  const result = await payload.login({
    collection: 'users',
    data: { email, password },
  })

  return result
}
