# 02 - CONFIGURACIÓN DE BASE DE DATOS 🗄️

## 🎯 OBJETIVO
Configurar y optimizar la base de datos SQLite para el backend turístico, incluyendo configuración de conexión, configuración de schemas y preparación para futuras migraciones.

## 📋 PREREQUISITOS
- [✅] Tarea 01 - Setup inicial completada
- [✅] Payload CMS instalado y funcionando
- [✅] Variables de entorno configuradas

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. CONFIGURACIÓN DE BASE DE DATOS EN PAYLOAD.CONFIG.TS
- [ ] **1.1** - Verificar configuración actual de database en `payload.config.ts`
- [ ] **1.2** - Configurar SQLite con parámetros optimizados:
  ```typescript
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI!,
      authToken: process.env.DATABASE_AUTH_TOKEN, // para Turso en producción
    },
    push: process.env.NODE_ENV === 'development',
  })
  ```

- [ ] **1.3** - Configurar pool de conexiones para desarrollo
- [ ] **1.4** - Configurar timeout y retry settings

### 2. OPTIMIZACIÓN DE RENDIMIENTO
- [ ] **2.1** - Configurar índices automáticos para búsquedas frecuentes
- [ ] **2.2** - Configurar WAL mode para SQLite:
  ```sql
  PRAGMA journal_mode=WAL;
  PRAGMA synchronous=NORMAL;
  PRAGMA cache_size=10000;
  PRAGMA temp_store=memory;
  ```

- [ ] **2.3** - Configurar límites de memoria y cache
- [ ] **2.4** - Configurar compresión de datos cuando sea posible

### 3. CONFIGURACIÓN DE SCHEMAS BÁSICOS
- [ ] **3.1** - Definir esquema base para `users` unificado
- [ ] **3.2** - Definir esquema base para `media` con optimizaciones
- [ ] **3.3** - Configurar relaciones básicas entre collections
- [ ] **3.4** - Configurar índices compuestos para consultas complejas

### 4. CONFIGURACIÓN DE MIGRATIONS
- [ ] **4.1** - Crear directorio `src/migrations/` si no existe
- [ ] **4.2** - Configurar migration runner en payload.config.ts
- [ ] **4.3** - Crear migración inicial para estructura base
- [ ] **4.4** - Crear script para ejecutar migrations: `npm run migrate`

### 5. CONFIGURACIÓN DE SEEDS/DATOS INICIALES
- [ ] **5.1** - Crear directorio `src/seeds/` para datos iniciales
- [ ] **5.2** - Crear seed para categorías de lugares turísticos de Riohacha:
  ```typescript
  const categories = [
    { name: 'Playas y Costas', icon: 'beach_access', color: '#4FC3F7' },
    { name: 'Sitios Culturales', icon: 'account_balance', color: '#8D6E63' },
    { name: 'Aventura y Deportes', icon: 'hiking', color: '#FF7043' },
    // ... más categorías
  ]
  ```

- [ ] **5.3** - Crear seed para lugares turísticos principales de Riohacha
- [ ] **5.4** - Crear script para ejecutar seeds: `npm run seed`

### 6. CONFIGURACIÓN DE BACKUP Y RECOVERY
- [ ] **6.1** - Configurar backup automático de SQLite cada 24h
- [ ] **6.2** - Crear script de backup manual: `npm run backup`
- [ ] **6.3** - Crear script de restore: `npm run restore`
- [ ] **6.4** - Configurar compresión de backups

### 7. VARIABLES DE ENTORNO ADICIONALES
- [ ] **7.1** - Agregar variables de database al `.env.local`:
  ```env
  # Database Configuration
  DATABASE_URI=./backend-app.db
  DATABASE_AUTH_TOKEN=
  DATABASE_BACKUP_DIR=./backups
  DATABASE_MAX_CONNECTIONS=10
  DATABASE_TIMEOUT=30000
  ```

- [ ] **7.2** - Configurar variables específicas para producción
- [ ] **7.3** - Documentar todas las variables en `.env.example`

### 8. CONFIGURACIÓN DE MONITOREO
- [ ] **8.1** - Configurar logging de queries lentas (>500ms)
- [ ] **8.2** - Configurar métricas de conexiones activas
- [ ] **8.3** - Configurar alertas de espacio en disco
- [ ] **8.4** - Crear endpoint de health check para la database

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Funcionalidad de Base de Datos
- [ ] Base de datos SQLite se conecta correctamente
- [ ] WAL mode habilitado y funcionando
- [ ] Pool de conexiones configurado
- [ ] Queries básicas funcionan sin errores

### Performance
- [ ] Índices automáticos creados
- [ ] Cache configurado apropiadamente
- [ ] Tiempo de respuesta < 100ms para queries simples
- [ ] Queries complejas < 500ms

### Migrations y Seeds
- [ ] Sistema de migrations funcionando
- [ ] Seeds de categorías ejecutándose correctamente
- [ ] Scripts de npm para migrations y seeds
- [ ] Rollback de migrations funcionando

### Backup y Recovery
- [ ] Backup manual funcionando
- [ ] Restore funcionando
- [ ] Compresión de backups activa
- [ ] Directorio de backups creado

### Monitoreo
- [ ] Logs de queries lentas funcionando
- [ ] Health check endpoint respondiendo
- [ ] Métricas básicas disponibles

---

## 🛠️ COMANDOS ÚTILES

### Configuración de Base de Datos
```bash
# Verificar conexión a la base de datos
npm run payload -- --help

# Generar tipos después de cambios
npm run generate:types

# Reset completo de base de datos (CUIDADO en producción)
rm -f backend-app.db && npm run dev
```

### Migrations
```bash
# Crear nueva migración
npm run payload migrate:create -- --name "nombre-migracion"

# Ejecutar migrations pendientes
npm run migrate

# Rollback última migración
npm run payload migrate:down
```

### Seeds
```bash
# Ejecutar todos los seeds
npm run seed

# Ejecutar seed específico
npm run payload seed -- --seed categorias
```

### Backup y Recovery
```bash
# Crear backup manual
npm run backup

# Listar backups disponibles
ls -la ./backups/

# Restaurar desde backup
npm run restore -- --file backup-2024-06-02.db.gz
```

### Monitoreo
```bash
# Verificar tamaño de base de datos
ls -lh backend-app.db

# Ver logs de la aplicación
npm run dev | grep "DATABASE"

# Verificar health check
curl http://localhost:3000/api/health/database
```

---

## 📝 NOTAS TÉCNICAS

### SQLite Optimizations
- **WAL Mode:** Mejor performance para lecturas concurrentes
- **Cache Size:** 10MB por defecto, ajustar según memoria disponible
- **Temp Store:** En memoria para queries complejas más rápidas

### Índices Automáticos
Payload crea automáticamente índices para:
- Campos `id` (primary key)
- Campos `email` (unique)
- Campos de relaciones (foreign keys)
- Campos frecuentemente filtrados

### Migrations vs Seeds
- **Migrations:** Cambios estructurales de schema
- **Seeds:** Datos iniciales y de prueba
- **Never mix:** No mezclar estructura con datos

### Producción vs Desarrollo
- **Desarrollo:** SQLite local, WAL mode, seeds activos
- **Producción:** Considerar PostgreSQL para escalabilidad
- **Staging:** Réplica exacta de producción

---

## 🚨 PROBLEMAS COMUNES

### Error: "database is locked"
- **Causa:** Múltiples conexiones o proceso zombie
- **Solución:** Reiniciar proceso, verificar conexiones abiertas
- **Prevención:** Configurar timeout apropiado

### Error: "disk I/O error"
- **Causa:** Permisos insuficientes o disco lleno
- **Solución:** Verificar permisos y espacio disponible
- **Comando:** `df -h` y `ls -la`

### Performance lenta
- **Causa:** Falta de índices o queries no optimizadas
- **Solución:** Analizar queries con EXPLAIN QUERY PLAN
- **Herramienta:** SQLite browser para análisis

### Corrupción de datos
- **Causa:** Apagado inesperado o error de hardware
- **Solución:** Usar backup más reciente
- **Prevención:** Backups automáticos frecuentes

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ SQLite configurado con WAL mode
- [ ] ✅ Pool de conexiones optimizado
- [ ] ✅ Sistema de migrations funcionando
- [ ] ✅ Seeds de categorías de Riohacha cargados
- [ ] ✅ Sistema de backup configurado
- [ ] ✅ Monitoreo básico activo
- [ ] ✅ Scripts de npm para database management
- [ ] ✅ Variables de entorno documentadas
- [ ] ✅ Health check endpoint funcionando

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `03-colecciones-basicas.md`

---

## 🧪 TESTS ESPECÍFICOS DE LA TAREA

### Tests Obligatorios para Completar la Tarea
Esta tarea solo estará **COMPLETA** cuando **TODOS** los siguientes tests pasen:

#### **📁 Estructura de Tests: `test/tasks/task-02/`**

##### **1. `database-config.test.ts` - Tests de Configuración de DB**
```typescript
describe('Task 02 - Database Configuration', () => {
  test('should have valid SQLite configuration in payload.config.ts', async () => {
    // Verificar configuración de SQLite
    // Verificar parámetros optimizados
    // Validar connection pool settings
  });

  test('should have proper WAL mode and PRAGMA settings', async () => {
    // Verificar PRAGMA journal_mode=WAL
    // Verificar PRAGMA synchronous=NORMAL
    // Verificar cache_size configuration
  });

  test('should have migration runner configured', async () => {
    // Verificar directorio src/migrations/
    // Verificar migration runner en payload.config.ts
    // Validar npm run migrate script
  });
});
```

##### **2. `database-connection.test.ts` - Tests de Conexión**
```typescript
describe('Database Connection Tests', () => {
  test('should establish successful database connection', async () => {
    // Test de conexión a SQLite
    // Verificar timeout settings
    // Validar retry mechanism
  });

  test('should handle connection pool correctly', async () => {
    // Test de pool de conexiones
    // Verificar límites de conexiones concurrentes
    // Validar limpieza de conexiones
  });

  test('should have health check endpoint responding', async () => {
    // Test del endpoint /api/health/database
    // Verificar respuesta JSON válida
    // Validar métricas de conexión
  });
});
```

##### **3. `database-seeds.test.ts` - Tests de Seeds y Datos Iniciales**
```typescript
describe('Database Seeds Tests', () => {
  test('should have seeds directory and scripts configured', () => {
    // Verificar directorio src/seeds/
    // Verificar npm run seed script
    // Validar estructura de seeds
  });

  test('should create Riohacha tourism categories correctly', async () => {
    // Test de seed de categorías
    // Verificar categorías específicas de Riohacha
    // Validar estructura y campos requeridos
  });

  test('should create initial tourist places for Riohacha', async () => {
    // Test de seed de lugares turísticos
    // Verificar datos iniciales de Riohacha
    // Validar relaciones con categorías
  });
});
```

##### **4. `database-backup.test.ts` - Tests de Backup y Recovery**
```typescript
describe('Database Backup System Tests', () => {
  test('should have backup configuration and scripts', () => {
    // Verificar npm run backup script
    // Verificar npm run restore script
    // Validar configuración de directorio de backups
  });

  test('should create valid backup files', async () => {
    // Test de creación de backup
    // Verificar compresión de backups
    // Validar integridad de archivos backup
  });

  test('should restore from backup successfully', async () => {
    // Test de restore desde backup
    // Verificar integridad de datos restaurados
    // Validar estructura de tablas post-restore
  });
});
```

##### **5. `database-performance.test.ts` - Tests de Rendimiento**
```typescript
describe('Database Performance Tests', () => {
  test('should have optimized indexes for frequent queries', async () => {
    // Test de índices automáticos
    // Verificar índices compuestos
    // Validar performance de consultas
  });

  test('should log slow queries correctly', async () => {
    // Test de logging de queries >500ms
    // Verificar configuración de monitoreo
    // Validar formato de logs
  });

  test('should handle concurrent connections within limits', async () => {
    // Test de conexiones concurrentes
    // Verificar límites de DATABASE_MAX_CONNECTIONS
    // Validar timeout handling
  });
});
```

### **📊 Comandos de Validación**

#### **Ejecutar Tests de la Tarea 02:**
```bash
npm run test:task-02
```

#### **Ejecutar Tests con Coverage:**
```bash
npm run test:task-02:coverage
```

#### **Validación Automática de Completitud:**
```bash
node scripts/validate-task.js 02
```

### **✅ Criterios de Completitud**
- [ ] 🧪 **TODOS los tests pasan** (100% success rate)
- [ ] 📊 **Coverage >80%** en archivos de configuración de database
- [ ] 🔍 **Validación automática exitosa** con `validate-task.js 02`
- [ ] 📁 **Estructura de archivos verificada** por tests
- [ ] ⚡ **Performance tests pasan** con métricas aceptables
- [ ] 💾 **Tests de backup/restore funcionando** correctamente

---

## ⚠️ IMPORTANTE
**Esta tarea NO estará completa hasta que TODOS los tests pasen exitosamente.**

El comando `npm run test:task-02` debe ejecutarse sin errores y todos los tests deben estar en estado ✅ PASSED.

---
