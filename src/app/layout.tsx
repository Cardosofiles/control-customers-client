import { Header } from '@/components/layout/header'
import { AuthProvider } from '@/components/providers/auth-provider'
import { ActiveThemeProvider } from '@/components/themes/theme-active'
import { ThemeProvider } from '@/components/themes/theme-provider'
import { TanStackProviders } from '@/components/ui/query-provider'
import { WelcomeBanner } from '@/components/ui/welcome'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { inter, ptSansCaption } from '@/utils/fonts'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: {
    default: 'Sistema de Cadastro de Clientes',
    template: '%s | Cadastro de Clientes',
  },
  description:
    'Gerencie e cadastre clientes de forma simples e eficiente com nosso sistema moderno e seguro.',
  keywords: [
    'cadastro de clientes',
    'gestão de clientes',
    'sistema de clientes',
    'CRM',
    'cliente',
    'Next.js',
    'aplicação web',
    'frontend',
    'formulário',
  ],
  authors: [{ name: 'Cardoso Files', url: 'https://github.com/cardosofiles' }],
  creator: 'Cardoso Files',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: 'Sistema de Cadastro de Clientes',
    description:
      'Uma aplicação moderna desenvolvida com Next.js para cadastrar e gerenciar informações de clientes com eficiência.',
    url: 'https://seu-dominio.com',
    siteName: 'Sistema de Clientes',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sistema de Cadastro de Clientes',
    description:
      'Cadastre, edite e gerencie seus clientes com facilidade usando nossa aplicação.',
    creator: '@seuUsuarioTwitter',
  },
  alternates: {
    canonical: 'https://seu-dominio.com',
  },
  category: 'aplicativo',
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get('active_theme')?.value
  const isScaled = activeThemeValue?.endsWith('-scaled')

  return (
    <html
      lang="pt-BR"
      className={`${inter.className} ${ptSansCaption.className} antialiased`}
      suppressHydrationWarning
    >
      <body
        className={cn(
          'bg-background relative overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : ''
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ActiveThemeProvider initialTheme={activeThemeValue}>
              <Header />
              <main className="ls:px-8 mx-auto mt-16 flex max-w-7xl flex-1 flex-col border-r border-l px-4 sm:px-6">
                <TanStackProviders>
                  <WelcomeBanner />
                  {children}
                </TanStackProviders>
              </main>
            </ActiveThemeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
