'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function AprovacaoActions({ userId }: { userId: string }) {
  const [loading, setLoading] = useState<'aprovar' | 'rejeitar' | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const act = async (acao: 'aprovar' | 'rejeitar') => {
    setLoading(acao)
    const status = acao === 'aprovar' ? 'ativo' : 'suspenso'
    await supabase.from('profiles').update({ status }).eq('id', userId)
    router.refresh()
    setLoading(null)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => act('aprovar')}
        disabled={!!loading}
        className="rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {loading === 'aprovar' ? '...' : 'Aprovar'}
      </button>
      <button
        onClick={() => act('rejeitar')}
        disabled={!!loading}
        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
      >
        {loading === 'rejeitar' ? '...' : 'Rejeitar'}
      </button>
    </div>
  )
}
