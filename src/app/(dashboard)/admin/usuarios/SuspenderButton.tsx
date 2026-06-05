'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function SuspenderButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const suspender = async () => {
    if (!confirm('Tens a certeza que queres suspender esta conta?')) return
    setLoading(true)
    await supabase.from('profiles').update({ status: 'suspenso' }).eq('id', userId)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={suspender}
      disabled={loading}
      className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      {loading ? '...' : 'Suspender'}
    </button>
  )
}
