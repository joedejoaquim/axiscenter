'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export function HeroSection() {
  return (
    <div className="relative z-10 flex-1 flex items-start pt-4 sm:pt-6">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-8 items-center">

          {/* Left: copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-5">
            <motion.span
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block rounded-full bg-[#C45100] px-5 py-1.5 text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.22em]"
            >
              Do Básico ao Avançado
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-extrabold leading-[1.05] uppercase tracking-tight text-[1.5rem] sm:text-3xl md:text-4xl xl:text-[2.6rem] 2xl:text-[3rem]"
            >
              <span className="block text-white">Domine Matemática</span>
              <span className="block text-[#FF7A00]">E Garanta Sua Aprovação!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-white/75 text-sm sm:text-base max-w-[550px] leading-relaxed"
            >
              Aulas didáticas, exercícios resolvidos, simulados e suporte completo para transformar seus estudos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-1 w-full sm:w-auto justify-center lg:justify-start"
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-between sm:justify-start gap-4 rounded-lg bg-[#FF7A00] pl-6 pr-2 py-3.5 text-xs sm:text-sm font-bold text-white uppercase tracking-wide hover:bg-[#E56E00] active:scale-95 transition-all shadow-lg min-w-[220px]"
              >
                Experimentar Grátis
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#FF7A00]">
                  <FontAwesomeIcon icon={faPlay} className="h-3.5 w-3.5 ml-0.5" />
                </span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-between sm:justify-start gap-4 rounded-lg border-2 border-white bg-transparent pl-6 pr-2 py-3.5 text-xs sm:text-sm font-bold text-white uppercase tracking-wide hover:bg-white/10 active:scale-95 transition-all min-w-[220px]"
              >
                Quero Ser Aluno
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3D4F6F] text-white/90">
                  <FontAwesomeIcon icon={faThumbsUp} className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right: student + video card */}
          <div className="relative flex items-end justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[620px] xl:min-h-[700px]">
            {/* Video card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="absolute right-0 top-[4%] sm:top-[2%] w-[82%] sm:w-[78%] max-w-[420px] z-10"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF7A00] shadow-lg">
                  <FontAwesomeIcon icon={faPlay} className="h-3.5 w-3.5 text-white ml-0.5" />
                </span>
                <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wide leading-snug">
                  Assista ao Vídeo de Boas-Vindas
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden bg-[#0c1428] shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1e2d4a] via-[#152238] to-[#0a1225]">
                  <div className="absolute left-[10%] top-[14%] w-[36%] h-[52%] rounded-sm bg-white/8 border border-white/10" />
                  <div className="absolute inset-x-[8%] bottom-[16%] h-[26%] rounded-sm bg-black/35 border border-white/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#FF7A00] shadow-xl cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPlay} className="h-5 w-5 sm:h-6 sm:w-6 text-white ml-1" />
                    </motion.span>
                  </div>
                </div>
                <div className="bg-[#111827] px-4 py-2.5 text-center border-t border-white/5">
                  <p className="text-[10px] sm:text-xs text-white/50">Aula 12 – Equações do 2º Grau</p>
                </div>
                <div className="h-3.5 bg-[#1f2937]" />
                <div className="flex justify-center pb-2.5 pt-0.5 bg-[#1f2937]">
                  <div className="h-1 w-14 rounded-full bg-[#4b5563]" />
                </div>
              </div>
            </motion.div>

            {/* Student photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-20 flex items-end justify-center h-full w-full pointer-events-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/pessoa1.png"
                alt="Aluno Axis Center"
                className="h-[340px] sm:h-[480px] lg:h-[580px] xl:h-[700px] w-auto max-w-[95%] object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
