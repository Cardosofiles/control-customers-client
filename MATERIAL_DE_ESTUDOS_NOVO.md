# 📚 Material de Estudos Completo - Customer Control Platform

> **Uma análise técnica abrangente de uma aplicação enterprise Next.js com sistema de autenticação avançado e integração de APIs**

Este documento representa um guia completo sobre as tecnologias, arquiteturas e práticas de desenvolvimento utilizadas neste projeto de controle de clientes enterprise. Ideal para desenvolvedores que desejam compreender implementações modernas do ecossistema React/Next.js.

## 🏗️ Visão Geral da Arquitetura

### Stack Tecnológico Principal

```typescript
// Configuração core do projeto
{
  "framework": "Next.js 15.4.2 + App Router",
  "runtime": "React 19.0.0",
  "authentication": "NextAuth.js 5.0-beta.29",
  "database": "Integration-ready (Celcoin API)",
  "styling": "Tailwind CSS 3.4.17",
  "forms": "React Hook Form 7.54.0 + Zod 3.24.1",
  "state": "TanStack Query 5.62.9",
  "ui": "shadcn/ui + Radix UI",
  "language": "TypeScript 5.7.3"
}
```

### Estrutura Modular Avançada

```
src/
├── app/                           # Next.js App Router
│   ├── (routes)/                  # Rotas grupadas
│   │   ├── dashboard/            # Dashboard modular
│   │   │   ├── layout.tsx        # Layout compartilhado
│   │   │   ├── analytics/        # Métricas e relatórios
│   │   │   ├── registration/     # Cadastro de clientes
│   │   │   └── list/            # Listagem e gestão
│   │   └── sign-in/             # Autenticação
│   └── api/                      # API Routes
│       ├── auth/[...nextauth]/   # NextAuth endpoints
│       └── celcoin-token/        # Token management
├── components/                    # Componentes modulares
│   ├── auth/                     # Autenticação
│   ├── forms/                    # Formulários complexos
│   ├── layout/                   # Layout components
│   ├── providers/                # Context providers
│   ├── table/                    # Tabelas de dados
│   ├── themes/                   # Sistema de temas
│   ├── ui/                       # Design system
│   └── whatsapp/                 # Integração WhatsApp
├── services/                     # Camada de serviços
│   └── celcoin/                  # API Celcoin integration
│       ├── api.ts               # HTTP client
│       ├── mutations.ts         # Data mutations
│       ├── queries.ts           # Data queries
│       ├── token.ts             # Token management
│       └── types.ts             # TypeScript types
├── lib/                          # Utilitários
└── utils/                        # Helpers e funções
```

## 🔐 Sistema de Autenticação Enterprise

### NextAuth.js 5.0 Beta - Implementação Avançada

#### Configuração de Segurança

```typescript
// auth.config.ts - Configuração central de autenticação
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Implementação com bcrypt para hash de senhas
        const hashedPassword = await bcrypt.hash(password, 10)
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (isValid) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Lógica de autorização baseada em rotas
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

      if (isOnDashboard) {
        return isLoggedIn // Redireciona para login se não autenticado
      }
      return true
    }
  }
}
```

#### Middleware de Proteção de Rotas

```typescript
// middleware.ts - Proteção automática de rotas
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

export const config = {
  // Protege todas as rotas exceto APIs, estáticos e imagens
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
```

#### Segurança com bcrypt

- **Hash de senhas**: Utilização do bcrypt para criptografia one-way
- **Salt rounds**: Configuração otimizada para performance vs segurança
- **Verificação segura**: Compare function para validação de senhas

## 🏢 Dashboard Modular Enterprise

### Arquitetura de Páginas Especializadas

#### 1. Analytics Dashboard (`/dashboard/analytics/`)

```typescript
// Métricas em tempo real e relatórios
interface AnalyticsData {
  totalCustomers: number
  newCustomersThisMonth: number
  activeConversions: number
  averageTicket: number
  monthlyGrowth: number
  geographicDistribution: RegionData[]
}

// Implementação com TanStack Query para cache inteligente
const { data: analytics } = useAnalytics(accessToken)
```

#### 2. Registration System (`/dashboard/registration/`)

```typescript
// Sistema de cadastro com validação avançada
const formSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  document: z.string().min(11, 'CPF/CNPJ inválido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  addresses: z.array(addressSchema).min(1, 'Pelo menos um endereço'),
})

// Formatação automática de campos
function formatCpfCnpj(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }
}
```

#### 3. Customer Management (`/dashboard/list/`)

```typescript
// Gestão completa com tabelas interativas
interface CustomerTableProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (id: string) => void
  onViewDetails: (customer: Customer) => void
}

// Implementação com ordenação, filtros e paginação
const CustomerTable = ({ customers, ...actions }: CustomerTableProps) => {
  // Lógica de tabela com sorting, filtering, e bulk actions
}
```

### Navegação Inteligente

```typescript
// DashboardNavbar - Navegação contextual
const DashboardNavbar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/dashboard/registration', label: 'Cadastro', icon: UserPlus },
    { href: '/dashboard/list', label: 'Listagem', icon: Users }
  ]

  return (
    <nav className="border-b">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-link ${pathname === item.href ? 'active' : ''}`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
```

## 🌐 Integração de APIs com Sistema de Fallback

### Celcoin API Integration

#### Cliente HTTP Configurado

```typescript
// services/celcoin/api.ts - Cliente HTTP inteligente
export function createCelcoinApi(accessToken: string) {
  return axios.create({
    baseURL: process.env.CELCOIN_API_BASE_URL || 'https://sandbox.openfinance.celcoin.dev/v5',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
  })
}

// Token management automático
export async function getCelcoinToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/celcoin-token', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Erro ao obter token:', error)
    return null
  }
}
```

#### Sistema de Mutações com Fallback

```typescript
// services/celcoin/mutations.ts - CRUD operations
export function useCreateCustomer(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (customerData: Partial<Customer>) => {
      const api = createCelcoinApi(accessToken)
      try {
        const response = await api.post('/customers', customerData)
        return response.data
      } catch (error: unknown) {
        const axiosError = error as AxiosError

        // Sistema inteligente de fallback
        if (
          !axiosError.response ||
          axiosError.response?.status === 400 ||
          axiosError.response?.status === 404
        ) {
          console.log('API indisponível, ativando modo demo...')
          // Simula operação localmente
          const newCustomer = mockDataOperations.addCustomer(customerData)
          return {
            success: true,
            data: newCustomer,
            message: 'Cliente criado localmente (modo demo)',
          }
        }
        throw error
      }
    },
    onSuccess: () => {
      // Invalida cache para atualização automática
      queryClient.invalidateQueries({ queryKey: ['celcoin-customers'] })
    },
  })
}

// Operações mock para desenvolvimento e fallback
const mockDataOperations = {
  addCustomer: (customerData: Partial<Customer>): Customer => {
    const newCustomer: Customer = {
      id: `mock-${Date.now()}`,
      name: customerData.name || '',
      document: customerData.document || '',
      email: customerData.email || '',
      phone: customerData.phone || '',
      addresses: customerData.addresses || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Persiste em localStorage para simular banco
    const customers = getStoredMockData()
    customers.push(newCustomer)
    localStorage.setItem('mockCustomers', JSON.stringify(customers))

    return newCustomer
  },

  updateCustomer: (id: string, data: Partial<Customer>): Customer => {
    // Implementação de atualização mock
  },

  deleteCustomer: (id: string): boolean => {
    // Implementação de remoção mock
  }
}
```

#### Queries com Cache Inteligente

```typescript
// services/celcoin/queries.ts - Data fetching
export function useCelcoinCustomers(accessToken: string | null) {
  return useQuery({
    queryKey: ['celcoin-customers', accessToken],
    queryFn: async () => {
      if (!accessToken) {
        console.log('Token indisponível, usando dados mock...')
        return getMockCustomers()
      }

      const api = createCelcoinApi(accessToken)
      try {
        const response = await api.get('/customers')
        return response.data
      } catch (error) {
        console.log('Erro na API, fallback para dados mock...')
        return getMockCustomers()
      }
    },
    enabled: true, // Sempre executar
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Retry inteligente baseado no tipo de erro
      if (error instanceof AxiosError) {
        return failureCount < 2 && error.response?.status !== 401
      }
      return failureCount < 3
    }
  })
}
```

## 🎨 Design System e UI/UX

### shadcn/ui + Radix UI Primitives

#### Componentes Base Customizados

```typescript
// components/ui/button.tsx - Variantes configuráveis
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

#### Sistema de Temas Dinâmico

```typescript
// components/themes/theme-provider.tsx - Context para temas
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}

// components/themes/theme-toggle.tsx - Troca de temas
const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Formulários Avançados com Validação

#### React Hook Form + Zod Schema

```typescript
// components/forms/create-customers-form.tsx - Formulário complexo
const addressSchema = z.object({
  street: z.string().min(1, 'Rua obrigatória'),
  number: z.string().min(1, 'Número obrigatório'),
  neighborhood: z.string().min(1, 'Bairro obrigatório'),
  city: z.string().min(1, 'Cidade obrigatória'),
  state: z.string().min(2, 'Estado obrigatório'),
  zipcode: z.string().min(8, 'CEP obrigatório'),
})

const formSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  document: z.string().min(11, 'CPF/CNPJ inválido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  addresses: z.array(addressSchema).min(1, 'Pelo menos um endereço'),
})

// Hook form com field arrays para múltiplos endereços
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: '',
    document: '',
    email: '',
    phone: '',
    addresses: [{ street: '', number: '', neighborhood: '', city: '', state: '', zipcode: '' }],
  },
})

const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'addresses',
})
```

#### Input Customizado com Máscaras

```typescript
// components/ui/email-input.tsx - Input com validação visual
const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ className, ...props }, ref) => {
    const [isValid, setIsValid] = useState<boolean | null>(null)

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    return (
      <div className="relative">
        <Input
          type="email"
          className={cn(
            "pr-10",
            isValid === true && "border-green-500 focus:border-green-500",
            isValid === false && "border-red-500 focus:border-red-500",
            className
          )}
          ref={ref}
          onChange={(e) => {
            const email = e.target.value
            setIsValid(email ? validateEmail(email) : null)
            props.onChange?.(e)
          }}
          {...props}
        />
        {isValid !== null && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isValid ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
          </div>
        )}
      </div>
    )
  }
)
```

## 📊 Gerenciamento de Estado Global

### TanStack Query - Cache e Sincronização

#### Configuração do Query Client

```typescript
// components/providers/query-provider.tsx - Setup global
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      gcTime: 5 * 60 * 1000, // 5 minutos
      retry: (failureCount, error) => {
        // Retry logic baseado no tipo de erro
        if (error instanceof Error && error.message.includes('Network')) {
          return failureCount < 3
        }
        return failureCount < 1
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error)
        toast.error('Erro na operação. Tente novamente.')
      },
    },
  },
})

// Persistência de cache
import { persistQueryClient } from '@tanstack/react-query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // 24 horas
})
```

#### Mutações Otimistas

```typescript
// Implementação de mutações com rollback automático
export function useOptimisticUpdateCustomer(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Customer> }) => {
      const api = createCelcoinApi(accessToken)
      const response = await api.put(`/customers/${id}`, data)
      return response.data
    },
    onMutate: async ({ id, data }) => {
      // Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: ['celcoin-customers'] })

      // Snapshot do estado atual
      const previousCustomers = queryClient.getQueryData(['celcoin-customers'])

      // Atualização otimística
      queryClient.setQueryData(['celcoin-customers'], (old: Customer[]) => {
        return old.map(customer =>
          customer.id === id ? { ...customer, ...data } : customer
        )
      })

      return { previousCustomers }
    },
    onError: (err, variables, context) => {
      // Rollback em caso de erro
      if (context?.previousCustomers) {
        queryClient.setQueryData(['celcoin-customers'], context.previousCustomers)
      }
    },
    onSettled: () => {
      // Refetch para garantir consistência
      queryClient.invalidateQueries({ queryKey: ['celcoin-customers'] })
    },
  })
}
```

## 🛡️ TypeScript Avançado e Type Safety

### Tipagem Rigorosa de Domínio

#### Tipos de Negócio

```typescript
// services/celcoin/types.ts - Definições de domínio
export interface Customer {
  id: string
  name: string
  document: string // CPF ou CNPJ
  email: string
  phone: string
  addresses: Address[]
  createdAt: string
  updatedAt: string
  status?: 'active' | 'inactive' | 'pending'
}

export interface Address {
  id?: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipcode: string
  country?: string
  type?: 'residential' | 'commercial' | 'billing'
  isMain?: boolean
}

// Tipos de API Response
export interface CelcoinApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Tipos de formulário
export type CustomerFormData = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>

// Tipos de filtros e busca
export interface CustomerFilters {
  search?: string
  status?: Customer['status']
  city?: string
  state?: string
  dateRange?: {
    from: Date
    to: Date
  }
}

// Utilitários de tipo
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>
```

#### Hooks Tipados

```typescript
// Hooks com tipagem completa
export function useCustomerActions(accessToken: string) {
  const createMutation = useCreateCustomer(accessToken)
  const updateMutation = useUpdateCustomer(accessToken)
  const deleteMutation = useDeleteCustomer(accessToken)

  return {
    createCustomer: createMutation.mutate,
    updateCustomer: updateMutation.mutate,
    deleteCustomer: deleteMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    errors: {
      create: createMutation.error,
      update: updateMutation.error,
      delete: deleteMutation.error,
    }
  } as const
}

// Hook para validação de documentos
export function useDocumentValidation() {
  const validateCPF = useCallback((cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, '')
    if (cleanCpf.length !== 11) return false

    // Algoritmo de validação CPF
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i)
    }
    // ... resto da validação

    return true
  }, [])

  const validateCNPJ = useCallback((cnpj: string): boolean => {
    // Algoritmo de validação CNPJ
    const cleanCnpj = cnpj.replace(/\D/g, '')
    if (cleanCnpj.length !== 14) return false
    // ... validação completa

    return true
  }, [])

  return { validateCPF, validateCNPJ } as const
}
```

## 🎯 Práticas de Desenvolvimento e Performance

### Code Splitting e Lazy Loading

```typescript
// Carregamento dinâmico de componentes
const CustomerTable = dynamic(() => import('@/components/table/customer-table'), {
  loading: () => <div className="animate-pulse">Carregando tabela...</div>,
  ssr: false
})

const AnalyticsDashboard = dynamic(() => import('@/components/layout/analytics-dashboard-preview'), {
  loading: () => <AnalyticsSkeletonLoader />,
})

// Lazy loading de rotas
const DashboardAnalytics = lazy(() => import('./analytics/page'))
const DashboardRegistration = lazy(() => import('./registration/page'))
const DashboardList = lazy(() => import('./list/page'))
```

### Otimização de Performance

```typescript
// Memoização inteligente
const MemoizedCustomerCard = memo(({ customer, onEdit, onDelete }: CustomerCardProps) => {
  return (
    <Card className="customer-card">
      {/* Conteúdo do card */}
    </Card>
  )
}, (prevProps, nextProps) => {
  // Comparação customizada para evitar re-renders desnecessários
  return (
    prevProps.customer.id === nextProps.customer.id &&
    prevProps.customer.updatedAt === nextProps.customer.updatedAt
  )
})

// Debounce para busca
const useDebounceSearch = (searchTerm: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm)
    }, delay)

    return () => clearTimeout(handler)
  }, [searchTerm, delay])

  return debouncedValue
}

// Virtual scrolling para grandes listas
const VirtualizedCustomerList = ({ customers }: { customers: Customer[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { items, totalHeight } = useVirtualScrolling({
    items: customers,
    itemHeight: 80,
    containerHeight: 400,
    overscan: 5,
  })

  return (
    <div ref={containerRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {items.map(({ item, index, start }) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: start,
              height: 80,
              width: '100%',
            }}
          >
            <CustomerCard customer={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Error Boundaries e Tratamento de Erros

```typescript
// Error boundary global
class CustomerErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Customer boundary error:', error, errorInfo)
    // Integração com serviço de monitoramento (ex: Sentry)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Algo deu errado</h2>
          <details>
            {this.state.error?.message}
          </details>
          <Button onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook para tratamento de erros
export function useErrorHandler() {
  const handleError = useCallback((error: unknown, context?: string) => {
    console.error(`Error in ${context}:`, error)

    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message
      toast.error(`Erro de API: ${message}`)
    } else if (error instanceof Error) {
      toast.error(`Erro: ${error.message}`)
    } else {
      toast.error('Erro desconhecido')
    }
  }, [])

  return { handleError }
}
```

## 🚀 Deploy e DevOps

### Configuração Next.js para Produção

```typescript
// next.config.ts - Configuração otimizada
const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['api.celcoin.com'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
}
```

### Variáveis de Ambiente

```bash
# .env.local - Configuração de desenvolvimento
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=http://localhost:3000

# Celcoin API
CELCOIN_API_BASE_URL=https://sandbox.openfinance.celcoin.dev/v5
CELCOIN_CLIENT_ID=your-client-id
CELCOIN_CLIENT_SECRET=your-client-secret

# Database (quando aplicável)
DATABASE_URL=postgresql://user:password@localhost:5432/customers

# External services
WHATSAPP_API_URL=https://api.whatsapp.com
ANALYTICS_API_KEY=your-analytics-key
```

## 📚 Conceitos Avançados de Negócio

### 1. Gestão de Clientes Enterprise

- **CRUD Completo**: Create, Read, Update, Delete com validações
- **Múltiplos Endereços**: Sistema flexível para diferentes tipos de endereço
- **Validação de Documentos**: CPF e CNPJ com algoritmos de validação
- **Sistema de Status**: Controle de estado do cliente (ativo, inativo, pendente)
- **Auditoria**: Tracking de criação e atualização
- **Soft Delete**: Remoção lógica mantendo histórico

### 2. Integração de APIs Robusta

- **Fallback Inteligente**: Sistema que funciona offline/online
- **Cache Inteligente**: Estratégia de cache baseada em contexto
- **Retry Logic**: Tentativas automáticas com backoff exponencial
- **Mock Data**: Dados simulados para desenvolvimento e demo
- **Token Management**: Renovação automática de tokens de acesso

### 3. UX/UI Avançada

- **Design System**: Componentes reutilizáveis e consistentes
- **Temas Dinâmicos**: Suporte a light/dark mode
- **Responsividade**: Mobile-first design
- **Acessibilidade**: ARIA labels e navegação por teclado
- **Loading States**: Feedbacks visuais para todas as operações
- **Error States**: Tratamento elegante de erros

## 🎓 Roadmap de Estudos Recomendado

### Nível Iniciante

1. **JavaScript/TypeScript Fundamentals**
   - ES6+ features, async/await, promises
   - TypeScript types, interfaces, generics
   - [TypeScript Handbook](https://www.typescriptlang.org/docs)

2. **React Fundamentals**
   - Components, hooks, state management
   - Event handling, forms, lifecycle
   - [React Documentation](https://react.dev)

3. **Next.js Basics**
   - App Router, routing, layouts
   - Server vs Client Components
   - [Next.js Learn](https://nextjs.org/learn)

### Nível Intermediário

1. **State Management**
   - TanStack Query (React Query)
   - Context API, useReducer
   - [TanStack Query Docs](https://tanstack.com/query)

2. **Forms & Validation**
   - React Hook Form
   - Zod schema validation
   - [React Hook Form Guide](https://react-hook-form.com)

3. **Styling & UI**
   - Tailwind CSS
   - shadcn/ui components
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Nível Avançado

1. **Authentication & Security**
   - NextAuth.js v5
   - JWT tokens, sessions
   - [NextAuth.js Documentation](https://authjs.dev)

2. **API Integration**
   - Axios, fetch patterns
   - Error handling, retries
   - Cache strategies

3. **Performance & Optimization**
   - Code splitting, lazy loading
   - Memoization, virtual scrolling
   - Bundle analysis

### Nível Expert

1. **Architecture Patterns**
   - Clean Architecture
   - Domain-Driven Design
   - Microservices patterns

2. **Testing Strategies**
   - Unit tests (Jest, Vitest)
   - Integration tests
   - E2E testing (Playwright)

3. **DevOps & Deploy**
   - CI/CD pipelines
   - Docker containerization
   - Monitoring and analytics

## 📖 Recursos de Aprendizado

### Documentações Oficiais

- [**Next.js**](https://nextjs.org/docs) - Framework React de produção
- [**NextAuth.js**](https://authjs.dev) - Autenticação para Next.js
- [**TypeScript**](https://www.typescriptlang.org/docs) - JavaScript tipado
- [**TanStack Query**](https://tanstack.com/query) - Data fetching e cache
- [**React Hook Form**](https://react-hook-form.com) - Formulários performáticos
- [**Zod**](https://zod.dev) - Schema validation
- [**Tailwind CSS**](https://tailwindcss.com/docs) - Utility-first CSS
- [**shadcn/ui**](https://ui.shadcn.com) - Componentes reutilizáveis

### Cursos e Tutoriais

- [**Next.js Mastery**](https://nextjs.org/learn) - Curso oficial
- [**TypeScript Deep Dive**](https://basarat.gitbook.io/typescript/) - Guia completo
- [**React Patterns**](https://reactpatterns.com) - Padrões avançados
- [**Web.dev**](https://web.dev) - Performance e best practices

### Livros Recomendados

- "Clean Code" - Robert C. Martin
- "Clean Architecture" - Robert C. Martin
- "Effective TypeScript" - Dan Vanderkam
- "Learning React" - Alex Banks & Eve Porcello

### Comunidades e Blogs

- [**React Community**](https://react.dev/community)
- [**Next.js Discord**](https://discord.gg/nextjs)
- [**TypeScript Community**](https://www.typescriptlang.org/community)
- [**Dev.to React**](https://dev.to/t/react)

## 🔍 Padrões de Código e Best Practices

### Estrutura de Componentes

```typescript
// Padrão recomendado para componentes
interface ComponentProps {
  // Props tipadas
}

const Component = ({ prop1, prop2 }: ComponentProps) => {
  // 1. Hooks no topo
  const [state, setState] = useState()
  const query = useQuery()

  // 2. Funções auxiliares
  const handleAction = useCallback(() => {
    // Lógica
  }, [dependencies])

  // 3. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies])

  // 4. Early returns
  if (loading) return <Skeleton />
  if (error) return <ErrorComponent />

  // 5. Render principal
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 6. Display name para debugging
Component.displayName = 'Component'

export default Component
```

### Organização de Imports

```typescript
// 1. React e hooks
import React, { useState, useEffect } from 'react'

// 2. Bibliotecas externas
import { useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Componentes internos
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// 4. Services e utilities
import { api } from '@/services/api'
import { cn } from '@/lib/utils'

// 5. Types
import type { Customer } from '@/types'
```

---

## 🏆 Conclusão

Este projeto representa uma implementação completa e moderna de uma aplicação web enterprise, utilizando as melhores práticas e tecnologias do ecossistema React/Next.js.

### Principais Diferenciais Técnicos:

🔐 **Autenticação Enterprise**: NextAuth.js 5.0 beta com segurança bcrypt  
🏗️ **Arquitetura Modular**: Dashboard especializado em 3 áreas de negócio  
🌐 **API Integration**: Sistema inteligente de fallback e cache  
🎨 **Design System**: shadcn/ui com temas dinâmicos  
📊 **State Management**: TanStack Query com persistência  
🛡️ **Type Safety**: TypeScript rigoroso em toda aplicação  
⚡ **Performance**: Otimizações avançadas e lazy loading  
🧪 **Developer Experience**: Hot reload, error boundaries, debugging

### Tecnologias de Ponta:

- **Next.js 15.4.2** com App Router e React 19
- **NextAuth.js 5.0-beta** para autenticação
- **TanStack Query 5.62.9** para gerenciamento de estado
- **React Hook Form 7.54.0** + **Zod 3.24.1** para formulários
- **Tailwind CSS 3.4.17** + **shadcn/ui** para design system
- **TypeScript 5.7.3** para type safety

Este material serve como referência técnica completa para desenvolvedores que desejam compreender implementações enterprise do ecossistema React, patterns de arquitetura moderna e integração de APIs robustas.

---

**Desenvolvido com ❤️ | Última atualização: 2025**
