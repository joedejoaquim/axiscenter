'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function DisponibilidadeToggle({ disponivel: initial }: { disponivel: boolean }) {
  const [disponivel, setDisponivel] = useState(initial)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const toggle = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const novo = !disponivel
    await supabase.from('professores_moveis').upsert(
      { user_id: user.id, disponivel: novo },
      { onConflict: 'user_id' }
    )

    // Actualiza localização se ficou disponível
    if (novo) {
      navigator.geolocation?.getCurrentPosition(async pos => {
        await fetch('/api/localizacao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        })
      })
    }

    setDisponivel(novo)
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
        disponivel
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${disponivel ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
      {loading ? 'A actualizar...' : disponivel ? 'Disponível' : 'Indisponível'}
    </button>
  )
}
