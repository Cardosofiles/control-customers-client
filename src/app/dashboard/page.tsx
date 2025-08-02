import { redirect } from 'next/navigation'

export default function DashboardPage() {
  // Redireciona automaticamente para a página de analytics
  redirect('/dashboard/analytics')
}
