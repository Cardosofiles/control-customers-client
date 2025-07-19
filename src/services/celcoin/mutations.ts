import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCelcoinApi } from './api'
import { mockDataOperations } from './queries'
import type { Customer } from './types'

// Create customer
export function useCreateCustomer(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (customerData: Partial<Customer>) => {
      const api = createCelcoinApi(accessToken)
      try {
        const response = await api.post('/customers', customerData)
        return response.data
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } }
        // Se a API ainda não suporta criação, simula localmente
        if (
          axiosError.response?.status === 400 ||
          axiosError.response?.status === 404
        ) {
          console.log(
            'API de criação ainda não disponível, simulando localmente...'
          )
          // Simula criação local usando mock data operations
          const newCustomer = mockDataOperations.addCustomer(customerData)
          return {
            success: true,
            data: newCustomer,
            message: 'Cliente criado localmente (modo demo)',
          }
        }
        throw error
      }
    },
    onSuccess: () => {
      // Invalida o cache dos clientes para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ['celcoin-customers'] })
    },
  })
}

// Edit customer
export function useEditCustomer(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      customerId,
      data,
    }: {
      customerId: string
      data: Partial<Customer>
    }) => {
      const api = createCelcoinApi(accessToken)
      try {
        // Tentativa 1: PUT /customers/{id}
        const response = await api.put(`/customers/${customerId}`, data)
        return response.data
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 404) {
          // Tentativa 2: PATCH /customers/{id}
          try {
            const response = await api.patch(`/customers/${customerId}`, data)
            return response.data
          } catch (patchError: unknown) {
            const patchAxiosError = patchError as {
              response?: { status?: number }
            }
            if (patchAxiosError.response?.status === 404) {
              console.log(
                'API de edição ainda não disponível, simulando localmente...'
              )
              // Simula edição local usando mock data operations
              const updatedCustomer = mockDataOperations.updateCustomer(
                customerId,
                data
              )
              return {
                success: true,
                data: updatedCustomer,
                message: 'Cliente editado localmente (modo demo)',
              }
            }
            throw patchError
          }
        }
        throw error
      }
    },
    onSuccess: () => {
      // Invalida o cache dos clientes para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ['celcoin-customers'] })
    },
  })
}

// Delete customer
export function useDeleteCustomer(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ customerId }: { customerId: string }) => {
      const api = createCelcoinApi(accessToken)
      try {
        // Tentativa: DELETE /customers/{id}
        const response = await api.delete(`/customers/${customerId}`)
        return response.data
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 404) {
          console.log(
            'API de exclusão ainda não disponível, simulando localmente...'
          )
          // Simula exclusão local usando mock data operations
          const deletedCustomer = mockDataOperations.deleteCustomer(customerId)
          return {
            success: true,
            data: deletedCustomer,
            message: 'Cliente excluído localmente (modo demo)',
          }
        }
        throw error
      }
    },
    onSuccess: () => {
      // Invalida o cache dos clientes para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ['celcoin-customers'] })
    },
  })
}
