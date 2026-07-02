import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Route Handler de registo — usa Admin API para criar utilizador
// e depois cria o perfil directamente, sem depender do trigger DB.

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role = 'aluno' } = await request.json()

    // Validação básica
    if (!name?.trim() || name.trim().length < 2)
      return NextResponse.json({ error: 'O nome deve ter pelo menos 2 caracteres.' }, { status: 400 })
    if (!email?.includes('@'))
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    if (!password || password.length < 8)
      return NextResponse.json({ error: 'A senha deve ter pelo menos 8 caracteres.' }, { status: 400 })
    if (!['aluno', 'professor-online', 'professor-movel'].includes(role))
      return NextResponse.json({ error: 'Tipo de conta inválido.' }, { status: 400 })

    const service = await createServiceClient()

    // 1. Criar utilizador via Admin API (bypassa o trigger problemático)
    const { data: newUser, error: createError } = await service.auth.admin.createUser({
      email: email.trim(),
      password,
      user_metadata: { name: name.trim(), role },
      email_confirm: true, // confirmar e-mail automaticamente em dev
    })

    if (createError) {
      const msg = createError.message
      if (msg.includes('already been registered') || msg.includes('already registered'))
        return NextResponse.json({ error: 'Este e-mail já está registado.' }, { status: 409 })
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    if (!newUser.user)
      return NextResponse.json({ error: 'Erro ao criar conta.' }, { status: 500 })

    // 2. Criar perfil manualmente (não depende do trigger)
    const { error: profileError } = await service.from('profiles').upsert({
      id:         newUser.user.id,
      name:       name.trim(),
      role,
      plan:       'gratuito',
      status:     role === 'aluno' ? 'ativo' : 'pendente',
      avatar_url: null,
      rating:     0,
      bio:        null,
      phone:      null,
    }, { onConflict: 'id' })

    if (profileError) {
      // Perfil não foi criado — limpar utilizador para não deixar estado inconsistente
      await service.auth.admin.deleteUser(newUser.user.id)
      console.error('[register] profile insert failed:', profileError)
      return NextResponse.json({ error: 'Erro ao criar perfil. Tenta novamente.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, userId: newUser.user.id })

  } catch (e) {
    console.error('[register route] unexpected error:', e)
    return NextResponse.json({ error: 'Erro interno. Tenta novamente.' }, { status: 500 })
  }
}
