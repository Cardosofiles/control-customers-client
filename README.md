# ControlCustomers - Sistema de Gestão de Clientes

Uma plataforma moderna e intuitiva para gestão de clientes, desenvolvida com Next.js 15, React 19, TypeScript e shadcn/ui.

## 🚀 Tecnologias

- **Next.js 15.4.2** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI elegantes e acessíveis
- **TanStack Query** - Gerenciamento de estado do servidor
- **React Hook Form** - Formulários performáticos
- **Recharts** - Gráficos e visualizações
- **Zod** - Validação de esquemas TypeScript

## ✨ Funcionalidades

- **Autenticação** - Sistema de login com validação
- **Gestão de Clientes** - CRUD completo de clientes
- **Gestão de Endereços** - Múltiplos endereços por cliente
- **Dashboard Analytics** - Gráficos e métricas em tempo real
- **Integração com CEP** - Preenchimento automático via ViaCEP
- **API Celcoin** - Integração com serviços externos
- **Temas** - Suporte a modo claro/escuro
- **Responsivo** - Design adaptável para todos os dispositivos

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd control-customers-client
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
NEXT_PUBLIC_USERNAME=your_demo_username
NEXT_PUBLIC_PASSWORD=your_demo_password
NEXT_PUBLIC_CELCOIN_CLIENT_ID=your_public_client_id
NEXT_PUBLIC_CELCOIN_CLIENT_SECRET=your_public_client_secret
CELCOIN_CLIENT_ID=your_actual_client_id
CELCOIN_CLIENT_SECRET=your_actual_client_secret
```

4. Execute o servidor de desenvolvimento:

```bash
pnpm dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponíveis

```bash
pnpm dev        # Servidor de desenvolvimento
pnpm build      # Build de produção
pnpm start      # Servidor de produção
pnpm lint       # Linter ESLint
```

## 🚀 Deploy na Vercel

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. O deploy será feito automaticamente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## 📱 Páginas

- **Home** (`/`) - Landing page com apresentação da plataforma
- **Login** (`/sign-in`) - Página de autenticação
- **Dashboard** (`/dashboard`) - Painel principal com gestão de clientes

## 🎨 Componentes

O projeto utiliza uma arquitetura de componentes bem estruturada:

- **UI Components** - Componentes base do shadcn/ui
- **Forms** - Formulários com validação
- **Layout** - Componentes de estrutura
- **Charts** - Gráficos e visualizações

## 🔧 Configuração

### Tailwind CSS

O projeto usa Tailwind CSS 4 com configuração personalizada para temas e variáveis CSS.

### shadcn/ui

Componentes configurados com o tema "new-york" e suporte a CSS variables.

### TypeScript

Configuração estrita para máxima segurança de tipos.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Cardoso Files**

- GitHub: [@cardosofiles](https://github.com/cardosofiles)

---

Desenvolvido com ❤️ usando Next.js e shadcn/ui
