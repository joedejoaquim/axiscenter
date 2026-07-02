import { Navbar }             from '@/components/landing/Navbar'
import { HeroSection }        from '@/components/landing/HeroSection'
import { StatsBar }           from '@/components/landing/StatsBar'
import { CoursesSection }     from '@/components/landing/CoursesSection'
import { WhySection }         from '@/components/landing/WhySection'
import { HowItWorksSection }  from '@/components/landing/HowItWorksSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CtaSection }         from '@/components/landing/CtaSection'
import { Footer }             from '@/components/landing/Footer'

export default function Home() {
  return (
    <main className="bg-white">

      {/* ── HERO (navbar + conteúdo + stats) ── */}
      <section className="hero-section relative flex flex-col overflow-hidden">
        <div className="hero-geo-shapes" aria-hidden />

        {/* Orange blob */}
        <svg className="hero-orange-blob" viewBox="0 0 680 420" preserveAspectRatio="none" aria-hidden>
          <path d="M680,420 C480,420 380,300 440,190 C490,100 590,30 680,0 L680,420 Z" fill="#FF7A00" />
        </svg>

        <Navbar />
        <HeroSection />
        <StatsBar />
      </section>

      <div className="h-6 bg-white" />

      <CoursesSection />
      <WhySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />

    </main>
  )
}
