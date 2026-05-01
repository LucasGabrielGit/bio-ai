import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useBioAnalytics } from '@/lib/api/bios'
import { Eye, Users, ExternalLink, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRangeSelector, useDateRange } from './DateRangeSelector'

interface BioAnalyticsProps {
  publicUrl: string
}

export function BioAnalytics({ publicUrl }: BioAnalyticsProps) {
  const { dateRange, setDateRange, getQueryParams } = useDateRange(30)
  const { data: analytics, isLoading, error } = useBioAnalytics(publicUrl, getQueryParams())
  console.log(analytics)
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Erro ao carregar analytics. Tente novamente mais tarde.
          </p>
        </CardContent>
      </Card>
    )
  }

  const chartData = analytics.chartData.map(item => ({
    ...item,
    date: format(parseISO(item.date), 'dd/MM', { locale: ptBR })
  }))

  return (
    <div className="space-y-6">
      {/* Seletor de Período */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">
            Acompanhe o desempenho da sua bio
          </p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Desde {format(parseISO(analytics.bio.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Período Selecionado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.stats.recentViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {dateRange.label}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.stats.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {dateRange.label}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Principal Origem</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.stats.topReferrers[0]?.domain || 'Direto'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.stats.topReferrers[0]?.count || 0} visualizações
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Visualizações */}
      <Card>
        <CardHeader>
          <CardTitle>Visualizações por Dia</CardTitle>
          <CardDescription>
            {dateRange.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => `Data: ${label}`}
                  formatter={(value) => [value, 'Visualizações']}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Referrers */}
      {analytics.stats.topReferrers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Principais Origens de Tráfego</CardTitle>
            <CardDescription>
              De onde seus visitantes estão vindo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.stats.topReferrers.map((referrer, index) => (
                <div key={referrer.domain} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="font-medium">{referrer.domain}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {referrer.count} visualizações
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}