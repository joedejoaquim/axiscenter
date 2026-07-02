'use client'

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faGraduationCap, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'

const STATS = [
  { icon: faUsers,         value: '+1.500', label: 'Alunos Matriculados' },
  { icon: faGraduationCap, value: '+500',   label: 'Aprovados' },
  { icon: faVideo,         value: '+250',   label: 'Aulas Gravadas' },
  { icon: faStar,          value: '4.9/5',  label: 'Avaliação dos Alunos' },
]

export function StatsBar() {
  return (
    <div className="hero-stats-bar">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {STATS.map(({ icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-3.5 shadow-[0_8px_30px_rgba(3,27,82,0.18)] border border-white/60 w-[calc(50%-6px)] sm:w-auto sm:min-w-[160px] sm:max-w-[210px]"
            >
              <FontAwesomeIcon icon={icon} className="h-7 w-7 shrink-0 text-[#0D2B5E]" />
              <div className="min-w-0">
                <p className="text-base font-black text-[#0D2B5E] leading-none">{value}</p>
                <p className="text-[10px] text-[#0D2B5E]/60 mt-0.5 leading-tight">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
