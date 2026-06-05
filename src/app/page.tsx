import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-[#F4F7FC]">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <span className="text-xl font-bold text-[#0D2B5E]">Axis Education</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#0D2B5E] hover:bg-slate-50 transition-colors">
            Entrar
          </Link>
          <Link href="/register" className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#EA6C0A] transition-colors">
            Criar conta
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="grid gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full bg-[#F97316]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#F97316]">
              Conectando conhecimento
            </span>
            <div className="space-y-5">
              <h1 className="text-5xl font-bold tracking-tight text-[#0D2B5E] sm:text-6xl">
                O eixo da sua <span className="text-[#F97316]">evolução</span> começa aqui.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                A plataforma completa que une aulas online interativas com a conveniência de professores particulares que vão até você.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#F97316]/20 hover:bg-[#EA6C0A] transition-colors">
                Criar conta gratuita
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-[#0D2B5E] shadow-sm hover:border-slate-300 transition-colors">
                Entrar
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[['15k+', 'Alunos Ativos'], ['4.9/5', 'Avaliação Média'], ['850+', 'Tutores Móveis']].map(([val, label]) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-[#0D2B5E]">{val}</p>
                  <p className="mt-1 text-sm text-slate-500">{label}</p>
                </div>
              ))}
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
