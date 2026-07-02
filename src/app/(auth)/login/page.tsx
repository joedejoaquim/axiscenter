'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getProfileAfterLogin } from '../actions'

// ── Mapeamento de erros vindos da URL (middleware) ─────────
const URL_ERROR_MSGS: Record<string, string> = {
  conta_suspensa: 'A tua conta foi suspensa. Contacta o suporte.',
  auth_callback:  'Erro de autenticação. Tenta novamente.',
}

// ── Mapeamento de erros do Supabase client ─────────────────
function mapClientError(msg: string): string {
  if (msg.includes('Invalid login credentials'))  return 'E-mail ou senha incorretos.'
  if (msg.includes('Email not confirmed'))         return 'Confirma o teu e-mail antes de entrar.'
  if (msg.includes('rate limit'))                  return 'Demasiadas tentativas. Aguarda alguns minutos.'
  return 'Ocorreu um erro. Tenta novamente.'
}

// ── Componente interno (usa useSearchParams) ──────────────
function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const urlErrKey    = searchParams.get('erro') ?? ''

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [error,    setError]    = useState(URL_ERROR_MSGS[urlErrKey] ?? '')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Preenche todos os campos.')
      return
    }

    setLoading(true)

    try {
      // 1. SignIn no browser — grava os cookies de sessão no cliente
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (signInError) {
        setError(mapClientError(signInError.message))
        return
      }

      // 2. Ler perfil no servidor (a sessão já está nos cookies após o signIn)
      const result = await getProfileAfterLogin()

      if (result.error) {
        setError(result.error)
        await supabase.auth.signOut()
        return
      }

      // 3. Redirecionar conforme estado da conta
      if (result.status === 'pendente') {
        router.push('/pendente')
        return
      }

      router.push(`/${result.role}`)
      router.refresh()

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-xl">

      <div className="text-center mb-7">
        <h2 className="text-2xl font-black text-slate-950">Entrar na plataforma</h2>
        <p className="mt-1.5 text-sm text-slate-500">Insere as tuas credenciais para continuar.</p>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
        >
          <span className="mt-0.5 shrink-0" aria-hidden>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        {/* E-mail */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            E-mail
          </label>
          <input
            id="email" type="email" autoComplete="email" required
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="nome@exemplo.com" disabled={loading}
            className="w-full h-11 rounded-2xl border border-slate-200 px-4 text-sm text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors disabled:opacity-60"
          />
        </div>

        {/* Senha */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Senha</label>
            <Link href="/forgot-password" className="text-xs text-[#0D2B5E] font-medium hover:underline" tabIndex={-1}>
              Esqueceste a senha?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password" type={showPwd ? 'text' : 'password'}
              autoComplete="current-password" required
              value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" disabled={loading}
              className="w-full h-11 rounded-2xl border border-slate-200 px-4 pr-11 text-sm text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors disabled:opacity-60"
            />
            <button type="button" onClick={() => setShowPwd(v => !v)}
              aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Botão */}
        <button
          type="submit" disabled={loading}
          className="w-full mt-1 h-12 rounded-2xl bg-[#F97316] text-sm font-bold text-white hover:bg-[#EA6C0A] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (<><Loader2 size={16} className="animate-spin" />A entrar…</>) : 'Entrar'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Não tens conta?{' '}
        <Link href="/register" className="font-semibold text-[#0D2B5E] hover:text-[#F97316] transition-colors">
          Cadastra-te grátis
        </Link>
      </p>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────
export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">

      {/* Painel esquerdo decorativo */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D2B5E] text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={40} height={40} />
          <div>
            <p className="text-sm font-black tracking-[0.15em]">AXIS CENTER</p>
            <p className="text-[10px] text-[#F97316] tracking-[0.1em]">Escola Online</p>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-black leading-tight">Bem-vindo de volta</h1>
          <p className="mt-4 text-white/65 text-base leading-relaxed">
            Insere as tuas credenciais para aceder à tua conta e continuar a tua jornada de aprendizado.
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/8 p-6">
            <span className="inline-flex rounded-full bg-[#F97316]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] mb-4 block w-fit">
              Axis Education Group
            </span>
            <p className="text-sm text-white/65 leading-relaxed">
              Acesso a todas as tuas aulas, agenda e suporte com apenas um login.
            </p>
          </div>
          <blockquote className="border-l-4 border-[#F97316] pl-5 text-white/55 italic text-sm leading-relaxed">
            &ldquo;A educação não é o enchimento de um balde, mas o acendimento de uma chama.&rdquo;
            <footer className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30 not-italic">
              — William Butler Yeats
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Formulário com Suspense (necessário por useSearchParams) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <Suspense
          fallback={
            <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-xl flex items-center justify-center h-64">
              <Loader2 size={24} className="animate-spin text-slate-300" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
