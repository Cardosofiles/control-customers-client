'use client'

import { CreateCustomerForm } from '@/components/forms/create-customers-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchCelcoinToken } from '@/services/celcoin/token'
import { UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function RegistrationPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getToken() {
      try {
        setLoading(true)
        const token = await fetchCelcoinToken()
        setAccessToken(token)
        setTokenError(null)
        console.log('Token obtido para cadastro:', token)
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Cadastro de Cliente</h1>
          <p className="text-muted-foreground">Carregando formulário...</p>
        </div>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="bg-muted h-6 w-1/3 rounded"></div>
            <div className="bg-muted h-4 w-2/3 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="bg-muted h-4 w-1/4 rounded"></div>
                  <div className="bg-muted h-10 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <UserPlus className="text-primary h-8 w-8" />
          <h1 className="text-3xl font-bold">Cadastro de Cliente</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para cadastrar um novo cliente no sistema
        </p>
      </div>

      {tokenError && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive flex items-center space-x-2">
              <div className="bg-destructive h-2 w-2 rounded-full"></div>
              <p>Erro ao conectar com a API: {tokenError}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {accessToken ? (
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
            <CardDescription>Todos os campos são obrigatórios</CardDescription>
          </CardHeader>

          {/* Formulário de Cadastro */}
          <CardContent>
            <CreateCustomerForm accessToken={accessToken} />
          </CardContent>
        </Card>
      ) : (
        !loading && (
          <Card className="border-muted">
            <CardContent className="pt-6">
              <div className="text-muted-foreground text-center">
                <UserPlus className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Não foi possível carregar o formulário</p>
                <p className="text-sm">
                  Verifique sua conexão e tente novamente
                </p>
              </div>
            </CardContent>
          </Card>
        )
      )}

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm">Dicas de Preenchimento</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>O CPF/CNPJ deve ser válido e único no sistema</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>O e-mail será usado para comunicações importantes</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>Informe o CEP para preenchimento automático do endereço</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary mt-2 h-1.5 w-1.5 rounded-full"></div>
            <p>O telefone deve incluir DDD e ser um número válido</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
