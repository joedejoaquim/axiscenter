'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Bell, Menu, LogOut, ChevronDown } from 'lucide-react'
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
  const supabase = createClient()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        {/* Notificações */}
        <Link
          href={`/${profile.role}/notificacoes`}
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Bell size={20} />
          {naoLidas > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-bold text-white">
              {naoLidas > 9 ? '9+' : naoLidas}
            </span>
          )}
        </Link>

        {/* Perfil dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex items-center gap-2 rounded-2xl px-3 py-2 hover:bg-slate-100 transition-colors"
          >
            <Avatar src={profile.avatar_url} name={profile.name} size="sm" />
            <span className="hidden text-sm font-medium text-slate-700 sm:block max-w-[120px] truncate">
              {profile.name}
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1 shadow-xl">
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
