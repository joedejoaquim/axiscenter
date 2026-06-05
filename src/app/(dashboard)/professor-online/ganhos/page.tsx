import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BarChart2, TrendingUp, DollarSign } from 'lucide-react'

export default async function GanhosProfessorOnlinePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: pagamentos } = await supabase
    .from('pagamentos').select('*').eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const total = (pagamentos ?? [])
    .filter((p: any) => p.status === 'aprovado')
    .reduce((acc: number, p: any) => acc + Number(p.valor), 0)

  const pendente = (pagamentos ?? [])
    .filter((p: any) => p.status === 'pendente')
    .reduce((acc: number, p: any) => acc + Number(p.valor), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-950">Ganhos</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Recebido', value: `${total.toLocaleString('pt-AO')} Kz`, icon: DollarSign, color: 'text-green-600 bg-green-50' },
          { label: 'Pendente', value: `${pendente.toLocaleString('pt-AO')} Kz`, icon: TrendingUp, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Transacções', value: (pagamentos ?? []).length, icon: BarChart2, color: 'text-blue-600 bg-blue-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <div className="flex items-center gap-4">
              <div className={`rounded-2xl p-3 ${color}`}><Icon size={20} /></div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-xl font-bold text-slate-950">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="font-semibold text-slate-900 mb-4">Histórico</h2>
        <div className="space-y-3">
          {(!pagamentos || pagamentos.length === 0) ? (
            <p className="text-sm text-slate-400 text-center py-8">Nenhuma transacção ainda.</p>
          ) : (pagamentos as any[]).map(p => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-800">{p.descricao ?? p.tipo}</p>
                <p className="text-xs text-slate-400">{new Date(p.created_at).toLocaleDateString('pt-AO')}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">{Number(p.valor).toLocaleString('pt-AO')} Kz</span>
                <Badge variant={p.status === 'aprovado' ? 'success' : p.status === 'pendente' ? 'warning' : 'danger'}>
                  {p.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
