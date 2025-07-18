import { useMutation } from '@tanstack/react-query'
import { createCelcoinApi } from './api'

// Create customer
export function useCreateCustomer(accessToken: string) {
  return useMutation({
    mutationFn: async (customerData: any) => {
      const api = createCelcoinApi(accessToken)
      const response = await api.post('/customers', customerData)
      return response.data
    },
  })
}

// Edit customer
export function useEditCustomer(accessToken: string) {
  return useMutation({
    mutationFn: async ({
      customerId,
      typeId,
      data,
    }: {
      customerId: string
      typeId: string
      data: any
    }) => {
      const api = createCelcoinApi(accessToken)
      const response = await api.put(`/customers/${customerId}/${typeId}`, data)
      return response.data
    },
  })
}

// Delete customer
export function useDeleteCustomer(accessToken: string) {
  return useMutation({
    mutationFn: async ({
      customerId,
      typeId,
    }: {
      customerId: string
      typeId: string
    }) => {
      const api = createCelcoinApi(accessToken)
      const response = await api.delete(`/customers/${customerId}/${typeId}`)
      return response.data
    },
  })
}
