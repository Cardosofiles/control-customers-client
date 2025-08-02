'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Ainda carregando

    if (!session) {
      router.push('/sign-in')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
          <p className="text-muted-foreground mt-2 text-sm">
            Verificando autenticação...
          </p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Será redirecionado
  }

  return <>{children}</>
}
