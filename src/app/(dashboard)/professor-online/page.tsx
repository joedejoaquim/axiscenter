import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Video, Users, BarChart2, Plus } from 'lucide-react'

export default async function ProfessorOnlineDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('name').eq('id', user.id).single()

  const [{ count: totalAulas }, { count: totalAlunos }, { data: ganhos }] = await Promise.all([
    supabase.from('aulas').select('*', { count: 'exact', head: true }).eq('professor_id', user.id),
    supabase.from('agendamentos').select('aluno_id', { count: 'exact', head: true })
      .eq('professor_id', user.id).eq('status', 'confirmado'),
    supabase.from('pagamentos').select('valor').eq('user_id', user.id).eq('status', 'aprovado'),
  ])

  const totalGanhos = (ganhos ?? []).reduce((acc: number, p: { valor: number | string }) => acc + Number(p.valor), 0)

  const { data: aulasRecentes } = await supabase
    .from('aulas').select('*').eq('professor_id', user.id)
    .order('created_at', { ascending: false }).limit(5)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Olá, {profile?.name?.split(' ')[0]} 👋</h1>
          <p className="mt-1 text-slate-500">Painel do Professor Online</p>
        </div>
        <Link href="/professor-online/aulas/nova" className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#EA6C0A] transition-colors">
          <Plus size={16} /> Nova Aula
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total de Aulas', value: totalAulas ?? 0, icon: Video, color: 'text-blue-600 bg-blue-50' },
          { label: 'Alunos Activos', value: totalAlunos ?? 0, icon: Users, color: 'text-green-600 bg-green-50' },
          { label: 'Total Ganhos', value: `${totalGanhos.toLocaleString('pt-AO')} Kz`, icon: BarChart2, color: 'text-orange-600 bg-orange-50' },
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

      {/* Aulas recentes */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">As minhas aulas</h2>
          <Link href="/professor-online/aulas" className="text-sm text-[#F97316] hover:underline">Ver todas →</Link>
        </div>
        <div className="space-y-3">
          {(aulasRecentes ?? []).map((aula: { id: string; titulo: string; tipo: string; matriculas: number; status: string }) => (
            <Card key={aula.id} padding="sm" className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{aula.titulo}</p>
                <p className="text-xs text-slate-500 mt-0.5">{aula.tipo === 'ao_vivo' ? 'Ao Vivo' : 'Gravada'} · {aula.matriculas} matrículas</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={aula.status === 'publicada' ? 'success' : aula.status === 'rascunho' ? 'warning' : 'neutral'}>
                  {aula.status}
                </Badge>
                <Link href={`/professor-online/aulas/${aula.id}`} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Editar
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
