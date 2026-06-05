import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const formData = await request.formData()
  const id = formData.get('id') as string

  await supabase.from('agendamentos')
    .update({ status: 'recusado', updated_at: new Date().toISOString() })
    .eq('id', id).eq('professor_id', user.id)

  return NextResponse.redirect(new URL('/professor-movel', request.url))
}
