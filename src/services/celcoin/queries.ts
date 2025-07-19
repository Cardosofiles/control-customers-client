import { useQuery } from '@tanstack/react-query'
import type { Address, Customer } from './types'

// Mock data storage para simular operações CRUD
// eslint-disable-next-line prefer-const
let mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'João Silva',
    document: '12345678901',
    email: 'joao@exemplo.com',
    phone: '(11) 99999-9999',
    status: 'active' as const,
    addresses: [
      {
        id: '1',
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipcode: '01234-567',
      },
      {
        id: '2',
        street: 'Avenida Paulista',
        number: '456',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        zipcode: '01310-100',
      },
    ],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Maria Santos',
    document: '98765432100',
    email: 'maria@exemplo.com',
    phone: '(11) 88888-8888',
    status: 'inactive' as const,
    addresses: [
      {
        id: '3',
        street: 'Rua dos Jardins',
        number: '789',
        neighborhood: 'Jardins',
        city: 'São Paulo',
        state: 'SP',
        zipcode: '01234-890',
      },
    ],
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
  },
]

// Funções para manipular os dados mockados
export const mockDataOperations = {
  getCustomers: (): Customer[] => [...mockCustomers],

  addCustomer: (customerData: Partial<Customer>): Customer => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: customerData.name || '',
      document: customerData.document || '',
      email: customerData.email || '',
      phone: customerData.phone || '',
      addresses: customerData.addresses || [],
      status: 'active' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockCustomers.push(newCustomer)
    return newCustomer
  },

  updateCustomer: (
    customerId: string,
    data: Partial<Customer>
  ): Customer | null => {
    const index = mockCustomers.findIndex(c => c.id === customerId)
    if (index !== -1) {
      mockCustomers[index] = {
        ...mockCustomers[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      return mockCustomers[index]
    }
    return null
  },

  deleteCustomer: (customerId: string): Customer | null => {
    const index = mockCustomers.findIndex(c => c.id === customerId)
    if (index !== -1) {
      const deletedCustomer = mockCustomers[index]
      mockCustomers.splice(index, 1)
      return deletedCustomer
    }
    return null
  },

  // Operações de endereço
  addAddress: (
    customerId: string,
    addressData: Partial<Address>
  ): Address | null => {
    const customerIndex = mockCustomers.findIndex(c => c.id === customerId)
    if (customerIndex !== -1) {
      const newAddress: Address = {
        id: Date.now().toString(),
        street: addressData.street || '',
        number: addressData.number || '',
        neighborhood: addressData.neighborhood || '',
        city: addressData.city || '',
        state: addressData.state || '',
        zipcode: addressData.zipcode || '',
      }
      mockCustomers[customerIndex].addresses.push(newAddress)
      mockCustomers[customerIndex].updatedAt = new Date().toISOString()
      return newAddress
    }
    return null
  },

  updateAddress: (
    customerId: string,
    addressId: string,
    data: Partial<Address>
  ): Address | null => {
    const customerIndex = mockCustomers.findIndex(c => c.id === customerId)
    if (customerIndex !== -1) {
      const addressIndex = mockCustomers[customerIndex].addresses.findIndex(
        a => a.id === addressId
      )
      if (addressIndex !== -1) {
        mockCustomers[customerIndex].addresses[addressIndex] = {
          ...mockCustomers[customerIndex].addresses[addressIndex],
          ...data,
        }
        mockCustomers[customerIndex].updatedAt = new Date().toISOString()
        return mockCustomers[customerIndex].addresses[addressIndex]
      }
    }
    return null
  },

  deleteAddress: (customerId: string, addressId: string): Address | null => {
    const customerIndex = mockCustomers.findIndex(c => c.id === customerId)
    if (customerIndex !== -1) {
      const addressIndex = mockCustomers[customerIndex].addresses.findIndex(
        a => a.id === addressId
      )
      if (addressIndex !== -1) {
        const deletedAddress =
          mockCustomers[customerIndex].addresses[addressIndex]
        mockCustomers[customerIndex].addresses.splice(addressIndex, 1)
        mockCustomers[customerIndex].updatedAt = new Date().toISOString()
        return deletedAddress
      }
    }
    return null
  },
}

export function useListCustomers(
  accessToken: string,
  params: Record<string, string>
) {
  return useQuery({
    queryKey: ['celcoin-customers', params],
    queryFn: async () => {
      console.log(
        'useListCustomers - Iniciando query com token:',
        accessToken ? 'Presente' : 'Ausente'
      )

      // Temporariamente retornando dados mockados para testar a tabela
      console.log('useListCustomers - Retornando dados mockados para teste')
      return mockDataOperations.getCustomers()

      /* Código real da API - comentado temporariamente
      const api = createCelcoinApi(accessToken)
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(','))
        } else if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })

      console.log('useListCustomers - Fazendo requisição para /customers')
      console.log('useListCustomers - Parâmetros da requisição:', Object.fromEntries(searchParams))
      try {
        const response = await api.get('/customers', {
          params: searchParams,
        })
        console.log('useListCustomers - Resposta da API:', response.data)

        // Verificar se a resposta tem a estrutura esperada
        if (response.data && response.data.items) {
          return response.data.items
        } else if (Array.isArray(response.data)) {
          // Se a resposta for um array diretamente
          return response.data
        } else {
          console.log(
            'useListCustomers - Estrutura da resposta inesperada:',
            response.data
          )
          return []
        }
      } catch (error: any) {
        console.error('useListCustomers - Erro detalhado:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
          }
        })
        throw error
      }
      */
    },
    enabled: !!accessToken, // Só executa se houver token
  })
}
