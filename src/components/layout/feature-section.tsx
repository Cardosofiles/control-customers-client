import { BarChart3, Globe, Rocket, Shield, Smartphone, Zap } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

export function FeatureSection() {
  return (
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
  )
}
