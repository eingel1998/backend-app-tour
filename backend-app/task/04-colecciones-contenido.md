# 04 - COLECCIONES DE CONTENIDO 🏛️

## 🎯 OBJETIVO
Implementar las colecciones de contenido turístico: Places (lugares turísticos), Reviews (reseñas) y Events (eventos). Estas colecciones manejan el contenido principal de la aplicación turística de Riohacha.

## 📋 PREREQUISITOS
- [✅] Tarea 03 - Colecciones básicas completada
- [✅] Users, Media y Categories funcionando
- [✅] Seeds básicos cargados

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. COLECCIÓN PLACES (LUGARES TURÍSTICOS) 🏖️
**Archivo:** `src/collections/Places.ts`

- [ ] **1.1** - Crear estructura básica de la colección Places
- [ ] **1.2** - Configurar campos principales:
  ```typescript
  // name, slug, description, shortDescription, category, subcategory, tags
  ```

- [ ] **1.3** - Implementar grupo `location` con coordenadas:
  ```typescript
  // address, latitude, longitude, city, department
  // accessInstructions, publicTransport, parkingAvailable
  ```

- [ ] **1.4** - Configurar relaciones multimedia:
  ```typescript
  // images: relationship (many) -> media (requerido)
  // videos: relationship (many) -> media
  // virtualTour: text (URL 360°)
  ```

- [ ] **1.5** - Implementar grupo `pricing`:
  ```typescript
  // isFree, minPrice, maxPrice, currency, priceDescription
  ```

- [ ] **1.6** - Configurar array `schedule` para horarios:
  ```typescript
  // day, openTime, closeTime, isClosed, isOpen24h, seasonalNotes
  ```

- [ ] **1.7** - Implementar grupo `accessibility`:
  ```typescript
  // wheelchairAccessible, hasParking, hasRestrooms, hasFood, allowsPets, childFriendly
  ```

- [ ] **1.8** - Configurar array `features` para características especiales
- [ ] **1.9** - Implementar grupo `statistics` (solo lectura, calculado):
  ```typescript
  // averageRating, totalReviews, totalViews, totalFavorites, lastReviewDate
  ```

- [ ] **1.10** - Configurar relaciones:
  ```typescript
  // businessOwner: relationship (one) -> users (donde userType='business')
  // relatedPlaces: relationship (many) -> places
  ```

- [ ] **1.11** - Implementar campos de estado:
  ```typescript
  // status: ['draft', 'published', 'archived']
  // isActive, isFeatured, isVerified, verificationDate
  ```

- [ ] **1.12** - Configurar hooks para auto-generación de slug
- [ ] **1.13** - Configurar Access Control (públicos para lectura, empresas para crear sus lugares)

### 2. COLECCIÓN REVIEWS (RESEÑAS) ⭐
**Archivo:** `src/collections/Reviews.ts`

- [ ] **2.1** - Crear estructura básica de la colección Reviews
- [ ] **2.2** - Configurar campos principales:
  ```typescript
  // user: relationship -> users, place: relationship -> places
  // rating: number (1-5), title, comment, pros, cons
  ```

- [ ] **2.3** - Configurar multimedia de evidencia:
  ```typescript
  // images: relationship (many) -> media (máx 5)
  // visitDate, tripType: ['solo', 'couple', 'family', 'friends', 'business']
  ```

- [ ] **2.4** - Implementar grupo `ratings` para valoraciones detalladas:
  ```typescript
  // cleanliness: number (1-5), service: number (1-5)
  // value: number (1-5), accessibility: number (1-5)
  ```

- [ ] **2.5** - Configurar campos de estado y moderación:
  ```typescript
  // status: ['pending', 'approved', 'rejected', 'flagged']
  // isVerified, isVisible, moderationNotes, flagReason
  ```

- [ ] **2.6** - Implementar interacciones:
  ```typescript
  // helpfulVotes, notHelpfulVotes, reportCount
  ```

- [ ] **2.7** - Configurar array `responses` para respuestas de empresas:
  ```typescript
  // user: relationship -> users (business owner)
  // response, responseDate, isOfficial
  ```

- [ ] **2.8** - Implementar índice único `user + place` (una reseña por usuario por lugar)
- [ ] **2.9** - Configurar hooks para actualizar estadísticas de Places
- [ ] **2.10** - Configurar Access Control (usuarios autenticados para crear, moderadores para aprobar)

### 3. COLECCIÓN EVENTS (EVENTOS) 🎭
**Archivo:** `src/collections/Events.ts`

- [ ] **3.1** - Crear estructura básica de la colección Events
- [ ] **3.2** - Configurar campos principales:
  ```typescript
  // name, slug, description, shortDescription, eventType, category, tags
  ```

- [ ] **3.3** - Implementar grupo `schedule` para programación:
  ```typescript
  // startDate, endDate, startTime, endTime, timezone
  // duration, isRecurring, recurrencePattern
  ```

- [ ] **3.4** - Configurar grupo `location` para ubicación del evento:
  ```typescript
  // locationType: ['place', 'custom', 'multiple', 'online']
  // place: relationship -> places (si locationType='place')
  // customLocation: { name, address, latitude, longitude, city }
  // onlineDetails: { platform, url, accessCode }
  ```

- [ ] **3.5** - Implementar grupo `organizer`:
  ```typescript
  // organizerType: ['business', 'government', 'ngo', 'individual']
  // organizer: relationship -> users
  // organizerName, contact: { email, phone, website }
  ```

- [ ] **3.6** - Configurar grupo `pricing` para tickets y reservas:
  ```typescript
  // isFree, ticketPrice, currency, hasDiscounts, discountDescription
  // requiresReservation, maxAttendees, currentAttendees
  ```

- [ ] **3.7** - Configurar multimedia:
  ```typescript
  // images: relationship (many) -> media
  // videos: relationship (many) -> media
  // poster: upload (imagen principal)
  ```

- [ ] **3.8** - Implementar campos de estado:
  ```typescript
  // status: ['draft', 'published', 'cancelled', 'postponed', 'completed']
  // isActive, isFeatured, isRecurring, cancellationReason, isApproved
  ```

- [ ] **3.9** - Configurar hooks para validación de fechas y disponibilidad
- [ ] **3.10** - Configurar Access Control (empresas y organizadores para crear)

### 4. SEEDS PARA CONTENIDO DE RIOHACHA
**Archivo:** `src/seeds/contentCollections.ts`

- [ ] **4.1** - Crear seeds para lugares emblemáticos de Riohacha:
  ```typescript
  const places = [
    {
      name: 'Muelle de Riohacha',
      description: 'Hermoso muelle con vista al atardecer sobre el mar Caribe',
      category: 'playas-y-costas',
      location: { latitude: 11.5447, longitude: -72.9072, address: 'Muelle de Riohacha' },
      isFree: true,
      features: ['Atardeceres', 'Fotografía', 'Caminatas']
    },
    {
      name: 'Playa de Riohacha',
      description: 'Playa principal de la ciudad con aguas cálidas',
      category: 'playas-y-costas',
      location: { latitude: 11.5388, longitude: -72.9156 }
    },
    // ... más lugares
  ]
  ```

- [ ] **4.2** - Crear eventos típicos de Riohacha:
  ```typescript
  const events = [
    {
      name: 'Festival de la Cultura Wayuu',
      eventType: 'cultural',
      description: 'Celebración de la cultura indígena Wayuu',
      schedule: { startDate: '2024-08-15', duration: '3 días' }
    },
    // ... más eventos
  ]
  ```

- [ ] **4.3** - Crear reseñas de ejemplo para testing
- [ ] **4.4** - Ejecutar seeds y verificar relaciones correctas

### 5. CONFIGURACIÓN DE BÚSQUEDA
- [ ] **5.1** - Configurar índices de búsqueda en Places:
  - name, description, shortDescription, tags
  - location.address, location.city

- [ ] **5.2** - Configurar filtros comunes para Places:
  - Por categoría, por precio, por ubicación
  - Por características de accesibilidad

- [ ] **5.3** - Configurar búsqueda en Events:
  - Por fecha, por tipo de evento, por ubicación

### 6. VALIDACIONES Y HOOKS AVANZADOS
- [ ] **6.1** - Hook en Places para validar coordenadas dentro de La Guajira
- [ ] **6.2** - Hook en Reviews para prevenir spam (máximo 1 reseña por día por usuario)
- [ ] **6.3** - Hook en Events para validar fechas futuras
- [ ] **6.4** - Hook en Places para actualizar estadísticas cuando se crea una review
- [ ] **6.5** - Hook en Events para notificar cuando se cancela un evento

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Colección Places
- [ ] CRUD completo funciona via API y admin
- [ ] Relaciones con Categories y Media funcionan
- [ ] Geolocalización funciona correctamente
- [ ] Horarios y precios se configuran apropiadamente
- [ ] BusinessOwner puede gestionar sus lugares
- [ ] Búsqueda por ubicación funciona

### Colección Reviews
- [ ] Usuarios pueden crear reseñas
- [ ] Sistema de ratings detallados funciona
- [ ] Índice único user+place previene duplicados
- [ ] Empresas pueden responder a reseñas
- [ ] Estadísticas de Places se actualizan automáticamente
- [ ] Sistema de moderación funciona

### Colección Events
- [ ] Eventos se crean con diferentes tipos de ubicación
- [ ] Sistema de fechas y recurrencia funciona
- [ ] Organizers pueden gestionar sus eventos
- [ ] Sistema de tickets y reservas básico funciona
- [ ] Estados de eventos se gestionan correctamente

### Integración General
- [ ] Seeds de Riohacha se cargan correctamente
- [ ] Todas las relaciones funcionan
- [ ] Admin UI muestra todas las colecciones
- [ ] APIs REST completas disponibles
- [ ] Búsquedas y filtros funcionan

---

## 🛠️ COMANDOS ÚTILES

### Desarrollo
```bash
# Generar tipos después de crear colecciones
npm run generate:types

# Ejecutar seeds de contenido
npm run seed:content

# Verificar relaciones en admin
npm run dev
```

### Testing API
```bash
# Crear lugar turístico
curl -X POST http://localhost:3000/api/places \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Muelle de Riohacha",
    "description": "Hermoso muelle con vista al atardecer",
    "location": {"latitude": 11.5447, "longitude": -72.9072},
    "category": "ID_CATEGORIA"
  }'

# Buscar lugares por categoría
curl "http://localhost:3000/api/places?where[category][equals]=ID_CATEGORIA"

# Crear reseña
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "place": "ID_LUGAR",
    "rating": 5,
    "comment": "Excelente lugar para ver el atardecer"
  }'

# Listar eventos activos
curl "http://localhost:3000/api/events?where[status][equals]=published&where[isActive][equals]=true"
```

### Verificación de Datos
```bash
# Ver lugares creados
sqlite3 backend-app.db "SELECT name, status FROM places LIMIT 5;"

# Ver reseñas con relaciones
sqlite3 backend-app.db "SELECT r.rating, r.comment, p.name FROM reviews r JOIN places p ON r.place = p.id LIMIT 3;"

# Ver eventos próximos
sqlite3 backend-app.db "SELECT name, startDate FROM events WHERE startDate > date('now') LIMIT 5;"
```

---

## 📝 NOTAS TÉCNICAS

### Geolocalización en Places
```typescript
// Validación de coordenadas para La Guajira
{
  name: 'latitude',
  type: 'number',
  required: true,
  validate: (val) => {
    // La Guajira bounds aproximados
    return val >= 10.0 && val <= 12.5;
  }
}
```

### Estadísticas Calculadas
```typescript
// Hook para actualizar estadísticas de Places
const updatePlaceStats = async (placeId) => {
  const reviews = await payload.find({
    collection: 'reviews',
    where: { place: { equals: placeId }, status: { equals: 'approved' } }
  });
  
  const averageRating = reviews.docs.reduce((acc, r) => acc + r.rating, 0) / reviews.docs.length;
  
  await payload.update({
    collection: 'places',
    id: placeId,
    data: {
      'statistics.averageRating': averageRating,
      'statistics.totalReviews': reviews.totalDocs
    }
  });
};
```

### Prevención de Spam en Reviews
```typescript
// Hook beforeValidate en Reviews
beforeValidate: [
  async ({ data, req }) => {
    const recentReview = await req.payload.find({
      collection: 'reviews',
      where: {
        user: { equals: req.user.id },
        createdAt: { greater_than: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }
    });
    
    if (recentReview.totalDocs >= 3) {
      throw new Error('Máximo 3 reseñas por día permitidas');
    }
  }
]
```

---

## 🚨 PROBLEMAS COMUNES

### Error: "Duplicate key violation"
- **Causa:** Intentar crear reseña duplicada (user + place)
- **Solución:** Verificar índice único y validar antes de crear

### Error: "Invalid coordinates"
- **Causa:** Coordenadas fuera del rango de La Guajira
- **Solución:** Validar bounds en hook beforeValidate

### Error: "Event date in the past"
- **Causa:** Crear evento con fecha pasada
- **Solución:** Validar fechas en hook beforeValidate

### Error: "Business owner mismatch"
- **Causa:** Usuario no-business intentando crear lugar con businessOwner
- **Solución:** Validar userType en Access Control

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ Colección Places completa con geolocalización
- [ ] ✅ Colección Reviews con sistema de ratings
- [ ] ✅ Colección Events con programación avanzada
- [ ] ✅ Seeds de lugares turísticos de Riohacha
- [ ] ✅ Seeds de eventos típicos de La Guajira
- [ ] ✅ Sistema de búsqueda y filtros funcionando
- [ ] ✅ Relaciones entre todas las colecciones
- [ ] ✅ Hooks de validación y estadísticas
- [ ] ✅ Access Control apropiado para cada collection
- [ ] ✅ APIs REST completas para las 3 colecciones

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `05-colecciones-avanzadas.md`
