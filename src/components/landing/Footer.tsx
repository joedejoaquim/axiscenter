import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faYoutube, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

const SOCIAL = [
  { label: 'Facebook',  icon: faFacebookF as IconProp, href: '#' },
  { label: 'YouTube',   icon: faYoutube   as IconProp, href: '#' },
  { label: 'Instagram', icon: faInstagram as IconProp, href: '#' },
  { label: 'WhatsApp',  icon: faWhatsapp  as IconProp, href: 'https://wa.me/+244943660375' },
]

const NAV_FOOTER = ['Início', 'Cursos', 'Como Funciona', 'Sobre Nós', 'Depoimentos', 'Contato']
const COURSES_FOOTER = ['Ensino de Base', 'Ensino Médio', 'Superior e Concursos']
const HELP_FOOTER = [
  { label: 'Perguntas Frequentes', href: '/faq' },
  { label: 'Suporte',              href: '#' },
  { label: 'Termos de Uso',        href: '#' },
  { label: 'Política de Privacidade', href: '#' },
]

export function Footer() {
  return (
    <footer id="contato" className="bg-[#0D2B5E] pt-12 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-10">

          {/* Brand */}
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
              {SOCIAL.map(({ label, icon, href }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#F97316] transition-colors"
                >
                  <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Navegação</p>
            <ul className="space-y-2.5">
              {NAV_FOOTER.map(item => (
                <li key={item}>
                  <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cursos */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Cursos</p>
            <ul className="space-y-2.5">
              {COURSES_FOOTER.map(item => (
                <li key={item}>
                  <a href="#cursos" className="text-xs text-white/60 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Ajuda</p>
            <ul className="space-y-2.5">
              {HELP_FOOTER.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-xs text-white/60 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Contato</p>
            <ul className="space-y-3 text-xs text-white/60">
              <li className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faPhone}       className="h-3.5 w-3.5 text-[#F97316] shrink-0" />
                +244 000 000 000
              </li>
              <li className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faEnvelope}    className="h-3.5 w-3.5 text-[#F97316] shrink-0" />
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
  )
}
