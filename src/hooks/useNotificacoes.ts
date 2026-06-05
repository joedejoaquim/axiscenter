'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Notificacao } from '@/types/database'

export function useNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])
  const [naoLidas, setNaoLidas] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('notificacoes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      setNotificacoes(data ?? [])
      setNaoLidas((data ?? []).filter(n => !n.lida).length)
    }

    load()

    // Realtime para novas notificações
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      const channel = supabase
        .channel('notificacoes')
        .on('postgres_changes', {
          event: 'INSERT', schema: 'public', table: 'notificacoes',
          filter: `user_id=eq.${user.id}`,
        }, (payload) => {
          setNotificacoes(prev => [payload.new as Notificacao, ...prev])
          setNaoLidas(prev => prev + 1)
        })
        .subscribe()
      return () => { supabase.removeChannel(channel) }
    })
  }, [])

  const marcarLida = async (id: string) => {
    await supabase.from('notificacoes').update({ lida: true }).eq('id', id)
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n))
    setNaoLidas(prev => Math.max(0, prev - 1))
  }

  return { notificacoes, naoLidas, marcarLida }
}
