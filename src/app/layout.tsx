import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Axis Center — Escola Online',
  description: 'Domine matemática e garanta sua aprovação com aulas didáticas, exercícios resolvidos e suporte completo.',
  icons: {
    icon: '/assets/logoaxis.png',
    apple: '/assets/logoaxis.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="h-full">
      <body className={`${montserrat.variable} min-h-full font-sans antialiased`}>{children}</body>
    </html>
  )
}
