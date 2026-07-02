'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faHeadset, faFileAlt, faChartLine, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { FadeIn } from './ui/FadeIn'

const FEATURES = [
  { icon: faVideo,     title: 'Aulas Objetivas',         desc: 'Direto ao ponto, sem enrolação.' },
  { icon: faHeadset,   title: 'Suporte Rápido',           desc: 'Professores disponíveis para tirar suas dúvidas.' },
  { icon: faFileAlt,   title: 'Exercícios Resolvidos',    desc: 'Aprenda praticando com exercícios comentados.' },
  { icon: faChartLine, title: 'Simulados',                desc: 'Teste seus conhecimentos e acompanhe seu progresso.' },
  { icon: faMobileAlt, title: 'Acesso em Qualquer Lugar', desc: 'Estude quando e onde quiser, pelo celular ou PC.' },
]

export function WhySection() {
  return (
    <section id="sobre" className="py-14 sm:py-16 bg-[#0D2B5E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-xl sm:text-2xl font-black text-white mb-12 uppercase tracking-wide">
            Por Que Estudar na <span className="text-[#F97316]">Axis Center</span>?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {FEATURES.map(({ icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.1} direction="up">
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#081a3d] border border-white/10 text-[#F97316] shadow-inner group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-all duration-300">
                  <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-[11px] text-white/55 leading-relaxed max-w-[160px]">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
