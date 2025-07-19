import { Users } from 'lucide-react'

export function WhatsAppButton() {
  const phone = '5534996741823'
  const message = 'Olá, quero contratar os seus serviços.'
  const encodedMessage = encodeURIComponent(message)
  const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-md border-white/20 bg-white/10 px-4 py-2 text-white transition-colors"
    >
      Falar com Consultor
      <Users className="ml-2 h-5 w-5" />
    </a>
  )
}
