'use client'

import { useRef, useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { useRealtimeChat } from '@/hooks/useRealtimeChat'
import { Avatar } from '@/components/ui/Avatar'

interface ChatSalaProps {
  aulaId: string
  userName: string
}

export function ChatSala({ aulaId, userName }: ChatSalaProps) {
  const { mensagens, enviar, loading } = useRealtimeChat(aulaId)
  const [texto, setTexto] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!texto.trim()) return
    await enviar(texto)
    setTexto('')
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Chat da Sala</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <p className="text-xs text-slate-400 text-center">A carregar...</p>
        ) : mensagens.length === 0 ? (
          <p className="text-xs text-slate-400 text-center">Nenhuma mensagem ainda.</p>
        ) : (
          mensagens.map(m => (
            <div key={m.id} className="flex items-start gap-2">
              <Avatar name={m.profiles?.name ?? '?'} size="sm" />
              <div>
                <p className="text-xs font-semibold text-[#0D2B5E]">{m.profiles?.name ?? 'Utilizador'}</p>
                <p className="text-sm text-slate-700 mt-0.5">{m.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={submit} className="border-t border-slate-100 p-3 flex gap-2">
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Escreve uma mensagem..."
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-[#F97316] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!texto.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316] text-white hover:bg-[#EA6C0A] transition-colors disabled:opacity-40"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  )
}
