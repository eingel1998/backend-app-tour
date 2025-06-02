# 01 - SETUP INICIAL 🚀

## 🎯 OBJETIVO
Configurar el entorno base de Payload CMS con todas las dependencias necesarias para el backend turístico de Riohacha.

## 📋 PREREQUISITOS
- [✅] Node.js 18+ instalado
- [✅] npm/yarn disponible
- [✅] Proyecto Next.js inicializado
- [✅] Estructura básica de carpetas creada

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. INSTALACIÓN DE DEPENDENCIAS CORE
- [ ] **1.1** - Instalar Payload CMS v3
  ```bash
  npm install @payloadcms/next @payloadcms/db-sqlite
  ```

- [ ] **1.2** - Instalar dependencias de autenticación
  ```bash
  npm install jsonwebtoken bcryptjs
  npm install @types/jsonwebtoken @types/bcryptjs --save-dev
  ```

- [ ] **1.3** - Instalar dependencias de validación
  ```bash
  npm install joi validator
  npm install @types/validator --save-dev
  ```

- [ ] **1.4** - Instalar dependencias de utilidades
  ```bash
  npm install slugify sharp date-fns
  npm install @types/sharp --save-dev
  ```

### 2. CONFIGURACIÓN BÁSICA DE PAYLOAD
- [ ] **2.1** - Verificar archivo `payload.config.ts` existe
- [ ] **2.2** - Configurar configuración básica de admin UI
- [ ] **2.3** - Configurar configuración de base de datos SQLite
- [ ] **2.4** - Configurar configuración de uploads básica

### 3. VARIABLES DE ENTORNO
- [ ] **3.1** - Crear archivo `.env.local` con variables base:
  ```env
  PAYLOAD_SECRET=your-secret-key-here
  DATABASE_URI=./backend-app.db
  NEXT_PUBLIC_SERVER_URL=http://localhost:3000
  ```

- [ ] **3.2** - Crear archivo `.env.example` para referencia
- [ ] **3.3** - Agregar `.env.local` al `.gitignore`

### 4. SCRIPTS DE PACKAGE.JSON
- [ ] **4.1** - Verificar scripts básicos en `package.json`:
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "generate:types": "payload generate:types",
      "payload": "payload"
    }
  }
  ```

### 5. CONFIGURACIÓN DE TYPESCRIPT
- [ ] **5.1** - Verificar `tsconfig.json` configurado para Payload
- [ ] **5.2** - Agregar tipos de Payload a la configuración
- [ ] **5.3** - Verificar que `payload-types.ts` se genere correctamente

### 6. CONFIGURACIÓN DE ESLINT
- [ ] **6.1** - Verificar `eslint.config.mjs` incluye reglas de Payload
- [ ] **6.2** - Configurar reglas específicas para collections
- [ ] **6.3** - Configurar reglas para hooks y endpoints

### 7. PRIMERA PRUEBA DEL SISTEMA
- [ ] **7.1** - Ejecutar `npm run dev` sin errores
- [ ] **7.2** - Acceder a `/admin` y verificar panel administrativo
- [ ] **7.3** - Crear primer usuario administrador
- [ ] **7.4** - Verificar que la base de datos se crea correctamente

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Funcionalidad Básica
- [ ] El servidor se inicia sin errores en `http://localhost:3000`
- [ ] Panel admin accesible en `http://localhost:3000/admin`
- [ ] Base de datos SQLite se crea automáticamente
- [ ] Se puede crear usuario administrador
- [ ] Tipos de TypeScript se generan correctamente

### Estructura de Archivos
- [ ] `payload.config.ts` configurado y funcional
- [ ] `payload-types.ts` generado automáticamente
- [ ] Variables de entorno configuradas
- [ ] Scripts de npm funcionando

### Dependencias
- [ ] Todas las dependencias core instaladas
- [ ] No hay conflictos de versiones
- [ ] TypeScript compila sin errores

---

## 🛠️ COMANDOS ÚTILES

### Instalación
```bash
# Instalar todas las dependencias de una vez
npm install @payloadcms/next @payloadcms/db-sqlite jsonwebtoken bcryptjs joi validator slugify sharp date-fns

# Instalar dependencias de desarrollo
npm install @types/jsonwebtoken @types/bcryptjs @types/validator @types/sharp --save-dev
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Generar tipos de TypeScript
npm run generate:types

# Acceder al CLI de Payload
npm run payload help
```

### Verificación
```bash
# Verificar que no hay errores de TypeScript
npx tsc --noEmit

# Verificar ESLint
npx eslint . --ext .ts,.tsx
```

---

## 📝 NOTAS TÉCNICAS

### Base de Datos
- **SQLite** para desarrollo (fácil setup)
- **PostgreSQL** recomendado para producción
- Base de datos se crea automáticamente en primera ejecución

### Configuración de Admin
- Panel admin disponible en `/admin`
- Requiere crear primer usuario administrador
- Configuración de CORS automática para desarrollo

### TypeScript
- Payload genera tipos automáticamente
- Archivo `payload-types.ts` se actualiza con cambios en collections
- Mantener sincronizados los tipos con la configuración

### Seguridad
- `PAYLOAD_SECRET` debe ser seguro en producción
- Cambiar credenciales por defecto
- Configurar CORS apropiadamente para producción

---

## 🚨 PROBLEMAS COMUNES

### Error: "Cannot find module '@payloadcms/next'"
- **Solución:** Verificar instalación de dependencias
- **Comando:** `npm install @payloadcms/next`

### Error: "Database connection failed"
- **Solución:** Verificar permisos de escritura en directorio
- **Verificar:** Variable `DATABASE_URI` en `.env.local`

### Error: "TypeScript compilation failed"
- **Solución:** Generar tipos de Payload
- **Comando:** `npm run generate:types`

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ Payload CMS instalado y configurado
- [ ] ✅ Panel admin funcionando
- [ ] ✅ Base de datos creada
- [ ] ✅ Primer usuario admin creado
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Scripts de npm funcionando
- [ ] ✅ TypeScript sin errores
- [ ] ✅ ESLint configurado

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `02-configuracion-database.md`
