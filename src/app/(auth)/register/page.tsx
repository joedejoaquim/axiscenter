'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    if (password.length < 8) { setError('A senha deve ter pelo menos 8 caracteres.'); return }

    setLoading(true)

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: 'aluno' } },
    })

    if (authError) {
      setError(authError.message === 'User already registered' ? 'Este e-mail já está em uso.' : authError.message)
      setLoading(false)
      return
    }

    router.push('/aluno')
  }

  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">
      {/* Painel esquerdo */}
      <div className="hidden xl:flex xl:w-1/2 bg-slate-950 text-white p-12">
        <div className="flex flex-col justify-between w-full max-w-lg">
          <div>
            <span className="inline-flex rounded-full bg-[#F97316]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#F97316]">
              Axis Education Group
            </span>
            <h1 className="mt-8 text-5xl font-bold leading-tight">O eixo da sua evolução começa aqui.</h1>
            <p className="mt-6 text-slate-300 text-lg leading-8">
              Conectando conhecimento, tecnologia e o seu crescimento profissional em uma única plataforma.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[32px] bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">15k+</p>
              <p className="mt-3 text-2xl font-semibold">Alunos ativos evoluindo diariamente</p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-200">Acesso a cursos, agendamentos e professores móveis em um único sistema.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="w-full xl:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-xl bg-white rounded-[40px] p-8 shadow-2xl">
          <div className="mb-8">
            <span className="inline-flex rounded-full bg-[#F97316]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#F97316]">Identificação</span>
            <h1 className="mt-5 text-3xl font-bold text-slate-950">Crie sua conta gratuita</h1>
            <p className="mt-2 text-slate-600">Junte-se à maior rede de educação conectada.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Nome completo</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required
                placeholder="Seu nome aqui"
                className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="email@exemplo.com"
                className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1.5">Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Confirmar Senha</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
                />
              </div>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              Próximo passo →
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Já possui uma conta?{' '}
            <Link href="/login" className="font-semibold text-[#0D2B5E] hover:text-[#F97316]">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
