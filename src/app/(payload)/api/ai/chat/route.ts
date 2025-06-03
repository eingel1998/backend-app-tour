import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'
import fetch from 'node-fetch'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODEL = 'google/gemma-3n-e4b-it:free'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// POST: Enviar mensaje al modelo de IA y recibir respuesta contextual
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { conversationId, message } = body
  if (!conversationId || !message) {
    return NextResponse.json({ error: 'conversationId y message son requeridos' }, { status: 400 })
  }
  const conversation = await payload.findByID({ collection: 'conversations', id: conversationId })
  if (!conversation) {
    return NextResponse.json({ error: 'Conversación no encontrada' }, { status: 404 })
  }

  // Construir historial de mensajes para el modelo
  const messages = [
    ...(
      (conversation.messages || []) as Array<{ sender: 'user' | 'assistant'; message: string }>
    ).map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.message,
    })),
    { role: 'user', content: message },
  ]

  // Llamada real a OpenRouter
  const aiRes = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      // Puedes agregar referer y X-Title si lo deseas
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages,
    }),
  })
  if (!aiRes.ok) {
    const error = await aiRes.text()
    return NextResponse.json({ error: 'Error en OpenRouter', detail: error }, { status: 500 })
  }
  const aiData = (await aiRes.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const aiContent = aiData.choices?.[0]?.message?.content || 'Sin respuesta de IA.'

  // Construir mensaje IA para guardar
  const aiResponse = {
    id: Date.now().toString(),
    sender: 'assistant',
    message: aiContent,
    messageType: 'text',
    processingData: { aiModel: OPENROUTER_MODEL, processingTime: 0, confidence: 1, tokens: 0 },
    metadata: {},
    isRead: false,
    isEdited: false,
    editedAt: null,
    timestamp: new Date().toISOString(),
  } satisfies {
    id: string
    sender: 'assistant'
    message: string
    messageType: 'text'
    processingData: { aiModel: string; processingTime: number; confidence: number; tokens: number }
    metadata: object
    isRead: boolean
    isEdited: boolean
    editedAt: string | null
    timestamp: string
  }
  const userMessage = {
    id: Date.now().toString() + '-user',
    sender: 'user',
    message,
    messageType: 'text',
    timestamp: new Date().toISOString(),
  } satisfies {
    id: string
    sender: 'user'
    message: string
    messageType: 'text'
    timestamp: string
  }
  const newMessages = [...(conversation.messages || []), userMessage, aiResponse]
  await payload.update({
    collection: 'conversations',
    id: conversationId,
    data: {
      messages: newMessages,
      lastInteraction: new Date().toISOString(),
      statistics: {
        ...conversation.statistics,
        totalMessages: (conversation.statistics?.totalMessages || 0) + 2,
      },
    },
  })
  return NextResponse.json(aiResponse, { status: 201 })
}
