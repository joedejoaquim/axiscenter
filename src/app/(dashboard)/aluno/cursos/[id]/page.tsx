import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Clock, Users, Play } from 'lucide-react'

export default async function CursoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()

  const { data: aula } = await supabase
    .from('aulas')
    .select('*, profiles(name, avatar_url, bio, rating)')
    .eq('id', id)
    .single()

  if (!aula || aula.status !== 'publicada') redirect('/aluno/cursos')

  const bloqueado = aula.plano === 'pro' && profile?.plan !== 'pro'

  return (
    <div className="max-w-3xl space-y-6">
      {/* Thumbnail */}
      <div className="h-56 w-full rounded-3xl bg-gradient-to-br from-[#0D2B5E] via-[#122859] to-slate-800 flex items-center justify-center">
        <Play size={48} className="text-white/30" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={aula.plano === 'pro' ? 'accent' : 'neutral'}>{aula.plano === 'pro' ? 'PRO' : 'Grátis'}</Badge>
            <Badge variant="neutral">{aula.tipo === 'ao_vivo' ? '📡 Ao Vivo' : '🎬 Gravada'}</Badge>
          </div>
          <h1 className="text-2xl font-bold text-slate-950">{aula.titulo}</h1>
          {aula.descricao && <p className="mt-2 text-slate-600">{aula.descricao}</p>}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5"><Clock size={14} />{aula.duracao_min} min</span>
        <span className="flex items-center gap-1.5"><Users size={14} />{aula.matriculas} matrículas</span>
        {aula.materia && <span className="capitalize">{aula.materia}</span>}
      </div>

      {/* Professor */}
      <Card className="flex items-center gap-4">
        <Avatar src={aula.profiles?.avatar_url} name={aula.profiles?.name} size="lg" />
        <div>
          <p className="font-semibold text-slate-900">{aula.profiles?.name}</p>
          {aula.profiles?.bio && <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{aula.profiles.bio}</p>}
          {aula.profiles?.rating != null && aula.profiles.rating > 0 && <p className="text-sm text-[#F97316] mt-1">⭐ {aula.profiles.rating}</p>}
        </div>
      </Card>

      {/* CTA */}
      {bloqueado ? (
        <div className="rounded-3xl bg-[#0D2B5E] p-6 text-white flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold">Esta aula requer o Plano PRO</p>
            <p className="text-sm text-white/70 mt-1">Faz upgrade para ter acesso ilimitado a 200+ cursos.</p>
          </div>
          <Link href="/aluno/plano" className="rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA6C0A] transition-colors shrink-0">
            Ver planos
          </Link>
        </div>
      ) : aula.tipo === 'ao_vivo' && aula.sala_nome ? (
        <Link href={`/aluno/sala/${aula.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F97316] px-6 py-4 text-base font-semibold text-white hover:bg-[#EA6C0A] transition-colors">
          <Play size={18} /> Entrar na Sala
        </Link>
      ) : aula.video_url ? (
        <a href={aula.video_url} target="_blank" rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F97316] px-6 py-4 text-base font-semibold text-white hover:bg-[#EA6C0A] transition-colors">
          <Play size={18} /> Assistir Aula
        </a>
      ) : (
        <Card className="text-center text-slate-400 py-8">Conteúdo ainda não disponível.</Card>
      )}
    </div>
  )
}
