'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRight, faGraduationCap, faStar } from '@fortawesome/free-solid-svg-icons'
import { SectionTitle } from './ui/SectionTitle'
import { FadeIn } from './ui/FadeIn'

const COURSES = [
  {
    tag: 'ENSINO BÁSICO', tagColor: 'bg-[#1E5AA8]',
    title: 'Matemática Ensino de Base',
    desc: 'Conteúdos essenciais de matemática para construir uma base sólida.',
    topics: ['Aritmética', 'Geometria', 'Números e Operações', 'Problemas do dia a dia'],
    illustration: 'basic' as const,
    modalTopics: ['Números e Operações', 'Frações', 'Potência', 'Razões e Proporção'],
    modalDesc: 'Domina os fundamentos da matemática com conteúdos claros e objectivos. Ideal para quem está no ensino de base ou quer reforçar a base antes de avançar.',
  },
  {
    tag: 'ENSINO MÉDIO', tagColor: 'bg-[#F97316]',
    title: 'Matemática Ensino Médio',
    desc: 'Do básico ao avançado para você mandar bem no ensino médio.',
    topics: ['Álgebra', 'Funções', 'Trigonometria', 'Geometria Espacial'],
    illustration: 'medium' as const,
    modalTopics: ['Álgebra', 'Funções', 'Inequações', 'Geometria Plana', 'Geometria Espacial', 'Trigonometria'],
    modalDesc: 'Preparação completa para o ensino médio. Exercícios resolvidos, simulados e aulas didáticas para garantir a tua aprovação.',
  },
  {
    tag: 'SUPERIOR E CONCURSEIROS', tagColor: 'bg-[#0D2B5E]',
    title: 'Matemática Superior e Concursos',
    desc: 'Matemática para universidades e concursos públicos.',
    topics: ['Cálculo', 'Matemática Financeira', 'Raciocínio Lógico', 'Questões de Concursos'],
    illustration: 'superior' as const,
    modalTopics: ['Cálculo', 'Matemática Financeira', 'Raciocínio Lógico', 'Questões de Concursos', 'Estatística', 'Probabilidade'],
    modalDesc: 'Conteúdo avançado para quem quer entrar na universidade ou passar em concursos públicos. Foco em questões práticas e raciocínio rápido.',
  },
]

type Course = typeof COURSES[0]

function CourseIllustration({ type }: { type: Course['illustration'] }) {
  if (type === 'basic') {
    return (
      <div className="flex items-center justify-center h-24 mb-2">
        <div className="relative flex items-end gap-1.5">
          <div className="w-10 h-14 rounded-md bg-gradient-to-b from-orange-400 to-orange-500 shadow-md flex items-center justify-center">
            <span className="text-white text-lg font-black">A</span>
          </div>
          <div className="w-10 h-12 rounded-md bg-gradient-to-b from-blue-500 to-blue-600 shadow-md flex items-center justify-center mb-1">
            <span className="text-white text-lg font-black">B</span>
          </div>
          <div className="w-10 h-16 rounded-md bg-gradient-to-b from-green-400 to-green-500 shadow-md flex items-center justify-center">
            <span className="text-white text-lg font-black">C</span>
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center shadow">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    )
  }
  if (type === 'medium') {
    return (
      <div className="flex items-center justify-center h-24 mb-2">
        <div className="relative">
          <div className="flex items-end gap-1">
            <div className="w-9 h-11 rounded bg-yellow-400 shadow-md" />
            <div className="w-9 h-14 rounded bg-orange-500 shadow-md" />
            <div className="w-9 h-10 rounded bg-emerald-500 shadow-md" />
            <div className="w-9 rounded bg-blue-500 shadow-md" style={{ height: '52px' }} />
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <FontAwesomeIcon icon={faGraduationCap} className="h-6 w-6 text-[#0D2B5E]" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center h-24 mb-2">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0D2B5E] shadow-lg">
          <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-2 w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center shadow">
          <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-white" />
        </div>
      </div>
    </div>
  )
}

function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className={`${course.tagColor} px-6 pt-6 pb-8`}>
          <div className="flex items-start justify-between">
            <span className="inline-block rounded-md bg-white/20 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">{course.tag}</span>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors text-lg font-bold">×</button>
          </div>
          <h2 className="mt-4 text-xl font-black text-white leading-snug">{course.title}</h2>
          <p className="mt-2 text-xs text-white/80 leading-relaxed">{course.modalDesc}</p>
        </div>
        <div className="px-6 py-5">
          <p className="text-xs font-black text-[#0D2B5E] uppercase tracking-widest mb-4">Conteúdo Programático</p>
          <ul className="space-y-3">
            {course.modalTopics.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 text-[10px] font-black text-[#F97316]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-medium text-slate-700">{t}</span>
                <span className="ml-auto"><FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-green-500" /></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <Link href="/checkout" className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#F97316] px-5 py-3 text-sm font-black text-white hover:bg-[#E56E00] transition-colors shadow-md">
            Começar Agora <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Link>
          <button onClick={onClose} className="rounded-full border-2 border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 hover:border-slate-300 transition-colors">
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CoursesSection() {
  const [modalCurso, setModalCurso] = useState<Course | null>(null)

  return (
    <>
      <section id="cursos" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionTitle subtitle="Escolha o caminho ideal para o seu sucesso">NOSSOS CURSOS</SectionTitle>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {COURSES.map((course, i) => (
              <FadeIn key={course.tag} delay={i * 0.12} direction="up">
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(13,43,94,0.12)' }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col h-full"
                >
                  <div className="p-6 pb-4 flex-1">
                    <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wide ${course.tagColor} mb-5`}>
                      {course.tag}
                    </span>
                    <CourseIllustration type={course.illustration} />
                    <h3 className="font-bold text-[#0D2B5E] text-base mb-2">{course.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-5">{course.desc}</p>
                    <ul className="space-y-2.5">
                      {course.topics.map(t => (
                        <li key={t} className="flex items-center gap-2.5 text-xs text-slate-600">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F97316]">
                            <FontAwesomeIcon icon={faCheck} className="h-2 w-2 text-white" />
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                    <button
                      onClick={() => setModalCurso(course)}
                      className="text-xs font-bold text-[#0D2B5E] uppercase tracking-wide group-hover:text-[#F97316] transition-colors"
                    >
                      Ver Curso
                    </button>
                    <button
                      onClick={() => setModalCurso(course)}
                      aria-label={`Ver curso ${course.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0D2B5E] text-[#0D2B5E] group-hover:bg-[#F97316] group-hover:border-[#F97316] group-hover:text-white transition-all"
                    >
                      <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalCurso && <CourseModal course={modalCurso} onClose={() => setModalCurso(null)} />}
      </AnimatePresence>
    </>
  )
}
