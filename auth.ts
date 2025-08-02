import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'

// Usando as credenciais já configuradas no .env da Vercel
const DEMO_USER = {
  id: '1',
  email: process.env.NEXT_PUBLIC_USERNAME || 'asoec',
  password: process.env.NEXT_PUBLIC_PASSWORD || 'asoec@2025',
  name: 'Admin User',
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Verifica se as credenciais coincidem com as variáveis de ambiente
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
          return {
            id: DEMO_USER.id,
            email: DEMO_USER.email,
            name: DEMO_USER.name,
          }
        }

        return null
      },
    }),
  ],
})
