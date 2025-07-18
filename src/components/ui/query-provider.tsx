'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import localforage from 'localforage'
import { useState } from 'react'

export function TanStackProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos
            refetchOnWindowFocus: false,
            retry: 2,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  )

  const storage = {
    getItem: (key: string) => localforage.getItem<string>(key),
    setItem: (key: string, value: string) => localforage.setItem(key, value),
    removeItem: (key: string) => localforage.removeItem(key),
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: {
          persistClient: async (client: unknown) => {
            await storage.setItem(
              'tanstack-query-cache',
              JSON.stringify(client)
            )
          },
          restoreClient: async () => {
            const cached = await storage.getItem('tanstack-query-cache')
            return cached ? JSON.parse(cached) : undefined
          },
          removeClient: async () => {
            await storage.removeItem('tanstack-query-cache')
          },
        },
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PersistQueryClientProvider>
  )
}
