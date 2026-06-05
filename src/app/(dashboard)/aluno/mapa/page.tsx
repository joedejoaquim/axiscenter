import { MapaProfessores } from '@/components/mapa/MapaProfessores'

export default function MapaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Mapa de Professores</h1>
        <p className="mt-1 text-slate-500">Encontra professores móveis disponíveis perto de ti.</p>
      </div>
      <MapaProfessores raioKm={20} />
    </div>
  )
}
