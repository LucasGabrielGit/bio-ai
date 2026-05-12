import { createFileRoute } from '@tanstack/react-router'
import { GlobalAnalytics } from '@/components/analytics/GlobalAnalytics'
import { BarChart3 } from 'lucide-react'

export const Route = createFileRoute('/admin/_layout/analytics/')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Acompanhe o desempenho de todas as suas biografias e links em um só lugar.
        </p>
      </div>

      <GlobalAnalytics />
    </div>
  )
}
