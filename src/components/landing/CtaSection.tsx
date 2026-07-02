'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FadeIn } from './ui/FadeIn'

export function CtaSection() {
  return (
    <section className="bg-[#F97316] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left */}
          <FadeIn direction="left">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15">
                <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide">
                  Comece Hoje Sua Jornada
                </h3>
                <p className="text-white/85 text-sm mt-1">
                  O sucesso é a soma de pequenos esforços repetidos todos os dias.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right CTA */}
          <FadeIn direction="right">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/checkout"
                className="w-full md:w-auto bg-[#0D2B5E] rounded-xl px-6 py-4 flex items-center justify-between gap-6 hover:bg-[#0a2249] transition-colors shadow-lg min-w-[280px] md:min-w-[340px]"
              >
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-wide">Assine Agora</p>
                  <p className="text-white/65 text-[11px] mt-0.5">E transforme seus sonhos em realidade!</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-white border-2 border-white/30">
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
