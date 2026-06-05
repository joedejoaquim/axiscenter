import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SalaAula } from '@/components/sala/SalaAula'
import { ChatSala } from '@/components/sala/ChatSala'

export default async function SalaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('name, plan').eq('id', user.id).single()
  if (profile?.plan !== 'pro') redirect('/aluno/plano')

  const { data: aula } = await supabase.from('aulas').select('titulo, sala_nome').eq('id', id).single()
  if (!aula?.sala_nome) redirect('/aluno/cursos')

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-950">{aula.titulo}</h1>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]" style={{ height: 'calc(100vh - 200px)' }}>
        <SalaAula salaId={aula.sala_nome} userId={user.id} userName={profile.name} isOwner={false} />
        <ChatSala aulaId={id} userName={profile.name} />
      </div>
    </div>
  )
}
