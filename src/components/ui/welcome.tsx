'use client'

import { Card, CardContent } from '@/components/ui/card'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function WelcomeBanner() {
  const [visible, setVisible] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Verifica se deve mostrar o banner baseado no cookie
    const checkShouldShow = () => {
      if (typeof window === 'undefined') return false

      const lastShown = document.cookie
        .split('; ')
        .find(row => row.startsWith('welcome-banner-last-shown='))
        ?.split('=')[1]

      if (!lastShown) {
        // Primeira vez que o usuário acessa
        return true
      }

      const lastShownTime = parseInt(lastShown)
      const now = Date.now()
      const eightHours = 8 * 60 * 60 * 1000 // 8 horas em millisegundos

      // Verifica se passaram 8 horas desde a última exibição
      return now - lastShownTime >= eightHours
    }

    const shouldShowBanner = checkShouldShow()
    setShouldShow(shouldShowBanner)

    if (shouldShowBanner) {
      const timeout = setTimeout(() => setVisible(true), 200) // leve delay
      return () => clearTimeout(timeout)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)

    // Salva o timestamp atual no cookie (válido por 30 dias)
    const now = Date.now()
    const expiryDate = new Date(now + 30 * 24 * 60 * 60 * 1000) // 30 dias
    document.cookie = `welcome-banner-last-shown=${now}; expires=${expiryDate.toUTCString()}; path=/`
  }

  // Se não deve mostrar, não renderiza nada
  if (!shouldShow) {
    return null
  }

  return (
    <div
      className={`fixed right-4 bottom-4 left-4 z-50 p-2 transition-all duration-500 sm:mx-auto sm:max-w-xl ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Card className="border-muted relative border bg-white/80 shadow-xl backdrop-blur-md dark:bg-zinc-900/60">
        <CardContent className="p-6">
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground absolute top-3 right-3 transition"
            aria-label="Fechar"
          >
            <X className="cursor-pointer" size={18} />
          </button>

          <p className="text-muted-foreground text-center text-sm">
            Seja muito bem-vindo(a) ao{' '}
            <span className="text-foreground font-bold">ControlCustomers!</span>{' '}
            <br />
            Uma plataforma moderna para{' '}
            <span className="text-primary font-bold">
              gestão inteligente
            </span>{' '}
            de clientes. Aqui você pode{' '}
            <span className="text-primary font-bold">cadastrar</span>,{' '}
            <span className="text-primary font-bold">organizar</span> e{' '}
            <span className="text-primary font-bold">acompanhar</span> seus
            clientes com{' '}
            <span className="text-primary font-bold">
              dashboards analíticos
            </span>
            , integração automática de{' '}
            <span className="text-primary font-bold">endereços via CEP</span> e
            muito mais!
          </p>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className="group/btn relative block h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            >
              Fechar
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
