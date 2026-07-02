'use client'

import { motion } from 'framer-motion'
import { Video, Calendar, ArrowRight, Heart, MessageCircle } from 'lucide-react'
import { FadeIn } from '@/components/landing/ui/FadeIn'

// ── Donut progress chart ──────────────────────────────────
function DonutChart({ percent }: { percent: number }) {
  const r = 38
  const circ = 2 * Math.PI * r
  const dash = (percent / 100) * circ

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#E8EDF5" strokeWidth="10" />
      <motion.circle
        cx="50" cy="50" r={r} fill="none"
        stroke="#1E5AA8" strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
      />
    </svg>
  )
}

// ── Progress item ─────────────────────────────────────────
interface ProgressItem {
  label: string
  pct: number
  color: string
}

const PROGRESS_ITEMS: ProgressItem[] = [
  { label: 'Aulas Assistidas', pct: 65, color: '#1E5AA8' },
  { label: 'Exercícios',       pct: 70, color: '#F97316' },
  { label: 'Simulados',        pct: 40, color: '#A855F7' },
  { label: 'Materiais',        pct: 80, color: '#10B981' },
]

// ── Conquistas ────────────────────────────────────────────
const CONQUISTAS = [
  { icon: '📅', label: 'Persistente',  sub: 'Estude por 7 dias seguidos', color: 'bg-red-50 border-red-100' },
  { icon: '🎯', label: 'Executor',     sub: 'Resolva 50 exercícios',       color: 'bg-orange-50 border-orange-100' },
  { icon: '⭐', label: 'Dedicado',     sub: 'Assista 1 10 aulas',          color: 'bg-yellow-50 border-yellow-100' },
]

export function RightPanel() {
  return (
    <aside className="hidden xl:flex w-[270px] shrink-0 flex-col gap-3 overflow-y-auto bg-white border-l border-slate-200 px-4 py-4">

      {/* Próxima Aula ao Vivo */}
      <FadeIn delay={0.1} direction="right">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-800">Próxima Aula ao Vivo</p>
            <a href="#" className="text-[10px] text-[#1E5AA8] font-medium flex items-center gap-0.5 hover:underline">
              Ver calendário <ArrowRight size={10} />
            </a>
          </div>

          <div className="flex items-start gap-2 mb-3">
            <div className="rounded-lg bg-slate-100 px-2 py-1 text-center shrink-0">
              <p className="text-[9px] font-bold text-slate-500 uppercase">HOJE</p>
              <p className="text-lg font-black text-[#0D2B5E] leading-none">19:00</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 leading-tight">Revisão de Funções do 1º Grau</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-white">PH</span>
            </div>
            <p className="text-[11px] text-slate-500">Professor Hélder</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F97316] py-2.5 text-xs font-bold text-white hover:bg-[#E56E00] transition-colors"
          >
            <Video size={13} /> Entrar na Aula
          </motion.button>
        </div>
      </FadeIn>

      {/* Meu Progresso */}
      <FadeIn delay={0.2} direction="right">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-800">Meu Progresso</p>
            <a href="#" className="text-[10px] text-[#1E5AA8] font-medium flex items-center gap-0.5 hover:underline">
              Ver relatório <ArrowRight size={10} />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <DonutChart percent={65} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-base font-black text-[#0D2B5E] leading-none">65%</p>
                <p className="text-[9px] text-slate-400">Geral</p>
              </div>
            </div>
            <div className="flex-1 space-y-2 min-w-0">
              {PROGRESS_ITEMS.map(({ label, pct, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: color }} />
                  <p className="text-[10px] text-slate-600 flex-1 truncate">{label}</p>
                  <p className="text-[10px] font-bold text-slate-700">{pct}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Conquistas Recentes */}
      <FadeIn delay={0.3} direction="right">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-800">Conquistas Recentes</p>
            <a href="#" className="text-[10px] text-[#1E5AA8] font-medium flex items-center gap-0.5 hover:underline">
              Ver todas <ArrowRight size={10} />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CONQUISTAS.map(({ icon, label, sub, color }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.04 }}
                className={`rounded-xl border p-2 text-center flex flex-col items-center gap-1 ${color}`}
              >
                <span className="text-xl">{icon}</span>
                <p className="text-[9px] font-bold text-slate-700 leading-tight">{label}</p>
                <p className="text-[8px] text-slate-400 leading-tight">{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Comunidade em Destaque */}
      <FadeIn delay={0.4} direction="right">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-800">Comunidade em Destaque</p>
            <a href="#" className="text-[10px] text-[#1E5AA8] font-medium flex items-center gap-0.5 hover:underline">
              Ver fórum <ArrowRight size={10} />
            </a>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-white">AL</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-800">Ana Luísa</p>
                <p className="text-[9px] text-slate-400">Há 2h</p>
              </div>
              <p className="text-[9px] text-slate-400">Estudante</p>
              <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">
                Alguém pode me ajudar nesta questão de funções? Não entendi o passo 3 da resolução.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
            <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 transition-colors">
              <MessageCircle size={11} /> 12 respostas
            </button>
            <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-500 transition-colors ml-auto">
              <Heart size={11} /> Curtir
            </button>
          </div>
        </div>
      </FadeIn>

    </aside>
  )
}
