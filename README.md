# 🎯 ControlCustomers - Sistema de Gestão de Clientes

> Uma plataforma moderna e completa para gestão inteligente de clientes, desenvolvida com as mais recentes tecnologias React/Next.js e sistema de autenticação NextAuth.

### Autenticação (`/sign-in`)

- **Login NextAuth** - Interface elegante com validação robusta### Dashboard Modular (`/dashboard`)

O dashboard modular oferece três páginas especializadas acessíveis via navegação intuitiva:

#### 📊 Analytics (`/dashboard/analytics`)

- **Visão Executiva**: Página inicial do dashboard com métricas consolidadas
- **Dados em Tempo Real**: Integração direta com a API para estatísticas atualizadas
- **Cards Informativos**:
  - Total de Clientes cadastrados no sistema
  - Clientes Ativos (status ativo vs inativo)
  - Novos Cadastros do mês atual
  - Crescimento percentual mensal
- **Status do Sistema**: Monitoramento de token Celcoin e conectividade
- **Relatórios Detalhados**: Taxa de ativação, distribuição de dados, estatísticas completas

#### 📝 Cadastro (`/dashboard/registration`)

- **Formulário Dedicado**: Interface especializada para novos clientes
- **Validação Avançada**: React Hook Form + Zod com feedback instantâneo
- **Automação Inteligente**:
  - Formatação automática de CPF/CNPJ, telefone
  - Integração ViaCEP para preenchimento de endereços
  - Múltiplos endereços com sistema dinâmico
- **Orientações Contextuais**: Cards com dicas de preenchimento
- **Estados Visuais**: Loading, sucesso e erro com design elegante

#### 📋 Lista (`/dashboard/list`)

- **Gestão Completa**: Tabela com todos os clientes e ações CRUD
- **Funcionalidades Avançadas**:
  - Filtros por nome, email, documento, ID
  - Edição inline com validação em tempo real
  - Exclusão segura com confirmação via modal
  - Expansão de linhas para visualizar endereços
- **Navegação Otimizada**:
  - Botão "Novo Cliente" (link direto para cadastro)
  - Botão "Atualizar" para refresh dos dados
  - Contadores de registros (total/filtrados)

#### 🧭 Sistema de Navegação

- **Navbar Persistente**: Sempre visível entre as páginas
- **Indicação Visual**: Página ativa destacada com cor diferenciada
- **Ícones Identificadores**:
  - 📊 BarChart3 para Analytics
  - ➕ Plus para Cadastro
  - 👥 Users para Lista
- **Responsividade**: Ícones no mobile, texto completo no desktopedback em tempo real\*\* - Validação instantânea de credenciais
- **Modais de sucesso** - Padrões de Arquitetura

- **Feature-Based Organization** - Componentes organizados por funcionalidade
- **Authentication First** - Sistema de 🔒 Segurança

### Práticas Implementadas

- **NextAuth.js** - Autenticação enterprise com sessões seguras
- **bcrypt Hashing** - Senhas protegidas com salt rounds 12
- **Route Protection** - Middleware que intercepta acessos não autorizados
- **Type Safety** - TypeScript em modo estrito
- **Input Validation** - Zod schemas em todos os formulários
- **CSRF Protection** - Next.js built-in protection
- **Environment Variables** - Separação segura de configurações sensíveis
- **Cookie Security** - httpOnly e secure flags automáticos
- **JWT Tokens** - Sessions criptografadas com chaves secretasenticação como base da aplicação
- **Colocation** - Arquivos relacionados próximos uns dos outros
- **Separation of Concerns** - Lógica separada da apresentação
- **Dependency Injection** - Props e contexts para inversão de controle
- **Route Protection** - Middleware automatizado para segurança - Confirmação visual do login bem-sucedido
- **Redirecionamento automático** - Acesso direto ao dashboard após autenticação
- **Proteção de rota** - Tentativas não autorizadas são interceptadas

### Dashboard Modular (`/dashboard`) - **ROTA PROTEGIDA**

O dashboard foi reestruturado em **três páginas especializadas** com navegação intuitiva:

#### 📊 Analytics (`/dashboard/analytics`)

- **Métricas em Tempo Real** - Dados reais da API de clientes
- **Total de Clientes** - Contagem atual de registros no sistema
- **Clientes Ativos** - Filtro por status ativo/inativo
- **Novos este Mês** - Cadastros baseados na data de criação
- **Crescimento Mensal** - Comparação percentual mês atual vs anterior
- **Status do Sistema** - Conectividade API e token Celcoin
- **Estatísticas Detalhadas** - Taxa de ativação, dados de contato, endereços

#### 📝 Cadastro (`/dashboard/registration`)

- **Formulário Completo** - Validação Zod com feedback em tempo real
- **Campos Inteligentes** - CPF/CNPJ, email, telefone com formatação automática
- **Integração ViaCEP** - Preenchimento automático de endereços via CEP
- **Múltiplos Endereços** - Sistema de array dinâmico para vários endereços
- **Dicas Contextuais** - Cards informativos com orientações de preenchimento
- **Estados de Loading** - Feedback visual durante token e submissão

#### 📋 Lista (`/dashboard/list`)

- **Tabela Interativa** - Componente CustomerTable com todas as funcionalidades
- **Ações CRUD Completas** - Criar, visualizar, editar e excluir clientes
- **Navegação Rápida** - Botão direto para cadastro de novo cliente
- **Atualização Manual** - Botão refresh para sincronizar dados
- **Filtros Avançados** - Busca por ID, nome, documento e email (integrada no CustomerTable)
- **Modais de Confirmação** - Ações seguras com feedback visual

#### 🧭 Navegação Unificada

- **Navbar Fixa** - Componente DashboardNavbar sempre visível
- **Indicação Visual** - Página ativa destacada na navegação
- **Ícones Intuitivos** - BarChart3 (Analytics), Plus (Cadastro), Users (Lista)
- **Responsiva** - Adaptável para mobile e desktop
- **Layout Compartilhado** - ProtectedRoute aplicado automaticamentetps://img.shields.io/badge/Next.js-15.4.2-black)
  ![React](https://img.shields.io/badge/React-19-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
  ![NextAuth](https://img.shields.io/badge/NextAuth.js-5.0-green)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan)
  ![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Destaques da Aplicação

- ⚡ **Performance Premium**: Built com Next.js 15 + Turbopack
- 🔐 **Autenticação Robusta**: NextAuth.js com proteção de rotas
- 🎨 **UI Moderna**: shadcn/ui + Tailwind CSS 4 com temas personalizáveis
- 📊 **Analytics Inteligente**: Dashboards interativos com Recharts
- 🔄 **Estado Avançado**: TanStack Query com cache persistente
- 🎯 **Type Safety**: TypeScript + Zod para validação robusta
- 📱 **100% Responsivo**: Design adaptável para todos os dispositivos

## 🚀 Stack Tecnológico

### Core Framework

- **Next.js 15.4.2** - Framework React com App Router e Turbopack
- **React 19** - Biblioteca UI com Concurrent Features
- **TypeScript 5** - Tipagem estática e IntelliSense avançado

### Autenticação & Segurança

- **NextAuth.js 5.0** - Sistema de autenticação completo e seguro
- **bcryptjs** - Hash de senhas com salt para máxima segurança
- **Middleware de Proteção** - Interceptação de rotas protegidas
- **Sessions Management** - Gerenciamento automático de sessões

### UI & Design System

- **shadcn/ui** - Componentes elegantes e acessíveis
- **Tailwind CSS 4** - Framework CSS utilitário moderno
- **Radix UI** - Primitivos acessíveis de alta qualidade
- **Framer Motion** - Animações fluidas e performáticas
- **Lucide React** - Ícones SVG otimizados

### Estado & Dados

- **TanStack Query** - Server state management com cache inteligente
- **React Hook Form** - Formulários performáticos com validação
- **Zod** - Schema validation com type inference
- **LocalForage** - Storage offline robusto

### Integração & APIs

- **Axios** - HTTP client configurável
- **ViaCEP API** - Preenchimento automático de endereços
- **Celcoin API** - Integração com serviços externos

### Visualização & UX

- **Recharts** - Gráficos interativos e responsivos
- **Sonner** - Notificações toast elegantes
- **next-themes** - Sistema de temas com persistência

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação Completo

- **NextAuth.js Integration** - Autenticação robusta e moderna
- **Middleware de Proteção** - Interceptação automática de acessos não autorizados
- **Rotas Dashboard Protegidas** - Todo o `/dashboard/*` só acessível após login
- **Hash bcrypt** - Senhas protegidas com criptografia de nível enterprise
- **Sessões Seguras** - Gerenciamento automático com cookies seguros
- **Modais de Feedback** - UX elegante para login/logout com confirmações visuais
- **Redirecionamentos Inteligentes** - Fluxo automático entre páginas

### 🏗️ Dashboard Modular Especializado

#### 📊 **Analytics** (`/dashboard/analytics`)

- **Métricas Reais** - Dados obtidos diretamente da API de clientes
- **Cards Dinâmicos** com indicadores visuais:
  - Total de Clientes (contagem real da base)
  - Clientes Ativos (filtro por status)
  - Novos este Mês (baseado na data de criação)
  - Crescimento Mensal (comparação percentual)
- **Status do Sistema** - Token Celcoin, conectividade API, última sync
- **Estatísticas Avançadas** - Taxa de ativação, distribuição por status, dados de contato
- **Área para Gráficos** - Preparada para integração com Chart.js/Recharts

#### 📝 **Cadastro** (`/dashboard/registration`)

- **Formulário Especializado** - Focado exclusivamente no cadastro de novos clientes
- **Validação Inteligente** - React Hook Form + Zod com feedback em tempo real
- **Integração ViaCEP** - Preenchimento automático de endereços via CEP
- **Múltiplos Endereços** - Sistema de array dinâmico
- **Dicas Contextuais** - Cards informativos com orientações de preenchimento
- **Estados Visuais** - Loading, error e success states elegantes

#### � **Lista** (`/dashboard/list`)

- **Tabela Completa** - Reutiliza o componente CustomerTable existente
- **Filtros Integrados** - Busca por ID, nome, documento, email
- **Ações CRUD** - Editar inline, excluir com confirmação
- **Navegação Rápida** - Botão direto para cadastro de novos clientes
- **Atualização Manual** - Refresh para sincronizar dados
- **Feedback Visual** - Estados de loading e confirmações elegantes

#### 🧭 **Navegação Unificada**

- **DashboardNavbar** - Componente de navegação sempre visível
- **Indicação Visual** - Página ativa destacada na navbar
- **Ícones Intuitivos** - BarChart3, Plus, Users para cada seção
- **Layout Compartilhado** - ProtectedRoute aplicado automaticamente
- **Redirecionamento** - `/dashboard` redireciona para `/dashboard/analytics`

### 👥 Gestão Completa de Clientes

- ✅ **CREATE** - Página especializada com formulário dedicado
- ✅ **READ** - Analytics com métricas + Lista com tabela completa
- ✅ **UPDATE** - Edição inline na tabela com validação
- ✅ **DELETE** - Exclusão segura com modal de confirmação

### 🏠 Sistema de Endereços Avançado

- **Múltiplos endereços** por cliente com gerenciamento dinâmico
- **Integração ViaCEP** - Preenchimento automático via CEP
- **Validação em tempo real** - Feedback instantâneo de CEP
- **Formatação automática** - Campos padronizados automaticamente

### 🎨 Interface & UX Moderna

- **Modo claro/escuro** com persistência automática
- **Componentes acessíveis** seguindo padrões WCAG
- **Animações suaves** com Framer Motion
- **Design system consistente** com shadcn/ui
- **Banner de boas-vindas** com cache inteligente (8 horas)

### 🛡️ Segurança Enterprise

- **Proteção de rotas** com middleware NextAuth
- **Hash bcrypt** para senhas (salt rounds: 12)
- **Validação de entrada** com Zod schemas
- **Sessões criptografadas** com JWT tokens
- **CSRF Protection** integrada ao Next.js

## 🛠️ Instalação e Configuração

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18.x ou superior)
- **pnpm** (recomendado) ou npm/yarn
- **Git** para controle de versão

```bash
# Verificar versões
node --version  # v18.x+
pnpm --version  # 8.x+
git --version   # 2.x+
```

### 1️⃣ Clonagem do Repositório

```bash
# Clone o repositório
git clone https://github.com/cardosofiles/control-customers-client.git

# Navegue para o diretório
cd control-customers-client

# Verifique a estrutura do projeto
ls -la
```

### 2️⃣ Instalação de Dependências

```bash
# Instale as dependências (recomendado)
pnpm install

# Ou usando npm
npm install

# Ou usando yarn
yarn install
```

### 3️⃣ Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Crie o arquivo de ambiente
touch .env.local
```

Adicione as seguintes variáveis ao arquivo `.env.local`:

```env
# === AUTENTICAÇÃO NEXTAUTH (OBRIGATÓRIO) ===
# Chave secreta para NextAuth.js (gere uma chave forte)
NEXTAUTH_SECRET=sua-chave-secreta-muito-forte-aqui
NEXTAUTH_URL=http://localhost:3000

# === CREDENCIAIS DE DEMONSTRAÇÃO ===
# Configure usuário e senha para o sistema de login
solicite as credenciais no e-mail:  cardosofiles@outlook.com
NEXT_PUBLIC_USERNAME=""
NEXT_PUBLIC_PASSWORD=""

# === CONFIGURAÇÕES DA API CELCOIN ===
# Para integração com serviços externos
CELCOIN_CLIENT_ID=seu_client_id
CELCOIN_CLIENT_SECRET=seu_client_secret
```

> **⚠️ Importante**:
>
> - **NEXTAUTH_SECRET** é obrigatório para a autenticação funcionar
> - Gere uma chave forte com: `openssl rand -base64 32`
> - Sem as credenciais Celcoin, a aplicação funcionará com dados simulados

### 4️⃣ Execução Local

```bash
# Modo desenvolvimento (recomendado)
pnpm dev

# Ou usando npm
npm run dev

# Ou usando yarn
yarn dev
```

A aplicação estará disponível em: **http://localhost:3000**

### 5️⃣ Navegação no Dashboard

Após o login, você terá acesso ao **dashboard modular** com três páginas especializadas:

#### 📊 Analytics (`/dashboard/analytics`)

1. **Métricas em Tempo Real**: Total de clientes, ativos, novos do mês
2. **Crescimento**: Comparação percentual mês atual vs anterior
3. **Status do Sistema**: Token Celcoin, API, conectividade
4. **Estatísticas Detalhadas**: Taxa de ativação, dados de contato, endereços

#### 📝 Cadastro (`/dashboard/registration`)

1. **Formulário Inteligente**: Validação em tempo real com Zod
2. **Campos Formatados**: CPF/CNPJ, telefone, CEP automáticos
3. **ViaCEP Integration**: Preenchimento automático de endereços
4. **Múltiplos Endereços**: Sistema dinâmico de arrays

#### 📋 Lista (`/dashboard/list`)

1. **Tabela Completa**: Todos os clientes com ações CRUD
2. **Filtros Avançados**: Busca por nome, email, documento
3. **Edição Inline**: Modificar dados diretamente na tabela
4. **Confirmações**: Modais elegantes para ações críticas

#### 🧭 Navegação

- **Navbar Fixa**: Sempre visível entre as páginas
- **Indicação Visual**: Página ativa destacada
- **Ícones Intuitivos**: Analytics, Cadastro, Lista
- **Redirecionamento**: `/dashboard` → `/dashboard/analytics`

## 🎮 Como Usar a Aplicação

### Página Inicial (`/`)

- **Hero Section**: Apresentação visual da plataforma
- **Estatísticas**: Métricas em tempo real
- **Features**: Funcionalidades principais destacadas
- **Analytics Preview**: Demonstração dos dashboards
- **Testimonials**: Avaliações de usuários
- **CTA Section**: Call-to-action para começar

### Autenticação (`/sign-in`)

- **Login**: Interface elegante de autenticação
- **Validação**: Feedback em tempo real
- **Redirecionamento**: Acesso direto ao dashboard após login

### Dashboard (`/dashboard`)

- **Cadastro de Clientes**: Formulário completo com validação
- **Gestão de Endereços**: Múltiplos endereços com ViaCEP
- **Tabela de Clientes**: Listagem com ações CRUD
- **Filtros e Busca**: Encontre clientes rapidamente
- **Modais de Confirmação**: Ações seguras com confirmação

### Funcionalidades Detalhadas

#### � Dashboard Analytics

- **URL**: `/dashboard/analytics` (página padrão do dashboard)
- **Métricas calculadas**: Total, ativos, novos do mês, crescimento
- **Dados reais**: Integração direta com `useListCustomers`
- **Status**: Token Celcoin, API status, última sincronização
- **Estatísticas**: Taxa de ativação, distribuição por status

#### �📝 Cadastro de Clientes

- **URL**: `/dashboard/registration`
- **Campos obrigatórios**: Nome, documento, email, telefone
- **Formatação automática**: CPF/CNPJ, telefone, CEP
- **Validação em tempo real**: Feedback imediato
- **Múltiplos endereços**: Adicione quantos endereços precisar
- **ViaCEP**: Preenchimento automático via CEP

#### � Gestão de Clientes

- **URL**: `/dashboard/list`
- **Tabela responsiva**: Adaptável a qualquer tela
- **Filtros integrados**: Nome, email, documento, ID
- **Ações inline**: Editar/excluir diretamente na tabela
- **Modais elegantes**: Confirmações com design profissional
- **Feedback visual**: Estados de loading e success

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack (mais rápido)
pnpm dev

# Build de produção
pnpm build

# Prévia da build de produção
pnpm start

# Linting e correção de código
pnpm lint

# Verificação de tipos TypeScript
npx tsc --noEmit
```

## 🏗️ Build e Deploy

### Build Local

```bash
# Execute o build
pnpm build

# Verifique se não há erros
echo $?  # Deve retornar 0

# Teste localmente
pnpm start
```

### Deploy na Vercel (Recomendado)

1. **Conecte o repositório** à sua conta Vercel
2. **Configure as variáveis de ambiente** no painel Vercel:

   ```
   # Obrigatórias para NextAuth
   NEXTAUTH_SECRET=sua-chave-secreta-muito-forte-de-32-caracteres
   NEXTAUTH_URL=https://seu-projeto.vercel.app

   # Credenciais de demo (já configuradas)
   solicite as credenciais no e-mail: cardosofiles@outlook.com
   NEXT_PUBLIC_USERNAME=""
   NEXT_PUBLIC_PASSWORD=""

   # API Celcoin (opcional)
   CELCOIN_CLIENT_ID=seu_client_id
   CELCOIN_CLIENT_SECRET=seu_client_secret
   ```

3. **Deploy automático** será executado
4. **Teste a autenticação** com as credenciais configuradas

> **⚠️ Importante**: NEXTAUTH_SECRET é obrigatório para produção. Gere com `openssl rand -base64 32`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cardosofiles/control-customers-client)

### Outras Plataformas

- **Netlify**: Suporte completo para Next.js
- **Railway**: Deploy com banco de dados integrado
- **AWS Amplify**: Escalabilidade enterprise
- **Digital Ocean**: App Platform com containers

## 🏛️ Arquitetura do Projeto

### Estrutura de Diretórios

```
src/
├── app/                      # App Router (Next.js 15)
│   ├── layout.tsx           # Layout raiz com providers (AuthProvider, ThemeProvider)
│   ├── page.tsx             # Página inicial (/) - Landing page
│   ├── api/                 # API Routes
│   │   ├── auth/            # NextAuth.js endpoints
│   │   │   └── [...nextauth]/route.ts
│   │   └── celcoin-token/   # Endpoint para token Celcoin
│   ├── dashboard/           # Dashboard modular (/dashboard) - PROTEGIDO
│   │   ├── layout.tsx       # Layout compartilhado com DashboardNavbar
│   │   ├── page.tsx         # Redirecionamento para /analytics
│   │   ├── analytics/       # Página de métricas (/dashboard/analytics)
│   │   │   └── page.tsx     # Estatísticas reais da API
│   │   ├── registration/    # Página de cadastro (/dashboard/registration)
│   │   │   └── page.tsx     # Formulário especializado
│   │   └── list/            # Página de listagem (/dashboard/list)
│   │       └── page.tsx     # Tabela com ações CRUD
│   ├── sign-in/             # Página de login (/sign-in)
│   │   └── page.tsx
│   └── not-found.tsx        # Página 404 customizada
│
├── components/              # Componentes reutilizáveis
│   ├── auth/                # Sistema de autenticação
│   │   └── protected-route.tsx
│   ├── forms/               # Formulários especializados
│   │   ├── create-customers-form.tsx
│   │   └── sign-in-form.tsx
│   ├── layout/              # Componentes de layout
│   │   ├── header.tsx           # Header com controles de auth
│   │   ├── dashboard-navbar.tsx # Navbar do dashboard modular
│   │   ├── hero-section.tsx
│   │   ├── analytics-dashboard-preview.tsx
│   │   └── footer.tsx
│   ├── providers/           # Context providers
│   │   ├── auth-provider.tsx     # NextAuth SessionProvider
│   │   ├── query-provider.tsx    # TanStack Query
│   │   └── theme-provider.tsx    # Theme management
│   ├── table/               # Tabelas de dados
│   │   └── customer-table.tsx    # Tabela completa com CRUD
│   ├── themes/              # Sistema de temas
│   │   ├── theme-provider.tsx
│   │   ├── theme-selector.tsx
│   │   └── theme-toggle.tsx
│   ├── ui/                  # Componentes base (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx       # Modais para feedback
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── welcome.tsx      # Banner inteligente com cache
│   └── whatsapp/            # Integração WhatsApp
│       └── whatsapp-button.tsx
│
├── lib/                     # Utilitários e configurações
│   └── utils.ts             # Funções utilitárias
│
├── services/                # Integração com APIs
│   └── celcoin/             # Serviços da API Celcoin
│       ├── api.ts           # Configuração do cliente HTTP
│       ├── mutations.ts     # TanStack Query mutations
│       ├── queries.ts       # TanStack Query queries
│       ├── token.ts         # Gerenciamento de token
│       └── types.ts         # Tipos TypeScript
│
├── styles/                  # Estilos globais
│   └── globals.css          # CSS global com Tailwind
│
└── utils/                   # Utilitários diversos
    └── fonts.ts             # Configuração de fontes

# Arquivos de Configuração (Raiz)
├── auth.config.ts           # Configuração NextAuth
├── auth.ts                  # Providers e lógica de auth
├── middleware.ts            # Middleware de proteção de rotas
└── next.config.ts           # Configuração Next.js
```

### Padrões de Arquitetura

- **Feature-Based Organization**: Componentes organizados por funcionalidade
- **Modular Dashboard**: Cada página do dashboard tem responsabilidade única
- **Colocation**: Arquivos relacionados próximos uns dos outros
- **Separation of Concerns**: Lógica separada da apresentação
- **Dependency Injection**: Props e contexts para inversão de controle
- **Layout Composition**: Layouts compartilhados com proteção de rota

## 🎨 Design System

### Componentes Base

O projeto utiliza **shadcn/ui** como design system base, com customizações:

- **Tema "new-york"**: Estilo moderno e limpo
- **CSS Variables**: Suporte completo a temas
- **Radix UI**: Primitivos acessíveis e robustos
- **Tailwind CSS 4**: Utilitários modernos com @theme

### Sistema de Cores

```css
/* Tema Claro */
--background: oklch(1 0 0) /* Branco puro */
  --foreground: oklch(0.141 0.005 285.823) /* Texto principal */
  --primary: oklch(0.21 0.006 285.885) /* Cor primária */
  --muted: oklch(0.967 0.001 286.375) /* Fundo sutil */ /* Tema Escuro */
  --background: oklch(0.141 0.005 285.823) /* Fundo escuro */
  --foreground: oklch(0.985 0 0) /* Texto claro */
  --primary: oklch(0.92 0.004 286.32) /* Primária clara */;
```

### Responsividade

```css
/* Breakpoints Tailwind */
sm: 640px      /* Tablet pequeno */
md: 768px      /* Tablet */
lg: 1024px     /* Desktop */
xl: 1280px     /* Desktop grande */
2xl: 1536px    /* Desktop extra grande */
```

## 🔧 Configurações Avançadas

### TypeScript

```json
// tsconfig.json - Configuração estrita
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### ESLint

```json
// eslint.config.mjs - Regras modernas
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Tailwind CSS

```css
/* globals.css - Configuração customizada */
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));
@theme inline {
  /* Variáveis CSS personalizadas */
}
```

## 🚀 Performance

### Bundle Analysis

```
Route (app)                                 Size     First Load JS
┌ ○ /                                    97.9 kB          246 kB
├ ○ /dashboard                           134 B            100 kB
├ ○ /dashboard/analytics                 3.83 kB          120 kB
├ ○ /dashboard/registration              11.4 kB          203 kB
├ ○ /dashboard/list                      5.28 kB          168 kB
├ ○ /sign-in                             7.42 kB          154 kB
└ ○ /api/celcoin-token                   134 B            100 kB
```

### Otimizações Implementadas

- **Turbopack**: Bundler mais rápido que Webpack
- **Code Splitting**: Chunks automáticos por rota
- **Dynamic Imports**: Carregamento lazy de componentes pesados
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts com display=swap

## 🧪 Testes

### Estratégia de Testes

```bash
# Testes unitários (futuro)
npm install --save-dev vitest @testing-library/react

# Testes E2E (futuro)
npm install --save-dev playwright

# Testes de componente (futuro)
npm install --save-dev @storybook/react
```

## 📱 PWA e Mobile

### Progressive Web App

```javascript
// next.config.ts - Configuração PWA (futuro)
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})
```

## 🔒 Segurança

### Práticas Implementadas

- **Type Safety**: TypeScript em modo estrito
- **Input Validation**: Zod schemas em formulários
- **CSRF Protection**: Next.js built-in protection
- **Environment Variables**: Separação de configs sensíveis
- **Cookie Security**: httpOnly e secure flags

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack (mais rápido)
pnpm dev

# Build de produção otimizado
pnpm build

# Servidor de produção
pnpm start

# Linting com ESLint
pnpm lint

# Verificação de tipos (sem build)
npx tsc --noEmit

# Análise de bundle (futuro)
npx @next/bundle-analyzer

# Formatação com Prettier
npx prettier --write .
```

## � Deploy na Vercel

### Configuração Automática

1. **Conecte repositório** à Vercel
2. **Configure variáveis**:
   ```
   NEXT_PUBLIC_USERNAME=admin
   NEXT_PUBLIC_PASSWORD=123456
   CELCOIN_CLIENT_ID=seu_client_id
   CELCOIN_CLIENT_SECRET=seu_client_secret
   ```
3. **Deploy automático** em cada push

### Deploy Manual

```bash
# Instale Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel --prod
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cardosofiles/control-customers-client)

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o repositório
2. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
3. **Commit** suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
4. **Push** para a branch: `git push origin feature/nova-funcionalidade`
5. **Abra** um Pull Request

### Convenções

- **Commits**: Conventional Commits (feat, fix, docs, style, refactor)
- **Branches**: feature/, bugfix/, hotfix/, docs/
- **Code Style**: Prettier + ESLint automático

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2025 Cardoso Files
```

---

## 🚀 Sistema de Autenticação

### Fluxo de Autenticação

1. **Usuário acessa `/dashboard`** → Middleware verifica autenticação
2. **Se não autenticado** → Redireciona automaticamente para `/sign-in`
3. **Login bem-sucedido** → Modal de sucesso + redirecionamento para `/dashboard`
4. **Usuário autenticado** → Acesso liberado ao dashboard
5. **Logout** → Modal de confirmação + limpeza de sessão

### Credenciais de Acesso

```
solicite as credenciais no e-mail: cardosofiles@outlook.com
```

### Segurança Enterprise

- **Hash bcrypt** com salt rounds 12
- **Sessions JWT** criptografadas
- **Middleware de proteção** automático
- **Redirecionamentos seguros** entre páginas

## 👨‍💻 Autor

**Cardoso Files**

- 🌐 **GitHub**: [@cardosofiles](https://github.com/cardosofiles)
- 📧 **Email**: cardosofiles@outlook.com
- 💼 **LinkedIn**: [Cardoso Files](https://linkedin.com/in/cardosofiles)

## 🙏 Agradecimentos

- **NextAuth.js** - Pelo sistema de autenticação robusto e seguro
- **shadcn/ui** - Pelos componentes elegantes e acessíveis
- **Vercel** - Pela plataforma de deploy incrível
- **Radix UI** - Pelos primitivos acessíveis e robustos
- **TanStack** - Pelas ferramentas de state management
- **bcryptjs** - Pela criptografia de senhas segura
- **Comunidade React** - Pelo ecossistema fantástico

---

<div align="center">

**Desenvolvido com ❤️ usando Next.js 15 + NextAuth.js + shadcn/ui**

[⭐ Star no GitHub](https://github.com/cardosofiles/control-customers-client) • [🐛 Reportar Bug](https://github.com/cardosofiles/control-customers-client/issues) • [✨ Solicitar Feature](https://github.com/cardosofiles/control-customers-client/issues)

**🔐 Sistema de autenticação completo • 🛡️ Proteção de rotas • 🎨 UI moderna • 📊 Dashboard modular • 📈 Analytics em tempo real**

</div>
