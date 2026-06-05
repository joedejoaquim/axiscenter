import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

export default async function PagamentosAdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: pagamentos } = await supabase
    .from('pagamentos')
    .select('*, profiles(name, email)')
    .order('created_at', { ascending: false })

  const aprovados = (pagamentos ?? []).filter((p: any) => p.status === 'aprovado')
  const pendentes = (pagamentos ?? []).filter((p: any) => p.status === 'pendente')
  const totalReceita = aprovados.reduce((acc: number, p: any) => acc + Number(p.valor), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-950">Pagamentos</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Receita Total', value: `${totalReceita.toLocaleString('pt-AO')} Kz`, icon: DollarSign, color: 'text-green-600 bg-green-50' },
          { label: 'Aprovados', value: aprovados.length, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
          { label: 'Pendentes', value: pendentes.length, icon: AlertCircle, color: 'text-yellow-600 bg-yellow-50' },
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

      <Card padding="sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                {['Utilizador', 'Tipo', 'Valor', 'Método', 'Estado', 'Data'].map(h => (
                  <th key={h} className="pb-3 pl-4 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(pagamentos as any[] ?? []).map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3 pl-4">
                    <p className="font-medium text-slate-900">{p.profiles?.name ?? '—'}</p>
                    <p className="text-xs text-slate-400">{p.profiles?.email}</p>
                  </td>
                  <td className="py-3 pl-4 text-slate-600 capitalize">{p.tipo.replace('_', ' ')}</td>
                  <td className="py-3 pl-4 font-semibold text-slate-900">{Number(p.valor).toLocaleString('pt-AO')} Kz</td>
                  <td className="py-3 pl-4 text-slate-500 capitalize">{p.metodo}</td>
                  <td className="py-3 pl-4">
                    <Badge variant={p.status === 'aprovado' ? 'success' : p.status === 'pendente' ? 'warning' : 'danger'}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3 pl-4 text-slate-500">{new Date(p.created_at).toLocaleDateString('pt-AO')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!pagamentos || pagamentos.length === 0) && (
            <p className="py-12 text-center text-sm text-slate-400">Nenhum pagamento registado.</p>
          )}
        </div>
      </Card>
    </div>
  )
}
