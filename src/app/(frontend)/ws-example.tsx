// Ejemplo de integración WebSocket en React/Next.js
import React, { useEffect, useRef, useState } from 'react'

interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  message: string
  messageType: string
  timestamp: string
}

interface ChatEvent {
  type: 'user_message' | 'assistant_message' | 'conversation_updated'
  payload: ChatMessage | { conversationId: string; [key: string]: unknown }
}

export default function WebSocketChatExample({
  userId,
  conversationId,
}: {
  userId: string
  conversationId: string
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new window.WebSocket(`ws://localhost:3000?userId=${userId}`)
    wsRef.current = ws

    ws.onmessage = (event) => {
      const data: ChatEvent = JSON.parse(event.data)
      if (data.type === 'user_message' || data.type === 'assistant_message') {
        setMessages((prev) => [...prev, data.payload as ChatMessage])
      }
    }
    ws.onclose = () => {
      console.log('WebSocket cerrado')
    }
    return () => {
      ws.close()
    }
  }, [userId])

  const sendMessage = () => {
    if (wsRef.current && input.trim()) {
      const msg: ChatEvent = {
        type: 'user_message',
        payload: {
          id: Date.now().toString(),
          sender: 'user',
          message: input,
          messageType: 'text',
          timestamp: new Date().toISOString(),
          conversationId,
        },
      }
      wsRef.current.send(JSON.stringify(msg))
      setInput('')
    }
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '2rem auto',
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <h3>Chat en tiempo real (WebSocket)</h3>
      <div style={{ minHeight: 200, marginBottom: 8, background: '#f9f9f9', padding: 8 }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <b>{msg.sender === 'user' ? 'Tú' : 'Asistente'}:</b> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Escribe un mensaje..."
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage} style={{ width: '18%', marginLeft: 8 }}>
        Enviar
      </button>
    </div>
  )
}
