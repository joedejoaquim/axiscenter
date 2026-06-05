'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError || !data.user) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles').select('role, status').eq('id', data.user.id).single()

    if (profile?.status === 'suspenso') {
      await supabase.auth.signOut()
      setError('A sua conta foi suspensa. Contacte o suporte.')
      setLoading(false)
      return
    }

    if (profile?.status === 'pendente') {
      router.push('/pendente')
      return
    }

    router.push(`/${profile?.role}`)
  }

  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">
      {/* Painel esquerdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-[#122859] to-[#0B2456] text-white p-12">
        <div className="flex flex-col justify-between w-full max-w-xl">
          <div>
            <p className="text-4xl font-bold">Bem-vindo de volta</p>
            <p className="mt-6 text-slate-300 text-lg">Insira suas credenciais para acessar sua conta e continuar a sua jornada de aprendizado.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <span className="inline-flex rounded-full bg-[#F97316]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#F97316]">
              Axis Education Group
            </span>
            <div className="mt-6 rounded-[28px] bg-slate-900/70 p-4">
              <p className="text-sm text-slate-300">Acesso a todas as suas aulas, agenda e suporte com apenas um login.</p>
            </div>
          </div>
          <blockquote className="border-l-4 border-[#F97316] pl-5 text-slate-300 italic">
            "A educação não é o enchimento de um balde, mas o acendimento de uma chama."
            <footer className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-500 not-italic">— William Butler Yeats</footer>
          </blockquote>
        </div>
      </div>

      {/* Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-[40px] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-950">Bem-vindo de volta</h1>
            <p className="mt-2 text-slate-500">Insira suas credenciais para acessar sua conta.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">E-mail</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="nome@exemplo.com"
                className="w-full h-12 rounded-3xl border border-slate-200 px-4 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Senha</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full h-12 rounded-3xl border border-slate-200 px-4 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
              />
            </div>
            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-[#0D2B5E] font-medium hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Button type="submit" size="lg" loading={loading} className="w-full">
              Entrar
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-semibold text-[#0D2B5E] hover:text-[#F97316]">
              Cadastre-se grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
