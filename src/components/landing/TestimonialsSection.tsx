'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { SectionTitle } from './ui/SectionTitle'
import { FadeIn } from './ui/FadeIn'

const TESTIMONIALS = [
  {
    name: 'Juliana M.', role: 'Estudante',
    text: '"As aulas do professor Hélder são simplesmente incríveis! Consegui entender o que nunca tinha entendido antes."',
    img: '/assets/pessoa2.png',
  },
  {
    name: 'Carlos A.', role: 'Aprovado em Engenharia',
    text: '"Graças à Axis Center fui aprovado no exame de admissão! Recomendo a todos que querem resultados de verdade."',
    img: '/assets/pessoa3.png',
  },
  {
    name: 'Mariana K.', role: 'Estudante de Medicina',
    text: '"A plataforma é excelente, o suporte é rápido e os conteúdos são muito completos. Vale cada centavo!"',
    img: '/assets/pessoa4.png',
  },
]

export function TestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="depoimentos" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <SectionTitle>O QUE NOSSOS ALUNOS DIZEM</SectionTitle>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          <AnimatePresence mode="wait">
            {TESTIMONIALS.map(({ name, role, text, img }, idx) => (
              <FadeIn key={name} delay={idx * 0.12} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <span className="text-5xl leading-none text-[#F97316]/20 font-serif mb-2 select-none">"</span>
                  <p className="text-sm text-slate-600 italic leading-relaxed mb-6 flex-1">{text}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={name}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-[#F97316]/30"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#0D2B5E]">{name}</p>
                      <p className="text-xs text-slate-400">{role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="h-3 w-3 text-[#F97316]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Depoimento ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'bg-[#F97316] w-6 h-2.5'
                  : 'bg-slate-300 w-2.5 h-2.5 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
