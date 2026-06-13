'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap, faCheck, faPlay, faArrowRight, faThumbsUp,
  faUsers, faVideo, faStar, faHeadset,
  faFileAlt, faChartLine, faMobileAlt, faUserPlus,
  faShoppingCart, faBook, faMedal, faPhone, faEnvelope, faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
const NAV_LINKS = [
  { href: '#', label: 'Início', active: true },
  { href: '#cursos', label: 'Cursos' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#sobre', label: 'Sobre Nós' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contato', label: 'Contato' },
]

const STATS = [
  { icon: faUsers, value: '+1.500', label: 'Alunos Matriculados' },
  { icon: faGraduationCap, value: '+500', label: 'Aprovados' },
  { icon: faVideo, value: '+250', label: 'Aulas Gravadas' },
  { icon: faStar, value: '4.9/5', label: 'Avaliação dos Alunos' },
]

const COURSES = [
  {
    tag: 'ENSINO BÁSICO',
    tagColor: 'bg-[#1E5AA8]',
    title: 'Matemática Ensino de Base',
    desc: 'Conteúdos essenciais de matemática para construir uma base sólida.',
    topics: ['Aritmética', 'Geometria', 'Números e Operações', 'Problemas do dia a dia'],
    illustration: 'basic',
  },
  {
    tag: 'ENSINO MÉDIO',
    tagColor: 'bg-[#F97316]',
    title: 'Matemática Ensino Médio',
    desc: 'Do básico ao avançado para você mandar bem no ensino médio.',
    topics: ['Álgebra', 'Funções', 'Trigonometria', 'Geometria Espacial'],
    illustration: 'medium',
  },
  {
    tag: 'SUPERIOR E CONCURSEIROS',
    tagColor: 'bg-[#0D2B5E]',
    title: 'Matemática Superior e Concursos',
    desc: 'Matemática para universidades e concursos públicos.',
    topics: ['Cálculo', 'Matemática Financeira', 'Raciocínio Lógico', 'Questões de Concursos'],
    illustration: 'superior',
  },
]

const FEATURES = [
  { icon: faVideo, title: 'Aulas Objetivas', desc: 'Direto ao ponto, sem enrolação.' },
  { icon: faHeadset, title: 'Suporte Rápido', desc: 'Professores disponíveis para tirar suas dúvidas.' },
  { icon: faFileAlt, title: 'Exercícios Resolvidos', desc: 'Aprenda praticando com exercícios comentados.' },
  { icon: faChartLine, title: 'Simulados', desc: 'Teste seus conhecimentos e acompanhe seu progresso.' },
  { icon: faMobileAlt, title: 'Acesso em Qualquer Lugar', desc: 'Estude quando e onde quiser, pelo celular ou PC.' },
]

const STEPS = [
  { icon: faUserPlus, num: '1', label: 'Crie sua conta', desc: 'É rápido e fácil.' },
  { icon: faPlay, num: '2', label: 'Explore grátis', desc: 'Assista algumas aulas gratuitas.' },
  { icon: faShoppingCart, num: '3', label: 'Escolha seu plano', desc: 'Escolha o plano que cabe no seu bolso.' },
  { icon: faBook, num: '4', label: 'Acesse o conteúdo', desc: 'Tenha acesso completo às aulas e materiais.' },
  { icon: faMedal, num: '5', label: 'Conquiste sua aprovação!', desc: 'Estude, pratique e alcance seus objetivos.' },
]

const TESTIMONIALS = [
  {
    name: 'Juliana M.', role: 'Estudante',
    text: '"As aulas do professor Hélder são simplesmente incríveis! Consegui entender o que nunca tinha entendido antes."',
    color: 'from-rose-400 to-pink-500',
  },
  {
    name: 'Carlos A.', role: 'Aprovado em Engenharia',
    text: '"Graças à Axis Center fui aprovado no exame de admissão! Recomendo a todos que querem resultados de verdade."',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Mariana K.', role: 'Estudante de Medicina',
    text: '"A plataforma é excelente, o suporte é rápido e os conteúdos são muito completos. Vale cada centavo!"',
    color: 'from-emerald-400 to-teal-500',
  },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-2">
      <span className="h-px w-16 sm:w-24 bg-[#F97316]" />
      <h2 className="text-xl sm:text-2xl font-black text-[#0D2B5E] tracking-wide">{children}</h2>
      <span className="h-px w-16 sm:w-24 bg-[#F97316]" />
    </div>
  )
}

function CourseIllustration({ type }: { type: string }) {
  if (type === 'basic') {
    return (
      <div className="flex items-end justify-center gap-2 h-20">
        <div className="w-8 h-10 rounded bg-[#F97316] opacity-80" />
        <div className="w-6 h-14 rounded bg-[#1E5AA8] opacity-80" />
        <div className="w-10 h-8 rounded bg-emerald-500 opacity-80" />
        <div className="w-5 h-12 rounded bg-yellow-400 opacity-80" />
      </div>
    )
  }
  if (type === 'medium') {
    return (
      <div className="flex items-end justify-center gap-1 h-20">
        <div className="w-7 h-16 rounded-sm bg-emerald-500 shadow-sm" />
        <div className="w-7 h-14 rounded-sm bg-yellow-400 shadow-sm" />
        <div className="w-7 h-18 rounded-sm bg-[#F97316] shadow-sm h-[72px]" />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center h-20">
      <div className="relative">
        <FontAwesomeIcon icon={faGraduationCap} className="h-14 w-14 text-[#0D2B5E]" />
        <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center">
          <FontAwesomeIcon icon={faStar} className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTestimonial] = useState(0)

  return (
    <main className="bg-white">

      {/* ── NAVBAR ── */}
      <nav className="bg-[#0D2B5E] sticky top-0 z-50 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 shrink-0">
            <Image src="/assets/logoaxis.png" alt="Axis Center" width={44} height={44} className="shrink-0" />
            <div className="leading-none">
              <p className="text-sm font-black text-white tracking-[0.2em]">AXIS</p>
              <p className="text-[10px] font-bold text-white/90 tracking-[0.15em] uppercase">Center</p>
              <p className="text-[8px] text-white/50 tracking-[0.12em] uppercase">Escola Online</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-medium">
            {NAV_LINKS.map(({ href, label, active }) => (
              <a
                key={label}
                href={href}
                className={`pb-0.5 transition-colors ${
                  active
                    ? 'text-[#F97316] border-b-2 border-[#F97316]'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/login"
              className="rounded-md border border-white/40 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-[#F97316] px-4 py-2 text-xs font-bold text-white hover:bg-[#EA6C0A] transition-colors shadow-sm"
            >
              Assine Agora
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden hero-math-pattern">
        {/* Orange organic shape — bottom right */}
        <svg className="hero-orange-swoosh" viewBox="0 0 720 380" preserveAspectRatio="none" aria-hidden>
          <path
            d="M720,380 C520,380 420,280 480,180 C520,110 620,40 720,0 L720,380 Z"
            fill="#F97316"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-40 sm:pb-44 lg:pb-48">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-6 lg:gap-4 items-center">
            {/* Left — copy & CTAs */}
            <div className="space-y-5 sm:space-y-6 lg:pr-4">
              <span className="inline-block rounded-full bg-[#F97316] px-4 py-1.5 text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.2em] shadow-sm">
                Do Básico ao Avançado
              </span>

              <h1 className="text-[1.85rem] sm:text-4xl xl:text-[3.15rem] font-black leading-[1.1] uppercase">
                <span className="text-white">Domine Matemática</span>
                <br />
                <span className="text-[#F97316]">E Garanta Sua Aprovação!</span>
              </h1>

              <p className="text-white/85 text-sm sm:text-base max-w-lg leading-relaxed">
                Aulas didáticas, exercícios resolvidos, simulados e suporte completo para transformar seus estudos.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-3 rounded-lg bg-[#F97316] pl-5 pr-2 py-3 text-[11px] sm:text-xs font-bold text-white uppercase tracking-wide hover:bg-[#EA6C0A] transition-colors shadow-lg"
                >
                  Experimentar Grátis
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#F97316]">
                    <FontAwesomeIcon icon={faPlay} className="h-3 w-3 ml-0.5" />
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-3 rounded-lg border-2 border-white/60 bg-transparent pl-5 pr-2 py-3 text-[11px] sm:text-xs font-bold text-white uppercase tracking-wide hover:bg-white/10 transition-colors"
                >
                  Quero Ser Aluno
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
                    <FontAwesomeIcon icon={faThumbsUp} className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right — student + monitor (prototype layout) */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] h-[360px] sm:h-[420px] lg:h-[480px]">
                {/* Monitor — behind student, right side */}
                <div className="absolute right-0 top-[6%] w-[78%] sm:w-[74%] z-10">
                  <div className="flex items-center gap-2 mb-2.5 pl-1">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F97316] shadow-lg ring-2 ring-[#F97316]/30">
                      <FontAwesomeIcon icon={faPlay} className="h-3 w-3 text-white ml-0.5" />
                    </span>
                    <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wide leading-snug">
                      Assista ao Vídeo de Boas-Vindas
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-slate-950 shadow-2xl ring-1 ring-white/10">
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1a2744] via-[#243656] to-[#0a1e42]">
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
                      <div className="absolute left-[8%] top-[12%] w-[38%] h-[55%] rounded bg-white/10 border border-white/10" />
                      <div className="absolute right-[8%] bottom-[18%] left-[8%] h-[28%] rounded bg-black/30 border border-white/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316] shadow-xl ring-4 ring-[#F97316]/25">
                          <FontAwesomeIcon icon={faPlay} className="h-5 w-5 text-white ml-1" />
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-900 px-3 py-2 text-center">
                      <p className="text-[10px] sm:text-xs text-white/55">Aula 12 – Equações do 2º Grau</p>
                    </div>
                    <div className="h-3 bg-slate-800" />
                    <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-slate-600" />
                  </div>
                </div>

                {/* Student — foreground, large, bottom aligned */}
                <div className="absolute left-[-2%] sm:left-0 bottom-[-8%] z-20 w-[62%] sm:w-[58%] h-[108%] pointer-events-none [isolation:isolate]">
                  <Image
                    src="/assets/pessoa1.png"
                    alt="Aluno Axis Center"
                    fill
                    priority
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] mix-blend-lighten"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* White wave divider */}
        <svg className="hero-white-wave" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0,36 C240,8 480,64 720,36 C960,8 1200,56 1440,28 L1440,72 L0,72 Z"
            fill="#ffffff"
          />
        </svg>

        {/* Stats cards — overlap hero / white section */}
        <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-[52%] sm:translate-y-1/2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {STATS.map(({ icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-[0_8px_30px_rgba(13,43,94,0.12)] border border-slate-100/80"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#0D2B5E] text-[#0D2B5E]">
                    <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base sm:text-xl font-black text-[#0D2B5E] leading-none">{value}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-tight">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating stats */}
      <div className="h-28 sm:h-32 bg-white" />

      {/* ── NOSSOS CURSOS ── */}
      <section id="cursos" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionTitle>NOSSOS CURSOS</SectionTitle>
            <p className="text-slate-500 text-sm mt-3">Escolha o caminho ideal para o seu sucesso</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {COURSES.map(({ tag, tagColor, title, desc, topics, illustration }) => (
              <div
                key={tag}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="p-6 pb-4 flex-1">
                  <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wide ${tagColor} mb-5`}>
                    {tag}
                  </span>

                  <div className="mb-5">
                    <CourseIllustration type={illustration} />
                  </div>

                  <h3 className="font-bold text-[#0D2B5E] text-base mb-2">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">{desc}</p>

                  <ul className="space-y-2.5">
                    {topics.map(t => (
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
                  <button className="text-xs font-bold text-[#0D2B5E] uppercase tracking-wide group-hover:text-[#F97316] transition-colors">
                    Ver Curso
                  </button>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0D2B5E] text-[#0D2B5E] group-hover:bg-[#0D2B5E] group-hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE ESTUDAR ── */}
      <section id="sobre" className="py-14 sm:py-16 bg-[#0D2B5E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl sm:text-2xl font-black text-white mb-12 uppercase tracking-wide">
            Por Que Estudar na <span className="text-[#F97316]">Axis Center</span>?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#081a3d] border border-white/10 text-[#F97316] shadow-inner">
                  <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-[11px] text-white/55 leading-relaxed max-w-[160px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionTitle>COMO FUNCIONA</SectionTitle>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-start">
            <div className="overflow-x-auto pb-2">
              <div className="flex items-start gap-1 sm:gap-2 min-w-[540px]">
                {STEPS.map(({ icon, num, label, desc }, i, arr) => (
                  <div key={num} className="flex items-start">
                    <div className="flex flex-col items-center gap-1.5 w-[90px] sm:w-[100px]">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#F97316] text-white shadow-md">
                        <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-black text-[#0D2B5E]">{num}</p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-[#0D2B5E] text-center leading-tight">{label}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 text-center leading-tight">{desc}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex items-center pt-5 px-0.5 sm:px-1">
                        <div className="w-4 sm:w-6 border-t-2 border-dashed border-slate-300" />
                        <FontAwesomeIcon icon={faArrowRight} className="h-2.5 w-2.5 text-slate-300 -ml-0.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#0D2B5E] overflow-hidden shadow-xl">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-2/5 bg-gradient-to-br from-slate-500 to-[#1E5AA8] min-h-[180px] sm:min-h-0 flex items-end justify-center p-4 relative">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-slate-400/70" />
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-28 rounded-t-full bg-[#0D2B5E]/60" />
                  <span className="relative z-10 text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">Prof. Hélder</span>
                </div>
                <div className="sm:w-3/5 p-6 flex flex-col gap-4">
                  <h3 className="font-black text-base sm:text-lg text-white uppercase tracking-wide">
                    Conheça o Professor Hélder
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    Professor de matemática com anos de experiência e milhares de alunos aprovados.
                  </p>
                  <ul className="space-y-2.5">
                    {['Didática simples e eficiente', 'Aulas claras e objetivas', 'Compromisso com o seu sucesso'].map(t => (
                      <li key={t} className="flex items-center gap-2.5 text-sm text-white/90">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F97316]">
                          <FontAwesomeIcon icon={faCheck} className="h-2 w-2 text-white" />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#F97316] px-5 py-3 text-sm font-bold text-white uppercase tracking-wide hover:bg-[#EA6C0A] transition-colors">
                    Saiba Mais
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section id="depoimentos" className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionTitle>O QUE NOSSOS ALUNOS DIZEM</SectionTitle>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ name, role, text, color }) => (
              <div key={name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="h-3.5 w-3.5 text-[#F97316]" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed mb-6">{text}</p>
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white`}>
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0D2B5E]">{name}</p>
                    <p className="text-xs text-slate-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === activeTestimonial ? 'bg-[#F97316]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-[#F97316] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <FontAwesomeIcon icon={faGraduationCap} className="h-7 w-7 text-white" />
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

            <Link
              href="/register"
              className="w-full md:w-auto bg-[#0D2B5E] rounded-xl px-6 py-4 flex items-center justify-between gap-6 hover:bg-[#0a2249] transition-colors shadow-lg min-w-[280px] md:min-w-[360px]"
            >
              <div>
                <p className="font-black text-white text-sm uppercase tracking-wide">Assine Agora</p>
                <p className="text-white/65 text-[11px] mt-0.5">E transforme seus sonhos em realidade!</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-white">
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contato" className="bg-[#0D2B5E] pt-12 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-10">
            <div className="sm:col-span-2 lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/assets/logoaxis.png" alt="Axis Center" width={40} height={40} />
                <div>
                  <p className="text-sm font-black text-white tracking-wide">AXIS CENTER</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Escola Online</p>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed max-w-xs">
                A Axis Center é a escola online que transforma dificuldades em conquistas.
              </p>
              <div className="flex gap-2.5">
                {[
                  { label: 'Facebook', abbr: 'f' },
                  { label: 'YouTube', abbr: 'yt' },
                  { label: 'Instagram', abbr: 'ig' },
                  { label: 'WhatsApp', abbr: 'wa' },
                ].map(({ label, abbr }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white uppercase hover:bg-[#F97316] transition-colors"
                  >
                    {abbr}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Navegação</p>
              <ul className="space-y-2.5">
                {['Início', 'Cursos', 'Como Funciona', 'Sobre Nós', 'Depoimentos', 'Contato'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Cursos</p>
              <ul className="space-y-2.5">
                {['Ensino de Base', 'Ensino Médio', 'Superior e Concursos'].map(item => (
                  <li key={item}>
                    <a href="#cursos" className="text-xs text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Ajuda</p>
              <ul className="space-y-2.5">
                {['FAQ', 'Suporte', 'Termos de Uso', 'Política de Privacidade'].map(item => (
                  <li key={item}>
                    <a href={item === 'FAQ' ? '/faq' : '#'} className="text-xs text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Contato</p>
              <ul className="space-y-3 text-xs text-white/60">
                <li className="flex items-center gap-2.5">
                  <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5 text-[#F97316] shrink-0" />
                  +244 000 000 000
                </li>
                <li className="flex items-center gap-2.5">
                  <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5 text-[#F97316] shrink-0" />
                  contato@axiscenter.ao
                </li>
                <li className="flex items-center gap-2.5">
                  <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 text-[#F97316] shrink-0" />
                  Luanda, Angola
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/40">© 2024 Axis Center. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
