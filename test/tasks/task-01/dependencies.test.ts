import { readFileSync } from 'fs'
import { join } from 'path'

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  scripts?: Record<string, string>
}

describe('Task 01: Setup Inicial - Dependencias', () => {
  let packageJson: PackageJson

  beforeAll(() => {
    const packagePath = join(process.cwd(), 'package.json')
    const packageContent = readFileSync(packagePath, 'utf8')
    packageJson = JSON.parse(packageContent) as PackageJson
  })
  test('debe tener @payloadcms/next instalado', () => {
    expect(
      packageJson.dependencies?.['@payloadcms/next'] ||
        packageJson.devDependencies?.['@payloadcms/next'],
    ).toBeDefined()
  })

  test('debe tener @payloadcms/db-sqlite instalado', () => {
    expect(
      packageJson.dependencies?.['@payloadcms/db-sqlite'] ||
        packageJson.devDependencies?.['@payloadcms/db-sqlite'],
    ).toBeDefined()
  })

  test('debe tener jsonwebtoken instalado', () => {
    expect(
      packageJson.dependencies?.['jsonwebtoken'] || packageJson.devDependencies?.['jsonwebtoken'],
    ).toBeDefined()
  })

  test('debe tener bcryptjs instalado', () => {
    expect(
      packageJson.dependencies?.['bcryptjs'] || packageJson.devDependencies?.['bcryptjs'],
    ).toBeDefined()
  })

  test('debe tener joi instalado', () => {
    expect(packageJson.dependencies?.['joi'] || packageJson.devDependencies?.['joi']).toBeDefined()
  })

  test('debe tener validator instalado', () => {
    expect(
      packageJson.dependencies?.['validator'] || packageJson.devDependencies?.['validator'],
    ).toBeDefined()
  })

  test('debe tener slugify instalado', () => {
    expect(
      packageJson.dependencies?.['slugify'] || packageJson.devDependencies?.['slugify'],
    ).toBeDefined()
  })

  test('debe tener date-fns instalado', () => {
    expect(
      packageJson.dependencies?.['date-fns'] || packageJson.devDependencies?.['date-fns'],
    ).toBeDefined()
  })

  test('debe tener jest instalado', () => {
    expect(
      packageJson.dependencies?.['jest'] || packageJson.devDependencies?.['jest'],
    ).toBeDefined()
  })

  test('debe tener supertest instalado', () => {
    expect(
      packageJson.dependencies?.['supertest'] || packageJson.devDependencies?.['supertest'],
    ).toBeDefined()
  })

  test('debe tener scripts de testing configurados', () => {
    expect(packageJson.scripts?.['test']).toBeDefined()
    expect(packageJson.scripts?.['test:task-01']).toBeDefined()
    expect(packageJson.scripts?.['test:validate']).toBeDefined()
  })
})
