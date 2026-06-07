import { createFileRoute } from '@tanstack/react-router'
import { GlobalAnalytics } from '@/components/analytics/GlobalAnalytics'
import { BarChart3 } from 'lucide-react'

import { useAuth } from '@/context/AuthProvider'
import { UpgradeModal } from '@/components/upgrade-modal'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/admin/_layout/analytics/')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  const { user } = useAuth()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  useEffect(() => {
    if (user?.plan === 'free') {
      setShowUpgradeModal(true)
    }
  }, [user])

  if (user?.plan === 'free') {
    return (
      <div className="container mx-auto py-8 px-4 md:px-8 space-y-8 h-screen overflow-hidden relative">
        <div className="flex flex-col gap-2 opacity-50 blur-sm pointer-events-none">
          <div className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Acompanhe o desempenho de todas as suas biografias e links em um só lugar.
          </p>
        </div>
        
        <div className="opacity-50 blur-sm pointer-events-none">
          <GlobalAnalytics />
        </div>

        <UpgradeModal
          isOpen={true}
          onClose={() => {}}
          featureName="Métricas Avançadas"
          description="Assine um plano e tenha acesso a gráficos interativos, relatórios detalhados e insights sobre o desempenho de suas biografias."
        />
      </div>
    )
  }

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
