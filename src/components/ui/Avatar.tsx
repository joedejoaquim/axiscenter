import Image from 'next/image'
import { clsx } from 'clsx'

interface AvatarProps {
  src?: string | null
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = { sm: 32, md: 40, lg: 56, xl: 80 }
const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base', xl: 'text-xl' }

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const px = sizes[size]
  const initials = name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '?'

  if (src) {
    return (
      <Image
        src={src} alt={name ?? 'avatar'} width={px} height={px}
        className={clsx('rounded-full object-cover', className)}
        style={{ width: px, height: px }}
      />
    )
  }

  return (
    <div
      style={{ width: px, height: px }}
      className={clsx(
        'flex items-center justify-center rounded-full bg-[#0D2B5E] text-white font-semibold flex-shrink-0',
        textSizes[size], className
      )}
    >
      {initials}
    </div>
  )
}
