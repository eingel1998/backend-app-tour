import { existsSync } from 'fs'
import { join } from 'path'

describe('Task 01: Setup Inicial - Archivos de Configuración', () => {
  test('debe existir payload.config.ts', () => {
    const configPath = join(process.cwd(), 'src/payload.config.ts')
    expect(existsSync(configPath)).toBe(true)
  })

  test('debe existir .env.local', () => {
    const envPath = join(process.cwd(), '.env.local')
    expect(existsSync(envPath)).toBe(true)
  })

  test('debe existir .env.example', () => {
    const envExamplePath = join(process.cwd(), '.env.example')
    expect(existsSync(envExamplePath)).toBe(true)
  })

  test('debe existir jest.config.ts', () => {
    const jestConfigPath = join(process.cwd(), 'jest.config.ts')
    expect(existsSync(jestConfigPath)).toBe(true)
  })

  test('debe existir directorio test/', () => {
    const testPath = join(process.cwd(), 'test')
    expect(existsSync(testPath)).toBe(true)
  })

  test('debe existir test/setup.ts', () => {
    const setupPath = join(process.cwd(), 'test/setup.ts')
    expect(existsSync(setupPath)).toBe(true)
  })

  test('debe existir test/helpers/', () => {
    const helpersPath = join(process.cwd(), 'test/helpers')
    expect(existsSync(helpersPath)).toBe(true)
  })
})
