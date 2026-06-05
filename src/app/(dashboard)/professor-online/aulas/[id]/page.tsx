'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Trash2 } from 'lucide-react'

export default function EditarAulaPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [aula, setAula] = useState<any>(null)

  useEffect(() => {
    supabase.from('aulas').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setAula(data)
      setLoading(false)
    })
    setLoading(true)
  }, [id])

  const set = (k: string, v: any) => setAula((a: any) => ({ ...a, [k]: v }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error: err } = await supabase.from('aulas').update({
      titulo: aula.titulo,
      descricao: aula.descricao,
      materia: aula.materia,
      tipo: aula.tipo,
      plano: aula.plano,
      duracao_min: aula.duracao_min,
      status: aula.status,
    }).eq('id', id)

    if (err) setError(err.message)
    else router.push('/professor-online/aulas')
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('Apagar esta aula permanentemente?')) return
    await supabase.from('aulas').delete().eq('id', id)
    router.push('/professor-online/aulas')
  }

  if (loading || !aula) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin h-8 w-8 rounded-full border-4 border-slate-200 border-t-[#F97316]" /></div>
  }

  const inputCls = 'w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors'

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Editar Aula</h1>
        <Badge variant={aula.status === 'publicada' ? 'success' : aula.status === 'rascunho' ? 'warning' : 'neutral'}>
          {aula.status}
        </Badge>
      </div>

      {error && <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <Card padding="lg">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Título *</label>
            <input className={inputCls} value={aula.titulo ?? ''} onChange={e => set('titulo', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Descrição</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={aula.descricao ?? ''} onChange={e => set('descricao', e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">Matéria</label>
              <input className={inputCls} value={aula.materia ?? ''} onChange={e => set('materia', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Duração (min)</label>
              <input type="number" min={15} max={240} className={inputCls} value={aula.duracao_min ?? 60} onChange={e => set('duracao_min', Number(e.target.value))} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Tipo</label>
              <select className={inputCls} value={aula.tipo} onChange={e => set('tipo', e.target.value)}>
                <option value="gravada">Gravada</option>
                <option value="ao_vivo">Ao Vivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Plano</label>
              <select className={inputCls} value={aula.plano} onChange={e => set('plano', e.target.value)}>
                <option value="gratuito">Gratuito</option>
                <option value="pro">PRO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Estado</label>
              <select className={inputCls} value={aula.status} onChange={e => set('status', e.target.value)}>
                <option value="rascunho">Rascunho</option>
                <option value="publicada">Publicada</option>
                <option value="arquivada">Arquivada</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" loading={saving}>Guardar</Button>
            <button type="button" onClick={handleDelete}
              className="ml-auto flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors">
              <Trash2 size={14} /> Apagar
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
