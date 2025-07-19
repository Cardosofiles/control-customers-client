# 📚 Material de Estudos Completo: ControlCustomers

## Sistema de Gestão de Clientes - Análise Técnica Detalhada

---

## 📋 Índice

1. [Visão Geral da Aplicação](#visão-geral-da-aplicação)
2. [Arquitetura e Stack Tecnológico](#arquitetura-e-stack-tecnológico)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Análise de Componentes](#análise-de-componentes)
5. [Gerenciamento de Estado](#gerenciamento-de-estado)
6. [Integração com APIs](#integração-com-apis)
7. [Sistema de Temas](#sistema-de-temas)
8. [Validação e Formulários](#validação-e-formulários)
9. [Performance e Otimização](#performance-e-otimização)
10. [Patterns e Boas Práticas](#patterns-e-boas-práticas)
11. [Exercícios Práticos](#exercícios-práticos)

---

## 🎯 Visão Geral da Aplicação

### Propósito

O **ControlCustomers** é uma aplicação moderna de gestão de clientes que demonstra as melhores práticas de desenvolvimento React/Next.js. A aplicação permite:

- ✅ **CRUD Completo de Clientes**: Criar, ler, atualizar e excluir clientes
- ✅ **Gestão de Endereços**: Múltiplos endereços por cliente com integração ViaCEP
- ✅ **Dashboard Analytics**: Visualizações de dados com gráficos interativos
- ✅ **Sistema de Autenticação**: Login simulado com validação
- ✅ **Integração Externa**: API Celcoin para serviços
- ✅ **Design Responsivo**: Interface adaptável para todos os dispositivos
- ✅ **Sistema de Temas**: Modo claro/escuro com persistência

### Complexidade Técnica

- **Frontend Avançado**: React 19 + Next.js 15 com App Router
- **State Management**: TanStack Query para cache inteligente
- **Type Safety**: TypeScript com validação Zod
- **UI Moderna**: shadcn/ui + Tailwind CSS 4
- **Performance**: Lazy loading, code splitting, otimizações de bundle

---

## 🏗️ Arquitetura e Stack Tecnológico

### Core Framework

```typescript
// Next.js 15.4.2 com Turbopack
"next": "15.4.2"           // Framework React com App Router
"react": "19.1.0"          // Biblioteca UI com Concurrent Features
"react-dom": "19.1.0"      // Rendering engine
"typescript": "^5"         // Tipagem estática
```

### Estado e Cache

```typescript
"@tanstack/react-query": "^5.83.0"                    // Server state management
"@tanstack/react-query-persist-client": "^5.83.0"     // Persistência de cache
"localforage": "^1.10.0"                              // Storage offline
```

### UI e Design System

```typescript
"@shadcn/ui": "^0.0.4"               // Componentes base
"@radix-ui/react-*": "^1.x.x"        // Primitivos acessíveis
"tailwindcss": "^4"                  // CSS utilitário
"framer-motion": "^12.23.6"          // Animações
"lucide-react": "^0.525.0"           // Ícones
"next-themes": "^0.4.6"              // Sistema de temas
```

### Validação e Formulários

```typescript
"react-hook-form": "^7.60.0"         // Formulários performáticos
"@hookform/resolvers": "^5.1.1"      // Integração com validadores
"zod": "^4.0.5"                      // Schema validation
"react-imask": "^7.6.1"              // Máscaras de input
```

### Visualização e Utilitários

```typescript
"recharts": "^3.1.0"                 // Gráficos React
"axios": "^1.10.0"                   // HTTP client
"clsx": "^2.1.1"                     // Conditional classes
"tailwind-merge": "^3.3.1"           // Merge Tailwind classes
"sonner": "^2.0.6"                   // Toast notifications
```

---

## 📁 Estrutura do Projeto

### Organização de Diretórios

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial (/)
│   ├── api/               # API Routes
│   │   └── celcoin-token/ # Endpoint para token Celcoin
│   ├── dashboard/         # Página do dashboard (/dashboard)
│   └── sign-in/           # Página de login (/sign-in)
│
├── components/            # Componentes reutilizáveis
│   ├── forms/             # Formulários especializados
│   ├── layout/            # Componentes de layout
│   ├── table/             # Tabelas de dados
│   ├── themes/            # Sistema de temas
│   ├── ui/                # Componentes base (shadcn/ui)
│   └── whatsapp/          # Integração WhatsApp
│
├── lib/                   # Utilitários e configurações
├── services/              # Integração com APIs externas
│   └── celcoin/           # Serviços da API Celcoin
├── styles/                # Estilos globais
└── utils/                 # Utilitários diversos
```

### Padrão de Organização

1. **Separação por Funcionalidade**: Cada domínio tem sua pasta
2. **Colocation**: Componentes próximos ao seu uso
3. **Barrel Exports**: Exports centralizados quando necessário
4. **Naming Convention**: PascalCase para componentes, camelCase para funções

---

## 🧩 Análise de Componentes

### 1. Layout Principal (`src/app/layout.tsx`)

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.variable, ptSansCaption.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveThemeProvider>
            <TanStackProviders>
              <Header />
              <main className="container mx-auto px-4">
                {children}
              </main>
              <Toaster />
            </TanStackProviders>
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Conceitos Aplicados:**

- **Provider Pattern**: Múltiplos providers aninhados
- **Theme System**: next-themes para persistência
- **Query Client**: TanStack Query para cache global
- **Font Loading**: Next.js font optimization

### 2. Formulário de Cliente (`src/components/forms/create-customers-form.tsx`)

```typescript
const formSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  document: z.string().min(11, 'CPF/CNPJ inválido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  addresses: z.array(addressSchema).min(1, 'Informe pelo menos um endereço'),
})

export function CreateCustomerForm({ accessToken }: CreateCustomerFormProps) {
  const { register, control, handleSubmit, setValue, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { addresses: [defaultAddress] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  })

  const { mutateAsync: createCustomer } = useCreateCustomer(accessToken)
}
```

**Conceitos Aplicados:**

- **Schema Validation**: Zod para tipagem e validação
- **React Hook Form**: Performance com re-renders minimizados
- **Field Arrays**: Gerenciamento de arrays dinâmicos
- **Controlled Components**: Integração com bibliotecas externas
- **Error Handling**: Feedback visual para validações

### 3. Tabela de Clientes (`src/components/table/customer-table.tsx`)

```typescript
export function CustomerTable({ accessToken }: CustomerTableProps) {
  const { data: customers, isLoading, error } = useCustomers(accessToken)
  const { mutateAsync: editCustomer } = useEditCustomer(accessToken)
  const { mutateAsync: deleteCustomer } = useDeleteCustomer(accessToken)

  // Estados locais para modais
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
}
```

**Conceitos Aplicados:**

- **Data Fetching**: TanStack Query para cache automático
- **Optimistic Updates**: Atualizações imediatas na UI
- **Modal State**: Gerenciamento de modais complexos
- **Error Boundaries**: Tratamento gracioso de erros

---

## 🔄 Gerenciamento de Estado

### TanStack Query Configuration

```typescript
// src/components/ui/query-provider.tsx
const [queryClient] = useState(
  () => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,     // 5 minutos
        refetchOnWindowFocus: false,   // Não refetch ao focar
        retry: 2,                      // 2 tentativas
      },
      mutations: {
        retry: 1,                      // 1 tentativa para mutations
      },
    },
  })
)
```

### Cache Persistence

```typescript
// Persistência com localforage
const storage = {
  getItem: (key: string) => localforage.getItem<string>(key),
  setItem: (key: string, value: string) => localforage.setItem(key, value),
  removeItem: (key: string) => localforage.removeItem(key),
}

// Configuração de persistência
persistOptions: {
  persister: {
    persistClient: async (client) => {
      await storage.setItem('tanstack-query-cache', JSON.stringify(client))
    },
    restoreClient: async () => {
      const cached = await storage.getItem('tanstack-query-cache')
      return cached ? JSON.parse(cached) : undefined
    },
  },
  maxAge: 1000 * 60 * 60 * 24, // 24 horas
}
```

### Queries e Mutations

```typescript
// src/services/celcoin/queries.ts
export function useCustomers(accessToken: string) {
  return useQuery({
    queryKey: ['celcoin-customers', accessToken],
    queryFn: () => fetchCustomers(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

// src/services/celcoin/mutations.ts
export function useCreateCustomer(accessToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (customerData) => {
      // Tentativa real na API
      try {
        const response = await api.post('/customers', customerData)
        return response.data
      } catch (error) {
        // Fallback para dados simulados
        return mockDataOperations.addCustomer(customerData)
      }
    },
    onSuccess: () => {
      // Invalidação automática do cache
      queryClient.invalidateQueries({ queryKey: ['celcoin-customers'] })
    },
  })
}
```

**Conceitos Aplicados:**

- **Server State vs Client State**: Separação clara de responsabilidades
- **Background Refetching**: Atualizações transparentes
- **Cache Invalidation**: Invalidação inteligente
- **Optimistic Updates**: UX fluida com atualizações imediatas
- **Error Recovery**: Fallbacks gracioosos

---

## 🌐 Integração com APIs

### Estrutura da API Celcoin

```typescript
// src/services/celcoin/api.ts
export function createCelcoinApi(accessToken: string) {
  return axios.create({
    baseURL: 'https://sandbox.celcoin.com.br/v5',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  })
}
```

### Sistema de Fallback

```typescript
// Estratégia de fallback robusto
export function useCreateCustomer(accessToken: string) {
  return useMutation({
    mutationFn: async (customerData) => {
      const api = createCelcoinApi(accessToken)
      try {
        // Tentativa 1: API real
        const response = await api.post('/customers', customerData)
        return response.data
      } catch (error) {
        // Tentativa 2: Simulação local
        if (isNetworkError(error) || isAPIError(error)) {
          console.log('API indisponível, simulando localmente...')
          return mockDataOperations.addCustomer(customerData)
        }
        throw error
      }
    }
  })
}
```

### Mock Data Operations

```typescript
// Sistema de dados simulados
export const mockDataOperations = {
  addCustomer: (customerData: Partial<Customer>) => {
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      ...customerData,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Armazena no localStorage para persistência
    const customers = JSON.parse(localStorage.getItem('mock-customers') || '[]')
    customers.push(newCustomer)
    localStorage.setItem('mock-customers', JSON.stringify(customers))

    return newCustomer
  },

  updateCustomer: (id: string, data: Partial<Customer>) => {
    const customers = JSON.parse(localStorage.getItem('mock-customers') || '[]')
    const index = customers.findIndex(c => c.id === id)

    if (index !== -1) {
      customers[index] = { ...customers[index], ...data, updatedAt: new Date().toISOString() }
      localStorage.setItem('mock-customers', JSON.stringify(customers))
      return customers[index]
    }

    throw new Error('Cliente não encontrado')
  }
}
```

**Conceitos Aplicados:**

- **Circuit Breaker Pattern**: Fallback automático
- **Graceful Degradation**: Funcionalidade mesmo offline
- **Error Handling**: Tipos específicos de erro
- **Data Persistence**: LocalStorage para dados simulados

---

## 🎨 Sistema de Temas

### Configuração de Temas

```typescript
// src/components/themes/theme-provider.tsx
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Uso no layout
<ThemeProvider
  attribute="class"           // Usa classes CSS
  defaultTheme="light"        // Tema padrão
  enableSystem               // Detecta preferência do sistema
  disableTransitionOnChange  // Performance durante mudanças
>
  {children}
</ThemeProvider>
```

### CSS Variables System

```css
/* src/styles/globals.css */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  /* ... mais variáveis ... */
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.92 0.004 286.32);
  --primary-foreground: oklch(0.21 0.006 285.885);
  /* ... versões dark ... */
}
```

### Theme Selector Component

```typescript
export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecionar tema" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((themeOption) => (
          <SelectItem key={themeOption} value={themeOption}>
            <div className="flex items-center gap-2">
              <ThemeIcon theme={themeOption} />
              {themeLabels[themeOption]}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

**Conceitos Aplicados:**

- **CSS Custom Properties**: Variáveis CSS para temas
- **OKLCH Color Space**: Cores mais precisas e acessíveis
- **System Preference**: Detecção automática de preferências
- **Persistence**: Salvamento automático da escolha

---

## ✅ Validação e Formulários

### Schema Definition com Zod

```typescript
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
  addresses: z.array(addressSchema).min(1, 'Informe pelo menos um endereço'),
})

type FormData = z.infer<typeof formSchema>
```

### Input Formatting e Máscaras

```typescript
// Formatação de CPF/CNPJ
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

// Uso em componente
<Input
  {...register('document')}
  onChange={e => {
    const formatted = formatCpfCnpj(e.target.value)
    e.target.value = formatted
    register('document').onChange(e)
  }}
/>
```

### Integração ViaCEP

```typescript
async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
  const cep = e.target.value.replace(/\D/g, '')

  if (cep.length === 8) {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      if (!res.data.erro) {
        const { logradouro, bairro, localidade, uf } = res.data
        setValue(`addresses.${index}.street`, logradouro || '')
        setValue(`addresses.${index}.neighborhood`, bairro || '')
        setValue(`addresses.${index}.city`, localidade || '')
        setValue(`addresses.${index}.state`, uf || '')
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
    }
  }
}
```

**Conceitos Aplicados:**

- **Type-safe Validation**: Zod para validação com tipos
- **Real-time Formatting**: Formatação durante digitação
- **External API Integration**: ViaCEP para preenchimento automático
- **Error Handling**: Feedback visual para erros
- **Dynamic Form Fields**: useFieldArray para arrays

---

## ⚡ Performance e Otimização

### Bundle Analysis

```json
// Build output
Route (app)                 Size     First Load JS
┌ ○ /                      224 kB          271 kB
├ ○ /dashboard             203 kB          250 kB
├ ○ /sign-in               139 kB          186 kB
└ ○ /api/celcoin-token     0 B             47.2 kB
```

### Code Splitting Strategies

```typescript
// Lazy loading de componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Dynamic imports condicionais
const loadChartLibrary = () => import('recharts')

// Route-based splitting (automático com App Router)
// Cada página é automaticamente um chunk separado
```

### Query Optimization

```typescript
// Configuração otimizada do TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 min - evita refetch desnecessário
      cacheTime: 1000 * 60 * 10,       // 10 min - mantém em cache
      refetchOnWindowFocus: false,      // Evita refetch ao focar
      retry: (failureCount, error) => {
        // Retry inteligente baseado no tipo de erro
        if (error.status === 404) return false
        return failureCount < 2
      },
    },
  },
})
```

### Image Optimization

```typescript
// Next.js Image component com otimizações
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority              // Carrega imediatamente
  placeholder="blur"    // Placeholder durante carregamento
  quality={85}          // Qualidade otimizada
/>
```

**Conceitos Aplicados:**

- **Bundle Splitting**: Chunks otimizados por rota
- **Lazy Loading**: Carregamento sob demanda
- **Cache Strategies**: Múltiplas camadas de cache
- **Network Optimization**: Retry inteligente e timeouts

---

## 🏛️ Patterns e Boas Práticas

### 1. Component Composition Pattern

```typescript
// Composição flexível de componentes
interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  )
}

// Uso
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo
  </CardContent>
</Card>
```

### 2. Custom Hooks Pattern

```typescript
// Hook personalizado para operações de cliente
export function useCustomerOperations(accessToken: string) {
  const queryClient = useQueryClient()

  const customers = useCustomers(accessToken)
  const createMutation = useCreateCustomer(accessToken)
  const editMutation = useEditCustomer(accessToken)
  const deleteMutation = useDeleteCustomer(accessToken)

  const operations = {
    create: createMutation.mutateAsync,
    edit: editMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    invalidate: () => queryClient.invalidateQueries(['celcoin-customers']),
  }

  return {
    customers: customers.data || [],
    isLoading: customers.isLoading,
    error: customers.error,
    operations,
  }
}
```

### 3. Error Boundary Pattern

```typescript
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <h2>Algo deu errado!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 4. Provider Pattern

```typescript
// Context para compartilhar estado global
interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  settings: AppSettings
  updateSettings: (settings: Partial<AppSettings>) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return (
    <AppContext.Provider value={{ user, setUser, settings, updateSettings }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
```

**Conceitos Aplicados:**

- **Separation of Concerns**: Cada componente tem responsabilidade única
- **Inversion of Control**: Dependências injetadas via props
- **Composition over Inheritance**: Composição de funcionalidades
- **Single Responsibility**: Uma função, uma responsabilidade

---

## 🎯 Exercícios Práticos

### Exercício 1: Implementar Paginação

**Objetivo**: Adicionar paginação à tabela de clientes

```typescript
// 1. Adicionar estado de paginação
const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
})

// 2. Modificar query para incluir paginação
export function useCustomers(accessToken: string, pagination: PaginationState) {
  return useQuery({
    queryKey: ['celcoin-customers', accessToken, pagination],
    queryFn: () => fetchCustomers(accessToken, pagination),
  })
}

// 3. Implementar componente de paginação
export function PaginationControls({ pagination, setPagination, totalItems }) {
  const totalPages = Math.ceil(totalItems / pagination.pageSize)

  return (
    <div className="flex items-center justify-between">
      <span>
        Página {pagination.pageIndex + 1} de {totalPages}
      </span>
      <div className="flex gap-2">
        <Button
          onClick={() => setPagination(prev => ({
            ...prev,
            pageIndex: Math.max(0, prev.pageIndex - 1)
          }))}
          disabled={pagination.pageIndex === 0}
        >
          Anterior
        </Button>
        <Button
          onClick={() => setPagination(prev => ({
            ...prev,
            pageIndex: Math.min(totalPages - 1, prev.pageIndex + 1)
          }))}
          disabled={pagination.pageIndex >= totalPages - 1}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
```

### Exercício 2: Implementar Filtros e Busca

**Objetivo**: Adicionar filtros por nome, email e status

```typescript
// 1. Estado de filtros
const [filters, setFilters] = useState({
  search: '',
  status: 'all',
  city: '',
})

// 2. Hook de filtros
function useCustomerFilters(customers: Customer[], filters: FilterState) {
  return useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = filters.search === '' ||
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus = filters.status === 'all' ||
        customer.status === filters.status

      const matchesCity = filters.city === '' ||
        customer.addresses.some(addr =>
          addr.city.toLowerCase().includes(filters.city.toLowerCase())
        )

      return matchesSearch && matchesStatus && matchesCity
    })
  }, [customers, filters])
}

// 3. Componente de filtros
export function CustomerFilters({ filters, setFilters }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Buscar por nome ou email..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />

        <Select
          value={filters.status}
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Cidade..."
          value={filters.city}
          onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
        />
      </CardContent>
    </Card>
  )
}
```

### Exercício 3: Implementar Upload de Avatar

**Objetivo**: Adicionar upload de imagem de perfil para clientes

```typescript
// 1. Hook para upload
export function useImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true)
    try {
      // Simular upload (na prática seria para um serviço como S3)
      const base64 = await fileToBase64(file)

      // Criar preview
      setPreview(base64)

      // Simular delay de upload
      await new Promise(resolve => setTimeout(resolve, 1000))

      return base64
    } finally {
      setUploading(false)
    }
  }

  return { uploadImage, uploading, preview, setPreview }
}

// 2. Componente de upload
export function AvatarUpload({ onImageUpload, currentImage }) {
  const { uploadImage, uploading, preview } = useImageUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validações
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande (máximo 5MB)')
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Apenas imagens são permitidas')
      return
    }

    try {
      const imageUrl = await uploadImage(file)
      onImageUpload(imageUrl)
      toast.success('Imagem carregada com sucesso!')
    } catch (error) {
      toast.error('Erro ao carregar imagem')
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={preview || currentImage} />
          <AvatarFallback>
            <User className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <Upload className="w-4 h-4 mr-2" />
        {uploading ? 'Carregando...' : 'Escolher foto'}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
```

### Exercício 4: Implementar Exportação para Excel

**Objetivo**: Exportar lista de clientes para Excel

```typescript
// 1. Instalar dependência
// npm install xlsx

// 2. Hook para exportação
export function useExcelExport() {
  const exportToExcel = (data: Customer[], filename: string = 'clientes') => {
    // Preparar dados para exportação
    const exportData = data.map(customer => ({
      'Nome': customer.name,
      'Documento': customer.document,
      'Email': customer.email,
      'Telefone': customer.phone,
      'Status': customer.status === 'active' ? 'Ativo' : 'Inativo',
      'Endereços': customer.addresses.length,
      'Cidade Principal': customer.addresses[0]?.city || '',
      'Estado Principal': customer.addresses[0]?.state || '',
      'Data Criação': new Date(customer.createdAt).toLocaleDateString('pt-BR'),
    }))

    // Criar workbook
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes')

    // Ajustar largura das colunas
    const colWidths = [
      { wch: 30 }, // Nome
      { wch: 20 }, // Documento
      { wch: 30 }, // Email
      { wch: 15 }, // Telefone
      { wch: 10 }, // Status
      { wch: 10 }, // Endereços
      { wch: 20 }, // Cidade
      { wch: 10 }, // Estado
      { wch: 15 }, // Data
    ]
    ws['!cols'] = colWidths

    // Download
    XLSX.writeFile(wb, `${filename}.xlsx`)
  }

  return { exportToExcel }
}

// 3. Componente de exportação
export function ExportButton({ customers }: { customers: Customer[] }) {
  const { exportToExcel } = useExcelExport()
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      exportToExcel(customers, `clientes-${new Date().toISOString().split('T')[0]}`)
      toast.success('Arquivo exportado com sucesso!')
    } catch (error) {
      toast.error('Erro ao exportar arquivo')
    } finally {
      setExporting(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={exporting} variant="outline">
      {exporting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {exporting ? 'Exportando...' : 'Exportar Excel'}
    </Button>
  )
}
```

---

## 🎯 Conclusão e Próximos Passos

### Conceitos Masterizados

Ao estudar esta aplicação, você domina:

1. **React 19 + Next.js 15**: Features mais modernas
2. **TypeScript Avançado**: Tipagem complexa e validação
3. **State Management**: TanStack Query para server state
4. **UI/UX Moderno**: shadcn/ui + Tailwind CSS
5. **Performance**: Otimizações avançadas de bundle e cache
6. **Arquitetura**: Patterns escaláveis e maintíveis

### Tecnologias para Expandir

1. **Backend Integration**:
   - tRPC para type-safe APIs
   - Prisma para database ORM
   - NextAuth.js para autenticação

2. **Testing**:
   - Vitest para unit tests
   - Testing Library para component tests
   - Playwright para E2E tests

3. **Deployment**:
   - Vercel para hosting
   - Railway/PlanetScale para database
   - GitHub Actions para CI/CD

4. **Monitoring**:
   - Sentry para error tracking
   - Vercel Analytics para performance
   - Mixpanel para user analytics

### Projetos Sugeridos

1. **Sistema de Vendas**: Expandir para incluir produtos e pedidos
2. **Dashboard Executivo**: Métricas avançadas e relatórios
3. **App Mobile**: React Native com shared business logic
4. **Multi-tenant**: Suporte a múltiplas empresas

---

**Este material de estudos foi criado para proporcionar uma compreensão profunda e prática dos conceitos mais modernos de desenvolvimento React/Next.js. Use-o como referência e pratique implementando as funcionalidades sugeridas!**

---

_Desenvolvido por Cardoso Files - Demonstração das melhores práticas em desenvolvimento frontend moderno._
