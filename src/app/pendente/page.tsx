import Link from 'next/link'
import { Clock } from 'lucide-react'

export default function PendentePage() {
  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-50">
          <Clock size={36} className="text-yellow-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-950">Conta em análise</h1>
        <p className="mt-4 text-slate-600">
          A tua conta de professor está a ser analisada pela nossa equipa. Receberás um email assim que for aprovada.
        </p>
        <p className="mt-3 text-sm text-slate-400">Tempo médio de aprovação: 24–48 horas.</p>
        <Link
          href="/login"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-[#0D2B5E] px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          Voltar ao login
        </Link>
      </div>
    </div>
  )
}
