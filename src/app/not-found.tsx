import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <p className="text-muted-foreground mt-2">
        A página que você está procurando não existe.
      </p>
      <Button asChild className="mt-4">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </div>
  )
}
