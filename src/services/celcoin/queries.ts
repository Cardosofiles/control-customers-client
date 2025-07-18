import { useQuery } from '@tanstack/react-query'

export function useListCustomers(
  accessToken: string,
  params: Record<string, any>
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
      return [
        {
          id: '1',
          name: 'João Silva',
          document: '12345678901',
          email: 'joao@exemplo.com',
          status: 'active' as const,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          name: 'Maria Santos',
          document: '98765432100',
          email: 'maria@exemplo.com',
          status: 'inactive' as const,
          createdAt: '2024-01-16T14:20:00Z',
          updatedAt: '2024-01-16T14:20:00Z',
        },
      ]

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
