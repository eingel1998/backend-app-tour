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
