import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { gerarToken } from '@/lib/daily'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { salaId, isOwner } = await request.json()
  if (!salaId) return NextResponse.json({ error: 'salaId obrigatório' }, { status: 400 })

  const { data: profile } = await supabase.from('profiles').select('name').eq('id', user.id).single()

  const token = await gerarToken(salaId, profile?.name ?? 'Utilizador', !!isOwner)
  return NextResponse.json(token)
}
