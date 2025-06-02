# 03 - COLECCIONES BÁSICAS 🏗️

## 🎯 OBJETIVO
Implementar las 3 colecciones fundamentales del sistema: Users (unificado), Media (multimedia) y Categories (categorías). Estas son la base sobre la cual se construirán todas las demás funcionalidades.

## 📋 PREREQUISITOS
- [✅] Tarea 01 - Setup inicial completada
- [✅] Tarea 02 - Configuración de database completada
- [✅] Payload CMS funcionando correctamente

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. COLECCIÓN USERS (UNIFICADA) 🔥⭐
**Archivo:** `src/collections/Users.ts`

- [ ] **1.1** - Crear estructura básica de la colección Users
- [ ] **1.2** - Configurar campos básicos de usuario:
  ```typescript
  // email, password, firstName, lastName, phone, dateOfBirth, profileImage
  // isActive, lastLogin, loginAttempts, isBlocked, userType
  ```

- [ ] **1.3** - Implementar campo `userType` con opciones ['user', 'business', 'admin']
- [ ] **1.4** - Configurar grupo `travelPreferences` para preferencias de viaje
- [ ] **1.5** - Configurar grupo `contactPreferences` para notificaciones
- [ ] **1.6** - Implementar grupo condicional `businessData` (solo si userType === 'business'):
  - businessName, businessType, description, address, city
  - socialMedia, businessHours, multimedia, services, location
  - businessSettings, statistics

- [ ] **1.7** - Configurar array embebido `favoritesList` para favoritos
- [ ] **1.8** - Implementar hooks de validación:
  - beforeValidate: encriptar password
  - beforeValidate: validar campos requeridos según userType
  - beforeValidate: validar coordenadas si es business
  - afterLogin: actualizar lastLogin

- [ ] **1.9** - Configurar Access Control:
  - create: público (registro)
  - read: self + admins + (business data público si verificado)
  - update: self + admins
  - delete: self + admins

- [ ] **1.10** - Configurar admin UI con grupos y tabs para businessData

### 2. COLECCIÓN MEDIA 📸
**Archivo:** `src/collections/Media.ts`

- [ ] **2.1** - Crear colección Media básica de Payload
- [ ] **2.2** - Configurar campos adicionales:
  ```typescript
  // title, alt, caption, description, contentInfo
  // tags, category, isPublic, isApproved
  ```

- [ ] **2.3** - Configurar grupo `contentInfo` con metadatos:
  - photographer, location, takenAt, camera, license

- [ ] **2.4** - Configurar array de `tags` para organización
- [ ] **2.5** - Implementar campo `category` con opciones:
  ['place', 'event', 'business', 'user', 'promotion', 'document']

- [ ] **2.6** - Configurar grupo `usageStats` (solo lectura):
  - usedInPlaces, usedInEvents, usedInBusinesses, totalViews

- [ ] **2.7** - Configurar upload settings:
  - Formatos: jpg, jpeg, png, webp, mp4, mov
  - Tamaños automáticos: thumbnail, medium, large
  - Compresión y optimización

- [ ] **2.8** - Implementar relación `uploadedBy` hacia Users
- [ ] **2.9** - Configurar hooks para optimización automática de imágenes
- [ ] **2.10** - Configurar Access Control para uploads públicos/privados

### 3. COLECCIÓN CATEGORIES 📋
**Archivo:** `src/collections/Categories.ts`

- [ ] **3.1** - Crear colección Categories básica
- [ ] **3.2** - Configurar campos principales:
  ```typescript
  // name, slug, description, icon, color, image
  // parentCategory, isActive, sortOrder
  ```

- [ ] **3.3** - Implementar auto-generación de `slug` desde `name`
- [ ] **3.4** - Configurar campo `icon` para Material UI icons
- [ ] **3.5** - Configurar campo `color` con validación hex
- [ ] **3.6** - Implementar relación `parentCategory` para subcategorías
- [ ] **3.7** - Configurar campos SEO: `seoTitle`, `seoDescription`
- [ ] **3.8** - Implementar hook para mantener jerarquía de categorías
- [ ] **3.9** - Configurar ordenamiento por `sortOrder`
- [ ] **3.10** - Configurar Access Control (admins para crear/editar)

### 4. CONFIGURACIÓN EN PAYLOAD.CONFIG.TS
- [ ] **4.1** - Importar las 3 colecciones en `payload.config.ts`
- [ ] **4.2** - Configurar orden de colecciones en admin UI
- [ ] **4.3** - Verificar que las relaciones se crean correctamente
- [ ] **4.4** - Configurar globals si es necesario

### 5. SEEDS PARA DATOS INICIALES
**Archivo:** `src/seeds/basicCollections.ts`

- [ ] **5.1** - Crear seed para categorías de turismo de Riohacha:
  ```typescript
  const categories = [
    { name: 'Playas y Costas', icon: 'beach_access', color: '#4FC3F7' },
    { name: 'Sitios Culturales e Históricos', icon: 'account_balance', color: '#8D6E63' },
    { name: 'Aventura y Deportes', icon: 'hiking', color: '#FF7043' },
    { name: 'Gastronomía Local', icon: 'restaurant', color: '#FFA726' },
    { name: 'Hospedaje y Alojamiento', icon: 'hotel', color: '#66BB6A' },
    { name: 'Transporte y Movilidad', icon: 'directions_car', color: '#42A5F5' },
    { name: 'Compras y Artesanías', icon: 'shopping_bag', color: '#AB47BC' },
    { name: 'Vida Nocturna', icon: 'nightlife', color: '#EC407A' },
    { name: 'Naturaleza y Ecoturismo', icon: 'nature', color: '#66BB6A' },
    { name: 'Turismo de Negocios', icon: 'business', color: '#78909C' }
  ]
  ```

- [ ] **5.2** - Crear usuario administrador por defecto
- [ ] **5.3** - Crear usuario de prueba (tipo 'user')
- [ ] **5.4** - Crear usuario de empresa de prueba (tipo 'business')
- [ ] **5.5** - Ejecutar seeds y verificar datos creados

### 6. TESTING BÁSICO
- [ ] **6.1** - Crear usuario regular via API
- [ ] **6.2** - Crear usuario empresa via API
- [ ] **6.3** - Subir imagen via API y verificar metadatos
- [ ] **6.4** - Crear categoría via admin UI
- [ ] **6.5** - Verificar relaciones entre collections
- [ ] **6.6** - Probar filtros básicos en cada colección

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Colección Users
- [ ] Registro de usuario regular funciona
- [ ] Registro de empresa con businessData funciona
- [ ] Campos condicionales aparecen según userType
- [ ] Sistema de favoritos embebido funciona
- [ ] Hooks de validación ejecutándose correctamente
- [ ] Access control funcionando apropiadamente

### Colección Media
- [ ] Upload de imágenes funciona
- [ ] Tamaños automáticos se generan
- [ ] Metadatos se guardan correctamente
- [ ] Tags y categorización funciona
- [ ] Compresión automática activa

### Colección Categories
- [ ] CRUD completo funciona
- [ ] Slug se auto-genera
- [ ] Jerarquía de categorías funciona
- [ ] Iconos y colores se guardan
- [ ] Ordenamiento por sortOrder funciona

### Integración
- [ ] Relaciones entre colecciones funcionan
- [ ] Seeds se ejecutan sin errores
- [ ] Admin UI muestra todas las colecciones
- [ ] APIs REST disponibles para las 3 colecciones

---

## 🛠️ COMANDOS ÚTILES

### Desarrollo
```bash
# Generar tipos después de crear colecciones
npm run generate:types

# Ejecutar seeds de datos básicos
npm run seed:basic

# Verificar colecciones en admin
npm run dev
# Luego ir a http://localhost:3000/admin
```

### Testing API
```bash
# Probar creación de usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456", "firstName": "Test", "lastName": "User"}'

# Probar upload de imagen
curl -X POST http://localhost:3000/api/media \
  -F "file=@./path/to/image.jpg" \
  -F "title=Test Image"

# Listar categorías
curl http://localhost:3000/api/categories
```

### Base de Datos
```bash
# Ver estructura de tablas creadas
sqlite3 backend-app.db ".schema users"
sqlite3 backend-app.db ".schema media"
sqlite3 backend-app.db ".schema categories"

# Ver datos insertados
sqlite3 backend-app.db "SELECT * FROM categories LIMIT 5;"
```

---

## 📝 NOTAS TÉCNICAS

### Users Collection - Campo Condicional
```typescript
// businessData solo aparece si userType === 'business'
{
  name: 'businessData',
  type: 'group',
  admin: {
    condition: (data) => data.userType === 'business'
  },
  fields: [ /* campos de empresa */ ]
}
```

### Media Collection - Optimización
- Sharp para compresión automática
- WebP para mejor compresión
- Thumbnails automáticos (150x150, 300x300, 600x600)
- Watermark opcional para imágenes de empresas

### Categories Collection - Jerarquía
```typescript
// Permitir subcategorías
{
  name: 'parentCategory',
  type: 'relationship',
  relationTo: 'categories',
  admin: {
    condition: (data, siblingData) => {
      // No permitir auto-referencia
      return data.id !== siblingData.id;
    }
  }
}
```

### Access Control Patterns
```typescript
// Ejemplo para Users
access: {
  create: () => true, // Registro público
  read: ({ req: { user } }) => {
    if (user?.userType === 'admin') return true;
    return { id: { equals: user?.id } }; // Solo sus propios datos
  }
}
```

---

## 🚨 PROBLEMAS COMUNES

### Error: "Collection not found"
- **Causa:** Collection no importada en payload.config.ts
- **Solución:** Verificar import y array de collections

### Error: "Validation failed"
- **Causa:** Campos requeridos o tipos incorrectos
- **Solución:** Verificar schema de campos y datos de prueba

### Error: "File upload failed"
- **Causa:** Permisos de directorio o tamaño de archivo
- **Solución:** Verificar permisos en `/uploads` y límites

### Error: "Relationship not found"
- **Causa:** Orden incorrecto de creación de colecciones
- **Solución:** Crear collections base primero, luego relaciones

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ Colección Users unificada completamente funcional
- [ ] ✅ Colección Media con uploads optimizados
- [ ] ✅ Colección Categories con jerarquía
- [ ] ✅ Seeds de categorías de Riohacha cargados
- [ ] ✅ Usuarios de prueba creados
- [ ] ✅ APIs REST funcionando para las 3 colecciones
- [ ] ✅ Admin UI mostrando todas las collections
- [ ] ✅ Relaciones entre collections funcionando
- [ ] ✅ Hooks y validaciones activas
- [ ] ✅ Access control implementado

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `04-colecciones-contenido.md`

---

## 🧪 TESTS ESPECÍFICOS DE LA TAREA

### Tests Obligatorios para Completar la Tarea
Esta tarea solo estará **COMPLETA** cuando **TODOS** los siguientes tests pasen:

#### **📁 Estructura de Tests: `test/tasks/task-03/`**

##### **1. `users-collection.test.ts` - Tests de Colección Users**
```typescript
describe('Task 03 - Users Collection', () => {
  test('should have Users collection properly configured', async () => {
    // Verificar estructura básica de Users.ts
    // Validar campos básicos: email, password, firstName, etc.
    // Verificar configuración de userType enum
  });

  test('should handle userType conditional fields correctly', async () => {
    // Test de campos condicionales para businessData
    // Verificar que businessData solo aparece si userType === 'business'
    // Validar estructura de businessData fields
  });

  test('should validate business user registration', async () => {
    // Test de registro de usuario business
    // Verificar campos requeridos para business
    // Validar coordenadas y ubicación
  });

  test('should have proper access control configured', async () => {
    // Test de permisos create: público
    // Test de permisos read: self + admins + business público
    // Test de permisos update/delete: self + admins
  });

  test('should execute hooks correctly', async () => {
    // Test de beforeValidate hook (password encryption)
    // Test de afterLogin hook (lastLogin update)
    // Test de validación condicional por userType
  });
});
```

##### **2. `media-collection.test.ts` - Tests de Colección Media**
```typescript
describe('Media Collection Tests', () => {
  test('should have Media collection with proper upload configuration', async () => {
    // Verificar configuración de upload
    // Validar tipos de archivo permitidos
    // Verificar configuración de resize automático
  });

  test('should handle different media types correctly', async () => {
    // Test de imágenes (JPEG, PNG, WebP)
    // Test de videos (MP4, WebM)
    // Test de documentos (PDF)
  });

  test('should have proper metadata extraction', async () => {
    // Test de extracción de metadata
    // Verificar alt text automático
    // Validar información de geolocalización
  });

  test('should optimize images automatically', async () => {
    // Test de resize automático
    // Verificar compresión de imágenes
    // Validar generación de thumbnails
  });

  test('should have security validation for uploads', async () => {
    // Test de validación de tipos de archivo
    // Verificar límites de tamaño
    // Validar sanitización de nombres de archivo
  });
});
```

##### **3. `categories-collection.test.ts` - Tests de Colección Categories**
```typescript
describe('Categories Collection Tests', () => {
  test('should have Categories collection with hierarchical structure', async () => {
    // Verificar estructura de categorías
    // Test de relación parent/children
    // Validar configuración de jerarquía
  });

  test('should create tourism categories for Riohacha', async () => {
    // Test de categorías específicas de turismo
    // Verificar iconos y colores
    // Validar traducciones español/inglés
  });

  test('should handle category relationships correctly', async () => {
    // Test de relaciones padre-hijo
    // Verificar queries de categorías anidadas
    // Validar integridad referencial
  });

  test('should have proper SEO configuration', async () => {
    // Test de campos SEO (slug, meta, description)
    // Verificar generación automática de slug
    // Validar URLs amigables
  });

  test('should validate category data integrity', async () => {
    // Test de validación de campos requeridos
    // Verificar unicidad de slugs
    // Validar formato de colores e iconos
  });
});
```

##### **4. `collections-integration.test.ts` - Tests de Integración**
```typescript
describe('Collections Integration Tests', () => {
  test('should have all three collections properly registered', async () => {
    // Verificar registro en payload.config.ts
    // Test de inicialización correcta
    // Validar ausencia de conflictos de nombres
  });

  test('should handle relationships between collections', async () => {
    // Test de relación Users -> Media (profileImage)
    // Test de relación Users -> Categories (favoritos)
    // Verificar integridad referencial
  });

  test('should have proper database schema generation', async () => {
    // Test de generación de tablas
    // Verificar índices automáticos
    // Validar constraints de foreign keys
  });

  test('should support CRUD operations on all collections', async () => {
    // Test de Create, Read, Update, Delete
    // Verificar validaciones en cada operación
    // Test de bulk operations
  });

  test('should have admin UI properly configured', async () => {
    // Test de configuración de admin panel
    // Verificar grupos y tabs en Users
    // Validar ordenamiento y filtros
  });
});
```

##### **5. `collections-performance.test.ts` - Tests de Rendimiento**
```typescript
describe('Collections Performance Tests', () => {
  test('should handle large dataset operations efficiently', async () => {
    // Test de queries con muchos registros
    // Verificar performance de búsquedas
    // Validar uso de índices
  });

  test('should optimize media upload and processing', async () => {
    // Test de upload de archivos grandes
    // Verificar tiempo de procesamiento de imágenes
    // Validar uso de memoria durante resize
  });

  test('should cache frequently accessed data', async () => {
    // Test de caching de categorías
    // Verificar cache de perfiles de usuario
    // Validar invalidación de cache
  });
});
```

### **📊 Comandos de Validación**

#### **Ejecutar Tests de la Tarea 03:**
```bash
npm run test:task-03
```

#### **Ejecutar Tests con Coverage:**
```bash
npm run test:task-03:coverage
```

#### **Validación Automática de Completitud:**
```bash
node scripts/validate-task.js 03
```

### **✅ Criterios de Completitud**
- [ ] 🧪 **TODOS los tests pasan** (100% success rate)
- [ ] 📊 **Coverage >80%** en archivos de colecciones
- [ ] 🔍 **Validación automática exitosa** con `validate-task.js 03`
- [ ] 📁 **Colecciones registradas** en payload.config.ts
- [ ] ⚡ **Performance tests pasan** con métricas aceptables
- [ ] 🔐 **Tests de seguridad y permisos funcionando** correctamente

---

## ⚠️ IMPORTANTE
**Esta tarea NO estará completa hasta que TODOS los tests pasen exitosamente.**

El comando `npm run test:task-03` debe ejecutarse sin errores y todos los tests deben estar en estado ✅ PASSED.

---
