import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'
import { v4 as uuidv4 } from 'uuid'

// GET: Listar mensajes de la conversación
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const conversation = await payload.findByID({ collection: 'conversations', id: params.id })
  if (!conversation) {
    return NextResponse.json({ error: 'Conversación no encontrada' }, { status: 404 })
  }
  return NextResponse.json(conversation.messages || [])
}

// POST: Agregar mensaje a la conversación
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  if (!body.message || !body.sender) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }
  const conversation = await payload.findByID({ collection: 'conversations', id: params.id })
  if (!conversation) {
    return NextResponse.json({ error: 'Conversación no encontrada' }, { status: 404 })
  }
  const newMessage = {
    id: uuidv4(),
    sender: body.sender as 'user' | 'assistant',
    message: body.message,
    messageType: body.messageType || 'text',
    processingData: body.processingData || {},
    metadata: body.metadata || {},
    isRead: false,
    isEdited: false,
    editedAt: null,
    timestamp: new Date().toISOString(),
  }
  const updatedMessages = [...(conversation.messages || []), newMessage]
  await payload.update({
    collection: 'conversations',
    id: params.id,
    data: {
      messages: updatedMessages,
      lastInteraction: new Date().toISOString(),
      statistics: {
        ...conversation.statistics,
        totalMessages: (conversation.statistics?.totalMessages || 0) + 1,
      },
    },
  })
  return NextResponse.json(newMessage, { status: 201 })
}
