import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FC] py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[#0D2B5E] hover:underline">
            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" aria-hidden />
            <span>Voltar</span>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-[#0D2B5E] mb-6">Perguntas Frequentes</h1>

        <div className="space-y-4">
          <details className="rounded-md bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2">Terei acesso por quanto tempo? <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-4 w-4 text-slate-500" /></summary>
            <p className="mt-3 text-slate-700">Você terá acesso por 12 meses de acesso ilimitado a todo conteúdo do curso</p>
          </details>

          <details className="rounded-md bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2">Posso assistir de qualquer lugar? <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-4 w-4 text-slate-500" /></summary>
            <p className="mt-3 text-slate-700">Sim, você pode baixar todas as aulas para assistir offline e de qualquer dispositivo</p>
          </details>

          <details className="rounded-md bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2">O curso serve para quem não sabe nada de Matemática? <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-4 w-4 text-slate-500" /></summary>
            <p className="mt-3 text-slate-700">Sim, o método eixo ensina desde a matemática básica até conceitos mais avançados, com foco nos vestibulares</p>
          </details>

          <details className="rounded-md bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2">Tem professor para tirar dúvidas? <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-4 w-4 text-slate-500" /></summary>
            <p className="mt-3 text-slate-700">Sim, Temos monitores em nossa comunidade disponíveis para tirar qualquer dúvida sua em resoluções de questões</p>
          </details>

          <details className="rounded-md bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2">Tem videoaulas? <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-4 w-4 text-slate-500" /></summary>
            <p className="mt-3 text-slate-700">Sim, o curso é baseado em aulas ministradas pelo Prof. Hélder, mas além das aulas você tem acesso a toda gama de materiais que o curso fornece, desde listas até simulados.</p>
          </details>

          <details className="rounded-md bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2">Vale a pena entrar no curso? <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-4 w-4 text-slate-500" /></summary>
            <p className="mt-3 text-slate-700">Com certeza. Pois o curso é 100% focado em matemática, oferecendo assim um aprendizado mais aprofundado, além de estudar com um professor que explica o conteúdo de forma leve e compreensível.</p>
          </details>

          <details className="rounded-md bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2">Quais são os Métodos de pagamento? <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-4 w-4 text-slate-500" /></summary>
            <p className="mt-3 text-slate-700">Você pode fazer pagamento via multicaixa Express ou transferência bancária pelo nosso IBAN para ser liberado o acesso na hora. Via Express pode levar até 3 dias para confirmação do acesso na plataforma.</p>
          </details>
        </div>
      </div>
    </main>
  )
}
