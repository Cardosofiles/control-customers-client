'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { CheckCircle, Eye, EyeOff, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário obrigatório'),
  password: z.string().min(1, 'Senha obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>

const login = process.env.NEXT_PUBLIC_USERNAME
const senha = process.env.NEXT_PUBLIC_PASSWORD

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoginSuccessModalOpen, setIsLoginSuccessModalOpen] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: LoginFormData) {
    const { username, password } = data
    if (username === login && password === senha) {
      Cookies.set('auth', 'true')
      setError('')
      // Abre o modal de sucesso antes de redirecionar
      setIsLoginSuccessModalOpen(true)
    } else {
      setError('Credenciais inválidas')
    }
  }

  function handleLoginSuccess() {
    setIsLoginSuccessModalOpen(false)
    // Pequeno delay para suavizar a transição
    setTimeout(() => {
      router.push('/dashboard')
    }, 300)
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Digite sua senha"
                          className="pr-10" // adiciona espaço à direita para o botão
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                          aria-label={
                            showPassword ? 'Ocultar senha' : 'Mostrar senha'
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Modal de Sucesso do Login */}
      <Dialog
        open={isLoginSuccessModalOpen}
        onOpenChange={setIsLoginSuccessModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle className="text-primary h-8 w-8" />
            </div>
            <DialogTitle className="text-primary text-center text-xl font-semibold">
              Login Realizado com Sucesso!
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Bem-vindo de volta! Você está sendo redirecionado para o{' '}
              <span className="text-primary font-semibold">dashboard</span> onde
              poderá gerenciar seus clientes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleLoginSuccess}
              className="dark:bg-primary/10 dark:hover:bg-primary/50 bg-primary w-full cursor-pointer"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Ir para Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
