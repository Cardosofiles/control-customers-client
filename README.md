# 🎯 ControlCustomers - Sistema de Gestão de Clientes

> Uma plataforma moderna e completa para gestão inteligente de clientes, desenvolvida com as mais recentes tecnologias React/Next.js e sistema de autenticação NextAuth.

### Autenticação (`/sign-in`)

- **Login NextAuth** - Interface elegante com validação robusta
- **Feedback em tempo real** - Validação instantânea de credenciais
- \*\*Modais de suc### Padrões de Arquitetura

- **Feature-Based Organization** - Componentes organizados por funcionalidade
- **Authentication First** - Siste## 🔒 Segurança

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

### Dashboard (`/dashboard`) - **ROTA PROTEGIDA**

- **Acesso restrito** - Apenas usuários autenticados podem acessar
- **Cadastro de Clientes** - Formulário completo com validação Zod
- **Gestão de Endereços** - Múltiplos endereços com integração ViaCEP
- **Tabela de Clientes** - Listagem completa com ações CRUD
- **Filtros e Busca** - Encontre clientes rapidamente
- **Modais de Confirmação** - Ações seguras com feedback visualtps://img.shields.io/badge/Next.js-15.4.2-black)
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
- **Rota Dashboard Protegida** - `/dashboard` só acessível após login
- **Hash bcrypt** - Senhas protegidas com criptografia de nível enterprise
- **Sessões Seguras** - Gerenciamento automático com cookies seguros
- **Modais de Feedback** - UX elegante para login/logout com confirmações visuais
- **Redirecionamentos Inteligentes** - Fluxo automático entre páginas

### 👥 Gestão Completa de Clientes

- ✅ **CREATE** - Cadastro com formulários inteligentes e validação em tempo real
- ✅ **READ** - Listagem com filtros avançados e busca instantânea
- ✅ **UPDATE** - Edição inline com confirmação e feedback visual
- ✅ **DELETE** - Exclusão segura com modal de confirmação

### 🏠 Sistema de Endereços Avançado

- **Múltiplos endereços** por cliente com gerenciamento dinâmico
- **Integração ViaCEP** - Preenchimento automático via CEP
- **Validação em tempo real** - Feedback instantâneo de CEP
- **Formatação automática** - Campos padronizados automaticamente

### 📊 Dashboard Analytics Premium

- **Gráficos interativos** em tempo real com Recharts
- **Métricas de performance** consolidadas
- **Visualizações responsivas** adaptáveis a qualquer dispositivo
- **Estatísticas detalhadas** com insights de negócio

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
NEXT_PUBLIC_USERNAME=asoec
NEXT_PUBLIC_PASSWORD=asoec@2025

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

### 5️⃣ Primeiro Acesso

1. **Acesse**: http://localhost:3000
2. **Login**: Clique em "Entrar" no cabeçalho
3. **Credenciais padrão**:
   - **Usuário**: `asoec`
   - **Senha**: `asoec@2025`
4. **Dashboard**: Após login, acesse `/dashboard` para gerenciar clientes

> **🔐 Proteção de Rota**: Tentativas de acessar `/dashboard` sem login são automaticamente redirecionadas para `/sign-in`

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

#### 📝 Cadastro de Clientes

- **Campos obrigatórios**: Nome, documento, email, telefone
- **Formatação automática**: CPF/CNPJ, telefone, CEP
- **Validação em tempo real**: Feedback imediato
- **Múltiplos endereços**: Adicione quantos endereços precisar

#### 🏠 Gestão de Endereços

- **ViaCEP Integration**: Digite o CEP e os campos são preenchidos
- **Validação**: Todos os campos de endereço são validados
- **Arrays dinâmicos**: Adicione/remova endereços conforme necessário

#### 📊 Visualização de Dados

- **Tabela responsiva**: Adaptável a qualquer tela
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
   NEXT_PUBLIC_USERNAME=asoec
   NEXT_PUBLIC_PASSWORD=asoec@2025

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
│   ├── dashboard/           # Dashboard de gestão (/dashboard) - PROTEGIDO
│   │   └── page.tsx
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
│   │   ├── header.tsx       # Header com controles de auth
│   │   ├── hero-section.tsx
│   │   ├── analytics-dashboard-preview.tsx
│   │   └── footer.tsx
│   ├── providers/           # Context providers
│   │   ├── auth-provider.tsx     # NextAuth SessionProvider
│   │   ├── query-provider.tsx    # TanStack Query
│   │   └── theme-provider.tsx    # Theme management
│   ├── table/               # Tabelas de dados
│   │   └── customer-table.tsx
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
- **Colocation**: Arquivos relacionados próximos uns dos outros
- **Separation of Concerns**: Lógica separada da apresentação
- **Dependency Injection**: Props e contexts para inversão de controle

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
Route (app)                 Size     First Load JS
┌ ○ /                      224 kB          271 kB
├ ○ /dashboard             203 kB          250 kB
├ ○ /sign-in               139 kB          186 kB
└ ○ /api/celcoin-token     0 B             47.2 kB
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
Usuário: asoec
Senha: asoec@2025
```

### Segurança Enterprise

- **Hash bcrypt** com salt rounds 12
- **Sessions JWT** criptografadas
- **Middleware de proteção** automático
- **Redirecionamentos seguros** entre páginas

## 👨‍💻 Autor

**Cardoso Files**

- 🌐 **GitHub**: [@cardosofiles](https://github.com/cardosofiles)
- 📧 **Email**: cardosofiles@exemplo.com
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

**🔐 Sistema de autenticação completo • 🛡️ Proteção de rotas • 🎨 UI moderna • 📊 Analytics avançado**

</div>
