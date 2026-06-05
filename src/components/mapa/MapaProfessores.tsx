'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { distanciaKm } from '@/lib/geo'
import type { ProfessorMovel, Profile } from '@/types/database'

type ProfPin = ProfessorMovel & { profiles: Pick<Profile, 'name' | 'avatar_url' | 'rating'> }

interface MapaProfessoresProps {
  raioKm?: number
}

export function MapaProfessores({ raioKm = 20 }: MapaProfessoresProps) {
  const [MapComponents, setMapComponents] = useState<any>(null)
  const [professores, setProfessores] = useState<ProfPin[]>([])
  const [userPos, setUserPos] = useState<[number, number] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Carrega react-leaflet dinamicamente (evita SSR)
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
      import('leaflet/dist/leaflet.css' as any),
    ]).then(([rl, L]) => {
      // Fix ícones Leaflet
      delete (L.default.Icon.Default.prototype as any)._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })
      setMapComponents({ MapContainer: rl.MapContainer, TileLayer: rl.TileLayer, Marker: rl.Marker, Popup: rl.Popup, useMap: rl.useMap })
    })

    // Geolocalização do utilizador
    navigator.geolocation?.getCurrentPosition(pos => {
      setUserPos([pos.coords.latitude, pos.coords.longitude])
    })

    // Carrega professores disponíveis
    supabase
      .from('professores_moveis')
      .select('*, profiles(name, avatar_url, rating)')
      .eq('disponivel', true)
      .not('lat', 'is', null)
      .then(({ data }) => setProfessores((data as ProfPin[]) ?? []))
  }, [])

  const professoresFiltrados = userPos
    ? professores.filter(p =>
        p.lat && p.lng && distanciaKm(userPos[0], userPos[1], p.lat, p.lng) <= raioKm
      )
    : professores

  const center = userPos ?? [-8.8383, 13.2344] // Luanda por defeito

  if (!MapComponents) {
    return (
      <div className="flex h-80 items-center justify-center rounded-3xl bg-slate-100">
        <p className="text-sm text-slate-500">A carregar mapa...</p>
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      <MapContainer center={center} zoom={13} style={{ height: 480 }} className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {professoresFiltrados.map(p => (
          p.lat && p.lng && (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold text-[#0D2B5E]">{p.profiles?.name}</p>
                  {p.materias && <p className="text-xs text-slate-500">{p.materias}</p>}
                  <p className="text-xs text-[#F97316] font-semibold">
                    {p.preco_hora > 0 ? `${p.preco_hora} Kz/h` : 'A negociar'}
                  </p>
                  {p.profiles?.rating > 0 && (
                    <p className="text-xs text-slate-500">⭐ {p.profiles.rating.toFixed(1)}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>

      <div className="flex items-center justify-between rounded-b-3xl border-t border-slate-200 bg-white px-5 py-3">
        <span className="text-sm text-slate-600">Professores disponíveis no raio de {raioKm}km</span>
        <span className="text-sm font-semibold text-[#0D2B5E]">{professoresFiltrados.length} disponíveis</span>
      </div>
    </div>
  )
}
