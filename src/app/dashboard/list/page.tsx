'use client'

import { CustomerTable } from '@/components/table/customer-table'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchCelcoinToken } from '@/services/celcoin/token'
import { RefreshCw, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ListPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function getToken() {
      try {
        setLoading(true)
        const token = await fetchCelcoinToken()
        setAccessToken(token)
        setTokenError(null)
        console.log('Token obtido para listagem:', token)
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao obter token'
        setAccessToken(null)
        setTokenError(errorMessage)
        console.error('Erro ao obter token:', err)
      } finally {
        setLoading(false)
      }
    }
    getToken()
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Lista de Clientes</h1>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="bg-muted h-6 w-1/3 rounded" />
            <div className="bg-muted h-4 w-2/3 rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted h-10 rounded" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-muted h-12 rounded" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="text-primary h-8 w-8" />
            <h1 className="text-3xl font-bold">Lista de Clientes</h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie todos os clientes cadastrados no sistema
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Atualizar</span>
          </Button>

          <Link href="/dashboard/registration">
            <Button size="sm" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Novo Cliente</span>
            </Button>
          </Link>
        </div>
      </div>

      {tokenError && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-destructive flex items-center space-x-2">
                <div className="bg-destructive h-2 w-2 rounded-full"></div>
                <p>Erro ao conectar com a API: {tokenError}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {accessToken ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Clientes Cadastrados</CardTitle>
                <CardDescription>
                  Visualize, edite e gerencie informações dos clientes
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <CustomerTable accessToken={accessToken} />
            </div>
          </CardContent>
        </Card>
      ) : (
        !loading && (
          <Card className="border-muted">
            <CardContent className="pt-6">
              <div className="text-muted-foreground text-center">
                <Users className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Não foi possível carregar a lista de clientes</p>
                <p className="mb-4 text-sm">
                  Verifique sua conexão e tente novamente
                </p>
                <Button variant="outline" onClick={handleRefresh}>
                  Recarregar
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      )}

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm">Funcionalidades Disponíveis</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>
              Use a busca para filtrar clientes por nome, email ou documento
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>Clique nos botões de ação para editar ou excluir registros</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>Use o botão "Novo Cliente" para cadastrar rapidamente</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>Atualize a lista com o botão "Atualizar" se necessário</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
