import axios from 'axios'

export function createCelcoinApi(accessToken: string) {
  return axios.create({
    baseURL: 'https://api.sandbox.cel.cash/v2',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
