import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'

export default async function AvaliacoesAdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: avaliacoes } = await supabase
    .from('avaliacoes')
    .select(`
      *,
      aluno:profiles!avaliacoes_aluno_id_fkey(name),
      professor:profiles!avaliacoes_professor_id_fkey(name)
    `)
    .order('created_at', { ascending: false })

  const media = (avaliacoes ?? []).length > 0
    ? ((avaliacoes ?? []).reduce((acc: number, a: { nota: number }) => acc + a.nota, 0) / (avaliacoes ?? []).length).toFixed(1)
    : '—'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Avaliações</h1>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-xs text-slate-500">Média geral</p>
          <p className="text-2xl font-bold text-[#F97316]">⭐ {media}</p>
        </div>
      </div>

      <div className="space-y-3">
        {(!avaliacoes || avaliacoes.length === 0) ? (
          <Card className="py-16 text-center">
            <p className="text-slate-400">Nenhuma avaliação registada.</p>
          </Card>
        ) : (avaliacoes as Array<{ id: string; aluno?: { name: string }; professor?: { name: string }; comentario?: string; created_at: string; nota: number }>).map(av => (
          <Card key={av.id} className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-900">{av.aluno?.name ?? 'Aluno'}</span>
                <span className="text-slate-400 text-sm">→</span>
                <span className="font-semibold text-slate-900">{av.professor?.name ?? 'Professor'}</span>
              </div>
              {av.comentario && <p className="text-sm text-slate-600 italic">&ldquo;{av.comentario}&rdquo;</p>}
              <p className="text-xs text-slate-400 mt-1">{new Date(av.created_at).toLocaleDateString('pt-AO')}</p>
            </div>
            <div className="flex items-center gap-1 text-[#F97316] shrink-0">
              {'★'.repeat(av.nota)}{'☆'.repeat(5 - av.nota)}
              <span className="ml-1 text-sm font-bold text-slate-700">{av.nota}/5</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
