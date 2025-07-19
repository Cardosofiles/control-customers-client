import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCelcoinApi } from './api'
import { mockDataOperations } from './queries'
import type { Address, Customer } from './types'

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
        const axiosError = error as {
          response?: { status?: number }
          message?: string
          code?: string
        }
        // Se não há resposta (Network Error, CORS, etc.) ou é 400/404, simula localmente
        if (
          !axiosError.response ||
          axiosError.response?.status === 400 ||
          axiosError.response?.status === 404
        ) {
          console.log(
            'API de criação indisponível (Network Error ou erro HTTP), simulando localmente...'
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
        const axiosError = error as {
          response?: { status?: number }
          message?: string
          code?: string
        }

        // Se não há resposta (Network Error, CORS, etc.) ou é 404, tenta PATCH
        if (!axiosError.response || axiosError.response?.status === 404) {
          // Tentativa 2: PATCH /customers/{id}
          try {
            const response = await api.patch(`/customers/${customerId}`, data)
            return response.data
          } catch (patchError: unknown) {
            const patchAxiosError = patchError as {
              response?: { status?: number }
              message?: string
              code?: string
            }

            // Se não há resposta (Network Error, CORS, etc.) ou é 404, simula localmente
            if (
              !patchAxiosError.response ||
              patchAxiosError.response?.status === 404
            ) {
              console.log(
                'API de edição indisponível (Network Error ou 404), simulando localmente...'
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
        const axiosError = error as {
          response?: { status?: number }
          message?: string
          code?: string
        }
        // Se não há resposta (Network Error, CORS, etc.) ou é 404, simula localmente
        if (!axiosError.response || axiosError.response?.status === 404) {
          console.log(
            'API de exclusão indisponível (Network Error ou 404), simulando localmente...'
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

// Add address to customer
export function useAddAddress(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      customerId,
      addressData,
    }: {
      customerId: string
      addressData: Partial<Address>
    }) => {
      const api = createCelcoinApi(accessToken)
      try {
        // Tentativa: POST /customers/{id}/addresses
        const response = await api.post(
          `/customers/${customerId}/addresses`,
          addressData
        )
        return response.data
      } catch (error: unknown) {
        const axiosError = error as {
          response?: { status?: number }
          message?: string
          code?: string
        }
        // Se não há resposta (Network Error, CORS, etc.) ou é 404, simula localmente
        if (!axiosError.response || axiosError.response?.status === 404) {
          console.log(
            'API de adição de endereço indisponível (Network Error ou 404), simulando localmente...'
          )
          // Simula adição local usando mock data operations
          const newAddress = mockDataOperations.addAddress(
            customerId,
            addressData
          )
          return {
            success: true,
            data: newAddress,
            message: 'Endereço adicionado localmente (modo demo)',
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

// Edit address
export function useEditAddress(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      customerId,
      addressId,
      data,
    }: {
      customerId: string
      addressId: string
      data: Partial<Address>
    }) => {
      const api = createCelcoinApi(accessToken)
      try {
        // Tentativa 1: PUT /customers/{id}/addresses/{addressId}
        const response = await api.put(
          `/customers/${customerId}/addresses/${addressId}`,
          data
        )
        return response.data
      } catch (error: unknown) {
        const axiosError = error as {
          response?: { status?: number }
          message?: string
          code?: string
        }

        // Se não há resposta (Network Error, CORS, etc.) ou é 404, tenta PATCH
        if (!axiosError.response || axiosError.response?.status === 404) {
          // Tentativa 2: PATCH /customers/{id}/addresses/{addressId}
          try {
            const response = await api.patch(
              `/customers/${customerId}/addresses/${addressId}`,
              data
            )
            return response.data
          } catch (patchError: unknown) {
            const patchAxiosError = patchError as {
              response?: { status?: number }
              message?: string
              code?: string
            }

            // Se não há resposta (Network Error, CORS, etc.) ou é 404, simula localmente
            if (
              !patchAxiosError.response ||
              patchAxiosError.response?.status === 404
            ) {
              console.log(
                'API de edição de endereço indisponível (Network Error ou 404), simulando localmente...'
              )
              // Simula edição local usando mock data operations
              const updatedAddress = mockDataOperations.updateAddress(
                customerId,
                addressId,
                data
              )
              return {
                success: true,
                data: updatedAddress,
                message: 'Endereço editado localmente (modo demo)',
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

// Delete address
export function useDeleteAddress(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      customerId,
      addressId,
    }: {
      customerId: string
      addressId: string
    }) => {
      const api = createCelcoinApi(accessToken)
      try {
        // Tentativa: DELETE /customers/{id}/addresses/{addressId}
        const response = await api.delete(
          `/customers/${customerId}/addresses/${addressId}`
        )
        return response.data
      } catch (error: unknown) {
        const axiosError = error as {
          response?: { status?: number }
          message?: string
          code?: string
        }
        // Se não há resposta (Network Error, CORS, etc.) ou é 404, simula localmente
        if (!axiosError.response || axiosError.response?.status === 404) {
          console.log(
            'API de exclusão de endereço indisponível (Network Error ou 404), simulando localmente...'
          )
          // Simula exclusão local usando mock data operations
          const deletedAddress = mockDataOperations.deleteAddress(
            customerId,
            addressId
          )
          return {
            success: true,
            data: deletedAddress,
            message: 'Endereço excluído localmente (modo demo)',
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
