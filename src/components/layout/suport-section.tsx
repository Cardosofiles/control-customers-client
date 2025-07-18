import { HeartHandshake, PaintbrushVertical, Store } from 'lucide-react'

export function SupportSection() {
  return (
    <section className="relative pb-8 md:py-10">
      <div className="absolute inset-0 hidden bg-[url('/background-features.svg')] bg-cover bg-center bg-no-repeat opacity-90 md:block" />

      <div className="relative container flex flex-col items-center gap-12">
        <h2 className="text-heading-xl text-center font-sans text-balance text-zinc-950 dark:text-zinc-100">
          Sua loja de afiliados, simples, do jeito que deveria ser
        </h2>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card genérico */}
          {[
            {
              icon: (
                <PaintbrushVertical className="h-6 w-6 text-zinc-900 dark:text-zinc-200" />
              ),
              title: 'Personalize seu site',
              desc: 'Adicione sua logo, favicon, cores no seu catálogo e tenha tudo com a sua cara.',
              color: 'bg-blue-300',
            },
            {
              icon: (
                <Store className="h-6 w-6 text-zinc-900 dark:text-zinc-200" />
              ),
              title: 'Venda de qualquer loja',
              desc: 'Não importa a loja, o Site.Set permite que você insira qualquer link de afiliado.',
              color: 'bg-cyan-200',
            },
            {
              icon: (
                <HeartHandshake className="h-6 w-6 text-zinc-900 dark:text-zinc-200" />
              ),
              title: 'Receba suporte amigável',
              desc: 'Nossa equipe estará sempre pronta para te atender para ajudar no que for preciso.',
              color: 'bg-blue-300',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="ring-border flex flex-col items-center gap-3 rounded-2xl bg-white/60 p-4 text-center ring-1 backdrop-blur-sm md:items-start md:p-8 md:text-left dark:bg-zinc-900"
            >
              <div
                className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${card.color}`}
              >
                {card.icon}
              </div>
              <strong className="text-heading-sm text-zinc-950 dark:text-zinc-100">
                {card.title}
              </strong>
              <p className="text-body-sm text-zinc-800/60 dark:text-zinc-400">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
