import { NextResponse } from 'next/server'

// Para usar a API Celcoin (CEL Payments):
// 1. As credenciais de desenvolvimento já estão configuradas no .env
// 2. Para produção, obtenha suas credenciais em 'Módulos -> Webservice -> Instalar'
// 3. Configure no arquivo .env:
// CELCOIN_CLIENT_ID=seu_galax_id_aqui
// CELCOIN_CLIENT_SECRET=seu_galax_hash_aqui

export async function POST() {
  const galaxId = process.env.CELCOIN_CLIENT_ID
  const galaxHash = process.env.CELCOIN_CLIENT_SECRET

  console.log('Environment variables:', {
    galaxId: galaxId ? `${galaxId.substring(0, 4)}...` : 'undefined',
    galaxHash: galaxHash ? `${galaxHash.substring(0, 10)}...` : 'undefined',
  })

  if (!galaxId || !galaxHash) {
    return NextResponse.json(
      { error: 'Credenciais não configuradas.' },
      { status: 400 }
    )
  }

  const requestBody = {
    grant_type: 'authorization_code',
    scope:
      'customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write balance.read balance.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read',
  }

  console.log('Request body:', {
    grant_type: 'authorization_code',
    scope: 'customers.read customers.write plans.read plans.write...', // truncated for logging
  })

  try {
    const response = await fetch('https://api.sandbox.cel.cash/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${galaxId}:${galaxHash}`).toString('base64')}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      })
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ access_token: data.access_token })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
