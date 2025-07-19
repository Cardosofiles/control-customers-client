import { Clock, Crown, Rocket, Shield, Trophy } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { WhatsAppButton } from '../whatsapp/whatsapp-button'

export function CTASection() {
  return (
    <section className="from-primary to-primary/80 bg-gradient-to-r py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl text-white">
          <Crown className="mx-auto mb-6 h-16 w-16" />
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Pronto para Liderar seu Mercado?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Junte-se a milhares de empresas que já transformaram seus resultados
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
              asChild
            >
              <WhatsAppButton />
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
  )
}
