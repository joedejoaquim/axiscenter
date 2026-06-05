'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Bell, Send } from 'lucide-react'

export default function NotificacoesAdminPage() {
  const [mensagem, setMensagem] = useState('')
  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState<'info' | 'alerta' | 'sucesso' | 'promocao'>('info')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const supabase = createClient()

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !mensagem.trim()) return
    setLoading(true)
    setFeedback('')

    // Busca todos os utilizadores activos
    const { data: users } = await supabase
      .from('profiles').select('id').eq('status', 'ativo')

    if (!users || users.length === 0) {
      setFeedback('Nenhum utilizador activo encontrado.')
      setLoading(false)
      return
    }

    const inserts = users.map((u: { id: string }) => ({
      user_id: u.id, titulo, mensagem, tipo,
    }))

    const { error } = await supabase.from('notificacoes').insert(inserts)

    if (error) {
      setFeedback('Erro ao enviar: ' + error.message)
    } else {
      setFeedback(`✅ Notificação enviada a ${users.length} utilizadores.`)
      setTitulo('')
      setMensagem('')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-950">Enviar Notificação</h1>

      <Card padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-2xl bg-[#F97316]/10 p-3">
            <Bell size={20} className="text-[#F97316]" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Notificação global</p>
            <p className="text-sm text-slate-500">Será enviada a todos os utilizadores activos.</p>
          </div>
        </div>

        {feedback && (
          <div className="mb-4 rounded-3xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
            {feedback}
          </div>
        )}

        <form onSubmit={enviar} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Título</label>
            <input
              value={titulo} onChange={e => setTitulo(e.target.value)} required
              placeholder="Ex: Nova funcionalidade disponível"
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Mensagem</label>
            <textarea
              value={mensagem} onChange={e => setMensagem(e.target.value)} required rows={4}
              placeholder="Escreve a mensagem aqui..."
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Tipo</label>
            <select
              value={tipo} onChange={e => setTipo(e.target.value as 'info' | 'alerta' | 'sucesso' | 'promocao')}
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-colors"
            >
              <option value="info">ℹ️ Info</option>
              <option value="sucesso">✅ Sucesso</option>
              <option value="alerta">⚠️ Alerta</option>
              <option value="promocao">🎉 Promoção</option>
            </select>
          </div>
          <Button type="submit" loading={loading} size="lg" className="w-full">
            <Send size={16} className="mr-2" /> Enviar a todos
          </Button>
        </form>
      </Card>
    </div>
  )
}
