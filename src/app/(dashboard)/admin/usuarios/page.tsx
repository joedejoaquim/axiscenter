import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SuspenderButton } from './SuspenderButton'

export default async function UsuariosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: usuarios } = await supabase
    .from('profiles').select('id, name, email, role, plan, status, created_at')
    .order('created_at', { ascending: false })

  const roleColor: Record<string, any> = {
    admin: 'primary', aluno: 'success', 'professor-online': 'accent', 'professor-movel': 'warning',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Utilizadores</h1>
        <p className="mt-1 text-slate-500">{(usuarios ?? []).length} utilizadores registados</p>
      </div>

      <Card padding="sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="pb-3 pl-4 font-semibold text-slate-500">Nome</th>
                <th className="pb-3 font-semibold text-slate-500">Role</th>
                <th className="pb-3 font-semibold text-slate-500">Plano</th>
                <th className="pb-3 font-semibold text-slate-500">Estado</th>
                <th className="pb-3 font-semibold text-slate-500">Registado</th>
                <th className="pb-3 font-semibold text-slate-500">Acção</th>
              </tr>
            </thead>
            <tbody>
              {(usuarios as any[] ?? []).map(u => (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3 pl-4">
                    <p className="font-medium text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </td>
                  <td className="py-3"><Badge variant={roleColor[u.role] ?? 'neutral'}>{u.role}</Badge></td>
                  <td className="py-3"><Badge variant={u.plan === 'pro' ? 'accent' : 'neutral'}>{u.plan}</Badge></td>
                  <td className="py-3">
                    <Badge variant={u.status === 'ativo' ? 'success' : u.status === 'pendente' ? 'warning' : 'danger'}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-slate-500">{new Date(u.created_at).toLocaleDateString('pt-AO')}</td>
                  <td className="py-3">
                    {u.status === 'ativo' && <SuspenderButton userId={u.id} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
