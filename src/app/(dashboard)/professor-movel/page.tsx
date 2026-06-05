import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { BarChart2, Users, MapPin } from 'lucide-react'
import { DisponibilidadeToggle } from './DisponibilidadeToggle'

export default async function ProfessorMovelDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('name').eq('id', user.id).single()
  const { data: profMovel } = await supabase.from('professores_moveis').select('disponivel').eq('user_id', user.id).single()

  const [{ count: totalAulas }, { data: ganhos }, { data: solicitacoes }] = await Promise.all([
    supabase.from('agendamentos').select('*', { count: 'exact', head: true })
      .eq('professor_id', user.id).eq('status', 'concluido'),
    supabase.from('pagamentos').select('valor').eq('user_id', user.id).eq('status', 'aprovado'),
    supabase.from('agendamentos').select('*, profiles!agendamentos_aluno_id_fkey(name, avatar_url)')
      .eq('professor_id', user.id).eq('status', 'pendente').order('created_at', { ascending: false }),
  ])

  const totalGanhos = (ganhos ?? []).reduce((acc: number, p: { valor: number | string }) => acc + Number(p.valor), 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Olá, {profile?.name?.split(' ')[0]} 👋</h1>
          <p className="mt-1 text-slate-500">Painel do Professor Móvel</p>
        </div>
        <DisponibilidadeToggle disponivel={profMovel?.disponivel ?? false} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Aulas Concluídas', value: totalAulas ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Ganhos', value: `${totalGanhos.toLocaleString('pt-AO')} Kz`, icon: BarChart2, color: 'text-green-600 bg-green-50' },
          { label: 'Solicitações Pendentes', value: (solicitacoes ?? []).length, icon: MapPin, color: 'text-orange-600 bg-orange-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <div className="flex items-center gap-4">
              <div className={`rounded-2xl p-3 ${color}`}><Icon size={20} /></div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-slate-950">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Solicitações pendentes */}
      {(solicitacoes ?? []).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Solicitações Pendentes</h2>
          <div className="space-y-3">
            {(solicitacoes as Array<{ id: string; profiles?: { name: string }; data_hora: string; endereco?: string }>).map(s => (
              <Card key={s.id} className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-slate-900">{s.profiles?.name}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(s.data_hora).toLocaleDateString('pt-AO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    {s.endereco && ` · ${s.endereco}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <SolicitacaoActions id={s.id} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Import inline para evitar ficheiro extra
function SolicitacaoActions({ id }: { id: string }) {
  return (
    <div className="flex gap-2">
      <form action={`/api/professor-movel/aceitar`} method="POST">
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700 transition-colors">
          Aceitar
        </button>
      </form>
      <form action={`/api/professor-movel/recusar`} method="POST">
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors">
          Recusar
        </button>
      </form>
    </div>
  )
}
