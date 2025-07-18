import { useQuery } from '@tanstack/react-query'
import { createCelcoinApi } from './api'
import type { Customer } from './types'

export function useListCustomers(
  accessToken: string,
  params: Record<string, any>
) {
  return useQuery({
    queryKey: ['celcoin-customers', params],
    queryFn: async () => {
      const api = createCelcoinApi(accessToken)
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(','))
        } else if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
      const response = await api.get<{ items: Customer[] }>('/customers', {
        params: searchParams,
      })
      return response.data.items
    },
  })
}
