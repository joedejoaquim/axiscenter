'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import {
  LayoutDashboard, BookOpen, Calendar, Map, Star, CreditCard,
  Users, CheckSquare, Settings, Bell, BarChart2, Video, X
} from 'lucide-react'
import type { UserRole } from '@/types/database'

const NAV: Record<UserRole, { href: string; label: string; icon: React.ElementType }[]> = {
  aluno: [
    { href: '/aluno',          label: 'Dashboard',   icon: LayoutDashboard },
    { href: '/aluno/cursos',   label: 'Cursos',      icon: BookOpen },
    { href: '/aluno/agenda',   label: 'Agenda',      icon: Calendar },
    { href: '/aluno/mapa',     label: 'Mapa',        icon: Map },
    { href: '/aluno/plano',    label: 'Plano',       icon: CreditCard },
  ],
  'professor-online': [
    { href: '/professor-online',         label: 'Dashboard',      icon: LayoutDashboard },
    { href: '/professor-online/aulas',   label: 'Aulas',          icon: Video },
    { href: '/professor-online/agenda',  label: 'Agenda',         icon: Calendar },
    { href: '/professor-online/ganhos',  label: 'Ganhos',         icon: BarChart2 },
  ],
  'professor-movel': [
    { href: '/professor-movel',         label: 'Dashboard',  icon: LayoutDashboard },
    { href: '/professor-movel/mapa',    label: 'Mapa',       icon: Map },
    { href: '/professor-movel/ganhos',  label: 'Ganhos',     icon: BarChart2 },
  ],
  admin: [
    { href: '/admin',                    label: 'Dashboard',     icon: LayoutDashboard },
    { href: '/admin/usuarios',           label: 'Utilizadores',  icon: Users },
    { href: '/admin/aprovacoes',         label: 'Aprovações',    icon: CheckSquare },
    { href: '/admin/pagamentos',         label: 'Pagamentos',    icon: CreditCard },
    { href: '/admin/avaliacoes',         label: 'Avaliações',    icon: Star },
    { href: '/admin/notificacoes',       label: 'Notificações',  icon: Bell },
    { href: '/admin/configuracoes',      label: 'Configurações', icon: Settings },
  ],
}

interface SidebarProps {
  role: UserRole
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ role, open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const links = NAV[role] ?? []

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={onClose} />
      )}

      <aside className={clsx(
        'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gradient-to-b from-slate-950 via-[#122859] to-[#0B2456] transition-transform duration-300 lg:static lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-lg font-bold text-white">Axis Education</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== `/${role}` && pathname.startsWith(href))
            return (
              <Link
                key={href} href={href} onClick={onClose}
                className={clsx(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Role badge */}
        <div className="px-6 py-4 border-t border-white/10">
          <span className="inline-flex rounded-full bg-[#F97316]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#F97316]">
            {role}
          </span>
        </div>
      </aside>
    </>
  )
}
