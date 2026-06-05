import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ROLE_ROUTES: Record<string, string> = {
  '/aluno':            'aluno',
  '/professor-online': 'professor-online',
  '/professor-movel':  'professor-movel',
  '/admin':            'admin',
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Rotas de auth: redireciona se já autenticado
  if (path === '/login' || path === '/register') {
    if (user) {
      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', user.id).single()
      return NextResponse.redirect(new URL(`/${profile?.role ?? ''}`, request.url))
    }
    return response
  }

  // Rotas protegidas
  const protectedPrefix = Object.keys(ROLE_ROUTES).find(r => path.startsWith(r))
  if (protectedPrefix) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: profile } = await supabase
      .from('profiles').select('role, status').eq('id', user.id).single()

    if (profile?.status === 'suspenso') {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/login?erro=conta_suspensa', request.url))
    }

    if (profile?.status === 'pendente' && path !== '/pendente') {
      return NextResponse.redirect(new URL('/pendente', request.url))
    }

    if (profile?.role !== ROLE_ROUTES[protectedPrefix]) {
      return NextResponse.redirect(new URL(`/${profile?.role}`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/aluno/:path*',
    '/professor-online/:path*',
    '/professor-movel/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
}
