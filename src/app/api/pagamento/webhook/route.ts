import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createServiceClient()
  const body = await request.json()

  // Verificação básica da assinatura Pagar.me (produção: validar HMAC)
  // const signature = request.headers.get('x-hub-signature') ?? ''

  if (body.event === 'transaction.paid' || body.type === 'payment.paid') {
    const gatewayId = body.id ?? body.transaction?.id
    const metadata = body.metadata ?? body.transaction?.metadata ?? {}

    await supabase.from('pagamentos')
      .update({ status: 'aprovado', updated_at: new Date().toISOString() })
      .eq('gateway_id', gatewayId)

    if (metadata.tipo === 'assinatura_pro' && metadata.user_id) {
      await supabase.from('profiles')
        .update({ plan: 'pro', updated_at: new Date().toISOString() })
        .eq('id', metadata.user_id)
    }
  }

  if (body.event === 'transaction.refunded' || body.type === 'payment.refunded') {
    const gatewayId = body.id ?? body.transaction?.id
    await supabase.from('pagamentos')
      .update({ status: 'estornado', updated_at: new Date().toISOString() })
      .eq('gateway_id', gatewayId)
  }

  return NextResponse.json({ received: true })
}
