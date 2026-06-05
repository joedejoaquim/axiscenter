'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Settings } from 'lucide-react'

export default function ConfiguracoesAdminPage() {
  const [form, setForm] = useState({
    nome_plataforma: 'Axis Education Group',
    email_suporte: '',
    preco_pro: '89900',
    comissao_professor: '20',
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.from('configuracoes').select('*').single().then(({ data }) => {
      if (data) setForm(f => ({ ...f, ...data }))
    })
  }, [supabase])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('configuracoes').upsert({ id: 1, ...form })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    setLoading(false)
  }

  const inputCls = 'w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-950 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors'

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings size={24} className="text-[#0D2B5E]" />
        <h1 className="text-2xl font-bold text-slate-950">Configurações</h1>
      </div>

      {saved && (
        <div className="rounded-3xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
          ✅ Configurações guardadas com sucesso.
        </div>
      )}

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Nome da Plataforma</label>
            <input className={inputCls} value={form.nome_plataforma} onChange={e => set('nome_plataforma', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email de Suporte</label>
            <input type="email" className={inputCls} value={form.email_suporte} onChange={e => set('email_suporte', e.target.value)} placeholder="suporte@axis.ao" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">Preço Plano PRO (Kz)</label>
              <input type="number" className={inputCls} value={form.preco_pro} onChange={e => set('preco_pro', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Comissão Professor (%)</label>
              <input type="number" min="0" max="100" className={inputCls} value={form.comissao_professor} onChange={e => set('comissao_professor', e.target.value)} />
            </div>
          </div>
          <Button type="submit" loading={loading} size="lg">
            Guardar configurações
          </Button>
        </form>
      </Card>
    </div>
  )
}
