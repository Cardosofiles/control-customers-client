'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'
import { DashboardNavbar } from '@/components/layout/dashboard-navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="bg-background mt-5 min-h-screen">
        <DashboardNavbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
