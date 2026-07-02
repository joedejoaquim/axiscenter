'use server'

import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'

// ── Tipos ─────────────────────────────────────────────────

export interface AuthResult {
  error?: string
  needsConfirmation?: boolean
  /** Role do utilizador após login — usado pelo cliente para redirect */
  role?: string
  status?: string
}

// ── Helpers ───────────────────────────────────────────────

function mapAuthError(msg: string): string {
  const map: Record<string, string> = {
    'User already registered':              'Este e-mail já está registado.',
    'Email not confirmed':                  'Confirma o teu e-mail antes de entrar.',
    'Invalid login credentials':            'E-mail ou senha incorretos.',
    'Email rate limit exceeded':            'Demasiadas tentativas. Aguarda alguns minutos.',
    'Password should be at least 6 chars': 'A senha deve ter pelo menos 6 caracteres.',
    'signup_disabled':                      'Os registos estão temporariamente desativados.',
    'over_email_send_rate_limit':           'Demasiadas tentativas. Aguarda alguns minutos.',
  }
  for (const [key, value] of Object.entries(map)) {
    if (msg.toLowerCase().includes(key.toLowerCase())) return value
  }
  return 'Ocorreu um erro. Tenta novamente.'
}

// ── Criar perfil (fallback se trigger DB não existir) ─────

export async function ensureProfile(
  userId: string,
  name: string,
  role: string,
  serviceClient: Awaited<ReturnType<typeof createServiceClient>>
) {
  const { data: existing } = await serviceClient
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single()

  if (!existing) {
    const { error } = await serviceClient.from('profiles').insert({
      id: userId,
      name,
      role,
      plan: 'gratuito',
      status: role === 'aluno' ? 'ativo' : 'pendente',
      avatar_url: null,
      rating: 0,
      bio: null,
      phone: null,
    })
    if (error) throw new Error(error.message)
  }
}

// ── Obter perfil após login client-side ───────────────────
// Chamada pelo cliente depois de signInWithPassword ter corrido no browser
// e os cookies já estarem definidos.

export async function getProfileAfterLogin(): Promise<AuthResult> {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'Sessão não encontrada. Tenta fazer login novamente.' }
  }

  let { data: profile } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', user.id)
    .single()

  // Conta suspensa
  if (profile?.status === 'suspenso') {
    await supabase.auth.signOut()
    return { error: 'A tua conta foi suspensa. Contacta o suporte.' }
  }

  // Perfil inexistente — criar com service role
  if (!profile) {
    try {
      const service  = await createServiceClient()
      const meta     = user.user_metadata as { name?: string; role?: string } | undefined
      const userRole = meta?.role ?? 'aluno'
      const userName = meta?.name ?? user.email?.split('@')[0] ?? 'Utilizador'
      await ensureProfile(user.id, userName, userRole, service)
      profile = { role: userRole, status: 'ativo' }
    } catch {
      return { error: 'Perfil não encontrado. Contacta o suporte.' }
    }
  }

  return { role: profile.role, status: profile.status }
}

// ── Register action ───────────────────────────────────────
// Valida os dados e cria o perfil após o signUp ter corrido no cliente.
// NÃO chama supabase.auth.signUp aqui — isso é feito client-side para
// garantir que os cookies de sessão ficam gravados no browser.

export async function registerAction(formData: FormData): Promise<AuthResult> {
  const name  = (formData.get('name')  as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''
  const confirm  = (formData.get('confirm')  as string | null) ?? ''
  const role     = (formData.get('role')     as string | null) ?? 'aluno'

  // Validação server-side
  if (!name || name.length < 2)
    return { error: 'O nome deve ter pelo menos 2 caracteres.' }
  if (!email.includes('@'))
    return { error: 'E-mail inválido.' }
  if (password.length < 8)
    return { error: 'A senha deve ter pelo menos 8 caracteres.' }
  if (password !== confirm)
    return { error: 'As senhas não coincidem.' }
  if (!['aluno', 'professor-online', 'professor-movel'].includes(role))
    return { error: 'Tipo de conta inválido.' }

  // Tudo válido — devolve os dados ao cliente para fazer o signUp
  return { role }
}

// ── Criar perfil após signUp client-side ──────────────────
// Chamado pelo cliente depois de supabase.auth.signUp() ter corrido
// no browser e os cookies de sessão já estarem definidos.

export async function createProfileAfterSignUp(): Promise<AuthResult> {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { error: 'Sessão não encontrada após registo.' }
  }

  const meta     = user.user_metadata as { name?: string; role?: string } | undefined
  const userRole = meta?.role ?? 'aluno'
  const userName = meta?.name ?? user.email?.split('@')[0] ?? 'Utilizador'

  try {
    const service = await createServiceClient()
    await ensureProfile(user.id, userName, userRole, service)
  } catch (e) {
    // Log do erro real — o trigger DB pode já ter criado o perfil, não é fatal
    console.error('[createProfileAfterSignUp] ensureProfile falhou:', e)
  }

  return { role: userRole, status: 'ativo' }
}

// ── Logout action ─────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
