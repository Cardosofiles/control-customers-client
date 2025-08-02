import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'

// Hash da senha para maior segurança
const hashedPassword =
  '$2b$12$pHnx0v0W4QqoQUk67YRDY.4BmJCKhUAOsjhsG93aSVb5u8mmhlxDu' // Hash de 'asoec@2025'

const DEMO_USER = {
  id: '1',
  email: process.env.NEXT_PUBLIC_USERNAME || 'asoec',
  password: hashedPassword, // Senha protegida com hash bcrypt
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

        // Verifica se o email coincide e compara a senha com hash bcrypt
        if (email === DEMO_USER.email) {
          const isValidPassword = await bcrypt.compare(
            password,
            DEMO_USER.password
          )

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
