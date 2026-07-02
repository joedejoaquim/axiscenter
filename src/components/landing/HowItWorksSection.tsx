'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus, faPlay, faShoppingCart, faBook, faMedal,
  faArrowRight, faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { SectionTitle } from './ui/SectionTitle'
import { FadeIn } from './ui/FadeIn'

const STEPS = [
  { icon: faUserPlus,     num: '1', label: 'Crie sua conta',          desc: 'É rápido e fácil.' },
  { icon: faPlay,         num: '2', label: 'Explore grátis',          desc: 'Assista algumas aulas gratuitas.' },
  { icon: faShoppingCart, num: '3', label: 'Escolha seu plano',       desc: 'Escolha o plano que cabe no seu bolso.' },
  { icon: faBook,         num: '4', label: 'Acesse o conteúdo',       desc: 'Tenha acesso completo às aulas e materiais.' },
  { icon: faMedal,        num: '5', label: 'Conquiste sua aprovação!', desc: 'Estude, pratique e alcance seus objetivos.' },
]

const PROFESSOR_TRAITS = [
  'Didática simples e eficiente',
  'Aulas claras e objetivas',
  'Compromisso com o seu sucesso',
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <SectionTitle>COMO FUNCIONA</SectionTitle>
        </FadeIn>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          {/* Steps */}
          <FadeIn direction="left">
            <div className="overflow-x-auto pb-2">
              <div className="flex items-start gap-1 sm:gap-2 min-w-[540px]">
                {STEPS.map(({ icon, num, label, desc }, i) => (
                  <div key={num} className="flex items-start">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex flex-col items-center gap-1.5 w-[90px] sm:w-[100px]"
                    >
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#F97316] text-white shadow-md">
                        <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-black text-[#0D2B5E]">{num}</p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-[#0D2B5E] text-center leading-tight">{label}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 text-center leading-tight">{desc}</p>
                    </motion.div>
                    {i < STEPS.length - 1 && (
                      <div className="flex items-center pt-5 px-0.5 sm:px-1">
                        <div className="w-4 sm:w-6 border-t-2 border-dashed border-slate-300" />
                        <FontAwesomeIcon icon={faArrowRight} className="h-2.5 w-2.5 text-slate-300 -ml-0.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Professor card */}
          <FadeIn direction="right">
            <div className="rounded-2xl bg-[#0D2B5E] overflow-hidden shadow-xl">
              <div className="flex flex-col sm:flex-row">
                {/* Photo */}
                <div className="sm:w-[42%] bg-gradient-to-b from-[#1E5AA8] to-[#0D2B5E] min-h-[200px] sm:min-h-0 flex items-end justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/pessoa3.png"
                    alt="Professor Hélder"
                    className="w-full object-cover object-top"
                    style={{ minHeight: '200px', maxHeight: '260px' }}
                  />
                </div>
                {/* Info */}
                <div className="sm:w-[58%] p-5 flex flex-col gap-3.5">
                  <p className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest">
                    Conheça o Professor Hélder
                  </p>
                  <h3 className="font-black text-base text-white uppercase tracking-wide leading-tight">
                    Professor de Matemática
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed">
                    Com anos de experiência e milhares de alunos aprovados.
                  </p>
                  <ul className="space-y-2">
                    {PROFESSOR_TRAITS.map(t => (
                      <li key={t} className="flex items-center gap-2 text-xs text-white/90">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F97316]">
                          <FontAwesomeIcon icon={faCheck} className="h-2 w-2 text-white" />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#F97316] px-4 py-2.5 text-xs font-bold text-white uppercase tracking-wide hover:bg-[#EA6C0A] active:scale-95 transition-all">
                    Saiba Mais <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
