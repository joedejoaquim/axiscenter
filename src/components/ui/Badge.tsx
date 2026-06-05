import { clsx } from 'clsx'

type BadgeVariant = 'accent' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  accent:  'bg-[#F97316]/10 text-[#F97316]',
  primary: 'bg-[#0D2B5E]/10 text-[#0D2B5E]',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger:  'bg-red-100 text-red-700',
  neutral: 'bg-slate-100 text-slate-600',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
