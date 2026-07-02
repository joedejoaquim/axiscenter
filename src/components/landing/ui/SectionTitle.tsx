interface SectionTitleProps {
  children: React.ReactNode
  light?: boolean
  subtitle?: string
}

export function SectionTitle({ children, light = false, subtitle }: SectionTitleProps) {
  const textColor = light ? 'text-white' : 'text-[#0D2B5E]'
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-4">
        <span className="h-px w-16 sm:w-24 bg-[#F97316]" />
        <h2 className={`text-xl sm:text-2xl font-black tracking-wide text-center ${textColor}`}>
          {children}
        </h2>
        <span className="h-px w-16 sm:w-24 bg-[#F97316]" />
      </div>
      {subtitle && (
        <p className={`text-sm mt-1 ${light ? 'text-white/60' : 'text-slate-500'}`}>{subtitle}</p>
      )}
    </div>
  )
}
