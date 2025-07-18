import axios from 'axios'

export async function getAccessToken(clientId: string, clientSecret: string) {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  )

  const response = await axios.post(
    'https://api.sandbox.cel.cash/v2/token',
    {
      grant_type: 'authorization_code',
      scope:
        'customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write balance.read balance.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
    }
  )

  return response.data // { access_token, ... }
}
