'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faShieldAlt, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type MetodoPagamento = 'multicaixa' | 'transferencia' | 'cartao' | 'referencia'

const METODOS = [
  {
    id: 'multicaixa' as MetodoPagamento,
    nome: 'Multicaixa Express',
    desc: 'Pague de forma rápida e segura pelo Multicaixa Express.',
    recomendado: true,
    icon: '🏧',
  },
  {
    id: 'transferencia' as MetodoPagamento,
    nome: 'Transferência Bancária',
    desc: 'Faça a transferência e envie o comprovativo.',
    recomendado: false,
    icon: '🏦',
  },
  {
    id: 'cartao' as MetodoPagamento,
    nome: 'Cartão Bancário',
    desc: 'Pague com seu cartão de crédito ou débito.',
    recomendado: false,
    icon: '💳',
    badges: ['VISA', 'MC'],
  },
  {
    id: 'referencia' as MetodoPagamento,
    nome: 'Referência de Pagamento',
    desc: 'Gere uma referência e pague numa agência ou ATM.',
    recomendado: false,
    icon: '🧾',
  },
]

export default function CheckoutPage() {
  const [metodo, setMetodo] = useState<MetodoPagamento>('multicaixa')
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' })
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simula processamento
    await new Promise(r => setTimeout(r, 1500))
    setSucesso(true)
    setLoading(false)
  }

  if (sucesso) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex flex-col">
        {/* Topbar */}
        <div className="bg-[#0D2B5E] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/assets/logoaxis.png" alt="Axis Center" width={28} height={28} />
            <div className="leading-none">
              <p className="text-xs font-black text-white tracking-widest">AXIS</p>
              <p className="text-[9px] font-bold text-[#FF7A00] tracking-widest uppercase">Center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-xs">Precisa de ajuda?</span>
            <button className="rounded-lg border border-white/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
              Fale Connosco
            </button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 mx-auto max-w-md w-full px-4 py-8 space-y-6">

          {/* Confetti + check */}
          <div className="relative flex flex-col items-center py-8">
            {/* Confetti decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-2xl leading-none">
              {['🎊','🎉','🎈','🟧','🟦','🟩','🟥','🎊','🎉','🎈'].map((e, i) => (
                <span key={i} className="absolute" style={{
                  top: `${10 + (i * 13) % 60}%`,
                  left: `${5 + (i * 19) % 90}%`,
                  opacity: 0.7,
                  fontSize: '14px',
                }}>{e}</span>
              ))}
            </div>
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-xl shadow-green-500/30">
              <FontAwesomeIcon icon={faCheckCircle} className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Título */}
          <div className="text-center -mt-2">
            <h1 className="text-2xl font-black text-[#0D2B5E]">Pagamento confirmado!</h1>
            <p className="text-slate-500 text-sm mt-1">Sua conta foi criada com sucesso.</p>
            <p className="text-[#0D2B5E] font-bold text-sm mt-0.5">Bem-vindo à Axis Center! 🎉</p>
          </div>

          {/* Dados de acesso */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <h2 className="font-black text-[#0D2B5E] text-sm text-center">Seus dados de acesso</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { label: 'E-mail', value: form.email || 'joaomanuel@email.com' },
                { label: 'Senha', value: '••••••••••' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-xs text-slate-400 w-14 shrink-0">{label}</span>
                  <span className="text-sm text-slate-700 font-medium flex-1">{value}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(value)}
                    className="text-slate-400 hover:text-[#FF7A00] transition-colors ml-2"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="mx-4 mb-4 mt-1 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-2.5">
              <span className="text-blue-400 text-sm mt-0.5">ℹ️</span>
              <p className="text-xs text-blue-600 leading-relaxed">
                Enviamos os dados de acesso para o seu e-mail. Verifique também sua caixa de spam.
              </p>
            </div>
          </div>

          {/* 3 passos */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { icon: '📖', title: 'Acesso Liberado', desc: 'Acesse todos os cursos imediatamente.' },
              { icon: '▶️', title: 'Comece a Estudar', desc: 'Assista às aulas e faça exercícios.' },
              { icon: '🏆', title: 'Alcance seus Objetivos', desc: 'Conteúdo de qualidade para o seu sucesso.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{icon}</span>
                <p className="text-[11px] font-black text-[#0D2B5E] leading-tight">{title}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
              </div>
            ))}
          </div>

          {/* Botões */}
          <div className="space-y-3 pt-2">
            <Link
              href="/aluno"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#FF7A00] px-6 py-4 text-sm font-black text-white hover:bg-[#E56E00] transition-colors shadow-lg"
            >
              Entrar na Plataforma
              <span>→</span>
            </Link>
            <Link
              href="/aluno/cursos"
              className="w-full flex items-center justify-center text-sm font-semibold text-[#0D2B5E] hover:underline"
            >
              Ir para meus cursos
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#0D2B5E] px-5 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/assets/logoaxis.png" alt="Axis Center" width={36} height={36} />
            <div>
              <p className="text-xs font-black text-white tracking-widest">AXIS CENTER</p>
              <p className="text-[10px] text-white/50 mt-0.5">O eixo da sua evolução continua agora.</p>
            </div>
          </div>
          <span className="text-4xl">🎓</span>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      {/* Topbar */}
      <div className="bg-[#0D2B5E] px-4 py-3 flex items-center justify-between max-w-full">
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
          <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
          Voltar para os planos
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={28} height={28} />
          <div className="leading-none">
            <p className="text-xs font-black text-white tracking-widest">AXIS</p>
            <p className="text-[9px] font-bold text-[#FF7A00] tracking-widest uppercase">Center</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Ambiente Seguro
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-8 space-y-5">
        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#0D2B5E]">Finalize sua assinatura</h1>
          <p className="text-slate-500 text-sm mt-1">Você está a um passo de transformar o seu futuro.</p>
        </div>

        {/* Produto */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-[#0D2B5E] flex items-center justify-center text-2xl">
            🧮
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-[#0D2B5E] text-base">Matemática Completa</p>
            <p className="text-xs text-slate-500 mt-0.5">Acesso a todos os cursos de Matemática<br />(Ensino Básico, Médio, Superior e Concursos)</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-black text-[#0D2B5E] text-lg">15.000 Kz</p>
            <p className="text-xs text-slate-400">por 12 meses</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dados do aluno */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="font-black text-[#0D2B5E] text-base">Dados do Aluno</h2>
            {[
              { label: 'Nome Completo', key: 'nome', type: 'text', placeholder: 'João Manuel' },
              { label: 'E-mail', key: 'email', type: 'email', placeholder: 'joaomanuel@email.com' },
              { label: 'Telefone / WhatsApp', key: 'telefone', type: 'tel', placeholder: '+244 912 345 678' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-slate-500 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#FF7A00] focus:outline-none focus:ring-1 focus:ring-[#FF7A00] transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Método de pagamento */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h2 className="font-black text-[#0D2B5E] text-base">Escolha a forma de pagamento</h2>
            {METODOS.map(m => (
              <label
                key={m.id}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                  metodo === m.id ? 'border-[#FF7A00] bg-[#FF7A00]/5' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="metodo"
                  value={m.id}
                  checked={metodo === m.id}
                  onChange={() => setMetodo(m.id)}
                  className="accent-[#FF7A00] h-4 w-4 shrink-0"
                />
                <span className="text-xl shrink-0">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0D2B5E]">{m.nome}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{m.desc}</p>
                </div>
                {m.recomendado && (
                  <span className="text-xs font-bold text-[#FF7A00] shrink-0">Recomendado</span>
                )}
                {m.badges && (
                  <div className="flex gap-1 shrink-0">
                    <span className="text-[10px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span>
                    <span className="text-[10px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded">MC</span>
                  </div>
                )}
              </label>
            ))}
          </div>

          {/* Resumo */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h2 className="font-black text-[#0D2B5E] text-base">Resumo do Pedido</h2>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Plano Matemática Completa (12 meses)</span>
              <span>15.000 Kz</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Desconto</span>
              <span>0 Kz</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="font-black text-[#0D2B5E] text-base">Total</span>
              <span className="font-black text-[#FF7A00] text-xl">15.000 Kz</span>
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-full bg-[#FF7A00] px-6 py-4 text-sm font-black text-white hover:bg-[#E56E00] transition-colors shadow-lg disabled:opacity-70"
          >
            <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
            {loading ? 'A processar...' : 'Confirmar Pagamento'}
          </button>

          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <FontAwesomeIcon icon={faLock} className="h-3 w-3" />
            Seus dados estão protegidos com criptografia de ponta.
          </p>

          {/* Selos */}
          <div className="flex justify-center gap-8 pt-2">
            {[
              { icon: faShieldAlt, label: 'Pagamento', sub: '100% Seguro' },
              { icon: faLock, label: 'Ambiente Protegido', sub: 'SSL' },
              { icon: faCheckCircle, label: 'Privacidade', sub: 'Garantida' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <FontAwesomeIcon icon={icon} className="h-6 w-6 text-green-500" />
                <p className="text-[10px] font-bold text-slate-600">{label}</p>
                <p className="text-[9px] text-slate-400">{sub}</p>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
