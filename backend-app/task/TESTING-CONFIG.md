# 🧪 CONFIGURACIÓN DE TESTING POR TAREA - PAYLOAD CMS + JEST + SUPERTEST

## 🎯 ENFOQUE: TESTING POR TAREA
Cada tarea tiene sus propios tests específicos. Una tarea solo se considera completa cuando **TODOS sus tests pasan**.

### 📁 Estructura de Testing por Tarea
```
test/
├── setup.ts                    # Configuración global
├── helpers/                    # Helpers compartidos
│   ├── api-client.ts
│   └── test-data.ts
├── tasks/                      # Tests organizados por tarea
│   ├── task-01/               # Tests para setup inicial
│   │   ├── setup.test.ts
│   │   ├── dependencies.test.ts
│   │   └── config.test.ts
│   ├── task-02/               # Tests para database
│   │   ├── connection.test.ts
│   │   ├── migrations.test.ts
│   │   └── seeds.test.ts
│   ├── task-03/               # Tests para colecciones básicas
│   │   ├── users.test.ts
│   │   ├── media.test.ts
│   │   └── categories.test.ts
│   └── ... (una carpeta por tarea)
└── __mocks__/                 # Mocks globales
```

### jest.config.ts
```typescript
import type { Config } from 'jest';

const config: Config = {
  // Configuración específica para Payload CMS
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Configuración de archivos
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  
  // Configuración TypeScript
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@payload-config$': '<rootDir>/src/payload.config.ts'
  },
  
  // Configuración de cobertura
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/payload-types.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    ['text', { skipFull: true }]
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Configuración de timeouts
  testTimeout: 30000,
  
  // Variables globales para tests
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  
  // Configuración de reportes
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Backend Tourism Riohacha - Test Report',
      outputPath: 'test-report.html',
      includeFailureMsg: true
    }]
  ],
  
  // Configuración avanzada
  verbose: true,
  detectOpenHandles: true,
  forceExit: true
};

export default config;
```

### test/setup.ts
```typescript
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import payload from 'payload';

let mongoServer: MongoMemoryServer;

// Setup antes de todos los tests
beforeAll(async () => {
  // Inicializar MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Variables de entorno para testing
  process.env.NODE_ENV = 'test';
  process.env.PAYLOAD_SECRET = 'test-secret-key';
  process.env.DATABASE_URI = mongoUri;
  
  // Inicializar Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
    onInit: () => {
      console.log('Payload Test initialized successfully');
    },
  });
});

// Cleanup después de todos los tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  await payload.db.destroy();
});

// Cleanup después de cada test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
```

## 🚀 CONFIGURACIÓN SUPERTEST PARA API TESTING

### test/helpers/api-client.ts
```typescript
import request from 'supertest';
import { Express } from 'express';
import payload from 'payload';

export class ApiTestClient {
  private app: Express;
  private authToken?: string;

  constructor(app: Express) {
    this.app = app;
  }

  // Método para autenticación
  async authenticate(email: string, password: string): Promise<void> {
    const response = await request(this.app)
      .post('/api/users/login')
      .send({ email, password })
      .expect(200);
    
    this.authToken = response.body.token;
  }

  // Método para requests autenticados
  authenticatedRequest() {
    const req = request(this.app);
    if (this.authToken) {
      req.set('Authorization', `JWT ${this.authToken}`);
    }
    return req;
  }

  // Método para crear usuarios de prueba
  async createTestUser(userData = {}) {
    const defaultUser = {
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      ...userData
    };

    const user = await payload.create({
      collection: 'users',
      data: defaultUser
    });

    return user;
  }

  // Método para crear lugares de prueba
  async createTestPlace(placeData = {}) {
    const defaultPlace = {
      name: 'Test Place',
      description: 'Test description',
      location: {
        lat: 11.5444,
        lng: -72.9075
      },
      category: 'beach',
      ...placeData
    };

    const place = await payload.create({
      collection: 'places',
      data: defaultPlace
    });

    return place;
  }
}
```

## 📊 SISTEMA DE REPORTES AUTOMATIZADOS

### scripts/generate-test-report.ts
```typescript
import fs from 'fs';
import path from 'path';

interface TestResults {
  numTotalTests: number;
  numPassedTests: number;
  numFailedTests: number;
  testResults: Array<{
    testFilePath: string;
    numPassingTests: number;
    numFailingTests: number;
  }>;
}

export function generateTestReport(results: TestResults): void {
  const reportPath = path.join(process.cwd(), 'test-results.txt');
  
  const report = `
# REPORTE DE TESTING - BACKEND TURÍSTICO RIOHACHA
Fecha: ${new Date().toLocaleString()}

## RESUMEN GENERAL
- Total de tests: ${results.numTotalTests}
- Tests exitosos: ${results.numPassedTests}
- Tests fallidos: ${results.numFailedTests}
- Porcentaje éxito: ${((results.numPassedTests / results.numTotalTests) * 100).toFixed(2)}%

## DETALLE POR ARCHIVO
${results.testResults.map(file => `
- ${path.basename(file.testFilePath)}:
  ✅ Exitosos: ${file.numPassingTests}
  ❌ Fallidos: ${file.numFailingTests}
`).join('')}

## ESTADO GENERAL
${results.numFailedTests === 0 ? '🎉 TODOS LOS TESTS PASARON' : '⚠️  HAY TESTS FALLIDOS'}
`;

  fs.writeFileSync(reportPath, report);
  console.log(`📊 Reporte generado en: ${reportPath}`);
}
```

## 🔧 SCRIPTS PACKAGE.JSON POR TAREA

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    
    "test:task-01": "jest test/tasks/task-01",
    "test:task-02": "jest test/tasks/task-02",
    "test:task-03": "jest test/tasks/task-03",
    "test:task-04": "jest test/tasks/task-04",
    "test:task-05": "jest test/tasks/task-05",
    "test:task-06": "jest test/tasks/task-06",
    "test:task-07": "jest test/tasks/task-07",
    "test:task-08": "jest test/tasks/task-08",
    "test:task-09": "jest test/tasks/task-09",
    "test:task-10": "jest test/tasks/task-10",
    
    "test:all-tasks": "jest test/tasks/",
    "test:validate-task": "node scripts/validate-task.js"
  }
}
```

## 📊 VALIDADOR DE TAREAS

### scripts/validate-task.js
```javascript
const { execSync } = require('child_process');
const fs = require('fs');

function validateTask(taskNumber) {
  console.log(`🧪 Validando Tarea ${taskNumber}...`);
  
  try {
    // Ejecutar tests de la tarea específica
    const result = execSync(`npm run test:task-${taskNumber.toString().padStart(2, '0')}`, 
      { encoding: 'utf8' });
    
    console.log(`✅ Tarea ${taskNumber} - TODOS LOS TESTS PASARON`);
    
    // Generar reporte de tarea
    const reportPath = `task-${taskNumber}-report.txt`;
    fs.writeFileSync(reportPath, `
TAREA ${taskNumber} - VALIDACIÓN COMPLETA
Fecha: ${new Date().toLocaleString()}
Estado: ✅ COMPLETADA
Todos los tests pasaron correctamente.

${result}
    `);
    
    return true;
  } catch (error) {
    console.log(`❌ Tarea ${taskNumber} - TESTS FALLARON`);
    console.log(error.stdout);
    
    // Generar reporte de error
    const reportPath = `task-${taskNumber}-report.txt`;
    fs.writeFileSync(reportPath, `
TAREA ${taskNumber} - VALIDACIÓN FALLIDA
Fecha: ${new Date().toLocaleString()}
Estado: ❌ INCOMPLETA
Los tests fallaron.

${error.stdout || error.message}
    `);
    
    return false;
  }
}

// Ejecutar validación
const taskNumber = process.argv[2];
if (!taskNumber) {
  console.log('Uso: node scripts/validate-task.js <número-tarea>');
  process.exit(1);
}

const isValid = validateTask(parseInt(taskNumber));
process.exit(isValid ? 0 : 1);
```

## 📝 CONVENCIONES DE TESTING

### Estructura de directorios
```
test/
├── setup.ts                 # Configuración global
├── helpers/
│   ├── api-client.ts        # Cliente para API testing
│   └── test-data.ts         # Datos de prueba
├── unit/                    # Tests unitarios
├── integration/             # Tests de integración
├── api/                     # Tests de endpoints
└── __mocks__/              # Mocks globales
```

### Convenciones de nomenclatura
- **Unit tests:** `*.unit.test.ts`
- **Integration tests:** `*.integration.test.ts`
- **API tests:** `*.api.test.ts`
- **E2E tests:** `*.e2e.test.ts`

### Template de test básico
```typescript
import { ApiTestClient } from '../helpers/api-client';
import payload from 'payload';

describe('Collection Tests', () => {
  let apiClient: ApiTestClient;

  beforeEach(async () => {
    apiClient = new ApiTestClient(payload.app);
  });

  describe('GET /api/collection', () => {
    it('should return all items', async () => {
      const response = await apiClient
        .authenticatedRequest()
        .get('/api/collection')
        .expect(200);

      expect(response.body.docs).toBeDefined();
      expect(Array.isArray(response.body.docs)).toBe(true);
    });
  });
});
```
