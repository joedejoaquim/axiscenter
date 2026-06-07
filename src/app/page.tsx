import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCheckCircle, faGraduationCap, faClipboardList } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <main className="bg-[#F4F7FC]">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={80} height={80} className="rounded-lg" />
          <span className="text-xl font-bold text-[#0D2B5E]">Axis Center</span>
        </div>
        <div />
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="grid gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight text-[#0D2B5E] sm:text-6xl">
              O eixo da sua <span className="text-[#F97316]">evolução</span> começa aqui.
            </h1>

            <div className="rounded-2xl bg-white p-8 shadow-lg border border-slate-200 max-w-2xl">
              <h2 className="text-3xl font-extrabold text-[#0D2B5E]">Prof Hélder</h2>
              <p className="mt-1 text-lg font-semibold text-[#F97316]">Matemática sem limites</p>

              <p className="mt-4 text-slate-700">MATEMÁTICA COMPLETA — APRENDA TODA MATEMÁTICA, DESDE O ZERO, DE UMA VEZ POR TODAS DE FORMA RÁPIDA E EFICIENTE PARA GARANTIR SUA APROVAÇÃO</p>

              <ul className="mt-6 space-y-2 text-slate-700 list-inside">
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />MATEMÁTICA DO BÁSICO AO AVANÇADO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />SIMULADOS POR MÓDULOS</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />AULAS AO VIVO DE REVISÃO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />APRENDA A INTERPRETAR QUESTÕES</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />COMUNIDADE DE ALUNOS</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />ACESSO COMPLETO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />EXERCÍCIOS RESOLVIDOS EM VÍDEO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />ACESSO POR 12 MESES</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />CRONOGRAMA DE ESTUDOS</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" aria-hidden />TODO CONTEÚDO DO SEU EDITAL</li>
              </ul>

              <div className="mt-6">
                <button className="w-full rounded-full bg-[#F97316] px-5 py-3 text-sm font-semibold text-white hover:bg-[#EA6C0A]">ASSINE AGORA!</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#0D2B5E]">Diferenciais do curso</h2>
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-slate-200 max-w-2xl">
              <h3 className="text-xl font-semibold text-[#0D2B5E]">Diferencial do curso</h3>
              <p className="mt-3 text-slate-700 font-semibold">AULAS DIRETAS AO PONTO</p>
              <p className="mt-2 text-slate-600">Vídeos curtos, sem enrolação e focado na resolução de exercícios</p>

              <h3 className="mt-6 text-xl font-semibold text-[#0D2B5E]">Professores</h3>
              <p className="mt-3 text-slate-700 font-semibold">PROFESSORES DISPONÍVEIS</p>
              <p className="mt-2 text-slate-600">A qualquer momento temos professores para ajudar na sua evolução quando você travar em algum exercício</p>

              <h3 className="mt-6 text-xl font-semibold text-[#0D2B5E]">MÉTODO PASSO A PASSO DESDE A MATEMÁTICA BÁSICA</h3>
              <p className="mt-3 text-slate-600">Todo conteúdo de matemática que você precisa para ser aprovado</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#0D2B5E]">Para quem é?</h2>
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-slate-200 max-w-2xl">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-[#0D2B5E]">
                    <FontAwesomeIcon icon={faGraduationCap} className="h-12 w-12" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-[#0D2B5E]">Estudante</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-[#0D2B5E]">
                    <FontAwesomeIcon icon={faClipboardList} className="h-12 w-12" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-[#0D2B5E]">Concurseiro</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-[#0D2B5E]">
                    <FontAwesomeIcon icon={faBookOpen} className="h-12 w-12" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-[#0D2B5E]">Reforço</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-700">quer ser o proximo a paroar</p>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-3 text-sm font-semibold text-white hover:bg-[#EA6C0A]">
                  <span>Avançar</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Removed dashboard preview as requested */}
        </section>

      </div>
    </main>
  )
}
