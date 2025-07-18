import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-border border-t bg-white/60 backdrop-blur-sm dark:bg-zinc-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 py-8 md:flex-row md:items-center">
          <nav className="flex flex-col items-start gap-2 text-sm text-zinc-800 md:flex-row md:items-center md:gap-4 dark:text-blue-100">
            <Link href="/termos-de-uso" className="hover:text-blue-200">
              Termos de uso
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="hover:text-blue-200"
            >
              Política de privacidade
            </Link>
            <Link href="/feedback" className="hover:text-blue-200">
              Feedback
            </Link>
          </nav>

          <p className="mt-4 text-sm text-zinc-800 md:mt-0 dark:text-zinc-200">
            &copy; Cadastramento de Clientes LTDA | Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
