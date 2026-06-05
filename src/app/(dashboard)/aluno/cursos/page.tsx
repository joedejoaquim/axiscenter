import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default async function CursosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
  const { data: aulas } = await supabase
    .from('aulas').select('*, profiles(name, avatar_url, rating)')
    .eq('status', 'publicada').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Cursos</h1>
        <p className="mt-1 text-slate-500">Explora todas as aulas disponíveis para o teu plano.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(aulas ?? []).map((aula: { id: string; plano: string; titulo: string; descricao?: string; profiles?: { name: string; rating?: number } }) => {
          const bloqueado = aula.plano === 'pro' && profile?.plan !== 'pro'
          return (
            <Card key={aula.id} className={bloqueado ? 'opacity-70' : ''}>
              <div className="h-40 rounded-2xl bg-gradient-to-br from-[#0D2B5E] to-slate-700 mb-4 relative overflow-hidden">
                {bloqueado && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
                    <span className="text-white text-xs font-semibold">🔒 Plano PRO</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={aula.plano === 'pro' ? 'accent' : 'neutral'}>
                  {aula.plano === 'pro' ? 'PRO' : 'Grátis'}
                </Badge>
                {aula.profiles?.rating != null && aula.profiles.rating > 0 && (
                  <span className="text-xs text-slate-500">⭐ {aula.profiles.rating}</span>
                )}
              </div>
              <h3 className="font-semibold text-slate-900">{aula.titulo}</h3>
              <p className="text-xs text-slate-500 mt-1">{aula.profiles?.name}</p>
              {aula.descricao && <p className="text-sm text-slate-600 mt-2 line-clamp-2">{aula.descricao}</p>}
              {bloqueado ? (
                <Link href="/aluno/plano" className="mt-4 inline-flex w-full justify-center rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#EA6C0A] transition-colors">
                  Fazer upgrade
                </Link>
              ) : (
                <Link href={`/aluno/cursos/${aula.id}`} className="mt-4 inline-flex w-full justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[#0D2B5E] hover:bg-slate-50 transition-colors">
                  Aceder à aula
                </Link>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
