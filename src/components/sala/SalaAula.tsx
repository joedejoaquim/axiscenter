'use client'

import { useEffect, useRef, useState } from 'react'

import type { DailyCall, DailyEvent } from '@daily-co/daily-js'

interface SalaAulaProps {
  salaId: string
  userId: string  // reserved for future use
  userName: string
  isOwner: boolean
}

export function SalaAula({ salaId, userName, isOwner }: SalaAulaProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'joined' | 'error'>('loading')
  const callRef = useRef<DailyCall | null>(null)

  useEffect(() => {
    let destroyed = false

    const init = async () => {
      try {
        const res = await fetch('/api/sala/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ salaId, isOwner }),
        })
        const { token } = await res.json()

        const DailyIframe = (await import('@daily-co/daily-js')).default
        if (destroyed || !frameRef.current) return

        const call = DailyIframe.createFrame(frameRef.current, {
          iframeStyle: { width: '100%', height: '100%', border: 'none', borderRadius: '24px' },
          showLeaveButton: true,
          showFullscreenButton: true,
        })

        callRef.current = call

        call.on('joined-meeting' as DailyEvent, () => setStatus('joined'))
        call.on('error' as DailyEvent, () => setStatus('error'))

        await call.join({
          url: `${process.env.NEXT_PUBLIC_DAILY_URL}/${salaId}`,
          token,
          userName,
        })
      } catch {
        setStatus('error')
      }
    }

    init()

    return () => {
      destroyed = true
      callRef.current?.destroy()
    }
  }, [salaId, userName, isOwner])

  return (
    <div className="relative h-full min-h-[480px] rounded-3xl bg-slate-950 overflow-hidden">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-3">
            <div className="animate-spin h-10 w-10 rounded-full border-4 border-white/20 border-t-white mx-auto" />
            <p className="text-sm text-slate-300">A entrar na sala...</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-red-400 text-sm">Erro ao conectar à sala. Tenta novamente.</p>
        </div>
      )}
      <div ref={frameRef} className="h-full w-full" />
    </div>
  )
}
