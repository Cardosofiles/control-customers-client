import { ArrowRight, Clock, Store } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export function HeroSection() {
  return (
    <section className="relative container mt-16 flex items-center justify-center">
      <div className="grid min-h-[20rem] grid-cols-1 items-center gap-8 md:h-[36rem] md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4 md:items-start lg:items-start">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <h1 className="text-heading-hg font-sans text-zinc-950 dark:text-zinc-100">
              Gerencie seus negócios em um único lugar moderno
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 md:items-start lg:items-start">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-950 dark:text-cyan-100" />
                <span className="text-body-md text-zinc-800/50 dark:text-zinc-400">
                  Cadaste o seu cliente em menos de 5 minutos
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-cyan-950 dark:text-cyan-100" />
                <span className="text-body-md text-zinc-800/50 dark:text-zinc-400">
                  Acompanhe e otimize seu negócio online
                </span>
              </div>
            </div>

            <div className="ls:items-start mt-5 flex flex-col items-center gap-2 text-white md:items-start">
              <Button className="w-fit rounded-full" asChild>
                <Link href="/sign-in">
                  Fazer Login
                  <ArrowRight />
                </Link>
              </Button>

              <p className="text-body-xs text-zinc-800/50 dark:text-zinc-400">
                Não precisa de muito para ter sucesso
              </p>
            </div>
          </div>
        </div>

        <div className="relative order-first hidden h-[20rem] items-center justify-center md:order-last md:flex md:h-full lg:flex">
          <Image
            src="/hero-section.svg"
            alt="Ilustração com ícones de store, tag e sacola"
            width={200}
            height={400}
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}
