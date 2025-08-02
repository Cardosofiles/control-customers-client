import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'

// Usuário fixo para demonstração
const DEMO_USER = {
  id: '1',
  email: 'asoec',
  password: '$2a$12$LQv3c1yqBwEHFgLZ5dKSNOIlNEhXoO5Y6oLT5vVkOoH7SJFk0QfwK',
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

        // Verifica se é o usuário demo
        if (email === DEMO_USER.email) {
          // Compara a senha (para demonstração, aceita tanto hash quanto texto puro)
          const isValidPassword =
            password === 'asoec@2025' ||
            (await bcrypt.compare(password, DEMO_USER.password))

          if (isValidPassword) {
            return {
              id: DEMO_USER.id,
              email: DEMO_USER.email,
              name: DEMO_USER.name,
            }
          }
        }

        return null
      },
    }),
  ],
})
