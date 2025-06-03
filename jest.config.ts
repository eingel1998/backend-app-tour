import type { Config } from 'jest'

const config: Config = {
  // Entorno de testing
  testEnvironment: 'node',

  // Archivos de configuración
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  // Patrones de archivos
  testMatch: [
    '<rootDir>/test/**/*.test.ts',
    '<rootDir>/test/**/*.spec.ts',
    '<rootDir>/src/**/__tests__/**/*.ts',
  ],

  // Ignorar archivos
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
  ],

  // Configuración de TypeScript
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          // Configuración específica para tests
          module: 'commonjs',
          target: 'es2020',
          moduleResolution: 'node',
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          skipLibCheck: true,
          strict: false, // Menos estricto en tests
        },
      },
    ],
  },
  // Mapeo de módulos
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@payload-config$': '<rootDir>/src/payload.config.ts',
  },

  // Variables de entorno para testing
  setupFiles: ['<rootDir>/test/env.setup.ts'],

  // Configuración de cobertura
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/payload-types.ts',
    '!src/app/**/not-found.tsx',
    '!src/app/**/layout.tsx',
  ],

  // Reportes
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Backend App Tour - Test Results',
        outputPath: 'test-results/index.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
  ],

  // Configuración adicional
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
  maxWorkers: 1, // Para evitar conflictos con SQLite

  // Timeout
  testTimeout: 30000,
}

export default config
