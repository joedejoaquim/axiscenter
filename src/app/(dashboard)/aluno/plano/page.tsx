import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { UpgradeButton } from './UpgradeButton'

export default async function PlanoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
  const isPro = profile?.plan === 'pro'

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">O Meu Plano</h1>
        <p className="mt-1 text-slate-500">Plano actual: <span className="font-semibold">{isPro ? 'PRO ✨' : 'Gratuito'}</span></p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Plano Gratuito */}
        <div className={`rounded-[40px] border-2 p-8 ${!isPro ? 'border-[#0D2B5E]' : 'border-slate-200 bg-white'}`}>
          {!isPro && <Badge variant="primary" className="mb-4">Actual</Badge>}
          <h2 className="text-2xl font-bold text-[#0D2B5E]">Grátis</h2>
          <p className="text-3xl font-bold mt-2">Kz 0<span className="text-sm font-normal text-slate-500">/mês</span></p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>✅ 5 cursos básicos</li>
            <li>✅ Comunidade de alunos</li>
            <li>✅ Certificados básicos</li>
            <li className="text-slate-400">❌ Sala de aula ao vivo</li>
            <li className="text-slate-400">❌ +200 cursos</li>
          </ul>
        </div>

        {/* Plano PRO */}
        <div className={`rounded-[40px] border-2 p-8 relative overflow-hidden ${isPro ? 'border-[#F97316] bg-orange-50' : 'border-slate-200 bg-white'}`}>
          {isPro && <Badge variant="accent" className="mb-4">Actual</Badge>}
          <h2 className="text-2xl font-bold text-[#0D2B5E]">PRO ✨</h2>
          <p className="text-3xl font-bold mt-2">Kz 89.900<span className="text-sm font-normal text-slate-500">/mês</span></p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>✅ 200+ cursos premium</li>
            <li>✅ Sala de aula ao vivo</li>
            <li>✅ 30% desconto professores móveis</li>
            <li>✅ Certificados reconhecidos</li>
            <li>✅ Suporte VIP 24/7</li>
          </ul>
          {!isPro && <UpgradeButton />}
        </div>
      </div>
    </div>
  )
}
