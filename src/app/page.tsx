'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, X } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCheckCircle, faGraduationCap, faClipboardList, faQuestionCircle, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="bg-[#F4F7FC]">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={80} height={80} className="rounded-lg" />
          <span className="text-xl font-bold text-[#0D2B5E]">Axis Center</span>
        </div>
        <div>
          <Link href="/faq" className="inline-flex items-center rounded-full bg-slate-100 p-3 text-[#0D2B5E] hover:bg-slate-200" aria-label="FAQ">
            <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="grid gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-[#0D2B5E] sm:text-5xl">
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
            <div className="rounded-2xl bg-slate-950 p-8 shadow-lg border border-slate-900 max-w-2xl text-white">
              <div className="rounded-3xl bg-white p-6 text-[#0D2B5E] shadow-sm">
                <h3 className="text-xl font-semibold">Diferencial do curso</h3>
                <p className="mt-3 font-semibold">AULAS DIRETAS AO PONTO</p>
                <p className="mt-2">Vídeos curtos, sem enrolação e focado na resolução de exercícios</p>
              </div>

              <div className="mt-6 rounded-3xl bg-white p-6 text-[#0D2B5E] shadow-sm">
                <h3 className="text-xl font-semibold">Professores</h3>
                <p className="mt-3 font-semibold">PROFESSORES DISPONÍVEIS</p>
                <p className="mt-2">A qualquer momento temos professores para ajudar na sua evolução quando você travar em algum exercício</p>
              </div>

              <div className="mt-6 rounded-3xl bg-white p-6 text-[#0D2B5E] shadow-sm">
                <h3 className="text-xl font-semibold">MÉTODO PASSO A PASSO DESDE A MATEMÁTICA BÁSICA</h3>
                <p className="mt-3">Todo conteúdo de matemática que você precisa para ser aprovado</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#0D2B5E]">Para quem é?</h2>
            <div className="rounded-2xl bg-[#F97316] p-8 shadow-lg border border-slate-200 max-w-2xl">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-[#0D2B5E]">
                    <FontAwesomeIcon icon={faGraduationCap} className="h-12 w-12" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-[#0D2B5E]">ESTUDANTE DO ENSINO DE BASE, MÉDIO E SUPERIOR</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-[#0D2B5E]">
                    <FontAwesomeIcon icon={faClipboardList} className="h-12 w-12" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-[#0D2B5E]">CONCURSEIROS</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-[#0D2B5E]">
                    <FontAwesomeIcon icon={faBookOpen} className="h-12 w-12" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-[#0D2B5E]">ESTUDANTE QUE PRECISAM DE REFORÇO EM MATEMÁTICA</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-700">Quer ser o próximo a aprovar?</p>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#0D2B5E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0b2548]">
                  <span>Avançar</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-200 max-w-2xl">
              <h3 className="text-2xl font-bold text-[#0D2B5E]">CURSO DE MATEMÁTICA COMPLETA</h3>
              <p className="text-xl font-extrabold text-[#0D2B5E]">BOBERA</p>

              <ul className="mt-4 space-y-3 text-slate-700">
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />MATEMÁTICA DO BÁSICO AO AVANÇADO</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />APRENDA COMO INTERPRETAR QUESTÕES</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />SIMULADO POR MÓDULO</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />LISTA DE EXERCÍCIOS</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />COMUNIDADE DE AMIGOS AJUDA AMIGOS</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />GABARITOS COMENTADOS</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />ACESSO A TODAS AS AULAS</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />EXERCÍCIOS RESOLVIDOS EM VÍDEOS</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />ACESSO POR UM ANO</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />CRONOGRAMA DE ESTUDOS</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />TODO CONTEÚDO DO SEU EDITAL</li>
              </ul>

              <div className="mt-4 border-t pt-4">
                <p className="text-lg font-semibold text-[#0D2B5E]">27.000 Kz à vista ou apenas 12× de 3500 Kz</p>
                <div className="mt-4">
                  <button className="w-full rounded-full bg-[#0D2B5E] px-5 py-3 text-sm font-extrabold text-white">QUERO SER ALUNO</button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-200 max-w-2xl">
              <h3 className="text-2xl font-bold text-[#0D2B5E]">CURSO DE MATEMÁTICA COMPLETA</h3>
              <p className="text-xl font-extrabold text-[#F97316]">MATEMÁTICA PREMIUM</p>

              <ul className="mt-4 space-y-3 text-slate-700">
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />TUDO QUE TEM NO CURSO</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />ESTILO NETFLIX</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />PLANOS DE ESTUDO PERSONALIZADO</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />+ 5.000 QUESTÕES DE MATEMÁTICA COM RESOLUÇÃO PASSO A PASSO</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />REVISÕES PLANEJADAS</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />RELATÓRIO DE DESEMPENHO DO ALUNO</li>
                <li className="flex items-start gap-3"><FontAwesomeIcon icon={faThumbsUp} className="text-emerald-500 h-4 w-4 flex-shrink-0 mt-1" />CADERNOS DIGITAIS</li>
              </ul>

              <p className="mt-4 text-slate-700 text-sm">Clique abaixo e conheça o curso mais completo do professor Hélder, que te transforma numa máquina de acertar questões</p>

              <div className="mt-4">
                <button className="w-full rounded-full bg-[#0D2B5E] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#0b2548]">QUERO SER ALUNO</button>
              </div>

              <div className="mt-4">
                <button onClick={() => setIsModalOpen(true)} className="w-full text-center rounded-full bg-transparent px-5 py-3 text-sm font-semibold text-[#0D2B5E] hover:underline">Quer conhecer o plano do curso ➡️</button>
              </div>
            </div>
          </div>

          {/* Removed dashboard preview as requested */}
        </section>

      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-[#F97316] to-[#F97316]/80 p-8 text-center shadow-lg">
          <p className="text-lg font-semibold text-white mb-4">
            Quer experimentar GRATUITAMENTE algumas aulas que já estão disponíveis dentro do curso Bobera?
          </p>
          <button className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#F97316] hover:bg-slate-100">
            Experimentar agora
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative rounded-2xl bg-white max-w-4xl w-full mx-4 p-8 shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-[#0D2B5E] mb-8 text-center">O QUE VOCÊ VAI ESTUDAR</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3">
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Matemática Básica
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Conjuntos
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Potenciação e Radiciação
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Razões e proporções
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Percentagem e Juros
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Equações
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Análise Combinatória
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Probabilidade
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Exponencial e Logaritmos
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Cálculos de Integrais
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-3">
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Progressão Aritmética
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Progressão Geométrica
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Geometria Plana
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Geometria Espacial
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Geometria Analítica
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Matrizes e Determinantes
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Polinômios
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Estatística
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Números Complexos
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-[#0D2B5E] font-bold">•</span> Trigonometria
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
