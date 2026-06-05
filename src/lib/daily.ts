const DAILY_API = 'https://api.daily.co/v1'

export async function criarSala(nome: string): Promise<{ url: string; name: string }> {
  const res = await fetch(`${DAILY_API}/rooms`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nome,
      properties: { enable_chat: true, enable_screenshare: true, max_participants: 10 },
    }),
  })
  return res.json()
}

export async function gerarToken(
  salaId: string,
  userName: string,
  isOwner: boolean
): Promise<{ token: string }> {
  const res = await fetch(`${DAILY_API}/meeting-tokens`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        room_name: salaId,
        user_name: userName,
        is_owner: isOwner,
        exp: Math.floor(Date.now() / 1000) + 7200,
        enable_recording: isOwner ? 'cloud' : 'off',
      },
    }),
  })
  return res.json()
}
