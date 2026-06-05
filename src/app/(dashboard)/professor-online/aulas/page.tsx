import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Plus, Video } from 'lucide-react'

export default async function AulasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: aulas } = await supabase
    .from('aulas').select('*').eq('professor_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-950">As Minhas Aulas</h1>
        <Link href="/professor-online/aulas/nova" className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#EA6C0A] transition-colors">
          <Plus size={16} /> Nova Aula
        </Link>
      </div>

      {(!aulas || aulas.length === 0) ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <Video size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500">Ainda não criaste nenhuma aula.</p>
          <Link href="/professor-online/aulas/nova" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#EA6C0A] transition-colors">
            <Plus size={14} /> Criar primeira aula
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {aulas.map((aula: any) => (
            <Card key={aula.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#0D2B5E] to-slate-700" />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{aula.titulo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{aula.tipo === 'ao_vivo' ? '📡 Ao Vivo' : '🎬 Gravada'}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{aula.matriculas} matrículas</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={aula.status === 'publicada' ? 'success' : aula.status === 'rascunho' ? 'warning' : 'neutral'}>
                  {aula.status}
                </Badge>
                <Link href={`/professor-online/aulas/${aula.id}`}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Editar
                </Link>
                {aula.status === 'publicada' && aula.sala_nome && (
                  <Link href={`/professor-online/sala/${aula.id}`}
                    className="rounded-2xl bg-[#0D2B5E] px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
                    Entrar
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
