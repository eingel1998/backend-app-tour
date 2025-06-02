# 08 - INTEGRACIÓN CON IA 🤖

## 🎯 OBJETIVO
Implementar la integración completa con servicios de Inteligencia Artificial para el asistente virtual turístico, generación de recomendaciones personalizadas, análisis de sentimientos en reseñas y funcionalidades avanzadas específicas para turismo en Riohacha.

## 📋 PREREQUISITOS
- [✅] Tarea 07 - Endpoints personalizados completada
- [✅] Colecciones Conversations y Recommendations funcionando
- [✅] Endpoints de chat básicos implementados

## 🗂️ ESTADO ACTUAL
🟡 **PENDIENTE** - No iniciado

---

## 📝 TAREAS ESPECÍFICAS

### 1. CONFIGURACIÓN BASE DE IA
**Archivo:** `src/ai/config.ts`

- [ ] **1.1** - Configurar providers de IA disponibles:
  ```typescript
  const AI_PROVIDERS = {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o-mini',
      maxTokens: 2000
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: 'claude-3-haiku-20240307',
      maxTokens: 2000
    },
    local: {
      endpoint: process.env.LOCAL_LLM_ENDPOINT,
      model: 'llama3-8b-instruct'
    }
  }
  ```

- [ ] **1.2** - Implementar factory pattern para providers:
  ```typescript
  // Permitir cambio dinámico de provider según disponibilidad
  // Fallback automático si un provider falla
  ```

- [ ] **1.3** - Configurar límites y quotas:
  ```typescript
  // Tokens por usuario por día/mes
  // Rate limiting específico para IA
  // Cost tracking por provider
  ```

- [ ] **1.4** - Configurar variables de entorno:
  ```env
  # AI Configuration
  AI_PROVIDER=openai
  AI_FALLBACK_PROVIDER=anthropic
  OPENAI_API_KEY=sk-...
  ANTHROPIC_API_KEY=ant-...
  AI_MAX_TOKENS_PER_USER_DAY=10000
  AI_MAX_REQUESTS_PER_USER_HOUR=50
  ```

### 2. SERVICIO DE ASISTENTE VIRTUAL
**Archivo:** `src/ai/assistantService.ts`

- [ ] **2.1** - Implementar procesamiento de mensajes de usuario:
  ```typescript
  // analyzeUserIntent: determinar intención del mensaje
  // extractContext: extraer ubicación, preferencias, etc.
  // classifyQuery: tipo de consulta (información, recomendación, ayuda)
  ```

- [ ] **2.2** - Crear system prompts específicos para Riohacha:
  ```typescript
  const RIOHACHA_SYSTEM_PROMPT = `
  Eres WAYUU AI, un asistente virtual especializado en turismo para Riohacha y La Guajira, Colombia.

  CONOCIMIENTO BASE:
  - Ubicación: Costa norte de Colombia, frontera con Venezuela
  - Clima: Tropical seco, temperatura 26-32°C
  - Cultura: Fuerte presencia indígena Wayuu
  - Idiomas: Español y Wayuunaiki
  - Temporadas: Alta (Dic-Abr), Media (May-Jul), Baja (Ago-Nov)

  LUGARES EMBLEMÁTICOS:
  - Cabo de la Vela: Desierto y playas vírgenes
  - Punta Gallinas: Punto más septentrional de Suramérica  
  - Manaure: Salinas y flamencos rosados
  - Uribia: Capital indígena de Colombia
  - Bahía Hondita: Playa paradisíaca

  GASTRONOMÍA TÍPICA:
  - Friche: Cabrito guisado wayuu
  - Arepa de huevo rellena
  - Bollo limpio con queso
  - Chicha de maíz
  - Pescados frescos del Caribe

  ARTESANÍAS:
  - Mochilas wayuu (patrimonio cultural)
  - Hamacas tejidas
  - Sandalias de cuero
  - Joyas tradicionales

  COMPORTAMIENTO:
  - Sé amigable y conocedor
  - Usa términos locales cuando sea apropiado
  - Considera clima y temporadas en recomendaciones
  - Respeta y promociona la cultura wayuu
  - Sugiere experiencias auténticas
  - Incluye consejos prácticos de viaje
  `;
  ```

- [ ] **2.3** - Implementar generación de respuestas contextuales:
  ```typescript
  // generateResponse: crear respuesta basada en contexto
  // includeRecommendations: agregar lugares relevantes
  // adaptToLanguage: ajustar idioma (español/wayuunaiki básico)
  // formatForMobile: optimizar para app móvil
  ```

- [ ] **2.4** - Implementar análisis de satisfacción en tiempo real:
  ```typescript
  // analyzeUserSatisfaction: detectar frustración o satisfacción
  // suggestAlternatives: ofrecer opciones si el usuario no está satisfecho
  // escalateToHuman: transferir a operador humano si es necesario
  ```

### 3. MOTOR DE RECOMENDACIONES INTELIGENTES
**Archivo:** `src/ai/recommendationEngine.ts`

- [ ] **3.1** - Implementar análisis de perfil de usuario:
  ```typescript
  // analyzeUserPreferences: extraer preferencias de conversaciones
  // calculateAffinityScores: puntuar lugares según perfil
  // identifyUserType: clasificar tipo de viajero (aventurero, cultural, etc.)
  ```

- [ ] **3.2** - Crear sistema de recomendaciones por tipo:

  **Recomendaciones de Lugares:**
  ```typescript
  // generatePlaceRecommendations(context, preferences)
  // Factores: ubicación actual, horario, clima, presupuesto
  // Personalización: historial, favoritos, reseñas previas
  ```

  **Generación de Itinerarios:**
  ```typescript
  // generateItinerary(duration, budget, interests, groupSize)
  // Optimización de rutas considerando distancias
  // Balanceo de actividades según energía/tiempo
  // Inclusión de comidas y descansos
  ```

  **Experiencias Personalizadas:**
  ```typescript
  // generateExperience(theme, intensity, authenticity)
  // Temas: cultural wayuu, aventura desierto, gastronómico
  // Conexión con proveedores locales verificados
  ```

- [ ] **3.3** - Implementar algoritmo de collaborative filtering:
  ```typescript
  // Analizar patrones de usuarios similares
  // Recomendar basado en comportamiento de cluster
  // Machine learning básico con feedback loops
  ```

- [ ] **3.4** - Crear sistema de scoring dinámico:
  ```typescript
  // Factores: distancia, rating, popularidad, precio
  // Ajustes temporales: eventos, clima, temporada
  // Personalización: preferencias individuales
  ```

### 4. ANÁLISIS DE SENTIMIENTOS Y TEXTO
**Archivo:** `src/ai/textAnalysis.ts`

- [ ] **4.1** - Implementar análisis de sentimientos en reseñas:
  ```typescript
  // analyzeSentiment: positivo/negativo/neutral
  // extractKeywords: palabras clave importantes
  // detectLanguage: español/inglés/wayuunaiki básico
  // flagInappropriate: detectar contenido ofensivo
  ```

- [ ] **4.2** - Crear sistema de moderación automática:
  ```typescript
  // autoModerateReview: aprobar/rechazar automáticamente
  // detectSpam: identificar reseñas falsas
  // suggestImprovements: sugerir mejoras a empresas
  ```

- [ ] **4.3** - Implementar extracción de insights de reseñas:
  ```typescript
  // extractCommonComplaints: problemas frecuentes
  // identifyStrengths: fortalezas destacadas
  // generateSummaries: resúmenes automáticos de reseñas
  ```

- [ ] **4.4** - Crear análisis de tendencias de contenido:
  ```typescript
  // analyzeTrends: identificar tendencias en búsquedas
  // seasonalPatterns: patrones estacionales
  // emergingInterests: nuevos intereses detectados
  ```

### 5. PROCESAMIENTO DE LENGUAJE NATURAL ESPECÍFICO
**Archivo:** `src/ai/nlpService.ts`

- [ ] **5.1** - Implementar reconocimiento de entidades para turismo:
  ```typescript
  // Entidades: lugares, fechas, presupuestos, actividades
  // Reconocer nombres de lugares en wayuunaiki
  // Extraer información temporal (fechas, duraciones)
  ```

- [ ] **5.2** - Crear sistema de intent classification:
  ```typescript
  const INTENTS = {
    'buscar_lugar': 'Usuario busca información de lugares',
    'pedir_recomendacion': 'Usuario quiere recomendaciones',
    'planificar_viaje': 'Usuario planifica itinerario',
    'informacion_cultural': 'Usuario pregunta sobre cultura wayuu',
    'ayuda_navegacion': 'Usuario necesita direcciones',
    'queja_sugerencia': 'Usuario tiene queja o sugerencia'
  }
  ```

- [ ] **5.3** - Implementar manejo de contexto conversacional:
  ```typescript
  // mantainContext: mantener contexto entre mensajes
  // resolveReferences: resolver referencias ("ese lugar", "el anterior")
  // handleFollowUp: manejar preguntas de seguimiento
  ```

- [ ] **5.4** - Crear generación de preguntas de aclaración:
  ```typescript
  // generateClarifyingQuestions: cuando la query es ambigua
  // suggestAlternatives: ofrecer opciones específicas
  // guideConversation: dirigir conversación hacia objetivos
  ```

### 6. INTEGRACIÓN CON CONVERSACIONES
**Archivo:** `src/ai/conversationHandler.ts`

- [ ] **6.1** - Implementar handler principal de chat:
  ```typescript
  // processMessage: pipeline completo de procesamiento
  // updateConversationContext: actualizar contexto dinámicamente
  // generateResponse: crear respuesta final
  // logInteraction: registrar métricas de interacción
  ```

- [ ] **6.2** - Crear sistema de memoria conversacional:
  ```typescript
  // shortTermMemory: últimos 10 mensajes
  // longTermMemory: preferencias y patrones del usuario
  // contextualMemory: información específica de la sesión
  ```

- [ ] **6.3** - Implementar personalización dinámica:
  ```typescript
  // adaptPersonality: ajustar personalidad según usuario
  // adjustComplexity: nivel de detalle según experiencia
  // localizeBehavior: comportamiento cultural apropiado
  ```

### 7. ENDPOINTS DE IA
**Archivo:** `src/endpoints/ai.ts`

- [ ] **7.1** - Crear endpoint `/api/ai/chat` para conversación completa:
  ```typescript
  // POST: mensaje + contexto → respuesta + recomendaciones
  // Integración completa con sistema de IA
  // Logging de costos y performance
  ```

- [ ] **7.2** - Implementar endpoint `/api/ai/recommend` para recomendaciones on-demand:
  ```typescript
  // POST: preferencias → recomendaciones instantáneas
  // Sin necesidad de conversación completa
  // Útil para widgets de recomendación
  ```

- [ ] **7.3** - Crear endpoint `/api/ai/analyze` para análisis de texto:
  ```typescript
  // POST: texto → análisis de sentimiento + keywords
  // Útil para moderar contenido en tiempo real
  // Análisis de reseñas y comentarios
  ```

- [ ] **7.4** - Implementar endpoint `/api/ai/translate` para traducciones contextuales:
  ```typescript
  // POST: texto + contexto turístico → traducción cultural
  // Especial atención a términos wayuu y culturales
  // Cache de traducciones comunes
  ```

### 8. OPTIMIZACIÓN Y MONITOREO
**Archivo:** `src/ai/monitoring.ts`

- [ ] **8.1** - Implementar tracking de costos por usuario:
  ```typescript
  // Monitorear tokens consumidos por provider
  // Alertas de límites de quota
  // Reportes de uso mensual
  ```

- [ ] **8.2** - Crear métricas de calidad de respuestas:
  ```typescript
  // Response time, user satisfaction, accuracy
  // A/B testing de diferentes prompts
  // Feedback loop para mejora continua
  ```

- [ ] **8.3** - Implementar cache inteligente:
  ```typescript
  // Cache de respuestas similares
  // Cache de recomendaciones por perfil
  // Invalidación basada en cambios de contenido
  ```

- [ ] **8.4** - Configurar alertas y logging:
  ```typescript
  // Alertas de fallos de IA
  // Logging de queries problemáticas
  // Monitoreo de latencia y disponibilidad
  ```

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Asistente Virtual
- [ ] Responde apropiadamente a consultas turísticas
- [ ] Mantiene contexto entre mensajes
- [ ] Incluye recomendaciones relevantes
- [ ] Adapta personalidad según usuario
- [ ] Maneja múltiples idiomas básicos

### Sistema de Recomendaciones
- [ ] Genera recomendaciones personalizadas
- [ ] Crea itinerarios optimizados
- [ ] Considera factores temporales y geográficos
- [ ] Aprende de feedback del usuario

### Análisis de Texto
- [ ] Analiza sentimientos en reseñas correctamente
- [ ] Detecta contenido inapropiado
- [ ] Extrae keywords relevantes
- [ ] Genera insights automáticos

### Performance y Costos
- [ ] Tiempo de respuesta < 3 segundos
- [ ] Costos controlados con límites por usuario
- [ ] Cache efectivo reduce llamadas a IA
- [ ] Monitoreo y alertas funcionando

---

## 🛠️ COMANDOS ÚTILES

### Testing de IA
```bash
# Conversación completa
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "conv_123",
    "message": "¿Qué puedo hacer en Riohacha este fin de semana?",
    "context": {
      "location": {"lat": 11.5447, "lng": -72.9072},
      "budget": {"max": 200000, "currency": "COP"}
    }
  }'

# Recomendación directa
curl -X POST http://localhost:3000/api/ai/recommend \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "itinerary",
    "duration": 2,
    "interests": ["culture", "beach"],
    "groupSize": 2
  }'

# Análisis de sentimiento
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "El lugar es hermoso pero el servicio fue terrible",
    "type": "review"
  }'
```

### Monitoreo de IA
```bash
# Ver métricas de uso
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:3000/api/ai/metrics

# Revisar logs de IA
tail -f logs/ai-service.log | grep "ERROR"

# Verificar costos del día
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:3000/api/ai/costs?period=today
```

---

## 📝 NOTAS TÉCNICAS

### Prompt Engineering Best Practices
```typescript
// Estructura de prompt optimizada
const createPrompt = (context: Context, userMessage: string) => {
  return `
    ${SYSTEM_PROMPT}
    
    CONTEXTO ACTUAL:
    - Ubicación: ${context.location}
    - Hora: ${context.timestamp}
    - Preferencias: ${JSON.stringify(context.preferences)}
    
    HISTORIAL RECIENTE:
    ${context.recentMessages.slice(-3).join('\n')}
    
    USUARIO: ${userMessage}
    
    ASISTENTE: [Responde como WAYUU AI, incluye recomendaciones específicas cuando sea relevante]
  `;
};
```

### Rate Limiting para IA
```typescript
// Configuración específica para endpoints de IA
const aiRateLimit = {
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 50, // 50 requests por hora por usuario
  message: 'Límite de consultas de IA alcanzado, intenta en 1 hora',
  standardHeaders: true
};
```

### Cost Tracking
```typescript
// Tracking de costos por provider
const trackCost = async (userId: string, provider: string, tokens: number) => {
  const cost = calculateCost(provider, tokens);
  await saveCostRecord({
    userId,
    provider,
    tokens,
    cost,
    timestamp: new Date()
  });
};
```

---

## 🚨 PROBLEMAS COMUNES

### Error: "AI service timeout"
- **Causa:** Provider de IA lento o no disponible
- **Solución:** Implementar timeout y fallback a otro provider

### Error: "Quota exceeded"
- **Causa:** Límites de API de IA alcanzados
- **Solución:** Distribuir carga entre múltiples providers

### Error: "Invalid response from AI"
- **Causa:** Respuesta mal formateada del LLM
- **Solución:** Mejorar prompts y validar respuestas

### Error: "Context too large"
- **Causa:** Conversación muy larga excede límite de tokens
- **Solución:** Implementar context summarization

---

## 📋 CHECKLIST DE COMPLETITUD

Al finalizar esta tarea, deberías tener:

- [ ] ✅ Asistente virtual respondiendo apropiadamente
- [ ] ✅ Sistema de recomendaciones personalizado
- [ ] ✅ Análisis de sentimientos en reseñas
- [ ] ✅ Generación de itinerarios inteligentes
- [ ] ✅ Múltiples providers de IA configurados
- [ ] ✅ Cache y optimización implementados
- [ ] ✅ Monitoreo de costos y performance
- [ ] ✅ Prompts específicos para Riohacha
- [ ] ✅ Manejo de contexto conversacional
- [ ] ✅ Endpoints de IA funcionando completamente

**Estado:** 🟡 PENDIENTE → ✅ COMPLETADO

**Siguiente tarea:** `09-testing-validacion.md`
