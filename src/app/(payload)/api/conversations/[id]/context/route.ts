import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

// GET: Obtener contexto de IA de la conversación
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const conversation = await payload.findByID({ collection: 'conversations', id: params.id })
  if (!conversation) {
    return NextResponse.json({ error: 'Conversación no encontrada' }, { status: 404 })
  }
  return NextResponse.json(conversation.userContext || {})
}

// PATCH: Actualizar contexto de IA de la conversación
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  const conversation = await payload.findByID({ collection: 'conversations', id: params.id })
  if (!conversation) {
    return NextResponse.json({ error: 'Conversación no encontrada' }, { status: 404 })
  }
  const updated = await payload.update({
    collection: 'conversations',
    id: params.id,
    data: { userContext: body },
  })
  return NextResponse.json(updated.userContext)
}
