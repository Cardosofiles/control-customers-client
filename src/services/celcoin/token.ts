export async function fetchCelcoinToken() {
  const response = await fetch('/api/celcoin-token', { method: 'POST' })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erro ao obter token: ${errorText}`)
  }
  const data = await response.json()
  return data.access_token
}
