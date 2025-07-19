'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clock,
  Crown,
  Globe,
  HeartHandshake,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

// Dados para gráficos
const growthData = [
  { month: 'Jan', users: 1200, revenue: 45000 },
  { month: 'Fev', users: 1800, revenue: 52000 },
  { month: 'Mar', users: 2400, revenue: 68000 },
  { month: 'Abr', users: 3200, revenue: 85000 },
  { month: 'Mai', users: 4100, revenue: 98000 },
  { month: 'Jun', users: 5200, revenue: 125000 },
]

const industryData = [
  { name: 'E-commerce', value: 35, color: '#8b5cf6' },
  { name: 'Serviços', value: 28, color: '#06b6d4' },
  { name: 'Tecnologia', value: 22, color: '#10b981' },
  { name: 'Outros', value: 15, color: '#f59e0b' },
]

const satisfactionData = [
  { category: 'Interface', score: 96 },
  { category: 'Performance', score: 94 },
  { category: 'Suporte', score: 98 },
  { category: 'Recursos', score: 92 },
]

const testimonials = [
  {
    name: 'Ana Silva',
    company: 'TechStart',
    role: 'CEO',
    avatar: 'AS',
    text: 'Revolucionou completamente nossa gestão de clientes. ROI de 300% em 6 meses!',
    rating: 5,
  },
  {
    name: 'Carlos Santos',
    company: 'Digital Solutions',
    role: 'CTO',
    avatar: 'CS',
    text: 'A melhor plataforma que já usei. Interface intuitiva e recursos poderosos.',
    rating: 5,
  },
  {
    name: 'Marina Costa',
    company: 'Growth Co.',
    role: 'CMO',
    avatar: 'MC',
    text: 'Nossos clientes adoram a experiência. Aumentamos a satisfação em 40%.',
    rating: 5,
  },
]

export default function Home() {
  return (
    <div className="from-background via-background to-primary/5 min-h-screen bg-gradient-to-br">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="bg-grid-pattern absolute inset-0 opacity-5" />
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 flex justify-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                Plataforma #1 em Gestão de Clientes
              </Badge>
            </div>

            <h1 className="from-foreground via-primary to-foreground mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Transforme Seu
              <span className="text-primary block">Negócio Digital</span>
            </h1>

            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl leading-relaxed md:text-2xl">
              A plataforma mais avançada para gestão de clientes, com IA
              integrada, analytics em tempo real e automação inteligente.
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/sign-in">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Ver Demonstração
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Teste gratuito de 30 dias
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Sem compromisso
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Suporte 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                50K+
              </div>
              <div className="text-muted-foreground">Empresas Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                2M+
              </div>
              <div className="text-muted-foreground">Clientes Gerenciados</div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                99.9%
              </div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                4.9★
              </div>
              <div className="text-muted-foreground">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Recursos que <span className="text-primary">Impressionam</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Tudo que você precisa para levar seu negócio ao próximo nível
            </p>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: 'Performance Extrema',
                description: 'Carregamento em menos de 0.5s com CDN global',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Segurança Militar',
                description: 'Criptografia AES-256 e compliance LGPD/GDPR',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: 'Analytics Avançado',
                description: 'Insights em tempo real com IA preditiva',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: 'Mobile First',
                description: 'App nativo iOS/Android incluído',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: 'Multi-idioma',
                description: 'Suporte a 40+ idiomas automaticamente',
                color: 'from-indigo-500 to-blue-500',
              },
              {
                icon: <Rocket className="h-8 w-8" />,
                title: 'Automação IA',
                description: 'Fluxos inteligentes que se adaptam sozinhos',
                color: 'from-red-500 to-pink-500',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group from-card to-card/80 border-0 bg-gradient-to-br transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardContent className="p-8">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 flex items-center justify-center text-white transition-transform group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Dashboard de <span className="text-primary">Elite</span>
            </h2>
            <p className="text-muted-foreground text-xl">
              Visualize dados como nunca antes
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Gráfico de Crescimento */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Crescimento Exponencial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient
                          id="colorUsers"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Distribuição por Setor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Setores Atendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={industryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {industryData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Métricas de Satisfação - Corrigida */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-red-500" />
                  Índices de Satisfação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={satisfactionData}
                      layout="horizontal"
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="category"
                        axisLine={false}
                        tickLine={false}
                        width={80}
                        tick={{ fontSize: 12 }}
                      />
                      <Bar
                        dataKey="score"
                        fill="#10b981"
                        radius={[0, 6, 6, 0]}
                        background={{ fill: '#e5e7eb' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Legenda adicional para melhor visualização */}
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {satisfactionData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {item.score}%
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {item.category}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              O que nossos <span className="text-primary">Clientes</span> dizem
            </h2>
            <p className="text-muted-foreground text-xl">
              Histórias reais de transformação digital
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="from-primary to-primary/50 absolute top-0 left-0 h-1 w-full bg-gradient-to-r" />
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <blockquote className="text-foreground mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="from-primary to-primary/70 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br">
                      <span className="font-bold text-white">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary to-primary/80 bg-gradient-to-r py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl text-white">
            <Crown className="mx-auto mb-6 h-16 w-16" />
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Pronto para Liderar seu Mercado?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Junte-se a milhares de empresas que já transformaram seus
              resultados
            </p>

            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/sign-in">
                  Começar Agora
                  <Rocket className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 px-8 py-6 text-lg text-white hover:bg-white/20"
              >
                Falar com Consultor
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Implementação em 24h
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Garantia de satisfação
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Suporte dedicado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold">
              Control<span className="text-primary">Customers</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              A plataforma que transforma negócios em líderes de mercado
            </p>

            <Separator className="my-8" />

            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-8 text-sm">
              <span>
                © 2025 ControlCustomers. Todos os direitos reservados.
              </span>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Suporte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
