import { beforeAll, afterAll, afterEach } from '@jest/globals'
import path from 'path'
import fs from 'fs'

// Configuración global para todos los tests
beforeAll(async () => {
  // Limpiar base de datos de test antes de comenzar
  const testDbPath = path.join(process.cwd(), 'test-database.db')
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath)
  }
})

afterAll(async () => {
  // Limpiar base de datos de test después de todos los tests
  const testDbPath = path.join(process.cwd(), 'test-database.db')
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath)
  }
})

afterEach(async () => {
  // Limpiar entre tests si es necesario
  // Este hook se ejecuta después de cada test individual
})

// Configuración de timeouts globales
jest.setTimeout(30000)

// Mock de console.log para tests más limpios
const originalConsoleLog = console.log
console.log = (...args: unknown[]) => {
  // Solo mostrar logs si hay errores o en modo verbose
  if (
    process.env.JEST_VERBOSE === 'true' ||
    args.some((arg) => typeof arg === 'string' && (arg.includes('error') || arg.includes('Error')))
  ) {
    originalConsoleLog(...args)
  }
}
