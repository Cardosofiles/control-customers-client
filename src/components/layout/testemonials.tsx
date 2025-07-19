import { Star } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

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

export function Testimonials() {
  return (
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
  )
}
