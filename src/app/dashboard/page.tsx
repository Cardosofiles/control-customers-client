'use client'

import { CreateCustomerForm } from '@/components/forms/create-customers-form'
import { CustomerTable } from '@/components/table/customer-table'
import { Separator } from '@/components/ui/separator'
import { fetchCelcoinToken } from '@/services/celcoin/token'
import { useEffect, useState } from 'react'

// Função para obter token diretamente da API, sem variáveis de ambiente

export default function DashboardPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const [tokenError, setTokenError] = useState<string | null>(null)
  useEffect(() => {
    async function getToken() {
      try {
        const token = await fetchCelcoinToken()
        setAccessToken(token)
        setTokenError(null)
        console.log('Token obtido:', token)
      } catch (err: any) {
        setAccessToken(null)
        setTokenError(err?.message || 'Erro ao obter token')
        console.error('Erro ao obter token:', err)
      }
    }
    getToken()
  }, [])

  return (
    <section className="relative mt-3 mb-9 space-y-3">
      <div className="space-y-2">
        {tokenError && (
          <p className="text-red-500">Erro ao obter token: {tokenError}</p>
        )}
        {accessToken && <CreateCustomerForm accessToken={accessToken} />}
      </div>

      <Separator orientation="horizontal" />

      <div className="space-y-2">
        <h1>Tabela de Consulta e Visualização</h1>
        {accessToken && <CustomerTable accessToken={accessToken} />}
      </div>
    </section>
  )
}
