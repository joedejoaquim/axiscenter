import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <main className="bg-[#F4F7FC]">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/assets/logoaxis.png" alt="Axis Center" width={80} height={80} className="rounded-lg" />
          <span className="text-xl font-bold text-[#0D2B5E]">Axis Center</span>
        </div>
        <div />
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="grid gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight text-[#0D2B5E] sm:text-6xl">
              O eixo da sua <span className="text-[#F97316]">evolução</span> começa aqui.
            </h1>

            <div className="rounded-2xl bg-white p-8 shadow-lg border border-slate-200 max-w-2xl">
              <h2 className="text-2xl font-extrabold text-[#0D2B5E]">MATEMÁTICA COMPLETA</h2>
              <p className="mt-3 text-slate-700">APRENDA TODA MATEMÁTICA, DESDE O ZERO, DE UMA VEZ POR TODAS DE FORMA RÁPIDA E EFICIENTE PARA GARANTIR SUA APROVAÇÃO</p>

              <div className="mt-6 flex items-center gap-4">
                <button className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#EA6C0A]">ASSINE AGORA!</button>
                <div className="text-sm text-slate-500">Prof Hélder — Matemática sem limites</div>
              </div>

              <ul className="mt-6 space-y-2 text-slate-700 list-inside">
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />MATEMÁTICA DO BÁSICO AO AVANÇADO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />SIMULADOS POR MÓDULOS</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />AULAS AO VIVO DE REVISÃO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />APRENDA A INTERPRETAR QUESTÕES</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />COMUNIDADE DE ALUNOS</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />ACESSO COMPLETO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />EXERCÍCIOS RESOLVIDOS EM VÍDEO</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />ACESSO POR 12 MESES</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />CRONOGRAMA DE ESTUDOS</li>
                <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" aria-hidden />TODO CONTEÚDO DO SEU EDITAL</li>
              </ul>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="rounded-[40px] bg-white p-6 shadow-2xl shadow-slate-200/60">
            <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.18),_transparent_25%)]" />
              <div className="relative grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-900/90 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Dashboard</span><span className="text-green-400">● Online</span>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">Aulas ao vivo e agendamento em um só lugar</h2>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Próximas aulas</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#F97316] to-orange-400" />
                      <div>
                        <p className="text-sm font-semibold">Matemática Avançada</p>
                        <p className="text-xs text-slate-400">Aula em 20 min</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-4">
                  <div className="mb-4 text-xs uppercase tracking-widest text-slate-400">Estatísticas</div>
                  <div className="space-y-3">
                    <div className="rounded-3xl bg-slate-950/80 p-3">
                      <p className="text-xs text-slate-400">Horas estudadas</p>
                      <p className="mt-1 text-2xl font-semibold">13h</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/80 p-3">
                      <p className="text-xs text-slate-400">Aulas concluídas</p>
                      <p className="mt-1 text-2xl font-semibold">8/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="grid gap-6 py-12 lg:grid-cols-3">
          {[
            ['01', 'Escolha seu plano', 'Acesse toda a nossa biblioteca de conteúdos e pacotes personalizados para aulas presenciais.'],
            ['02', 'Aulas Online', 'Conecte-se com mentores em tempo real e tenha aulas na plataforma exclusiva de videoconferência.'],
            ['03', 'Professor Móvel', 'Solicite um professor versátil para suporte presencial no conforto da sua casa ou escritório.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex rounded-full bg-[#F97316]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#F97316]">{num}</div>
              <h2 className="text-xl font-semibold text-[#0D2B5E]">{title}</h2>
              <p className="mt-3 text-slate-600">{desc}</p>
            </div>
          ))}
        </section>

        {/* Planos */}
        <section className="py-16" id="planos">
          <p className="text-sm uppercase tracking-[0.3em] text-[#F97316]">Planos que acompanham seu ritmo.</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0D2B5E]">Simples, prático e personalizado.</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-sm">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Básico</span>
              <h3 className="mt-4 text-3xl font-semibold text-[#0D2B5E]">Plano Grátis</h3>
              <p className="mt-2 text-slate-600">Kz 0/mês</p>
              <ul className="mt-8 space-y-3 text-slate-600 text-sm">
                <li>✅ Acesso a 5 cursos básicos</li>
                <li>✅ Comunidade de alunos</li>
                <li>✅ Certificados básicos</li>
              </ul>
              <Link href="/register" className="mt-8 inline-flex w-full justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                Começar agora
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-[40px] bg-[#0D2B5E] px-8 py-10 text-white shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_20%)]" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80">Mais popular</span>
                <h3 className="mt-5 text-4xl font-bold">Plano PRO ✨</h3>
                <p className="mt-2 text-lg text-white/80">Kz 89.900/mês</p>
                <ul className="mt-8 space-y-3 text-white/90 text-sm">
                  <li>✅ Acesso ilimitado +200 cursos</li>
                  <li>✅ Desconto de 30% em professores móveis</li>
                  <li>✅ Certificados reconhecidos</li>
                  <li>✅ Suporte VIP 24/7</li>
                </ul>
                <Link href="/register" className="mt-10 inline-flex w-full justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#EA6C0A] transition-colors">
                  Assinar PRO
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="pb-20">
          <div className="rounded-[40px] bg-[#0D2B5E] px-8 py-10 text-white shadow-2xl sm:px-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Pronto para encontrar seu eixo de crescimento?</p>
                <h3 className="mt-3 text-3xl font-bold">Junte-se a milhares de alunos que já estão acelerando seu aprendizado com a Axis.</h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row shrink-0">
                <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0D2B5E]">
                  Criar conta gratuita
                </Link>
                <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
