'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, BarChart2, CheckCircle, Flame, Crown, MoreHorizontal, Play, Clock } from 'lucide-react'
import { FadeIn } from '@/components/landing/ui/FadeIn'
import { RightPanel } from '@/components/dashboard/RightPanel'

// ── Types ─────────────────────────────────────────────────
interface Aula {
  id: string
  titulo: string
  materia?: string | null
  duracao_min?: number | null
}

interface Props {
  userName: string
  isPremium: boolean
  aulasRecentes: Aula[]
  exercicios: Aula[]
}

// ── Stat card data ────────────────────────────────────────
const STAT_CARDS = [
  {
    icon: <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100"><BookOpen size={18} className="text-blue-600" /></div>,
    label: 'Cursos em Andamento',
    value: '3',
    sub: <Link href="/aluno/cursos" className="flex items-center gap-1 text-[11px] text-[#1E5AA8] font-medium hover:underline mt-2">Ver cursos <ArrowRight size={10} /></Link>,
    accent: 'border-blue-100',
  },
  {
    icon: <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100"><BarChart2 size={18} className="text-[#F97316]" /></div>,
    label: 'Progresso Geral',
    value: '65%',
    sub: (
      <div className="mt-2 space-y-1">
        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-[#F97316] w-[65%]" />
        </div>
        <p className="text-[10px] text-slate-400">Muito bom! Continue assim.</p>
      </div>
    ),
    accent: 'border-orange-100',
  },
  {
    icon: <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100"><CheckCircle size={18} className="text-green-600" /></div>,
    label: 'Exercícios Resolvidos',
    value: '340',
    sub: <p className="text-[11px] text-slate-400 mt-2">Questões respondidas</p>,
    accent: 'border-green-100',
  },
  {
    icon: <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100"><Flame size={18} className="text-purple-600" /></div>,
    label: 'Sequência de Estudos',
    value: '12 dias',
    sub: <p className="text-[11px] text-slate-400 mt-2">Você é imbatível! 🔥</p>,
    accent: 'border-purple-100',
  },
]

// ── Course cards ──────────────────────────────────────────
const COURSES_MOCK = [
  {
    tag: 'MATEMÁTICA', tagColor: 'bg-blue-600', title: 'Ensino Médio',
    pct: 64, nextLesson: 'Funções do 1º Grau', btnColor: 'bg-[#0D2B5E]',
  },
  {
    tag: 'MATEMÁTICA', tagColor: 'bg-[#F97316]', title: 'Ensino Básico',
    pct: 80, nextLesson: 'Frações e Números Decimais', btnColor: 'bg-[#F97316]',
  },
  {
    tag: 'MATEMÁTICA', tagColor: 'bg-green-600', title: 'Superior e Concursos',
    pct: 25, nextLesson: 'Limites e Derivadas', btnColor: 'bg-green-600',
  },
]

// ── Recent lessons thumbnails ─────────────────────────────
const RECENTES_MOCK = [
  { title: 'Equações do 1º Grau – Parte 1', sub: 'Ensino Médio',  dur: '18:45' },
  { title: 'Funções do 1º Grau – Conceitos', sub: 'Ensino Médio', dur: '22:10' },
  { title: 'Frações Equivalentes',            sub: 'Ensino Básico',dur: '15:30' },
  { title: 'Potenciação – Propriedades',       sub: 'Ensino Básico',dur: '20:15' },
]

const EXERCICIOS_MOCK = [
  { title: 'Lista: Equações do 1º Grau', sub: 'Ensino Médio',  done: 6,  total: 10 },
  { title: 'Lista: Funções do 1º Grau',  sub: 'Ensino Médio',  done: 4,  total: 12 },
  { title: 'Lista: Frações',             sub: 'Ensino Básico', done: 8,  total: 15 },
  { title: 'Lista: Geometria Plana',     sub: 'Ensino Básico', done: 3,  total: 10 },
]

export function AlunoDashboardClient({ userName, isPremium }: Props) {
  const firstName = userName.split(' ')[0]

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Main scrollable area ── */}
      <div className="flex-1 overflow-y-auto px-5 py-4 min-w-0">

        {/* Welcome banner */}
        <FadeIn direction="up" delay={0}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-4 mb-4">
            <div>
              <h1 className="text-lg font-black text-[#0D2B5E]">👋 Bem-vindo de volta, {firstName}!</h1>
              <p className="text-xs text-slate-500 mt-0.5">Continue firme! O conhecimento é o eixo da sua evolução.</p>
            </div>
            {isPremium && (
              <div className="flex items-center gap-2 rounded-xl bg-yellow-50 border border-yellow-200 px-3 py-2 shrink-0">
                <Crown size={14} className="text-yellow-500" />
                <div>
                  <p className="text-[11px] font-bold text-yellow-700">Plano Premium</p>
                  <p className="text-[10px] text-yellow-500">Acesso válido até 20/05/2025</p>
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
          {STAT_CARDS.map(({ icon, label, value, sub, accent }, i) => (
            <FadeIn key={label} delay={0.05 + i * 0.07} direction="up">
              <motion.div
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(13,43,94,0.09)' }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl bg-white border ${accent} p-4 flex flex-col`}
              >
                {icon}
                <p className="text-[11px] text-slate-400 mt-2 leading-tight">{label}</p>
                <p className="text-xl font-black text-[#0D2B5E] leading-none mt-1">{value}</p>
                {sub}
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Meus Cursos */}
        <FadeIn delay={0.15}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0D2B5E]">Meus Cursos</h2>
            <Link href="/aluno/cursos" className="flex items-center gap-1 text-[11px] text-[#1E5AA8] font-medium hover:underline">
              Ver todos <ArrowRight size={10} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {COURSES_MOCK.map(({ tag, tagColor, title, pct, nextLesson, btnColor }, i) => (
            <FadeIn key={title} delay={0.18 + i * 0.07} direction="up">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <span className={`inline-block rounded-lg px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wide ${tagColor}`}>
                    {tag}
                  </span>
                  <button className="text-slate-300 hover:text-slate-500 transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
                <h3 className="text-base font-black text-[#0D2B5E] leading-tight">{title}</h3>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] text-slate-400">{pct}% concluído</p>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: title === 'Ensino Médio' ? '#0D2B5E' : title === 'Ensino Básico' ? '#F97316' : '#16a34a' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wide">Próxima aula</p>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">{nextLesson}</p>
                </div>
                <button className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-2 text-[11px] font-bold text-white ${btnColor} hover:opacity-90 active:scale-95 transition-all`}>
                  Continuar <Play size={10} />
                </button>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom: Recentes + Exercícios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Aulas Assistidas Recentemente */}
          <FadeIn delay={0.22} direction="up">
            <div className="rounded-2xl bg-white border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-[#0D2B5E]">Aulas Assistidas Recentemente</p>
                <Link href="/aluno/cursos" className="flex items-center gap-0.5 text-[10px] text-[#1E5AA8] hover:underline">
                  Ver todas <ArrowRight size={9} />
                </Link>
              </div>
              <div className="space-y-3">
                {RECENTES_MOCK.map(({ title, sub, dur }) => (
                  <div key={title} className="flex items-center gap-3 group">
                    {/* Thumbnail */}
                    <div className="relative h-12 w-[72px] rounded-xl bg-gradient-to-br from-[#0D2B5E] to-[#1E5AA8] shrink-0 overflow-hidden flex items-center justify-center">
                      <Play size={12} className="text-white/60" />
                      <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1 py-0.5 text-[8px] text-white font-medium flex items-center gap-0.5">
                        <Clock size={7} />{dur}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-slate-800 leading-tight line-clamp-1">{title}</p>
                      <p className="text-[10px] text-slate-400">{sub}</p>
                    </div>
                    <CheckCircle size={15} className="text-green-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Exercícios em Andamento */}
          <FadeIn delay={0.26} direction="up">
            <div className="rounded-2xl bg-white border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-[#0D2B5E]">Exercícios em Andamento</p>
                <Link href="/aluno/exercicios" className="flex items-center gap-0.5 text-[10px] text-[#1E5AA8] hover:underline">
                  Ver todas <ArrowRight size={9} />
                </Link>
              </div>
              <div className="space-y-3">
                {EXERCICIOS_MOCK.map(({ title, sub, done, total }) => {
                  const pct = Math.round((done / total) * 100)
                  return (
                    <div key={title} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <BookOpen size={14} className="text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-slate-800 leading-tight line-clamp-1">{title}</p>
                        <p className="text-[9px] text-slate-400 mb-1">{sub}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-[#1E5AA8]"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7, ease: 'easeOut' }}
                            />
                          </div>
                          <span className="text-[9px] text-slate-500 shrink-0">{done}/{total}</span>
                        </div>
                      </div>
                      <button className="shrink-0 rounded-xl border border-slate-200 px-2.5 py-1.5 text-[10px] font-semibold text-[#0D2B5E] hover:bg-slate-50 transition-colors">
                        Continuar
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeIn>

        </div>

      </div>

      {/* ── Right panel ── */}
      <RightPanel />

    </div>
  )
}
