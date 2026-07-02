import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Verificar se o perfil existe — se não existir, criar agora
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, status')
          .eq('id', user.id)
          .single()

        if (!profile) {
          // Criar perfil com service role key
          try {
            const service = await createServiceClient()
            const meta = user.user_metadata as { name?: string; role?: string } | undefined
            const role  = meta?.role  ?? 'aluno'
            const name  = meta?.name  ?? user.email?.split('@')[0] ?? 'Utilizador'

            await service.from('profiles').insert({
              id: user.id,
              name,
              role,
              plan: 'gratuito',
              status: role === 'aluno' ? 'ativo' : 'pendente',
              avatar_url: null,
              rating: 0,
              bio: null,
              phone: null,
            })

            const destination = role === 'aluno' ? '/aluno' : '/pendente'
            return NextResponse.redirect(new URL(destination, origin))
          } catch {
            return NextResponse.redirect(new URL('/login?erro=auth_callback', origin))
          }
        }

        // Perfil já existe — redirecionar
        if (profile.status === 'pendente') {
          return NextResponse.redirect(new URL('/pendente', origin))
        }

        return NextResponse.redirect(new URL(`/${profile.role}`, origin))
      }
    }
  }

  // Fallback: redirecionar com next param ou para login com erro
  const fallback = next !== '/' ? next : '/login?erro=auth_callback'
  return NextResponse.redirect(new URL(fallback, origin))
}
