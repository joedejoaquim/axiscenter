'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#',             label: 'Início',       active: true },
  { href: '#cursos',       label: 'Cursos' },
  { href: '#como-funciona',label: 'Como Funciona' },
  { href: '#sobre',        label: 'Sobre Nós' },
  { href: '#depoimentos',  label: 'Depoimentos' },
  { href: '/faq',          label: 'FAQ' },
  { href: '#contato',      label: 'Contato' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative z-40 w-full">
      <div className="relative mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0 z-10">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={46} height={46} className="shrink-0" />
          <div className="leading-none hidden sm:block">
            <p className="text-sm font-black text-white tracking-[0.18em]">AXIS</p>
            <p className="text-[10px] font-bold text-[#FF7A00] tracking-[0.12em] uppercase">Center</p>
            <p className="text-[8px] text-white/55 tracking-[0.1em] uppercase">Escola Online</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 2xl:gap-8 text-[13px] font-medium">
          {NAV_LINKS.map(({ href, label, active }) => (
            <a
              key={label}
              href={href}
              className={`pb-1 transition-colors whitespace-nowrap ${
                active ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-white/90 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2.5 shrink-0 z-10">
          <Link
            href="/login"
            className="rounded-md border border-white px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/checkout"
            className="rounded-md bg-[#FF7A00] px-4 py-2 text-xs font-bold text-white hover:bg-[#E56E00] transition-colors"
          >
            Assine Agora
          </Link>
          <button
            className="xl:hidden flex flex-col gap-1.5 p-2 text-white"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="w-5 h-0.5 bg-current" />
            <span className="w-5 h-0.5 bg-current" />
            <span className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden bg-[#031B52] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-white/80 hover:text-white py-1"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
