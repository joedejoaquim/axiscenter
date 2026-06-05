'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function NovaAulaPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    titulo: '', descricao: '', materia: '',
    tipo: 'gravada', plano: 'gratuito', duracao_min: 60,
  })

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.titulo.trim()) { setError('O título é obrigatório.'); return }
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error: err } = await supabase.from('aulas').insert({
      ...form,
      professor_id: user.id,
      sala_nome: `axis-${Date.now()}`,
      status: 'rascunho',
    })

    if (err) { setError(err.message); setLoading(false); return }
    router.push('/professor-online/aulas')
  }

  const inputCls = 'w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors'

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-950">Nova Aula</h1>
      {error && <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Título *</label>
            <input className={inputCls} value={form.titulo} onChange={e => set('titulo', e.target.value)} placeholder="Ex: Matemática para o 12.º ano" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Descrição</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.descricao} onChange={e => set('descricao', e.target.value)} placeholder="Descreve o conteúdo da aula..." />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">Matéria</label>
              <input className={inputCls} value={form.materia} onChange={e => set('materia', e.target.value)} placeholder="Ex: Matemática" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Duração (min)</label>
              <input type="number" min={15} max={240} className={inputCls} value={form.duracao_min} onChange={e => set('duracao_min', Number(e.target.value))} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">Tipo</label>
              <select className={inputCls} value={form.tipo} onChange={e => set('tipo', e.target.value)}>
                <option value="gravada">Gravada</option>
                <option value="ao_vivo">Ao Vivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Plano</label>
              <select className={inputCls} value={form.plano} onChange={e => set('plano', e.target.value)}>
                <option value="gratuito">Gratuito</option>
                <option value="pro">PRO</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" loading={loading}>Criar Aula</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
