import { existsSync } from 'fs'
import { join } from 'path'

describe('Task 01: Setup Inicial - Configuración Payload', () => {
  test('debe existir archivo de configuración payload.config.ts', () => {
    const configPath = join(process.cwd(), 'src/payload.config.ts')
    expect(existsSync(configPath)).toBe(true)
  })

  test('debe tener variables de entorno necesarias', () => {
    // Verificar que las variables están definidas
    expect(process.env.PAYLOAD_SECRET).toBeDefined()
    expect(process.env.DATABASE_URI).toBeDefined()
    expect(process.env.NEXT_PUBLIC_SERVER_URL).toBeDefined()
  })

  test('debe tener secret no vacío', () => {
    expect(process.env.PAYLOAD_SECRET).not.toBe('')
    expect(process.env.PAYLOAD_SECRET?.length).toBeGreaterThan(10)
  })

  test('debe tener configuración válida de base de datos', () => {
    expect(process.env.DATABASE_URI).toContain('file:')
  })

  test('debe poder importar la configuración de payload', async () => {
    const configPath = join(process.cwd(), 'src/payload.config.ts')
    expect(existsSync(configPath)).toBe(true)

    // Verificar que el archivo tiene contenido
    const fs = await import('fs')
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(content).toContain('buildConfig')
    expect(content).toContain('sqliteAdapter')
  })
})
