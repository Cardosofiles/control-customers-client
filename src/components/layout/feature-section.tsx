import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export function FeatureSection() {
  return (
    <section className="container grid gap-6 pt-8 pb-8 md:grid-cols-2 md:py-10">
      <div className="ring-border flex flex-col gap-4 rounded-2xl bg-white/60 p-6 ring-1 backdrop-blur-sm md:p-12 dark:bg-zinc-900/60">
        <span className="text-body-tag w-fit rounded-sm bg-emerald-800 px-2 py-1 text-blue-200 uppercase">
          Simples
        </span>
        <h2 className="text-heading-lg font-sans text-zinc-900 dark:text-zinc-200">
          Crie um catálogo de produtos online em poucos minutos
        </h2>
      </div>

      <div className="ring-border flex flex-col gap-4 rounded-2xl bg-white/60 p-6 ring-1 backdrop-blur-sm md:p-12 dark:bg-zinc-900/60">
        <span className="text-body-tag w-fit rounded-sm bg-emerald-800 px-2 py-1 text-blue-200 uppercase">
          Prático
        </span>
        <h2 className="text-heading-lg font-sans text-zinc-900 dark:text-zinc-200">
          Venda para seu público através de uma plataforma única
        </h2>
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <div className="ring-border grid grid-cols-1 gap-12 rounded-2xl bg-white/60 p-6 ring-1 backdrop-blur-sm md:grid-cols-2 md:gap-4 md:p-12 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-4">
            <span className="text-body-tag w-fit rounded-sm bg-emerald-800 px-2 py-1 text-blue-200 uppercase">
              Personalizável
            </span>

            <h2 className="text-heading-lg font-sans text-zinc-900 dark:text-zinc-200">
              Tenha uma loja online personalizada com a cara da sua marca
            </h2>

            <Button
              asChild
              className="mt-4 hidden w-fit rounded-full md:mt-auto md:flex"
            >
              <Link href="/criar-loja">
                Entrar
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full max-w-md overflow-hidden">
              <Image
                src="/feature-section.svg"
                alt="Features"
                width={440}
                height={330}
                className="w-full object-contain"
              />
            </div>
            <Button
              asChild
              className="mt-4 w-full gap-2 rounded-full md:mt-auto md:hidden"
            >
              <Link href="/criar-loja">
                Criar loja grátis
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
