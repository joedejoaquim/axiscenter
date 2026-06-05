import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CheckSquare } from 'lucide-react'
import { AprovacaoActions } from './AprovacaoActions'

export default async function AprovacoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: pendentes } = await supabase
    .from('profiles').select('id, name, email, role, created_at')
    .eq('status', 'pendente').order('created_at', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Aprovações</h1>
        <p className="mt-1 text-slate-500">{(pendentes ?? []).length} conta(s) pendentes</p>
      </div>

      {(!pendentes || pendentes.length === 0) ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <CheckSquare size={48} className="text-green-300 mb-4" />
          <p className="text-slate-500">Nenhuma conta pendente. Tudo em ordem!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {(pendentes as any[]).map(p => (
            <Card key={p.id} className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-slate-900">{p.name}</p>
                <p className="text-sm text-slate-500">{p.email}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Registado em {new Date(p.created_at).toLocaleDateString('pt-AO')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="warning">{p.role}</Badge>
                <AprovacaoActions userId={p.id} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
