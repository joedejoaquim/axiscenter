import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { lat, lng } = await request.json()
  if (lat == null || lng == null) return NextResponse.json({ error: 'lat e lng obrigatórios' }, { status: 400 })

  await supabase.from('professores_moveis').upsert(
    { user_id: user.id, lat, lng, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  )

  return NextResponse.json({ success: true })
}
