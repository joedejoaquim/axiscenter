import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AlunoDashboardClient } from './AlunoDashboardClient'

export default async function AlunoDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const [{ data: aulasRecentes }, { data: exercicios }] = await Promise.all([
    supabase.from('aulas').select('id, titulo, materia, duracao_min').eq('status', 'publicada').order('created_at', { ascending: false }).limit(4),
    supabase.from('aulas').select('id, titulo, materia').eq('status', 'publicada').order('created_at', { ascending: false }).limit(4),
  ])

  const isPremium = profile?.plan === 'pro'

  return (
    <AlunoDashboardClient
      userName={profile?.name ?? 'Aluno'}
      isPremium={isPremium}
      aulasRecentes={aulasRecentes ?? []}
      exercicios={exercicios ?? []}
    />
  )
}
