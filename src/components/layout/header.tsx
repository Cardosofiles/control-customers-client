'use client'

import { ThemeSelector } from '@/components/themes/theme-selector'
import { ModeToggle } from '@/components/themes/theme-toggle'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function Header() {
  const [isLogged, setIsLogged] = React.useState(false)
  const [isLogoutSuccessModalOpen, setIsLogoutSuccessModalOpen] =
    React.useState(false)

  // Atualiza estado em tempo real ao mudar o cookie
  React.useEffect(() => {
    function checkAuth() {
      setIsLogged(document.cookie.includes('auth=true'))
    }
    checkAuth()
    const interval = setInterval(checkAuth, 500)
    return () => clearInterval(interval)
  }, [])

  function handleSignOut() {
    if (typeof window !== 'undefined') {
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      setIsLogged(false)
      // Abre o modal de sucesso antes de redirecionar
      setIsLogoutSuccessModalOpen(true)
    }
  }

  function handleLogoutSuccess() {
    setIsLogoutSuccessModalOpen(false)
    // Pequeno delay para suavizar a transição
    setTimeout(() => {
      window.location.href = '/'
    }, 300)
  }

  return (
    <>
      <header className="bg-background/95 supports-[backdrop-filters]:bg-background/60 fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur">
        <div className="ls:px-8 mx-auto max-w-7xl border-r border-l px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-foreground hidden text-4xl font-bold lg:block">
              Control<span className="text-primary">Customers</span>
            </h1>

            <div className="flex items-center">
              <div className="mr-3 flex items-center gap-2 text-xs sm:text-sm">
                <div className="scale-90 sm:scale-100">
                  <ThemeSelector />
                </div>
                <div className="scale-90 sm:scale-100">
                  <ModeToggle />
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="bg-border mx-3 h-8 w-px self-center sm:h-10"
              />

              {isLogged ? (
                <Button
                  className="ml-2 h-7 px-3 text-xs sm:h-8 sm:px-4 sm:text-sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="size-3 sm:size-4" />
                  <span>Sair</span>
                </Button>
              ) : (
                <Button
                  asChild
                  className="ml-2 h-7 px-3 text-xs sm:h-8 sm:px-4 sm:text-sm"
                >
                  <Link href="/sign-in" className="flex items-center gap-1">
                    <LogIn className="size-3 sm:size-4" />
                    <span>Fazer Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Sucesso do Logout */}
      <Dialog
        open={isLogoutSuccessModalOpen}
        onOpenChange={setIsLogoutSuccessModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle className="text-primary h-8 w-8" />
            </div>
            <DialogTitle className="text-primary text-xl font-semibold">
              Logout Realizado com Sucesso!
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Você foi desconectado com segurança do sistema.{' '}
              <span className="text-foreground font-semibold">Obrigado</span>{' '}
              por usar o ControlCustomers!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleLogoutSuccess}
              className="bg-primary/10 w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
