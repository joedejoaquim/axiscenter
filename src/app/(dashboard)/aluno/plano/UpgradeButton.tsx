'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export function UpgradeButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleUpgrade = async () => {
    setLoading(true)
    // Em produção: criar sessão Pagar.me e redirecionar
    // Por agora faz upgrade directo para demo
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('profiles').update({ plan: 'pro' }).eq('id', user.id)
    router.refresh()
    setLoading(false)
  }

  return (
    <Button onClick={handleUpgrade} loading={loading} size="lg" className="w-full mt-6">
      Assinar PRO →
    </Button>
  )
}
