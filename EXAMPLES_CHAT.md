# Ejemplos de uso para el chat IA y WebSocket

## 1. Enviar mensaje a la IA (REST API)

### Endpoint
`POST /api/ai/chat`

### Request Body
```json
{
  "conversationId": "<ID de la conversación>",
  "message": "¿Qué lugares turísticos recomiendas en Madrid?"
}
```

### Ejemplo con `curl`
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "clwxyz1234567890",
    "message": "¿Qué lugares turísticos recomiendas en Madrid?"
  }' \
  http://localhost:3000/api/ai/chat
```

### Respuesta esperada
```json
{
  "id": "1717430000000",
  "sender": "assistant",
  "message": "Te recomiendo visitar el Museo del Prado, el Parque del Retiro y la Plaza Mayor...",
  "messageType": "text",
  "processingData": {
    "aiModel": "google/gemma-3n-e4b-it:free",
    "processingTime": 0,
    "confidence": 1,
    "tokens": 0
  },
  "metadata": {},
  "isRead": false,
  "isEdited": false,
  "editedAt": null,
  "timestamp": "2025-06-03T12:00:00.000Z"
}
```

---

## 2. Enviar y recibir mensajes en tiempo real (WebSocket)

### Conexión WebSocket

- URL: `ws://localhost:3000` (o el puerto configurado)
- Protocolo: JSON

### Ejemplo de mensaje para unirse a una conversación
```json
{
  "type": "join",
  "conversationId": "clwxyz1234567890",
  "userId": "clwxyzuser123"
}
```

### Ejemplo de mensaje para enviar texto
```json
{
  "type": "message",
  "conversationId": "clwxyz1234567890",
  "userId": "clwxyzuser123",
  "message": "¡Hola! ¿Qué actividades hay cerca?"
}
```

### Ejemplo de mensaje recibido (respuesta de IA o usuario)
```json
{
  "type": "message",
  "conversationId": "clwxyz1234567890",
  "sender": "assistant",
  "message": "Puedes visitar el Palacio Real o el Templo de Debod, ambos muy cerca.",
  "timestamp": "2025-06-03T12:01:00.000Z"
}
```

---

## 3. Ejemplo de integración frontend (React)

```tsx
import { useEffect, useRef, useState } from 'react'

export default function ChatExample() {
  const ws = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000')
    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({
        type: 'join',
        conversationId: 'clwxyz1234567890',
        userId: 'clwxyzuser123',
      }))
    }
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'message') {
        setMessages((msgs) => [...msgs, data])
      }
    }
    return () => ws.current?.close()
  }, [])

  const sendMessage = (msg: string) => {
    ws.current?.send(JSON.stringify({
      type: 'message',
      conversationId: 'clwxyz1234567890',
      userId: 'clwxyzuser123',
      message: msg,
    }))
  }

  return (
    <div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}><b>{m.sender}:</b> {m.message}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage('¿Qué museos hay abiertos hoy?')}>Enviar pregunta</button>
    </div>
  )
}
```

---

## 4. Notas
- El endpoint REST requiere autenticación si está configurada en Payload.
- El WebSocket puede requerir autenticación avanzada (JWT) según configuración.
- Cambia los IDs de ejemplo por los reales de tu base de datos.
- Consulta el README principal para más detalles de endpoints y seguridad.
