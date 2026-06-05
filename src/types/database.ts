export type UserRole = 'admin' | 'aluno' | 'professor-online' | 'professor-movel'
export type UserPlan = 'gratuito' | 'pro'
export type UserStatus = 'ativo' | 'pendente' | 'suspenso'
export type AulaStatus = 'rascunho' | 'publicada' | 'arquivada'
export type AulaTipo = 'gravada' | 'ao_vivo'
export type AgendamentoStatus = 'pendente' | 'confirmado' | 'recusado' | 'concluido' | 'cancelado'
export type PagamentoStatus = 'pendente' | 'aprovado' | 'falhou' | 'estornado'
export type NotificacaoTipo = 'info' | 'alerta' | 'sucesso' | 'promocao'

export interface Profile {
  id: string
  name: string
  role: UserRole
  plan: UserPlan
  status: UserStatus
  avatar_url: string | null
  rating: number
  bio: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface ProfessorMovel {
  id: string
  user_id: string
  lat: number | null
  lng: number | null
  raio_km: number
  disponivel: boolean
  materias: string | null
  preco_hora: number
  updated_at: string
}

export interface ProfessorOnline {
  id: string
  user_id: string
  materias: string | null
  formacao: string | null
  video_url: string | null
  updated_at: string
}

export interface Aula {
  id: string
  professor_id: string
  titulo: string
  descricao: string | null
  materia: string | null
  nivel: string
  tipo: AulaTipo
  plano: UserPlan
  video_url: string | null
  thumbnail: string | null
  sala_nome: string | null
  data_ao_vivo: string | null
  duracao_min: number
  status: AulaStatus
  matriculas: number
  created_at: string
  updated_at: string
}

export interface Agendamento {
  id: string
  aluno_id: string
  professor_id: string
  aula_id: string | null
  formato: 'online' | 'presencial'
  data_hora: string
  duracao_min: number
  endereco: string | null
  status: AgendamentoStatus
  observacoes: string | null
  checkin_at: string | null
  encerrado_at: string | null
  created_at: string
  updated_at: string
}

export interface Avaliacao {
  id: string
  aluno_id: string
  professor_id: string
  agendamento_id: string | null
  nota: number
  comentario: string | null
  gorgeta: number
  gorgeta_paga: boolean
  created_at: string
}

export interface Pagamento {
  id: string
  user_id: string
  tipo: string
  valor: number
  metodo: string
  gateway_id: string | null
  status: PagamentoStatus
  descricao: string | null
  created_at: string
  updated_at: string
}

export interface Notificacao {
  id: string
  user_id: string
  titulo: string
  mensagem: string
  tipo: NotificacaoTipo
  lida: boolean
  created_at: string
}

export interface Mensagem {
  id: string
  aula_id: string
  user_id: string
  message: string
  created_at: string
  profiles?: { name: string; avatar_url: string | null }
}
