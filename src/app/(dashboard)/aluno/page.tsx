import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen, Calendar, Map, TrendingUp } from 'lucide-react'

export default async function AlunoDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const [{ count: totalAgendamentos }, { data: aulasRecentes }] = await Promise.all([
    supabase.from('agendamentos').select('*', { count: 'exact', head: true })
      .eq('aluno_id', user.id).eq('status', 'confirmado'),
    supabase.from('aulas').select('*, profiles(name)').eq('status', 'publicada')
      .order('created_at', { ascending: false }).limit(4),
  ])

  const isPro = profile?.plan === 'pro'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Olá, {profile?.name?.split(' ')[0]} 👋</h1>
          <p className="mt-1 text-slate-500">Bem-vindo ao teu espaço de aprendizagem.</p>
        </div>
        <Badge variant={isPro ? 'accent' : 'neutral'}>{isPro ? 'PRO ✨' : 'Gratuito'}</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Aulas Agendadas', value: totalAgendamentos ?? 0, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
          { label: 'Cursos Disponíveis', value: (aulasRecentes?.length ?? 0) + '+', icon: BookOpen, color: 'text-green-600 bg-green-50' },
          { label: 'Plano Actual', value: isPro ? 'PRO' : 'Grátis', icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
          { label: 'Professores Próximos', value: '42+', icon: Map, color: 'text-purple-600 bg-purple-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <div className="flex items-center gap-4">
              <div className={`rounded-2xl p-3 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-slate-950">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upgrade banner (apenas gratuito) */}
      {!isPro && (
        <div className="relative overflow-hidden rounded-3xl bg-[#0D2B5E] p-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.2),_transparent_40%)]" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-lg">Upgrade para o Plano PRO ✨</p>
              <p className="text-slate-300 text-sm mt-1">Acede a 200+ cursos, sala de aula ao vivo e suporte VIP.</p>
            </div>
            <Link href="/aluno/plano" className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold hover:bg-[#EA6C0A] transition-colors">
              Ver planos
            </Link>
          </div>
        </div>
      )}

      {/* Aulas recentes */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-950">Aulas disponíveis</h2>
          <Link href="/aluno/cursos" className="text-sm font-medium text-[#F97316] hover:underline">Ver todas →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(aulasRecentes ?? []).map((aula: any) => (
            <Card key={aula.id} padding="sm" className="hover:shadow-md transition-shadow">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-[#0D2B5E] to-[#122859] mb-4" />
              <Badge variant={aula.plano === 'pro' ? 'accent' : 'neutral'} className="mb-2">
                {aula.plano === 'pro' ? 'PRO' : 'Grátis'}
              </Badge>
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">{aula.titulo}</h3>
              <p className="text-xs text-slate-500 mt-1">{aula.profiles?.name}</p>
              <Link
                href={`/aluno/cursos/${aula.id}`}
                className="mt-3 inline-flex w-full justify-center rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-semibold text-[#0D2B5E] hover:bg-slate-100 transition-colors"
              >
                Ver aula
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { href: '/aluno/mapa', label: 'Encontrar professor próximo', icon: Map },
          { href: '/aluno/agenda', label: 'Ver minha agenda', icon: Calendar },
          { href: '/aluno/cursos', label: 'Explorar cursos', icon: BookOpen },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="flex items-center gap-3 hover:border-[#F97316]/30 hover:shadow-md transition-all cursor-pointer">
              <div className="rounded-2xl bg-[#F97316]/10 p-3">
                <Icon size={18} className="text-[#F97316]" />
              </div>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
