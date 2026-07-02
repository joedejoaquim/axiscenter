'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Menu, LogOut, ChevronDown, Search, MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useNotificacoes } from '@/hooks/useNotificacoes'
import { Avatar } from '@/components/ui/Avatar'
import type { Profile } from '@/types/database'

interface NavbarProps {
  profile: Profile
  onMenuClick?: () => void
}

export function Navbar({ profile, onMenuClick }: NavbarProps) {
  const router = useRouter()
  const { naoLidas } = useNotificacoes()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const isPremium = (profile as Profile & { plan?: string }).plan === 'pro'

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-200 bg-[#0D2B5E] px-4 lg:px-5 shrink-0">

      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Logo (mobile) */}
      <div className="flex items-center gap-1.5 lg:hidden">
        <Image src="/assets/logoaxis.png" alt="Axis Center" width={28} height={28} />
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-xl mx-auto hidden sm:flex">
        <div className="relative w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar aulas, cursos, exercícios..."
            className="w-full rounded-xl bg-white/10 border border-white/15 pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 transition-colors">
            <Search size={11} className="text-white" />
          </button>
        </div>
      </div>

      {/* Right side icons + profile */}
      <div className="flex items-center gap-1.5 ml-auto">

        {/* Notifications */}
        <Link
          href={`/${profile.role}/notificacoes`}
          className="relative flex h-8 w-8 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Bell size={17} />
          {naoLidas > 0 && (
            <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[9px] font-bold text-white">
              {naoLidas > 9 ? '9+' : naoLidas}
            </span>
          )}
        </Link>

        {/* Messages */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors">
          <MessageSquare size={17} />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-white/15 mx-1" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/10 transition-colors"
          >
            <Avatar src={profile.avatar_url} name={profile.name} size="sm" className="ring-2 ring-white/20" />
            <div className="hidden sm:block text-left min-w-0">
              <p className="text-[11px] font-semibold text-white leading-none truncate max-w-[100px]">{profile.name}</p>
              <p className="text-[10px] text-[#F97316] leading-none mt-0.5">
                {isPremium ? 'Aluno Premium' : 'Plano Gratuito'}
              </p>
            </div>
            <ChevronDown size={13} className="text-white/50 shrink-0" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1 shadow-xl">
                <Link href={`/${profile.role}/perfil`} onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors">
                  Meu Perfil
                </Link>
                <Link href={`/${profile.role}/configuracoes`} onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors">
                  Configurações
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <button onClick={logout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={13} /> Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
