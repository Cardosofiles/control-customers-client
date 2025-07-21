import { ArrowRight, CheckCircle, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export function HeroSection() {
  return (
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
  )
}
