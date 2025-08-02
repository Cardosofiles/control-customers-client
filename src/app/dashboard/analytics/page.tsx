'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useListCustomers } from '@/services/celcoin/queries'
import { fetchCelcoinToken } from '@/services/celcoin/token'
import type { Customer } from '@/services/celcoin/types'
import { BarChart3, TrendingUp, UserCheck, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

export default function AnalyticsPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar dados reais dos clientes usando o mesmo hook da tabela
  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    error: customersError,
  } = useListCustomers(accessToken || '', {})

  // Calcular métricas reais baseadas nos dados dos clientes
  const analyticsData = useMemo(() => {
    if (!customers.length) {
      return {
        totalCustomers: 0,
        activeCustomers: 0,
        newCustomersThisMonth: 0,
        customerGrowth: 0,
      }
    }

    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    // Total de clientes
    const totalCustomers = customers.length

    // Clientes ativos (status = 'active')
    const activeCustomers = customers.filter(
      (customer: Customer) => customer.status === 'active'
    ).length

    // Novos clientes este mês
    const newCustomersThisMonth = customers.filter((customer: Customer) => {
      if (!customer.createdAt) return false
      const createdDate = new Date(customer.createdAt)
      return createdDate >= thisMonth
    }).length

    // Clientes do mês passado para calcular crescimento
    const customersLastMonth = customers.filter((customer: Customer) => {
      if (!customer.createdAt) return false
      const createdDate = new Date(customer.createdAt)
      return createdDate >= lastMonth && createdDate < thisMonth
    }).length

    // Calcular crescimento percentual
    const customerGrowth =
      customersLastMonth > 0
        ? ((newCustomersThisMonth - customersLastMonth) / customersLastMonth) *
          100
        : newCustomersThisMonth > 0
          ? 100
          : 0

    return {
      totalCustomers,
      activeCustomers,
      newCustomersThisMonth,
      customerGrowth: Number(customerGrowth.toFixed(1)),
    }
  }, [customers])

  useEffect(() => {
    async function getToken() {
      try {
        setLoading(true)
        const token = await fetchCelcoinToken()
        setAccessToken(token)
        setError(null)
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao carregar dados'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    getToken()
  }, [])

  const statsCards = [
    {
      title: 'Total de Clientes',
      value: analyticsData.totalCustomers.toLocaleString(),
      description: 'Clientes cadastrados no sistema',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Clientes Ativos',
      value: analyticsData.activeCustomers.toLocaleString(),
      description: 'Clientes com transações recentes',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Novos este Mês',
      value: analyticsData.newCustomersThisMonth.toLocaleString(),
      description: 'Cadastros realizados em 30 dias',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Crescimento',
      value: `+${analyticsData.customerGrowth}%`,
      description: 'Crescimento mensal da base',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ]

  if (loading || isLoadingCustomers) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Carregando métricas do sistema...
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="bg-muted h-4 w-2/3 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted mb-2 h-8 w-1/2 rounded"></div>
                <div className="bg-muted h-3 w-3/4 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || customersError) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-destructive">
            Erro ao carregar dados: {error || customersError?.message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Visão geral das métricas e estatísticas do sistema
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map(card => {
          const Icon = card.icon
          return (
            <Card
              key={card.title}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`rounded-md p-2 ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <CardDescription className="text-xs">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Crescimento de Clientes</CardTitle>
            <CardDescription>
              Evolução da base de clientes nos últimos meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex h-[200px] items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Gráfico em desenvolvimento</p>
                <p className="text-sm">
                  Integração com biblioteca de charts em breve
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
            <CardDescription>
              Informações do token e conectividade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Token Celcoin</span>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${accessToken ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <span
                    className={`text-xs ${accessToken ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {accessToken ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${!customersError ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <span
                    className={`text-xs ${!customersError ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {!customersError ? 'Online' : 'Erro'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total de Registros</span>
                <span className="text-muted-foreground text-xs">
                  {customers.length} cliente{customers.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Última Sync</span>
                <span className="text-muted-foreground text-xs">
                  {new Date().toLocaleTimeString('pt-BR')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção adicional com mais detalhes */}
      {customers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo dos Dados</CardTitle>
            <CardDescription>
              Análise detalhada da base de clientes atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Distribuição por Status</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Ativos:</span>
                    <span className="font-medium text-green-600">
                      {analyticsData.activeCustomers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Inativos:</span>
                    <span className="font-medium text-red-600">
                      {analyticsData.totalCustomers -
                        analyticsData.activeCustomers}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Dados de Contato</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Com Email:</span>
                    <span className="font-medium">
                      {
                        customers.filter(
                          (c: Customer) => c.email && c.email.trim() !== ''
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Com Telefone:</span>
                    <span className="font-medium">
                      {
                        customers.filter(
                          (c: Customer) => c.phone && c.phone.trim() !== ''
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Endereços</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Com Endereço:</span>
                    <span className="font-medium">
                      {
                        customers.filter(
                          (c: Customer) => c.addresses && c.addresses.length > 0
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Endereços:</span>
                    <span className="font-medium">
                      {customers.reduce(
                        (total: number, c: Customer) =>
                          total + (c.addresses ? c.addresses.length : 0),
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
