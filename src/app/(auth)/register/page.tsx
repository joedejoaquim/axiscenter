'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { registerAction, createProfileAfterSignUp } from '../actions'

// ── Mapeamento de erros do Supabase client ─────────────────
function mapSignUpError(msg: string): string {
  if (msg.includes('User already registered') || msg.includes('already been registered'))
    return 'Este e-mail já está registado.'
  if (msg.includes('rate limit') || msg.includes('over_email_send_rate_limit'))
    return 'Demasiadas tentativas. Aguarda alguns minutos.'
  if (msg.includes('invalid') && msg.includes('email'))
    return 'E-mail inválido.'
  if (msg.includes('Password'))
    return 'A senha deve ter pelo menos 6 caracteres.'
  // Mostrar o erro real em vez de mensagem genérica
  return msg
}

export default function RegisterPage() {
  const router = useRouter()

  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [showPwd,  setShowPwd]  = useState(false)
  const [showCfm,  setShowCfm]  = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const form = e.currentTarget
      const fd   = new FormData(form)

      const name     = (fd.get('name')     as string).trim()
      const email    = (fd.get('email')    as string).trim()
      const password = fd.get('password') as string
      const confirm  = fd.get('confirm')  as string

      // Validação client-side rápida
      if (password !== confirm) {
        setError('As senhas não coincidem.')
        return
      }

      // 1. Criar utilizador via Route Handler (Admin API — bypassa trigger DB)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'aluno' }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Erro ao criar conta. Tenta novamente.')
        return
      }

      // 2. Fazer login automático com as credenciais recém criadas
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

      if (signInError) {
        // Conta criada mas login falhou — redirecionar para login manual
        router.push('/login?msg=conta_criada')
        return
      }

      // 3. Redirecionar para o dashboard
      router.push('/aluno')
      router.refresh()

    } finally {
      setLoading(false)
    }
  }

  // ── Ecrã de confirmação ───────────────────────────────
  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FC] p-6">
        <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-950">Confirma o teu e-mail</h1>
          <p className="mt-3 text-slate-500 leading-relaxed">
            Enviámos um link de confirmação para o teu e-mail. Abre-o para activar a tua conta e entrar na plataforma.
          </p>
          <p className="mt-2 text-xs text-slate-400">Não encontras? Verifica a pasta de spam.</p>
          <Link
            href="/login"
            className="mt-8 inline-flex w-full justify-center rounded-full bg-[#0D2B5E] px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Ir para o Login
          </Link>
        </div>
      </div>
    )
  }

  // ── Formulário principal ──────────────────────────────
  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">

      {/* Painel esquerdo */}
      <div className="hidden xl:flex xl:w-1/2 bg-[#0D2B5E] text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={40} height={40} />
          <div>
            <p className="text-sm font-black tracking-[0.15em]">AXIS CENTER</p>
            <p className="text-[10px] text-[#F97316] tracking-[0.1em]">Escola Online</p>
          </div>
        </div>
        <div>
          <span className="inline-flex rounded-full bg-[#F97316]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
            Comece hoje
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight">
            O eixo da sua evolução começa aqui.
          </h1>
          <p className="mt-4 text-white/65 text-base leading-relaxed">
            Conectando conhecimento, tecnologia e o seu crescimento em uma única plataforma.
          </p>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl bg-white/8 border border-white/10 p-5">
            <p className="text-3xl font-black text-[#F97316]">+1.500</p>
            <p className="text-sm text-white/60 mt-1">Alunos activos evoluindo diariamente</p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/8 p-5">
            <p className="text-sm text-white/65 leading-relaxed">
              Acesso a cursos, simulados, aulas ao vivo e suporte completo em um único sistema.
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="w-full xl:w-1/2 flex items-center justify-center p-6 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-lg bg-white rounded-[32px] p-8 shadow-xl">

          <div className="mb-6">
            <span className="inline-flex rounded-full bg-[#F97316]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316]">
              Identificação
            </span>
            <h2 className="mt-4 text-2xl font-black text-slate-950">Crie a sua conta gratuita</h2>
            <p className="mt-1 text-sm text-slate-500">Junte-se à maior rede de educação conectada.</p>
          </div>

          {error && (
            <div role="alert" className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              <span className="mt-0.5 shrink-0" aria-hidden>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Nome completo
              </label>
              <input
                id="name" name="name" type="text" required autoComplete="name"
                placeholder="O teu nome completo" disabled={loading}
                className="w-full h-11 rounded-2xl border border-slate-200 px-4 text-sm text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors disabled:opacity-60"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                E-mail
              </label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                placeholder="email@exemplo.com" disabled={loading}
                className="w-full h-11 rounded-2xl border border-slate-200 px-4 text-sm text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors disabled:opacity-60"
              />
            </div>

            {/* Senhas */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Senha</label>
                <div className="relative">
                  <input
                    id="password" name="password" type={showPwd ? 'text' : 'password'}
                    required autoComplete="new-password" placeholder="Mínimo 8 caracteres" disabled={loading}
                    className="w-full h-11 rounded-2xl border border-slate-200 px-4 pr-10 text-sm text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors disabled:opacity-60"
                  />
                  <button type="button" onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}>
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 mb-1.5">Confirmar Senha</label>
                <div className="relative">
                  <input
                    id="confirm" name="confirm" type={showCfm ? 'text' : 'password'}
                    required autoComplete="new-password" placeholder="Repete a senha" disabled={loading}
                    className="w-full h-11 rounded-2xl border border-slate-200 px-4 pr-10 text-sm text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors disabled:opacity-60"
                  />
                  <button type="button" onClick={() => setShowCfm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showCfm ? 'Ocultar confirmação' : 'Mostrar confirmação'}>
                    {showCfm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Termos */}
            <div className="flex items-start gap-2.5">
              <input id="terms" type="checkbox" required disabled={loading}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#F97316] focus:ring-[#F97316] cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 cursor-pointer leading-relaxed">
                Aceito os{' '}
                <a href="#" className="text-[#0D2B5E] font-semibold hover:underline">Termos de Uso</a>
                {' '}e a{' '}
                <a href="#" className="text-[#0D2B5E] font-semibold hover:underline">Política de Privacidade</a>
              </label>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full mt-1 h-12 rounded-2xl bg-[#F97316] text-sm font-bold text-white hover:bg-[#EA6C0A] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" />A criar conta…</>
              ) : (
                'Criar Conta Grátis →'
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Já tens conta?{' '}
            <Link href="/login" className="font-semibold text-[#0D2B5E] hover:text-[#F97316] transition-colors">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
