# 06 - AUTENTICACIÓN Y AUTORIZACIÓN 🔐

## 🎯 OBJETIVO
Configurar un sistema robusto de autenticación y autorización para la aplicación turística, incluyendo registro, login, permisos por rol, autenticación de APIs y seguridad avanzada.

## 📋 PREREQUISITOS
- [✅] Tarea 05 - Colecciones avanzadas completada
- [✅] Colección Users unificada funcionando
- [✅] Endpoints básicos configurados

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. CONFIGURACIÓN BÁSICA DE AUTENTICACIÓN
**Archivo:** `src/auth/config.ts`

- [ ] **1.1** - Configurar autenticación en `payload.config.ts`:
  ```typescript
  auth: {
    collections: ['users'],
    strategies: [
      {
        name: 'local',
        authenticate: localStrategy
      }
    ]
  }
  ```

- [ ] **1.2** - Configurar JWT settings:
  ```typescript
  // Secret key, expiration time, refresh tokens
  jwt: {
    secret: process.env.PAYLOAD_SECRET,
    expiration: 3600, // 1 hora
  }
  ```

- [ ] **1.3** - Configurar cookies settings para sessions
- [ ] **1.4** - Configurar CORS para frontend móvil
- [ ] **1.5** - Configurar rate limiting para endpoints de auth

### 2. ENDPOINTS DE AUTENTICACIÓN PERSONALIZADOS
**Archivo:** `src/endpoints/auth.ts`

- [ ] **2.1** - Crear endpoint `/api/auth/register` para registro:
  ```typescript
  // POST: registro de usuarios regulares y empresas
  // Validaciones: email único, password seguro, datos requeridos
  // Retorna: usuario creado (sin password) + token JWT
  ```

- [ ] **2.2** - Crear endpoint `/api/auth/login` para login:
  ```typescript
  // POST: autenticación con email/password
  // Manejo de intentos fallidos, bloqueo temporal
  // Retorna: usuario + token JWT + refresh token
  ```

- [ ] **2.3** - Crear endpoint `/api/auth/refresh` para renovar tokens:
  ```typescript
  // POST: renovar token JWT usando refresh token
  // Validar refresh token, generar nuevo JWT
  ```

- [ ] **2.4** - Crear endpoint `/api/auth/logout` para logout:
  ```typescript
  // POST: invalidar token y refresh token
  // Limpiar cookies de sesión
  ```

- [ ] **2.5** - Crear endpoint `/api/auth/forgot-password` para recuperación:
  ```typescript
  // POST: enviar email de recuperación de contraseña
  // Generar token temporal seguro
  ```

- [ ] **2.6** - Crear endpoint `/api/auth/reset-password` para resetear password:
  ```typescript
  // POST: cambiar contraseña usando token de recuperación
  // Validar token, actualizar password, invalidar token
  ```

### 3. MIDDLEWARE DE AUTORIZACIÓN
**Archivo:** `src/middleware/auth.ts`

- [ ] **3.1** - Crear middleware `requireAuth` para endpoints protegidos:
  ```typescript
  // Verificar token JWT válido
  // Adjuntar user object al request
  // Manejar tokens expirados
  ```

- [ ] **3.2** - Crear middleware `requireRole` para permisos por rol:
  ```typescript
  // Verificar que user.userType coincida con rol requerido
  // Soportar múltiples roles: requireRole(['admin', 'business'])
  ```

- [ ] **3.3** - Crear middleware `requireVerification` para empresas verificadas:
  ```typescript
  // Verificar que businessData.verificationStatus === 'verified'
  // Solo para endpoints de empresas premium
  ```

- [ ] **3.4** - Crear middleware `rateLimitAuth` para prevenir ataques:
  ```typescript
  // Limitar intentos de login por IP
  // Implementar backoff exponencial
  ```

### 4. ACCESS CONTROL AVANZADO POR COLECCIÓN
**Archivo:** `src/access/index.ts`

- [ ] **4.1** - Configurar Access Control para Users:
  ```typescript
  // read: self + admins + (business data público si verificado)
  // update: self + admins (con validaciones específicas)
  // delete: self + admins (con confirmación)
  ```

- [ ] **4.2** - Configurar Access Control para Places:
  ```typescript
  // create: usuarios autenticados + empresas
  // read: público
  // update: businessOwner + admins
  // delete: businessOwner + admins
  ```

- [ ] **4.3** - Configurar Access Control para Reviews:
  ```typescript
  // create: usuarios autenticados (no business para sus propios lugares)
  // read: público (solo aprobadas)
  // update: author + admins
  // delete: author + admins
  ```

- [ ] **4.4** - Configurar Access Control para Conversations:
  ```typescript
  // create: usuarios autenticados
  // read: owner + admins
  // update: owner + admins
  // delete: owner + admins
  ```

- [ ] **4.5** - Configurar Access Control para Recommendations:
  ```typescript
  // create: usuarios autenticados + sistema IA
  // read: owner + (públicas si isPublic)
  // update: owner + admins
  // delete: owner + admins
  ```

### 5. VALIDACIONES DE SEGURIDAD
**Archivo:** `src/validation/security.ts`

- [ ] **5.1** - Implementar validación de contraseñas seguras:
  ```typescript
  // Mínimo 8 caracteres, al menos 1 mayúscula, 1 número
  // Verificar contraseñas comunes en blacklist
  // Generar hash con bcrypt (salt rounds: 12)
  ```

- [ ] **5.2** - Implementar validación de emails:
  ```typescript
  // Formato válido de email
  // Verificar dominios temporales/spam
  // Normalización de emails (lowercase, trim)
  ```

- [ ] **5.3** - Implementar sanitización de inputs:
  ```typescript
  // Prevenir XSS en campos de texto
  // Validar uploads de archivos
  // Sanitizar datos de business
  ```

- [ ] **5.4** - Implementar validación de datos de empresa:
  ```typescript
  // Validar RUT/NIT con algoritmos apropiados
  // Verificar formato de URLs
  // Validar coordenadas geográficas
  ```

### 6. SISTEMA DE PERMISOS GRANULAR
**Archivo:** `src/permissions/index.ts`

- [ ] **6.1** - Definir permisos específicos:
  ```typescript
  const PERMISSIONS = {
    // Usuarios
    'users:read-own': 'Leer datos propios',
    'users:update-own': 'Actualizar datos propios',
    'users:read-all': 'Leer todos los usuarios',
    
    // Lugares
    'places:create': 'Crear lugares',
    'places:update-own': 'Actualizar lugares propios',
    'places:approve': 'Aprobar lugares',
    
    // Reviews
    'reviews:create': 'Crear reseñas',
    'reviews:moderate': 'Moderar reseñas',
    
    // Admins
    'admin:all': 'Acceso administrativo completo'
  }
  ```

- [ ] **6.2** - Implementar función `hasPermission(user, permission)`:
  ```typescript
  // Verificar permisos basados en userType
  // Soporte para permisos condicionales
  // Cache de permisos para performance
  ```

- [ ] **6.3** - Configurar permisos por userType:
  ```typescript
  // 'user': permisos básicos de usuario
  // 'business': permisos de empresa + create places
  // 'admin': todos los permisos
  ```

### 7. AUDITORÍA Y LOGGING
**Archivo:** `src/audit/logger.ts`

- [ ] **7.1** - Implementar logging de actividades críticas:
  ```typescript
  // Login/logout attempts
  // Cambios de datos sensibles
  // Accesos denegados
  // Operaciones administrativas
  ```

- [ ] **7.2** - Crear sistema de auditoría para cambios:
  ```typescript
  // Hooks afterChange para log automático
  // Tracking de IP y user agent
  // Timestamps y metadata completa
  ```

- [ ] **7.3** - Implementar alertas de seguridad:
  ```typescript
  // Múltiples intentos fallidos
  // Accesos desde IPs sospechosas
  // Cambios masivos de datos
  ```

### 8. CONFIGURACIÓN PARA PRODUCCIÓN
**Archivo:** `src/config/production.ts`

- [ ] **8.1** - Configurar variables de entorno de seguridad:
  ```env
  # JWT Configuration
  JWT_SECRET=secure-random-string-256-bits
  JWT_EXPIRATION=3600
  REFRESH_TOKEN_EXPIRATION=7200
  
  # Rate Limiting
  AUTH_RATE_LIMIT_WINDOW=900000  # 15 minutes
  AUTH_RATE_LIMIT_MAX=5          # 5 attempts
  
  # Security
  BCRYPT_ROUNDS=12
  CORS_ORIGIN=https://your-frontend-domain.com
  ```

- [ ] **8.2** - Configurar HTTPS y certificados SSL
- [ ] **8.3** - Configurar headers de seguridad:
  ```typescript
  // X-Frame-Options, X-Content-Type-Options
  // Strict-Transport-Security, Content-Security-Policy
  ```

- [ ] **8.4** - Configurar backup de logs de auditoría

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Autenticación Básica
- [ ] Registro de usuarios funciona completamente
- [ ] Login con validación de credenciales funciona
- [ ] Tokens JWT se generan y validan correctamente
- [ ] Refresh tokens funcionan apropiadamente
- [ ] Recuperación de contraseña funciona

### Autorización y Permisos
- [ ] Access Control funciona en todas las colecciones
- [ ] Middleware de autorización bloquea accesos no autorizados
- [ ] Permisos por userType funcionan correctamente
- [ ] Empresas solo pueden editar sus propios lugares

### Seguridad
- [ ] Contraseñas se encriptan con bcrypt
- [ ] Rate limiting previene ataques de fuerza bruta
- [ ] Validaciones de input previenen XSS
- [ ] Headers de seguridad configurados

### Auditoría
- [ ] Actividades críticas se registran en logs
- [ ] Sistema de alertas funciona
- [ ] Tracking de cambios implementado

---

## 🛠️ COMANDOS ÚTILES

### Testing de Autenticación
```bash
# Registro de usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123",
    "firstName": "Test",
    "lastName": "User",
    "userType": "user"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123"
  }'

# Acceso a endpoint protegido
curl -H "Authorization: Bearer JWT_TOKEN" \
  http://localhost:3000/api/users/me

# Refresh token
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "REFRESH_TOKEN"}'
```

### Verificación de Seguridad
```bash
# Verificar encriptación de passwords
sqlite3 backend-app.db "SELECT email, password FROM users LIMIT 3;"

# Ver logs de auditoría
tail -f logs/audit.log | grep "LOGIN_ATTEMPT"

# Probar rate limiting (debería fallar después del límite)
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "wrong@email.com", "password": "wrong"}'
done
```

---

## 📝 NOTAS TÉCNICAS

### JWT Configuration
```typescript
// Configuración segura de JWT
const jwtConfig = {
  secret: process.env.JWT_SECRET, // Mínimo 256 bits
  expiresIn: '1h',
  issuer: 'riohacha-tourism-api',
  audience: 'riohacha-tourism-mobile'
};
```

### Password Hashing
```typescript
// Configuración de bcrypt
const SALT_ROUNDS = process.env.NODE_ENV === 'production' ? 12 : 10;

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};
```

### Rate Limiting Strategy
```typescript
// Configuración de rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos por IP
  message: 'Demasiados intentos de login, intenta en 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
});
```

---

## 🚨 PROBLEMAS COMUNES

### Error: "Invalid JWT token"
- **Causa:** Token expirado o secret incorrecto
- **Solución:** Verificar configuración JWT y manejo de refresh

### Error: "Access denied"
- **Causa:** Permisos insuficientes o middleware mal configurado
- **Solución:** Verificar Access Control y middleware order

### Error: "Too many requests"
- **Causa:** Rate limiting activado
- **Solución:** Implementar backoff exponencial en cliente

### Error: "Password validation failed"
- **Causa:** Password no cumple criterios de seguridad
- **Solución:** Mostrar criterios claros al usuario

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ Sistema completo de registro/login/logout
- [ ] ✅ JWT tokens y refresh tokens funcionando
- [ ] ✅ Middleware de autorización configurado
- [ ] ✅ Access Control granular por colección
- [ ] ✅ Validaciones de seguridad implementadas
- [ ] ✅ Sistema de permisos por rol funcionando
- [ ] ✅ Rate limiting y protección contra ataques
- [ ] ✅ Auditoría y logging configurados
- [ ] ✅ Configuración de producción preparada
- [ ] ✅ Headers de seguridad configurados

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `07-endpoints-personalizados.md`

---

## 🧪 TESTS ESPECÍFICOS DE LA TAREA

### Tests Obligatorios para Completar la Tarea
Esta tarea solo estará **COMPLETA** cuando **TODOS** los siguientes tests pasen:

#### **📁 Estructura de Tests: `test/tasks/task-06/`**

##### **1. `auth-config.test.ts` - Tests de Configuración de Autenticación**
```typescript
describe('Task 06 - Authentication Configuration', () => {
  test('should have proper JWT configuration', async () => {
    // Verificar configuración JWT en payload.config.ts
    // Test de secret key y expiration settings
    // Verificar configuración de refresh tokens
  });

  test('should have auth strategies configured correctly', async () => {
    // Test de local strategy configuration
    // Verificar collections auth setup
    // Test de configuración de cookies y sessions
  });

  test('should have proper CORS configuration', async () => {
    // Test de CORS para frontend móvil
    // Verificar origins permitidos
    // Test de headers y methods permitidos
  });

  test('should have rate limiting configured', async () => {
    // Test de rate limiting en endpoints auth
    // Verificar límites por IP y por usuario
    // Test de configuración de ventanas de tiempo
  });

  test('should have security headers configured', async () => {
    // Test de security headers (helmet)
    // Verificar HTTPS enforcement
    // Test de protección XSS y CSRF
  });
});
```

##### **2. `auth-endpoints.test.ts` - Tests de Endpoints de Autenticación**
```typescript
describe('Authentication Endpoints Tests', () => {
  test('should handle user registration correctly', async () => {
    // Test de POST /api/auth/register
    // Verificar validación de datos de registro
    // Test de creación de usuario normal y business
  });

  test('should handle user login properly', async () => {
    // Test de POST /api/auth/login
    // Verificar generación de JWT tokens
    // Test de actualización de lastLogin
  });

  test('should handle logout and token invalidation', async () => {
    // Test de POST /api/auth/logout
    // Verificar invalidación de tokens
    // Test de limpieza de sessions
  });

  test('should handle password reset workflow', async () => {
    // Test de POST /api/auth/forgot-password
    // Test de POST /api/auth/reset-password
    // Verificar envío de emails y tokens temporales
  });

  test('should handle profile updates with authentication', async () => {
    // Test de PUT /api/auth/profile
    // Verificar autorización de usuario
    // Test de validación de cambios de datos
  });

  test('should handle refresh token mechanism', async () => {
    // Test de POST /api/auth/refresh
    // Verificar renovación de tokens
    // Test de invalidación de tokens expirados
  });
});
```

##### **3. `authorization-roles.test.ts` - Tests de Autorización y Roles**
```typescript
describe('Authorization and Roles Tests', () => {
  test('should handle role-based access control correctly', async () => {
    // Test de permisos por rol: user, business, admin
    // Verificar access control en colecciones
    // Test de restricciones específicas por rol
  });

  test('should validate business-specific permissions', async () => {
    // Test de permisos especiales para users business
    // Verificar acceso a business data
    // Test de gestión de lugares y eventos propios
  });

  test('should handle admin privileges properly', async () => {
    // Test de permisos administrativos
    // Verificar acceso completo a todas las colecciones
    // Test de capacidades de moderación
  });

  test('should enforce user data privacy', async () => {
    // Test de acceso a datos propios únicamente
    // Verificar protección de datos personales
    // Test de restricciones de lectura entre usuarios
  });

  test('should handle conditional access based on verification', async () => {
    // Test de acceso basado en verificación
    // Verificar restricciones para usuarios no verificados
    // Test de permisos progresivos
  });
});
```

##### **4. `api-security.test.ts` - Tests de Seguridad de API**
```typescript
describe('API Security Tests', () => {
  test('should protect against common vulnerabilities', async () => {
    // Test de protección XSS
    // Verificar sanitización de inputs
    // Test de protección CSRF
  });

  test('should handle rate limiting effectively', async () => {
    // Test de límites de requests por minuto
    // Verificar comportamiento con límites excedidos
    // Test de whitelisting de IPs admin
  });

  test('should validate API keys and tokens properly', async () => {
    // Test de validación de JWT tokens
    // Verificar detección de tokens manipulados
    // Test de manejo de tokens expirados
  });

  test('should handle brute force protection', async () => {
    // Test de protección contra ataques de fuerza bruta
    // Verificar bloqueo temporal de cuentas
    // Test de detección de patrones sospechosos
  });

  test('should encrypt sensitive data correctly', async () => {
    // Test de encriptación de passwords
    // Verificar hashing de datos sensibles
    // Test de protección de datos personales
  });
});
```

##### **5. `auth-integration.test.ts` - Tests de Integración de Autenticación**
```typescript
describe('Authentication Integration Tests', () => {
  test('should integrate with all collections properly', async () => {
    // Test de autenticación en todas las colecciones
    // Verificar permisos en Places, Reviews, Events
    // Test de integridad de relaciones user
  });

  test('should handle session management across features', async () => {
    // Test de sesiones en conversaciones
    // Verificar persistencia de contexto usuario
    // Test de timeout de sesiones inactivas
  });

  test('should manage user preferences and personalization', async () => {
    // Test de acceso a preferencias personales
    // Verificar sincronización de datos usuario
    // Test de privacidad en recommendations
  });

  test('should handle business verification workflow', async () => {
    // Test de flujo de verificación business
    // Verificar proceso de aprobación
    // Test de cambios de estado de verificación
  });

  test('should support multi-device authentication', async () => {
    // Test de login desde múltiples dispositivos
    // Verificar gestión de sesiones múltiples
    // Test de logout remoto de dispositivos
  });
});
```

### **📊 Comandos de Validación**

#### **Ejecutar Tests de la Tarea 06:**
```bash
npm run test:task-06
```

#### **Ejecutar Tests con Coverage:**
```bash
npm run test:task-06:coverage
```

#### **Validación Automática de Completitud:**
```bash
node scripts/validate-task.js 06
```

### **✅ Criterios de Completitud**
- [ ] 🧪 **TODOS los tests pasan** (100% success rate)
- [ ] 📊 **Coverage >80%** en módulos de autenticación
- [ ] 🔍 **Validación automática exitosa** con `validate-task.js 06`
- [ ] 🔐 **Tests de seguridad pasan** todos los casos
- [ ] ⚡ **Tests de autorización funcionando** correctamente
- [ ] 🔗 **Integración con colecciones validada**

---

## ⚠️ IMPORTANTE
**Esta tarea NO estará completa hasta que TODOS los tests pasen exitosamente.**

El comando `npm run test:task-06` debe ejecutarse sin errores y todos los tests deben estar en estado ✅ PASSED.

---
