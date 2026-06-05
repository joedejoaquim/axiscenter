-- ============================================================
-- Axis Education Group — Supabase Schema
-- Executar no SQL Editor do Supabase
-- ============================================================

-- Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUMS ────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('admin', 'aluno', 'professor-online', 'professor-movel');
CREATE TYPE user_plan AS ENUM ('gratuito', 'pro');
CREATE TYPE user_status AS ENUM ('ativo', 'pendente', 'suspenso');
CREATE TYPE aula_nivel AS ENUM ('fundamental', 'medio', 'superior', 'outro');
CREATE TYPE aula_tipo AS ENUM ('gravada', 'ao_vivo');
CREATE TYPE aula_status AS ENUM ('rascunho', 'publicada', 'arquivada');
CREATE TYPE agendamento_formato AS ENUM ('online', 'presencial');
CREATE TYPE agendamento_status AS ENUM ('pendente', 'confirmado', 'recusado', 'concluido', 'cancelado');
CREATE TYPE pagamento_tipo AS ENUM ('assinatura_pro', 'gorgeta', 'comissao_aula');
CREATE TYPE pagamento_metodo AS ENUM ('cartao', 'pix', 'mbway', 'transferencia');
CREATE TYPE pagamento_status AS ENUM ('pendente', 'aprovado', 'falhou', 'estornado');
CREATE TYPE notificacao_tipo AS ENUM ('info', 'alerta', 'sucesso', 'promocao');

-- ── TABELAS ──────────────────────────────────────────────────

-- Perfis (ligados ao Supabase Auth)
CREATE TABLE profiles (
    id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name          VARCHAR(100)  NOT NULL,
    role          user_role     NOT NULL,
    plan          user_plan     DEFAULT 'gratuito',
    status        user_status   DEFAULT 'pendente',
    avatar_url    VARCHAR(255)  DEFAULT NULL,
    rating        DECIMAL(3,1)  DEFAULT 0.0,
    bio           TEXT          DEFAULT NULL,
    phone         VARCHAR(20)   DEFAULT NULL,
    created_at    TIMESTAMPTZ   DEFAULT NOW(),
    updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

-- Professores Móveis
CREATE TABLE professores_moveis (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    lat         DECIMAL(10,8) DEFAULT NULL,
    lng         DECIMAL(11,8) DEFAULT NULL,
    raio_km     SMALLINT      DEFAULT 10,
    disponivel  BOOLEAN       DEFAULT false,
    materias    TEXT          DEFAULT NULL,
    preco_hora  DECIMAL(8,2)  DEFAULT 0.00,
    updated_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- Professores Online
CREATE TABLE professores_online (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    materias    TEXT DEFAULT NULL,
    formacao    VARCHAR(255) DEFAULT NULL,
    video_url   VARCHAR(255) DEFAULT NULL,
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Aulas
CREATE TABLE aulas (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    titulo       VARCHAR(200) NOT NULL,
    descricao    TEXT         DEFAULT NULL,
    materia      VARCHAR(100) DEFAULT NULL,
    nivel        aula_nivel   DEFAULT 'medio',
    tipo         aula_tipo    DEFAULT 'gravada',
    plano        user_plan    DEFAULT 'gratuito',
    video_url    VARCHAR(255) DEFAULT NULL,
    thumbnail    VARCHAR(255) DEFAULT NULL,
    sala_nome    VARCHAR(100) DEFAULT NULL,
    data_ao_vivo TIMESTAMPTZ  DEFAULT NULL,
    duracao_min  SMALLINT     DEFAULT 60,
    status       aula_status  DEFAULT 'rascunho',
    matriculas   INT          DEFAULT 0,
    created_at   TIMESTAMPTZ  DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  DEFAULT NOW()
);

-- Agendamentos
CREATE TABLE agendamentos (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aluno_id       UUID NOT NULL REFERENCES profiles(id),
    professor_id   UUID NOT NULL REFERENCES profiles(id),
    aula_id        UUID REFERENCES aulas(id),
    formato        agendamento_formato NOT NULL,
    data_hora      TIMESTAMPTZ  NOT NULL,
    duracao_min    SMALLINT     DEFAULT 60,
    endereco       VARCHAR(255) DEFAULT NULL,
    status         agendamento_status DEFAULT 'pendente',
    observacoes    TEXT         DEFAULT NULL,
    checkin_at     TIMESTAMPTZ  DEFAULT NULL,
    encerrado_at   TIMESTAMPTZ  DEFAULT NULL,
    created_at     TIMESTAMPTZ  DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  DEFAULT NOW()
);

-- Avaliações
CREATE TABLE avaliacoes (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aluno_id         UUID NOT NULL REFERENCES profiles(id),
    professor_id     UUID NOT NULL REFERENCES profiles(id),
    agendamento_id   UUID REFERENCES agendamentos(id),
    nota             SMALLINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario       TEXT     DEFAULT NULL,
    tags             TEXT     DEFAULT NULL,
    gorgeta          DECIMAL(8,2) DEFAULT 0.00,
    gorgeta_paga     BOOLEAN  DEFAULT false,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Pagamentos
CREATE TABLE pagamentos (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES profiles(id),
    tipo        pagamento_tipo   NOT NULL,
    valor       DECIMAL(10,2)    NOT NULL,
    metodo      pagamento_metodo DEFAULT 'cartao',
    gateway_id  VARCHAR(100)     DEFAULT NULL,
    status      pagamento_status DEFAULT 'pendente',
    descricao   VARCHAR(255)     DEFAULT NULL,
    created_at  TIMESTAMPTZ      DEFAULT NOW(),
    updated_at  TIMESTAMPTZ      DEFAULT NOW()
);

-- Notificações
CREATE TABLE notificacoes (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    titulo     VARCHAR(150) NOT NULL,
    mensagem   TEXT         NOT NULL,
    tipo       notificacao_tipo DEFAULT 'info',
    lida       BOOLEAN      DEFAULT false,
    created_at TIMESTAMPTZ  DEFAULT NOW()
);

-- Mensagens do chat
CREATE TABLE mensagens (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aula_id    UUID NOT NULL REFERENCES aulas(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES profiles(id),
    message    TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disponibilidade professores online
CREATE TABLE disponibilidade (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    dia_semana   SMALLINT NOT NULL, -- 0=Dom, 1=Seg, ..., 6=Sab
    hora_inicio  TIME NOT NULL,
    hora_fim     TIME NOT NULL,
    recorrente   BOOLEAN DEFAULT true
);

-- Configurações globais
CREATE TABLE configuracoes (
    id                  INT PRIMARY KEY DEFAULT 1,
    nome_plataforma     VARCHAR(100) DEFAULT 'Axis Education Group',
    email_suporte       VARCHAR(100) DEFAULT '',
    preco_pro           DECIMAL(10,2) DEFAULT 89900.00,
    comissao_professor  SMALLINT DEFAULT 20,
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT only_one_row CHECK (id = 1)
);

INSERT INTO configuracoes DEFAULT VALUES;

-- ── ÍNDICES ──────────────────────────────────────────────────
CREATE INDEX idx_profiles_role       ON profiles(role);
CREATE INDEX idx_profiles_status     ON profiles(status);
CREATE INDEX idx_aulas_professor     ON aulas(professor_id);
CREATE INDEX idx_aulas_status        ON aulas(status);
CREATE INDEX idx_agendamentos_aluno  ON agendamentos(aluno_id);
CREATE INDEX idx_agendamentos_prof   ON agendamentos(professor_id);
CREATE INDEX idx_notificacoes_user   ON notificacoes(user_id, lida);
CREATE INDEX idx_prof_movel_disp     ON professores_moveis(disponivel);
CREATE INDEX idx_mensagens_aula      ON mensagens(aula_id, created_at);

-- ── TRIGGER: criar profile após registo ──────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Utilizador'),
    (NEW.raw_user_meta_data->>'role')::user_role,
    CASE
      WHEN (NEW.raw_user_meta_data->>'role') = 'aluno' THEN 'ativo'::user_status
      ELSE 'pendente'::user_status
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE professores_moveis ENABLE ROW LEVEL SECURITY;
ALTER TABLE professores_online ENABLE ROW LEVEL SECURITY;
ALTER TABLE aulas             ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos      ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos        ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificacoes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensagens         ENABLE ROW LEVEL SECURITY;
ALTER TABLE disponibilidade   ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes     ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles_self" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "profiles_public_read" ON profiles
  FOR SELECT USING (status = 'ativo');

-- Notificações
CREATE POLICY "notificacoes_owner" ON notificacoes
  FOR ALL USING (auth.uid() = user_id);

-- Aulas
CREATE POLICY "aulas_professor_owner" ON aulas
  FOR ALL USING (auth.uid() = professor_id);

CREATE POLICY "aulas_aluno_read" ON aulas
  FOR SELECT USING (status = 'publicada');

CREATE POLICY "aulas_admin" ON aulas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Agendamentos
CREATE POLICY "agendamentos_participant" ON agendamentos
  FOR ALL USING (auth.uid() = aluno_id OR auth.uid() = professor_id);

CREATE POLICY "agendamentos_admin" ON agendamentos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Pagamentos
CREATE POLICY "pagamentos_owner" ON pagamentos
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "pagamentos_admin" ON pagamentos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Mensagens
CREATE POLICY "mensagens_read" ON mensagens
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "mensagens_insert" ON mensagens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Professores móveis
CREATE POLICY "prof_movel_self" ON professores_moveis
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "prof_movel_public_read" ON professores_moveis
  FOR SELECT USING (disponivel = true);

-- Disponibilidade
CREATE POLICY "disponibilidade_professor" ON disponibilidade
  FOR ALL USING (auth.uid() = professor_id);

CREATE POLICY "disponibilidade_read" ON disponibilidade
  FOR SELECT USING (auth.role() = 'authenticated');

-- Configurações
CREATE POLICY "configuracoes_admin" ON configuracoes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "configuracoes_read" ON configuracoes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Avaliações
CREATE POLICY "avaliacoes_aluno" ON avaliacoes
  FOR ALL USING (auth.uid() = aluno_id);

CREATE POLICY "avaliacoes_professor_read" ON avaliacoes
  FOR SELECT USING (auth.uid() = professor_id);

CREATE POLICY "avaliacoes_admin" ON avaliacoes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
