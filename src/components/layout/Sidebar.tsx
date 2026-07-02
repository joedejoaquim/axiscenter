'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Video, FileText, BarChart2, Calendar,
  Headphones, MessageSquare, Users, Trophy, TrendingUp, Award,
  CreditCard, User, Settings, LogOut, HelpCircle, MessageCircle,
  X, Star, CheckSquare, Bell,
} from 'lucide-react'
import type { UserRole } from '@/types/database'

const NAV_ALUNO = [
  {
    group: 'APRENDIZAGEM',
    items: [
      { href: '/aluno',                label: 'Dashboard',         icon: LayoutDashboard },
      { href: '/aluno/cursos',         label: 'Meus Cursos',       icon: BookOpen },
      { href: '/aluno/aulas',          label: 'Aulas',             icon: Video },
      { href: '/aluno/exercicios',     label: 'Exercícios',        icon: FileText },
      { href: '/aluno/simulados',      label: 'Simulados',         icon: BarChart2 },
      { href: '/aluno/agenda',         label: 'Aulas ao Vivo',     icon: Calendar },
      { href: '/aluno/materiais',      label: 'Materiais de Apoio',icon: Headphones },
    ],
  },
  {
    group: 'COMUNIDADE',
    items: [
      { href: '/aluno/forum',          label: 'Fórum de Dúvidas',  icon: MessageSquare },
      { href: '/aluno/comunidade',     label: 'Comunidade',        icon: Users },
      { href: '/aluno/ranking',        label: 'Ranking',           icon: Trophy },
    ],
  },
  {
    group: 'MEU DESEMPENHO',
    items: [
      { href: '/aluno/progresso',      label: 'Meu Progresso',     icon: TrendingUp },
      { href: '/aluno/conquistas',     label: 'Conquistas',        icon: Award },
      { href: '/aluno/certificados',   label: 'Certificados',      icon: CreditCard },
    ],
  },
  {
    group: 'CONTA',
    items: [
      { href: '/aluno/perfil',         label: 'Perfil',            icon: User },
      { href: '/aluno/configuracoes',  label: 'Configurações',     icon: Settings },
      { href: '/login',                label: 'Sair',              icon: LogOut },
    ],
  },
]

const NAV_ADMIN = [
  {
    group: '',
    items: [
      { href: '/admin',                label: 'Dashboard',         icon: LayoutDashboard },
      { href: '/admin/usuarios',       label: 'Utilizadores',      icon: Users },
      { href: '/admin/aprovacoes',     label: 'Aprovações',        icon: CheckSquare },
      { href: '/admin/pagamentos',     label: 'Pagamentos',        icon: CreditCard },
      { href: '/admin/avaliacoes',     label: 'Avaliações',        icon: Star },
      { href: '/admin/notificacoes',   label: 'Notificações',      icon: Bell },
      { href: '/admin/configuracoes',  label: 'Configurações',     icon: Settings },
    ],
  },
]

const NAV_PROF_ONLINE = [
  {
    group: '',
    items: [
      { href: '/professor-online',            label: 'Dashboard',  icon: LayoutDashboard },
      { href: '/professor-online/aulas',      label: 'Aulas',      icon: Video },
      { href: '/professor-online/agenda',     label: 'Agenda',     icon: Calendar },
      { href: '/professor-online/ganhos',     label: 'Ganhos',     icon: BarChart2 },
    ],
  },
]

const NAV_PROF_MOVEL = [
  {
    group: '',
    items: [
      { href: '/professor-movel',         label: 'Dashboard',  icon: LayoutDashboard },
      { href: '/professor-movel/mapa',    label: 'Mapa',       icon: LayoutDashboard },
      { href: '/professor-movel/ganhos',  label: 'Ganhos',     icon: BarChart2 },
    ],
  },
]

const NAV_MAP: Record<UserRole, typeof NAV_ALUNO> = {
  aluno:               NAV_ALUNO,
  admin:               NAV_ADMIN,
  'professor-online':  NAV_PROF_ONLINE,
  'professor-movel':   NAV_PROF_MOVEL,
}

interface SidebarProps {
  role: UserRole
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ role, open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const groups = NAV_MAP[role] ?? NAV_ALUNO

  const isActive = (href: string) =>
    href === '/aluno'
      ? pathname === '/aluno'
      : pathname.startsWith(href) && href !== '/login'

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={clsx(
        'fixed inset-y-0 left-0 z-40 flex w-[160px] flex-col transition-transform duration-300 lg:static lg:translate-x-0',
        'bg-[#0D2B5E]',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>

        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 shrink-0">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={36} height={36} className="shrink-0" />
          <div className="leading-none">
            <p className="text-[11px] font-black text-white tracking-[0.15em]">AXIS</p>
            <p className="text-[9px] font-bold text-[#FF7A00] tracking-[0.1em]">CENTER</p>
            <p className="text-[7px] text-white/50 tracking-[0.08em] uppercase">Escola Online</p>
          </div>
          <button onClick={onClose} className="ml-auto text-white/60 hover:text-white lg:hidden">
            <X size={16} />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-none">
          {groups.map(({ group, items }) => (
            <div key={group} className="mb-2">
              {group && (
                <p className="px-3 pt-3 pb-1 text-[9px] font-bold text-white/35 uppercase tracking-[0.12em]">
                  {group}
                </p>
              )}
              {items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href} href={href} onClick={onClose}
                    className={clsx(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2 text-[11px] font-medium transition-all duration-150',
                      active
                        ? 'bg-[#F97316] text-white shadow-sm'
                        : 'text-white/65 hover:bg-white/8 hover:text-white'
                    )}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span className="leading-tight">{label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Help block */}
        <div className="shrink-0 mx-2 mb-3 rounded-2xl bg-[#0a2049] border border-white/10 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F97316]/20">
              <HelpCircle size={13} className="text-[#F97316]" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-bold text-white">Precisa de ajuda?</p>
              <p className="text-[9px] text-white/45">Fale com nosso suporte</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors py-1.5 text-[10px] font-semibold text-white">
            <MessageCircle size={11} /> Abrir Chat
          </button>
        </div>

      </aside>
    </>
  )
}
