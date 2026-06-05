import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar } from 'lucide-react'

const STATUS_COLOR: Record<string, any> = {
  confirmado: 'success', pendente: 'warning', recusado: 'danger', concluido: 'neutral', cancelado: 'danger',
}

export default async function AgendaProfessorOnlinePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: agendamentos } = await supabase
    .from('agendamentos')
    .select('*, profiles!agendamentos_aluno_id_fkey(name, avatar_url)')
    .eq('professor_id', user.id)
    .order('data_hora', { ascending: true })

  const proximos = (agendamentos ?? []).filter((a: any) =>
    ['pendente', 'confirmado'].includes(a.status) && new Date(a.data_hora) >= new Date()
  )
  const historico = (agendamentos ?? []).filter((a: any) =>
    !['pendente', 'confirmado'].includes(a.status) || new Date(a.data_hora) < new Date()
  )

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-950">Agenda</h1>

      {proximos.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-slate-700 mb-3">Próximas aulas</h2>
          <div className="space-y-3">
            {(proximos as any[]).map(ag => (
              <Card key={ag.id} className="flex items-center gap-4">
                <div className="rounded-2xl bg-[#F97316]/10 p-3 shrink-0">
                  <Calendar size={20} className="text-[#F97316]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{ag.profiles?.name ?? 'Aluno'}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(ag.data_hora).toLocaleDateString('pt-AO', { weekday: 'long', day: 'numeric', month: 'long' })}
                    {' às '}
                    {new Date(ag.data_hora).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-slate-400 capitalize mt-0.5">{ag.formato} · {ag.duracao_min} min</p>
                </div>
                <Badge variant={STATUS_COLOR[ag.status]}>{ag.status}</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      {historico.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-slate-700 mb-3">Histórico</h2>
          <div className="space-y-3">
            {(historico as any[]).map(ag => (
              <Card key={ag.id} className="flex items-center gap-4 opacity-70">
                <div className="rounded-2xl bg-slate-100 p-3 shrink-0">
                  <Calendar size={20} className="text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-700">{ag.profiles?.name ?? 'Aluno'}</p>
                  <p className="text-sm text-slate-400">
                    {new Date(ag.data_hora).toLocaleDateString('pt-AO', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <Badge variant={STATUS_COLOR[ag.status] ?? 'neutral'}>{ag.status}</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      {(!agendamentos || agendamentos.length === 0) && (
        <Card className="flex flex-col items-center py-16 text-center">
          <Calendar size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500">Nenhum agendamento ainda.</p>
        </Card>
      )}
    </div>
  )
}
