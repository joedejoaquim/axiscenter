import { MapaProfessores } from '@/components/mapa/MapaProfessores'

export default function MapaMovelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Mapa de Professores</h1>
        <p className="mt-1 text-slate-500">Vê a tua posição e os outros professores disponíveis na área.</p>
      </div>
      <MapaProfessores raioKm={30} />
    </div>
  )
}
