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

## 📝 NOTAS TÉCNICAS

### Búsqueda Geográfica con Haversine
```typescript
// Cálculo de distancia entre coordenadas
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
```

### Cache Strategy para APIs Externas
```typescript
// Cache simple con TTL
const cache = new Map();
const CACHE_TTL = {
  weather: 60 * 60 * 1000, // 1 hora
  currency: 24 * 60 * 60 * 1000, // 24 horas
  translations: 7 * 24 * 60 * 60 * 1000 // 7 días
};
```

### Rate Limiting por Endpoint
```typescript
// Configuración específica por endpoint
const endpointLimits = {
  '/api/search/*': { windowMs: 60000, max: 100 }, // 100/min
  '/api/geo/*': { windowMs: 60000, max: 50 }, // 50/min
  '/api/analytics/*': { windowMs: 60000, max: 20 } // 20/min
};
```

---

## 🚨 PROBLEMAS COMUNES

### Error: "Search timeout"
- **Causa:** Query muy compleja o base de datos lenta
- **Solución:** Optimizar índices, implementar paginación

### Error: "Geocoding service unavailable"
- **Causa:** Servicio externo no disponible
- **Solución:** Implementar fallback y cache

### Error: "Analytics calculation failed"
- **Causa:** Datos insuficientes o query compleja
- **Solución:** Validar datos, simplificar cálculos

### Error: "External API rate limit exceeded"
- **Causa:** Límites de APIs externas
- **Solución:** Implementar cache agresivo, múltiples providers

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ Endpoints de búsqueda avanzada funcionando
- [ ] ✅ Geolocalización y cálculo de distancias
- [ ] ✅ Sistema de analytics y estadísticas
- [ ] ✅ Integraciones con servicios externos
- [ ] ✅ Utilidades específicas del dominio
- [ ] ✅ Sistema de notificaciones básico
- [ ] ✅ Herramientas de moderación
- [ ] ✅ Health checks y monitoreo
- [ ] ✅ Rate limiting apropiado
- [ ] ✅ Cache strategy implementada

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `08-integracion-ia.md`
