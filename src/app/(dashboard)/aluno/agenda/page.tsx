import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar } from 'lucide-react'

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'danger' | 'neutral' | 'primary'> = {
  confirmado: 'success', pendente: 'warning', recusado: 'danger', concluido: 'neutral', cancelado: 'danger',
}

export default async function AgendaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: agendamentos } = await supabase
    .from('agendamentos')
    .select('*, profiles!agendamentos_professor_id_fkey(name, avatar_url)')
    .eq('aluno_id', user.id)
    .order('data_hora', { ascending: true })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-950">Minha Agenda</h1>

      {(!agendamentos || agendamentos.length === 0) ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <Calendar size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500">Nenhum agendamento ainda.</p>
          <p className="text-sm text-slate-400 mt-1">Usa o mapa para encontrar um professor e agendar.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {agendamentos.map((ag: { id: string; profiles?: { name: string }; data_hora: string; formato: string; status: string }) => (
            <Card key={ag.id} className="flex items-center gap-4">
              <div className="rounded-2xl bg-[#0D2B5E]/10 p-3 shrink-0">
                <Calendar size={20} className="text-[#0D2B5E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{ag.profiles?.name ?? 'Professor'}</p>
                <p className="text-sm text-slate-500">
                  {new Date(ag.data_hora).toLocaleDateString('pt-AO', { weekday: 'long', day: 'numeric', month: 'long' })}
                  {' às '}
                  {new Date(ag.data_hora).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-slate-400 capitalize mt-0.5">{ag.formato}</p>
              </div>
              <Badge variant={STATUS_COLORS[ag.status] ?? 'neutral'}>{ag.status}</Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
