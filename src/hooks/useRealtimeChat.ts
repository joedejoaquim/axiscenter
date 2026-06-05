'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Mensagem } from '@/types/database'

export function useRealtimeChat(aulaId: string) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!aulaId) return

    // Carrega histórico
    supabase
      .from('mensagens')
      .select('*, profiles(name, avatar_url)')
      .eq('aula_id', aulaId)
      .order('created_at')
      .then(({ data }) => {
        setMensagens((data as Mensagem[]) ?? [])
        setLoading(false)
      })

    // Subscreve a novas mensagens
    const channel = supabase
      .channel(`chat:${aulaId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'mensagens',
        filter: `aula_id=eq.${aulaId}`,
      }, async (payload) => {
        // Busca dados do perfil do remetente
        const { data: profile } = await supabase
          .from('profiles').select('name, avatar_url').eq('id', payload.new.user_id).single()
        setMensagens(prev => [...prev, { ...payload.new, profiles: profile } as Mensagem])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [aulaId])

  const enviar = async (message: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !message.trim()) return
    await supabase.from('mensagens').insert({ aula_id: aulaId, user_id: user.id, message: message.trim() })
  }

  return { mensagens, enviar, loading }
}
