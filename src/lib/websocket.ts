import { WebSocketServer, WebSocket } from 'ws'
import type { Server } from 'http'

interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  message: string
  messageType: string
  timestamp: string
  // Puedes extender aquí con los campos necesarios
}

interface ChatEvent {
  type: 'user_message' | 'assistant_message' | 'conversation_updated'
  payload: ChatMessage | { conversationId: string; [key: string]: unknown }
}

const clients = new Map<string, WebSocket>()

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url || '', 'http://localhost')
    const userId = url.searchParams.get('userId') || ''
    if (userId) clients.set(userId, ws)

    ws.on('message', (data) => {
      try {
        const event = JSON.parse(data.toString()) as ChatEvent
        // Extraer conversationId de forma segura
        const conversationId =
          typeof event.payload === 'object' &&
          event.payload !== null &&
          'conversationId' in event.payload
            ? (event.payload as { conversationId: string }).conversationId
            : undefined
        if (event.type === 'user_message' && conversationId) {
          broadcastToConversation(conversationId, {
            type: 'user_message',
            payload: event.payload,
          })
        }
      } catch (_ignore) {
        ws.send(JSON.stringify({ type: 'error', payload: { message: 'Formato inválido' } }))
      }
    })

    ws.on('close', () => {
      if (userId) clients.delete(userId)
    })
  })
}

export function broadcastToConversation(conversationId: string, event: ChatEvent) {
  // Aquí deberías obtener los userId participantes de la conversación y emitirles el evento
  for (const ws of clients.values()) {
    ws.send(JSON.stringify(event))
  }
}

// Para usarlo en tu custom server:
// import { setupWebSocket } from '@/lib/websocket'
// setupWebSocket(server)
