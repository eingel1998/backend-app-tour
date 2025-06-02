# 07 - ENDPOINTS PERSONALIZADOS 🚀

## 🎯 OBJETIVO
Crear endpoints API personalizados más allá de los CRUD básicos de Payload, incluyendo búsquedas avanzadas, geolocalización, estadísticas, integración con servicios externos y funcionalidades específicas para el turismo en Riohacha.

## 📋 PREREQUISITOS
- [✅] Tarea 06 - Autenticación y autorización completada
- [✅] Todas las colecciones funcionando
- [ ] Sistema de auth implementado

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. ENDPOINTS DE BÚSQUEDA AVANZADA
**Archivo:** `src/endpoints/search.ts`

- [ ] **1.1** - Crear endpoint `/api/search/places` para búsqueda inteligente:
  ```typescript
  // GET: búsqueda de lugares con múltiples criterios
  // Parámetros: query, category, location, radius, priceRange, rating
  // Funciones: texto libre, filtros combinados, ordenamiento
  ```

- [ ] **1.2** - Implementar búsqueda por texto en múltiples campos:
  ```typescript
  // Buscar en: name, description, tags, address
  // Implementar relevancia scoring
  // Soporte para términos en español y wayuunaiki
  ```

- [ ] **1.3** - Crear endpoint `/api/search/nearby` para búsqueda geográfica:
  ```typescript
  // GET: lugares cercanos a coordenadas
  // Parámetros: lat, lng, radius (km), category
  // Ordenar por distancia, incluir distancia calculada
  ```

- [ ] **1.4** - Crear endpoint `/api/search/recommendations` para búsqueda de recomendaciones:
  ```typescript
  // GET: buscar recomendaciones públicas
  // Filtros: type, theme, duration, budget
  // Soporte para usuarios sin autenticar
  ```

- [ ] **1.5** - Implementar endpoint `/api/search/events` para eventos:
  ```typescript
  // GET: eventos por fecha, ubicación, tipo
  // Filtros: dateRange, location, eventType, isFree
  // Soporte para eventos recurrentes
  ```

### 2. ENDPOINTS DE GEOLOCALIZACIÓN
**Archivo:** `src/endpoints/geolocation.ts`

- [ ] **2.1** - Crear endpoint `/api/geo/reverse` para geocodificación inversa:
  ```typescript
  // POST: obtener dirección desde coordenadas
  // Integración con servicio de mapas (OpenStreetMap/Google)
  // Validar coordenadas dentro de La Guajira
  ```

- [ ] **2.2** - Crear endpoint `/api/geo/distance` para cálculo de distancias:
  ```typescript
  // POST: calcular distancia entre múltiples puntos
  // Algoritmo haversine para precisión geográfica
  // Retornar distancia en km y tiempo estimado
  ```

- [ ] **2.3** - Crear endpoint `/api/geo/route` para rutas optimizadas:
  ```typescript
  // POST: generar ruta optimizada entre lugares
  // Parámetros: lugares array, transportation mode
  // Integración con servicios de routing
  ```

- [ ] **2.4** - Implementar endpoint `/api/geo/boundaries` para límites geográficos:
  ```typescript
  // GET: obtener límites geográficos de Riohacha y La Guajira
  // Útil para validaciones y mapas en frontend
  ```

### 3. ENDPOINTS DE ESTADÍSTICAS Y ANALYTICS
**Archivo:** `src/endpoints/analytics.ts`

- [ ] **3.1** - Crear endpoint `/api/analytics/places` para estadísticas de lugares:
  ```typescript
  // GET: estadísticas generales de lugares
  // Métricas: más visitados, mejor valorados, por categoría
  // Filtros por período de tiempo
  ```

- [ ] **3.2** - Crear endpoint `/api/analytics/trends` para tendencias:
  ```typescript
  // GET: tendencias de búsquedas y visitas
  // Lugares trending, categorías populares
  // Análisis temporal (día, semana, mes)
  ```

- [ ] **3.3** - Implementar endpoint `/api/analytics/dashboard` para admin:
  ```typescript
  // GET: dashboard completo para administradores
  // Usuarios activos, lugares más populares, reseñas recientes
  // Solo accesible para admins
  ```

- [ ] **3.4** - Crear endpoint `/api/analytics/business/:businessId` para empresas:
  ```typescript
  // GET: estadísticas específicas de empresa
  // Visitas, reseñas, rating promedio
  // Solo accesible por el propietario y admins
  ```

### 4. ENDPOINTS DE INTEGRACIÓN EXTERNA
**Archivo:** `src/endpoints/integrations.ts`

- [ ] **4.1** - Crear endpoint `/api/integrations/weather` para clima:
  ```typescript
  // GET: información meteorológica de Riohacha
  // Integración con API de clima (OpenWeatherMap)
  // Cache de respuestas por 1 hora
  ```

- [ ] **4.2** - Implementar endpoint `/api/integrations/currency` para cambio de moneda:
  ```typescript
  // GET: conversión COP a USD y otras monedas
  // Útil para turistas internacionales
  // Cache diario de tasas de cambio
  ```

- [ ] **4.3** - Crear endpoint `/api/integrations/translate` para traducciones:
  ```typescript
  // POST: traducir textos a wayuunaiki e inglés
  // Útil para contenido multiidioma
  // Cache de traducciones comunes
  ```

- [ ] **4.4** - Implementar endpoint `/api/integrations/social` para compartir:
  ```typescript
  // POST: generar contenido optimizado para redes sociales
  // Crear imágenes con metadata, links optimizados
  // Integración con Open Graph
  ```

### 5. ENDPOINTS DE UTILIDADES ESPECÍFICAS
**Archivo:** `src/endpoints/utilities.ts`

- [ ] **5.1** - Crear endpoint `/api/utils/validate` para validaciones:
  ```typescript
  // POST: validar diferentes tipos de datos
  // RUT/NIT empresarial, coordenadas, emails
  // Útil para validación en tiempo real en frontend
  ```

- [ ] **5.2** - Implementar endpoint `/api/utils/slugify` para URLs amigables:
  ```typescript
  // POST: generar slugs únicos para lugares y eventos
  // Manejo de caracteres especiales y wayuunaiki
  // Verificación de unicidad
  ```

- [ ] **5.3** - Crear endpoint `/api/utils/qr` para códigos QR:
  ```typescript
  // POST: generar códigos QR para lugares y eventos
  // Incluir información básica y enlace a app
  // Útil para marketing físico
  ```

- [ ] **5.4** - Implementar endpoint `/api/utils/export` para exportaciones:
  ```typescript
  // GET: exportar datos en diferentes formatos
  // Soportar CSV, JSON, PDF para reportes
  // Control de permisos por tipo de usuario
  ```

### 6. ENDPOINTS DE NOTIFICACIONES
**Archivo:** `src/endpoints/notifications.ts`

- [ ] **6.1** - Crear endpoint `/api/notifications/send` para notificaciones push:
  ```typescript
  // POST: enviar notificaciones push a usuarios
  // Filtros por ubicación, intereses, tipo de usuario
  // Integración con FCM (Firebase Cloud Messaging)
  ```

- [ ] **6.2** - Implementar endpoint `/api/notifications/email` para emails:
  ```typescript
  // POST: enviar emails promocionales y informativos
  // Templates para diferentes tipos de notificaciones
  // Respeto por preferencias de usuario
  ```

- [ ] **6.3** - Crear endpoint `/api/notifications/sms` para SMS:
  ```typescript
  // POST: enviar SMS para alertas importantes
  // Solo para emergencias y confirmaciones críticas
  // Integración con servicio SMS local
  ```

### 7. ENDPOINTS DE REPORTES Y MODERACIÓN
**Archivo:** `src/endpoints/moderation.ts`

- [ ] **7.1** - Crear endpoint `/api/moderation/reports` para reportes:
  ```typescript
  // POST: reportar contenido inapropiado
  // GET: listar reportes para moderadores
  // Tipos: spam, contenido ofensivo, información incorrecta
  ```

- [ ] **7.2** - Implementar endpoint `/api/moderation/approve` para aprobaciones:
  ```typescript
  // POST: aprobar/rechazar lugares, reseñas, eventos
  // Solo accesible para moderadores y admins
  // Incluir notas de moderación
  ```

- [ ] **7.3** - Crear endpoint `/api/moderation/bulk` para acciones en masa:
  ```typescript
  // POST: aplicar acciones a múltiples elementos
  // Aprobar/rechazar en lotes, cambiar estados
  // Logging detallado de acciones masivas
  ```

### 8. HEALTH CHECKS Y MONITOREO
**Archivo:** `src/endpoints/health.ts`

- [ ] **8.1** - Crear endpoint `/api/health` para health check general:
  ```typescript
  // GET: estado general del sistema
  // Verificar: database, external APIs, disk space
  // Formato estándar para monitoring tools
  ```

- [ ] **8.2** - Implementar endpoint `/api/health/database` para DB:
  ```typescript
  // GET: estado específico de la base de datos
  // Tiempo de respuesta, conexiones activas
  // Verificar integridad de tablas principales
  ```

- [ ] **8.3** - Crear endpoint `/api/health/services` para servicios externos:
  ```typescript
  // GET: estado de integraciones externas
  // Verificar APIs de clima, mapas, traducciones
  // Tiempo de respuesta y disponibilidad
  ```

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Búsqueda Avanzada
- [ ] Búsqueda de texto libre funciona correctamente
- [ ] Filtros combinados funcionan apropiadamente
- [ ] Búsqueda geográfica retorna resultados precisos
- [ ] Ordenamiento por relevancia y distancia funciona

### Geolocalización
- [ ] Geocodificación inversa funciona
- [ ] Cálculo de distancias es preciso
- [ ] Rutas optimizadas se generan correctamente
- [ ] Validación de coordenadas funciona

### Estadísticas y Analytics
- [ ] Métricas se calculan correctamente
- [ ] Dashboard de admin muestra datos relevantes
- [ ] Estadísticas de empresa son precisas
- [ ] Performance de queries es aceptable

### Integraciones Externas
- [ ] API de clima retorna datos actuales
- [ ] Conversión de moneda funciona
- [ ] Traducciones básicas funcionan
- [ ] Compartir en redes sociales funciona

### Utilidades y Herramientas
- [ ] Validaciones en tiempo real funcionan
- [ ] Generación de QR codes funciona
- [ ] Exportaciones en múltiples formatos
- [ ] Notificaciones se envían correctamente

---

## 🛠️ COMANDOS ÚTILES

### Testing de Búsqueda
```bash
# Buscar lugares por texto
curl "http://localhost:3000/api/search/places?query=playa&category=playas-y-costas"

# Buscar lugares cercanos
curl "http://localhost:3000/api/search/nearby?lat=11.5447&lng=-72.9072&radius=5"

# Buscar eventos por fecha
curl "http://localhost:3000/api/search/events?dateRange=2024-06-01,2024-06-30"
```

### Testing de Geolocalización
```bash
# Geocodificación inversa
curl -X POST http://localhost:3000/api/geo/reverse \
  -H "Content-Type: application/json" \
  -d '{"lat": 11.5447, "lng": -72.9072}'

# Calcular distancia
curl -X POST http://localhost:3000/api/geo/distance \
  -H "Content-Type: application/json" \
  -d '{
    "from": {"lat": 11.5447, "lng": -72.9072},
    "to": {"lat": 11.5388, "lng": -72.9156}
  }'
```

### Testing de Analytics
```bash
# Estadísticas generales
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:3000/api/analytics/dashboard

# Tendencias
curl http://localhost:3000/api/analytics/trends?period=week
```

### Health Checks
```bash
# Health check general
curl http://localhost:3000/api/health

# Estado de base de datos
curl http://localhost:3000/api/health/database

# Estado de servicios externos
curl http://localhost:3000/api/health/services
```

---

## 🧪 TESTS ESPECÍFICOS DE LA TAREA

### Tests Obligatorios para Completar la Tarea
Esta tarea solo estará **COMPLETA** cuando **TODOS** los siguientes tests pasen:

#### **📁 Estructura de Tests: `test/tasks/task-07/`**

##### **1. `search-endpoints.test.ts` - Tests de Endpoints de Búsqueda**
```typescript
describe('Task 07 - Search Endpoints', () => {
  test('should handle advanced place search correctly', async () => {
    // Test de GET /api/search/places
    // Verificar búsqueda por múltiples criterios
    // Test de filtros: query, category, location, radius
  });

  test('should perform full-text search across multiple fields', async () => {
    // Test de búsqueda de texto libre
    // Verificar búsqueda en name, description, tags, address
    // Test de relevancia scoring
  });

  test('should handle geographical search properly', async () => {
    // Test de GET /api/search/nearby
    // Verificar búsqueda por coordenadas y radio
    // Test de cálculo y ordenamiento por distancia
  });

  test('should search recommendations effectively', async () => {
    // Test de GET /api/search/recommendations
    // Verificar filtros por type, theme, duration, budget
    // Test de acceso sin autenticación
  });

  test('should handle event search with date filtering', async () => {
    // Test de GET /api/search/events
    // Verificar filtros por fecha, ubicación, tipo
    // Test de eventos recurrentes y únicos
  });

  test('should support multilingual search capabilities', async () => {
    // Test de búsqueda en español
    // Test de términos en wayuunaiki
    // Verificar normalización de caracteres
  });
});
```

##### **2. `geolocation-endpoints.test.ts` - Tests de Endpoints de Geolocalización**
```typescript
describe('Geolocation Endpoints Tests', () => {
  test('should calculate routes between places correctly', async () => {
    // Test de GET /api/geo/route
    // Verificar cálculo de rutas entre puntos
    // Test de múltiples paradas y optimización
  });

  test('should provide weather information for locations', async () => {
    // Test de GET /api/geo/weather
    // Verificar integración con API meteorológica
    // Test de pronóstico para Riohacha
  });

  test('should handle directions and navigation', async () => {
    // Test de GET /api/geo/directions
    // Verificar direcciones paso a paso
    // Test de diferentes modos de transporte
  });

  test('should validate geographical coordinates', async () => {
    // Test de validación de coordenadas
    // Verificar límites geográficos de Riohacha
    // Test de conversión de formatos de coordenadas
  });

  test('should handle proximity calculations efficiently', async () => {
    // Test de cálculos de proximidad masivos
    // Verificar performance con muchos puntos
    // Test de algoritmos de optimización geográfica
  });
});
```

##### **3. `analytics-endpoints.test.ts` - Tests de Endpoints de Analytics**
```typescript
describe('Analytics Endpoints Tests', () => {
  test('should provide comprehensive visit statistics', async () => {
    // Test de GET /api/analytics/visits
    // Verificar estadísticas de visitas por lugar
    // Test de agregaciones temporales
  });

  test('should track user behavior analytics', async () => {
    // Test de GET /api/analytics/behavior
    // Verificar tracking de interacciones
    // Test de análisis de patrones de uso
  });

  test('should generate business analytics reports', async () => {
    // Test de GET /api/analytics/business
    // Verificar métricas específicas para business users
    // Test de reportes de performance
  });

  test('should provide tourism trend analysis', async () => {
    // Test de GET /api/analytics/trends
    // Verificar análisis de tendencias turísticas
    // Test de predicciones y forecasting
  });

  test('should handle real-time analytics updates', async () => {
    // Test de endpoints de analytics en tiempo real
    // Verificar actualización de métricas live
    // Test de WebSocket integration para analytics
  });
});
```

##### **4. `integration-endpoints.test.ts` - Tests de Endpoints de Integración**
```typescript
describe('Integration Endpoints Tests', () => {
  test('should integrate with social media platforms', async () => {
    // Test de POST /api/integrations/social
    // Verificar compartir en redes sociales
    // Test de autenticación con plataformas externas
  });

  test('should handle payment processing integration', async () => {
    // Test de POST /api/integrations/payments
    // Verificar integración con procesadores de pago
    // Test de webhooks de confirmación
  });

  test('should manage external booking systems', async () => {
    // Test de integración con sistemas de reservas
    // Verificar disponibilidad y booking de eventos
    // Test de sincronización de datos de reservas
  });

  test('should handle notification services', async () => {
    // Test de POST /api/integrations/notifications
    // Verificar envío de emails y push notifications
    // Test de templates y personalización
  });

  test('should integrate with external tourism APIs', async () => {
    // Test de integración con APIs turísticas
    // Verificar datos de transporte público
    // Test de información de servicios locales
  });
});
```

##### **5. `specialized-endpoints.test.ts` - Tests de Endpoints Especializados**
```typescript
describe('Specialized Endpoints Tests', () => {
  test('should handle cultural heritage information', async () => {
    // Test de GET /api/culture/heritage
    // Verificar información de patrimonio cultural wayuu
    // Test de contenido cultural específico de Riohacha
  });

  test('should provide gastronomy recommendations', async () => {
    // Test de GET /api/gastronomy/recommendations
    // Verificar recomendaciones de platos locales
    // Test de información nutricional y cultural
  });

  test('should handle accessibility information', async () => {
    // Test de GET /api/accessibility/info
    // Verificar información de accesibilidad por lugar
    // Test de filtros por tipo de discapacidad
  });

  test('should manage emergency and safety endpoints', async () => {
    // Test de GET /api/safety/emergency
    // Verificar información de seguridad turística
    // Test de contactos de emergencia locales
  });

  test('should provide transportation information', async () => {
    // Test de GET /api/transport/info
    // Verificar información de transporte público
    // Test de horarios y rutas locales
  });
});
```

### **📊 Comandos de Validación**

#### **Ejecutar Tests de la Tarea 07:**
```bash
npm run test:task-07
```

#### **Ejecutar Tests con Coverage:**
```bash
npm run test:task-07:coverage
```

#### **Validación Automática de Completitud:**
```bash
node scripts/validate-task.js 07
```

### **✅ Criterios de Completitud**
- [ ] 🧪 **TODOS los tests pasan** (100% success rate)
- [ ] 📊 **Coverage >80%** en endpoints personalizados
- [ ] 🔍 **Validación automática exitosa** con `validate-task.js 07`
- [ ] 🔗 **Integración con servicios externos funcionando**
- [ ] ⚡ **Performance tests pasan** en búsquedas complejas
- [ ] 📍 **Endpoints de geolocalización validados**

---

## ⚠️ IMPORTANTE
**Esta tarea NO estará completa hasta que TODOS los tests pasen exitosamente.**

El comando `npm run test:task-07` debe ejecutarse sin errores y todos los tests deben estar en estado ✅ PASSED.

---
