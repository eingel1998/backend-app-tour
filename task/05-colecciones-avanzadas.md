# 05 - COLECCIONES AVANZADAS 🤖

## 🎯 OBJETIVO
Implementar las colecciones más complejas del sistema: Conversations (chat unificado con asistente virtual) y Recommendations (recomendaciones e itinerarios). Estas colecciones manejan la inteligencia artificial y personalización del sistema.

## 📋 PREREQUISITOS
- [✅] Tarea 04 - Colecciones de contenido completada
- [✅] Places, Reviews, Events funcionando
- [✅] Todas las relaciones básicas establecidas

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. COLECCIÓN CONVERSATIONS (CHAT UNIFICADO) 🔥💬
**Archivo:** `src/collections/Conversations.ts`

- [ ] **1.1** - Crear estructura básica de la colección Conversations
- [ ] **1.2** - Configurar campos de conversación:
  ```typescript
  // user: relationship -> users, sessionId, title
  // isActive, language: ['es', 'en', 'wayuu'], lastInteraction
  ```

- [ ] **1.3** - Implementar grupo `userContext` para personalización:
  ```typescript
  // currentLocation: { latitude, longitude, city }
  // preferences: json (copia de user.travelPreferences)
  // sessionData: json (datos temporales)
  ```

- [ ] **1.4** - Configurar grupo `assistantSettings`:
  ```typescript
  // personality: ['friendly', 'professional', 'casual']
  // responseLength: ['short', 'medium', 'detailed']
  // includeRecommendations, autoTranslate
  ```

- [ ] **1.5** - Implementar array embebido `messages` 🔥:
  ```typescript
  // id, sender: ['user', 'assistant'], message, messageType
  // messageType: ['text', 'recommendation', 'itinerary', 'question', 'greeting']
  // processingData: { aiModel, processingTime, confidence, tokens }
  // metadata: { recommendedPlaces, generatedItinerary, searchQuery, actionPerformed }
  // isRead, isEdited, editedAt, timestamp
  ```

- [ ] **1.6** - Configurar grupo `statistics` (solo lectura):
  ```typescript
  // totalMessages, avgResponseTime, satisfactionRating, lastRating
  ```

- [ ] **1.7** - Implementar campos de estado:
  ```typescript
  // isArchived, archivedAt
  ```

- [ ] **1.8** - Configurar hooks:
  - afterChange: actualizar lastInteraction
  - afterChange: actualizar statistics.totalMessages
  - beforeCreate: generar sessionId único

- [ ] **1.9** - Configurar Access Control (usuarios solo sus conversaciones)
- [ ] **1.10** - Configurar admin UI con vista optimizada para mensajes embebidos

### 2. COLECCIÓN RECOMMENDATIONS (UNIFICADA) 🔥⭐
**Archivo:** `src/collections/Recommendations.ts`

- [ ] **2.1** - Crear estructura básica de la colección Recommendations
- [ ] **2.2** - Configurar campos comunes:
  ```typescript
  // user: relationship -> users
  // recommendationType: ['place', 'itinerary', 'experience', 'route'] 🔥 CAMPO CLAVE
  // title, description
  ```

- [ ] **2.3** - Implementar grupo `source` para origen de recomendación:
  ```typescript
  // generatedBy: ['ai', 'admin', 'user', 'business']
  // sourceConversation: relationship -> conversations
  // prompt, algorithm
  ```

- [ ] **2.4** - Configurar grupo `context` para personalización:
  ```typescript
  // userPreferences: json, location: { latitude, longitude }
  // timeOfRequest, budget: { min, max, currency }
  // duration, groupSize, specialRequests
  ```

- [ ] **2.5** - Implementar datos específicos por tipo - `placeRecommendation`:
  ```typescript
  // places: relationship (many) -> places
  // reason: richText, score: number (0-1)
  // tags: array, visitOrder: array con { place, orderIndex, estimatedTime, notes }
  ```

- [ ] **2.6** - Implementar datos específicos por tipo - `itineraryRecommendation`:
  ```typescript
  // name, duration, difficulty: ['easy', 'moderate', 'hard']
  // theme: ['cultural', 'adventure', 'relaxation', 'gastronomic', 'natural', 'mixed']
  // dailySchedule: array con { day, date, activities }
  // activities: { time, place, activity, duration, cost, notes, transportation }
  // estimatedCosts: { accommodation, food, transportation, activities, total, currency }
  // includedServices, recommendations: { bestTimeToVisit, packingList, tips, warnings }
  ```

- [ ] **2.7** - Implementar datos específicos por tipo - `experienceRecommendation`:
  ```typescript
  // experienceType: ['adventure', 'cultural', 'gastronomic', 'wellness', 'educational']
  // provider: relationship -> users (business)
  // places: relationship (many) -> places
  // activities: array, price: { amount, currency, includes }
  ```

- [ ] **2.8** - Configurar estados y métricas:
  ```typescript
  // status: ['draft', 'active', 'expired', 'archived']
  // isPublic, isBookable, expiresAt
  // engagement: { wasViewed, wasAccepted, wasBooked, wasShared, viewedAt, sharedCount }
  // feedback: { rating, comment, ratedAt }
  ```

- [ ] **2.9** - Configurar campos condicionales según recommendationType
- [ ] **2.10** - Implementar hooks para validación de datos según tipo
- [ ] **2.11** - Configurar Access Control (usuarios ven sus recomendaciones, públicas si isPublic)

### 3. ENDPOINTS PERSONALIZADOS PARA CHAT
**Archivo:** `src/endpoints/chat.ts`

- [ ] **3.1** - Crear endpoint `/api/chat/start` para iniciar conversación:
  ```typescript
  // POST: crear nueva conversación con contexto del usuario
  // Retorna: conversationId y configuración inicial
  ```

- [ ] **3.2** - Crear endpoint `/api/chat/:conversationId/message` para enviar mensaje:
  ```typescript
  // POST: agregar mensaje del usuario + procesar con IA + respuesta
  // Retorna: mensaje de respuesta del asistente
  ```

- [ ] **3.3** - Crear endpoint `/api/chat/:conversationId/context` para actualizar contexto:
  ```typescript
  // PATCH: actualizar ubicación, preferencias del usuario
  // Permite personalización en tiempo real
  ```

- [ ] **3.4** - Crear endpoint `/api/chat/history` para historial:
  ```typescript
  // GET: listar conversaciones del usuario con última actividad
  ```

### 4. ENDPOINTS PERSONALIZADOS PARA RECOMMENDATIONS
**Archivo:** `src/endpoints/recommendations.ts`

- [ ] **4.1** - Crear endpoint `/api/recommendations/generate` para generar recomendación:
  ```typescript
  // POST: generar recomendación basada en prompt y contexto
  // Parámetros: type, context, preferences
  // Retorna: recomendación generada
  ```

- [ ] **4.2** - Crear endpoint `/api/recommendations/itinerary` para itinerarios específicos:
  ```typescript
  // POST: generar itinerario detallado
  // Parámetros: duration, budget, interests, groupSize
  // Retorna: itinerario completo con cronograma
  ```

- [ ] **4.3** - Crear endpoint `/api/recommendations/nearby` para recomendaciones por ubicación:
  ```typescript
  // GET: recomendaciones basadas en ubicación actual
  // Parámetros: latitude, longitude, radius
  ```

- [ ] **4.4** - Crear endpoint `/api/recommendations/:id/feedback` para feedback:
  ```typescript
  // POST: permitir al usuario calificar recomendación
  // Mejora el algoritmo de recomendaciones futuras
  ```

### 5. INTEGRACIÓN CON IA (PREPARACIÓN)
**Archivo:** `src/services/aiService.ts`

- [ ] **5.1** - Crear estructura base para servicio de IA:
  ```typescript
  // Interfaces para prompt engineering
  // Funciones de procesamiento de contexto
  // Integración con proveedores de IA (OpenAI, Anthropic, etc.)
  ```

- [ ] **5.2** - Implementar procesamiento de mensajes de chat:
  ```typescript
  // processUserMessage: analizar intent y contexto
  // generateResponse: crear respuesta personalizada
  // extractRecommendations: identificar lugares para recomendar
  ```

- [ ] **5.3** - Implementar generación de recomendaciones:
  ```typescript
  // generatePlaceRecommendations: basado en preferencias
  // generateItinerary: crear cronograma detallado
  // generateExperience: sugerir experiencias específicas
  ```

- [ ] **5.4** - Configurar prompt templates para Riohacha:
  ```typescript
  // Templates específicos para turismo en La Guajira
  // Conocimiento sobre cultura Wayuu
  // Información sobre clima y temporadas
  ```

### 6. WEBSOCKETS PARA CHAT EN TIEMPO REAL
**Archivo:** `src/lib/websocket.ts`

- [ ] **6.1** - Configurar WebSocket server básico
- [ ] **6.2** - Implementar rooms por conversación
- [ ] **6.3** - Configurar eventos de chat:
  - user_message: mensaje del usuario
  - assistant_typing: asistente escribiendo
  - assistant_message: respuesta del asistente
  - conversation_updated: cambios en conversación

- [ ] **6.4** - Implementar autenticación para WebSockets
- [ ] **6.5** - Configurar heartbeat y reconexión automática

### 7. TESTING DE FUNCIONALIDADES AVANZADAS
- [ ] **7.1** - Probar creación de conversación completa
- [ ] **7.2** - Probar array embebido de mensajes
- [ ] **7.3** - Probar generación de recomendaciones por tipo
- [ ] **7.4** - Probar endpoints personalizados de chat
- [ ] **7.5** - Probar endpoints de recomendaciones
- [ ] **7.6** - Verificar funcionamiento de WebSockets básico

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Colección Conversations
- [ ] Conversaciones se crean con contexto del usuario
- [ ] Array de mensajes embebidos funciona correctamente
- [ ] SessionId único se genera automáticamente
- [ ] Hooks de actualización funcionan
- [ ] WebSockets básicos funcionan para chat en tiempo real

### Colección Recommendations
- [ ] Tres tipos de recomendaciones funcionan (place, itinerary, experience)
- [ ] Campos condicionales aparecen según recommendationType
- [ ] Contexto y origen se guardan correctamente
- [ ] Sistema de feedback funciona
- [ ] Recomendaciones públicas/privadas se manejan apropiadamente

### Endpoints Personalizados
- [ ] Chat endpoints funcionan completamente
- [ ] Recommendations endpoints generan contenido
- [ ] Autenticación funciona en todos los endpoints
- [ ] Manejo de errores implementado

### Integración IA (Preparación)
- [ ] Estructura base para IA configurada
- [ ] Prompt templates para Riohacha creados
- [ ] Servicios de procesamiento preparados
- [ ] Interfaces definidas para futura integración

---

## 🛠️ COMANDOS ÚTILES

### Desarrollo
```bash
# Generar tipos para nuevas colecciones
npm run generate:types

# Probar WebSockets localmente
npm run dev
# Usar herramienta como Postman para WebSocket testing
```

### Testing API - Chat
```bash
# Iniciar nueva conversación
curl -X POST http://localhost:3000/api/chat/start \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"context": {"location": {"latitude": 11.5447, "longitude": -72.9072}}}'

# Enviar mensaje
curl -X POST http://localhost:3000/api/chat/CONVERSATION_ID/message \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué puedo hacer en Riohacha hoy?", "messageType": "text"}'

# Ver historial
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/api/chat/history
```

### Testing API - Recommendations
```bash
# Generar recomendación de lugares
curl -X POST http://localhost:3000/api/recommendations/generate \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "place",
    "context": {"budget": {"max": 100000, "currency": "COP"}},
    "preferences": {"interests": ["playa", "cultura"]}
  }'

# Generar itinerario
curl -X POST http://localhost:3000/api/recommendations/itinerary \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "duration": 3,
    "budget": {"max": 500000, "currency": "COP"},
    "groupSize": 2,
    "interests": ["adventure", "cultural"]
  }'
```

### Base de Datos
```bash
# Ver conversaciones creadas
sqlite3 backend-app.db "SELECT id, title, language FROM conversations LIMIT 5;"

# Ver mensajes en conversaciones
sqlite3 backend-app.db "SELECT json_extract(messages, '$[0].message') FROM conversations WHERE messages IS NOT NULL LIMIT 3;"

# Ver recomendaciones por tipo
sqlite3 backend-app.db "SELECT recommendationType, title FROM recommendations LIMIT 5;"
```

---

## 📝 NOTAS TÉCNICAS

### Array Embebido de Mensajes
```typescript
// Configuración optimizada para mensajes embebidos
{
  name: 'messages',
  type: 'array',
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: ({ data, index }) => data?.message?.slice(0, 50) || `Mensaje ${index + 1}`
    }
  },
  fields: [
    // campos de mensaje
  ]
}
```

### Campos Condicionales por Tipo
```typescript
// Solo mostrar campos relevantes según recommendationType
{
  name: 'placeRecommendation',
  type: 'group',
  admin: {
    condition: (data) => data.recommendationType === 'place'
  },
  fields: [ /* campos específicos para places */ ]
}
```

### WebSocket Authentication
```typescript
// Verificar token en WebSocket connection
const authenticate = (socket, next) => {
  const token = socket.handshake.auth.token;
  // Verificar JWT token
  jwt.verify(token, process.env.PAYLOAD_SECRET, (err, decoded) => {
    if (err) return next(new Error('Authentication error'));
    socket.userId = decoded.id;
    next();
  });
};
```

### Prompt Engineering para Riohacha
```typescript
const RIOHACHA_CONTEXT = `
Eres un asistente virtual especializado en turismo para Riohacha, La Guajira, Colombia.
Conocimientos clave:
- Clima: cálido y seco, mejor temporada diciembre-abril
- Cultura: fuerte presencia Wayuu, artesanías tradicionales
- Atractivos: playas, desierto, cabo de la vela
- Gastronomía: fritos, arepa de huevo, chivo, pescados
- Idiomas: español y wayuunaiki
`;
```

---

## 🚨 PROBLEMAS COMUNES

### Error: "Messages array too large"
- **Causa:** Array de mensajes muy extenso
- **Solución:** Implementar paginación o archivado automático

### Error: "WebSocket connection failed"
- **Causa:** Configuración de puerto o autenticación
- **Solución:** Verificar configuración de WebSocket server

### Error: "Recommendation type not found"
- **Causa:** recommendationType no válido
- **Solución:** Validar tipo antes de procesar

### Error: "Context parsing failed"
- **Causa:** JSON mal formado en campos de contexto
- **Solución:** Validar JSON antes de guardar

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ Colección Conversations con mensajes embebidos
- [ ] ✅ Colección Recommendations con 3 tipos diferenciados
- [ ] ✅ Endpoints personalizados de chat funcionando
- [ ] ✅ Endpoints de recomendaciones funcionando
- [ ] ✅ WebSockets básicos para chat en tiempo real
- [ ] ✅ Estructura de servicio de IA preparada
- [ ] ✅ Prompt templates para turismo en Riohacha
- [ ] ✅ Sistema de feedback para recomendaciones
- [ ] ✅ Access Control apropiado para ambas colecciones
- [ ] ✅ Testing básico de todas las funcionalidades

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `06-autenticacion-autorizacion.md`

## 🧪 TESTS ESPECÍFICOS DE LA TAREA

### Tests Obligatorios para Completar la Tarea
Esta tarea solo estará **COMPLETA** cuando **TODOS** los siguientes tests pasen:

#### **📁 Estructura de Tests: `test/tasks/task-05/`**

##### **1. `conversations-collection.test.ts` - Tests de Colección Conversations**
```typescript
describe('Task 05 - Conversations Collection', () => {
  test('should have Conversations collection with chat structure', async () => {
    // Verificar estructura básica de Conversations.ts
    // Test de campos: user, sessionId, title, isActive
    // Verificar soporte multiidioma (es, en, wayuu)
  });

  test('should handle user context for personalization', async () => {
    // Test de grupo userContext
    // Verificar currentLocation con coordenadas
    // Test de preferences y sessionData JSON
  });

  test('should manage assistant settings correctly', async () => {
    // Test de assistantSettings
    // Verificar personality options
    // Test de responseLength y configuraciones
  });

  test('should handle embedded messages array properly', async () => {
    // Test de array messages embebido
    // Verificar estructura de mensajes (sender, messageType)
    // Test de processingData con métricas de IA
  });

  test('should manage conversation statistics', async () => {
    // Test de grupo statistics (solo lectura)
    // Verificar cálculos automáticos
    // Test de métricas de uso y performance
  });

  test('should support multilingual conversations', async () => {
    // Test de conversaciones en español
    // Test de conversaciones en inglés
    // Test de soporte para idioma wayuu
  });
});
```

##### **2. `recommendations-collection.test.ts` - Tests de Colección Recommendations**
```typescript
describe('Recommendations Collection Tests', () => {
  test('should have Recommendations collection with AI-powered structure', async () => {
    // Verificar estructura de Recommendations.ts
    // Test de campos: user, type, title, description
    // Verificar relación con conversaciones
  });

  test('should handle different recommendation types', async () => {
    // Test de types: place, itinerary, event, experience
    // Verificar estructura específica por tipo
    // Test de validaciones condicionales
  });

  test('should manage itinerary data correctly', async () => {
    // Test de grupo itinerary
    // Verificar estructura de días y actividades
    // Test de cálculos de duración y costos
  });

  test('should handle AI generation metadata', async () => {
    // Test de aiGeneration group
    // Verificar modelo usado, tokens, confidence
    // Test de prompts y parámetros de generación
  });

  test('should manage user feedback and ratings', async () => {
    // Test de userFeedback
    // Verificar rating, implementation status
    // Test de feedback para mejora del algoritmo
  });

  test('should calculate personalization scores', async () => {
    // Test de personalizationScore
    // Verificar factores de personalización
    // Test de weights para diferentes criterios
  });
});
```

##### **3. `ai-integration.test.ts` - Tests de Integración con IA**
```typescript
describe('AI Integration Tests', () => {
  test('should integrate with AI service for conversations', async () => {
    // Test de integración con servicio de IA
    // Verificar procesamiento de mensajes
    // Test de respuesta contextual
  });

  test('should generate recommendations based on user data', async () => {
    // Test de generación de recomendaciones
    // Verificar uso de preferencias de usuario
    // Test de algoritmo de personalización
  });

  test('should handle AI processing metadata correctly', async () => {
    // Test de almacenamiento de metadata de IA
    // Verificar tokens utilizados
    // Test de confidence scores
  });

  test('should support contextual recommendations', async () => {
    // Test de recomendaciones contextuales
    // Verificar uso de ubicación actual
    // Test de recomendaciones basadas en historial
  });

  test('should handle AI service errors gracefully', async () => {
    // Test de manejo de errores de servicio IA
    // Verificar fallbacks y respuestas de emergencia
    // Test de retry mechanisms
  });
});
```

##### **4. `advanced-collections-integration.test.ts` - Tests de Integración Avanzada**
```typescript
describe('Advanced Collections Integration Tests', () => {
  test('should integrate conversations with recommendations', async () => {
    // Test de relación conversations -> recommendations
    // Verificar generación automática de recomendaciones
    // Test de continuidad de contexto
  });

  test('should handle complex user journey tracking', async () => {
    // Test de seguimiento de journey completo
    // Verificar datos de sesión persistentes
    // Test de analytics de conversaciones
  });

  test('should support real-time conversation updates', async () => {
    // Test de actualizaciones en tiempo real
    // Verificar websockets o polling
    // Test de sincronización de mensajes
  });

  test('should manage conversation and recommendation lifecycle', async () => {
    // Test de archivado de conversaciones antiguas
    // Verificar limpieza de datos temporales
    // Test de retention policies
  });

  test('should handle privacy and data protection', async () => {
    // Test de anonimización de datos sensibles
    // Verificar cumplimiento de privacidad
    // Test de exportación/eliminación de datos
  });
});
```

##### **5. `advanced-performance.test.ts` - Tests de Rendimiento Avanzado**
```typescript
describe('Advanced Performance Tests', () => {
  test('should handle concurrent conversations efficiently', async () => {
    // Test de múltiples conversaciones simultáneas
    // Verificar performance con muchos usuarios activos
    // Test de gestión de memoria con arrays embebidos
  });

  test('should optimize AI processing and response times', async () => {
    // Test de tiempos de respuesta de IA
    // Verificar caching de respuestas comunes
    // Test de optimización de tokens
  });

  test('should handle large recommendation datasets', async () => {
    // Test con muchas recomendaciones almacenadas
    // Verificar queries de recomendaciones personalizadas
    // Test de algoritmos de ranking eficientes
  });

  test('should manage conversation history efficiently', async () => {
    // Test de queries en historiales largos
    // Verificar paginación de mensajes
    // Test de compresión de datos antiguos
  });
});
```

### **📊 Comandos de Validación**

#### **Ejecutar Tests de la Tarea 05:**
```bash
npm run test:task-05
```

#### **Ejecutar Tests con Coverage:**
```bash
npm run test:task-05:coverage
```

#### **Validación Automática de Completitud:**
```bash
node scripts/validate-task.js 05
```

### **✅ Criterios de Completitud**
- [ ] 🧪 **TODOS los tests pasan** (100% success rate)
- [ ] 📊 **Coverage >80%** en colecciones avanzadas
- [ ] 🔍 **Validación automática exitosa** con `validate-task.js 05`
- [ ] 🤖 **Tests de integración IA exitosos**
- [ ] ⚡ **Performance tests pasan** con datasets complejos
- [ ] 🔗 **Tests de integración avanzada funcionando**

---

## ⚠️ IMPORTANTE
**Esta tarea NO estará completa hasta que TODOS los tests pasen exitosamente.**

El comando `npm run test:task-05` debe ejecutarse sin errores y todos los tests deben estar en estado ✅ PASSED.

---
