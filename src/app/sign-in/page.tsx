'use client'

import { SignInForm } from '@/components/forms/sign-in-form'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  BarChart3,
  Clock,
  Crown,
  Globe,
  Lock,
  MapPin,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// Dados mockados para demonstração
const quickStats = [
  { label: 'Empresas', value: '50K+', icon: Users, color: 'blue' },
  { label: 'Crescimento', value: '+45%', icon: TrendingUp, color: 'green' },
  { label: 'Cidades', value: '85+', icon: MapPin, color: 'purple' },
  { label: 'Suporte', value: '24/7', icon: Clock, color: 'orange' },
]

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Analytics Avançado',
    description: 'Insights em tempo real',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Segurança Total',
    description: 'Criptografia militar',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global Scale',
    description: 'Disponível mundialmente',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Performance',
    description: 'Velocidade extrema',
  },
]

export default function SignInPage() {
  return (
    <div className="from-background via-background to-primary/5 min-h-screen bg-gradient-to-br">
      {/* Hero Section com foco no Login */}
      <section className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            {/* Badge de destaque */}
            <div className="mb-6 flex justify-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-base">
                <Crown className="mr-2 h-4 w-4" />
                Plataforma Líder em Gestão
              </Badge>
            </div>

            {/* Título principal com gradiente */}
            <div className="mb-6">
              <h1 className="from-foreground via-primary to-foreground mb-4 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                Entre no Futuro da
                <span className="text-primary block">Gestão Digital</span>
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                Acesse sua conta e descubra como milhares de empresas estão
                revolucionando seus negócios
              </p>
            </div>

            {/* Badges de benefícios */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                <Star className="mr-1 h-3 w-3" />
                4.9/5 Satisfação
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                <Lock className="mr-1 h-3 w-3" />
                100% Seguro
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                IA Integrada
              </Badge>
            </div>
          </div>

          {/* Formulário de Login em Destaque */}
          <div className="mb-16 flex justify-center">
            <div className="w-full max-w-md">
              <div className="from-primary/5 to-primary/10 rounded-3xl bg-gradient-to-br p-1 shadow-2xl">
                <div className="bg-background rounded-3xl p-2">
                  <SignInForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Stats Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Números que <span className="text-primary">Impressionam</span>
            </h2>
            <p className="text-muted-foreground">
              Resultados reais de quem já transformou seu negócio
            </p>
          </div>

          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              const colorClasses = {
                blue: 'bg-blue-500 from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
                green:
                  'bg-green-500 from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
                purple:
                  'bg-purple-500 from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100',
                orange:
                  'bg-orange-500 from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100',
              }

              return (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses].split(' ').slice(1).join(' ')} text-center transition-transform hover:scale-105`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div
                        className={`mb-3 rounded-xl p-3 ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[0]}`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div
                        className={`mb-1 text-3xl font-bold ${colorClasses[stat.color as keyof typeof colorClasses].split(' ').slice(-2).join(' ')}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Features Grid */}
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6 text-center">
                  <div className="from-primary to-primary/70 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r text-white transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonial Destacado */}
          <Card className="from-primary/5 to-primary/10 border-primary/20 mx-auto max-w-3xl bg-gradient-to-br">
            <CardContent className="p-8 text-center">
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <blockquote className="text-foreground mb-6 text-xl font-medium italic">
                "Migrar para o ControlCustomers foi a melhor decisão estratégica
                da nossa empresa. Em 6 meses, nossa eficiência operacional
                aumentou 300% e a satisfação dos clientes disparou."
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="from-primary to-primary/70 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br">
                  <span className="text-lg font-bold text-white">MS</span>
                </div>
                <div className="text-left">
                  <div className="text-foreground font-semibold">
                    Maria Silva
                  </div>
                  <div className="text-muted-foreground text-sm">
                    CEO, TechSolutions Ltda
                  </div>
                  <div className="text-primary text-xs">Cliente desde 2023</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security Banner */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-muted-foreground flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                Certificação ISO 27001
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-500" />
                Criptografia AES-256
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-500" />
                LGPD Compliance
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                Uptime 99.9%
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
