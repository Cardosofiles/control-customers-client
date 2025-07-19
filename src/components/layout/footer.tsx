import { Separator } from '@radix-ui/react-select'
import Link from 'next/link'

export function Footer() {
  return (
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
            <span>© 2025 ControlCustomers. Todos os direitos reservados.</span>
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
  )
}
