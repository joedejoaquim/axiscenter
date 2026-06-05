import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Users, CheckSquare, CreditCard, Star } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { count: totalAlunos },
    { count: totalProfOnline },
    { count: totalProfMovel },
    { count: totalPendentes },
    { data: pagamentos },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'aluno'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'professor-online'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'professor-movel'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'pendente'),
    supabase.from('pagamentos').select('valor').eq('status', 'aprovado'),
  ])

  const receita = (pagamentos ?? []).reduce((acc: number, p: any) => acc + Number(p.valor), 0)

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-950">Painel Admin</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Alunos', value: totalAlunos ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50', href: '/admin/usuarios' },
          { label: 'Prof. Online', value: totalProfOnline ?? 0, icon: Users, color: 'text-green-600 bg-green-50', href: '/admin/usuarios' },
          { label: 'Prof. Móvel', value: totalProfMovel ?? 0, icon: Users, color: 'text-purple-600 bg-purple-50', href: '/admin/usuarios' },
          { label: 'Receita Total', value: `${receita.toLocaleString('pt-AO')} Kz`, icon: CreditCard, color: 'text-orange-600 bg-orange-50', href: '/admin/pagamentos' },
        ].map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`rounded-2xl p-3 ${color}`}><Icon size={20} /></div>
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="text-2xl font-bold text-slate-950">{value}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Aprovações pendentes */}
      {(totalPendentes ?? 0) > 0 && (
        <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare size={22} className="text-yellow-600" />
            <div>
              <p className="font-semibold text-yellow-800">{totalPendentes} conta(s) a aguardar aprovação</p>
              <p className="text-sm text-yellow-600">Professores que precisam de validação para começar a trabalhar.</p>
            </div>
          </div>
          <Link href="/admin/aprovacoes" className="rounded-full bg-yellow-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-700 transition-colors">
            Analisar
          </Link>
        </div>
      )}

      {/* Atalhos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: '/admin/aprovacoes', label: 'Aprovações', icon: CheckSquare },
          { href: '/admin/pagamentos', label: 'Pagamentos', icon: CreditCard },
          { href: '/admin/avaliacoes', label: 'Avaliações', icon: Star },
          { href: '/admin/configuracoes', label: 'Configurações', icon: Users },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="flex items-center gap-3 hover:border-[#F97316]/30 hover:shadow-md transition-all cursor-pointer">
              <div className="rounded-2xl bg-[#F97316]/10 p-3"><Icon size={18} className="text-[#F97316]" /></div>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
