import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  Plus,
  TrendingUp,
  Users,
  Eye,
  Share2,
  Edit,
  BarChart3,
  FileText,
  Globe,
  Calendar,
  ArrowUpRight,
  Sparkles
} from 'lucide-react'
import { useBios } from '@/lib/api/bios'
import { useNavigate } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'

export const Route = createFileRoute('/admin/_layout/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: bios = [] } = useBios()
  const navigate = useNavigate()

  const recentBios = bios
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)


  const getStyleBadge = (style: string) => {
    const styles = {
      professional: { label: 'Profissional', variant: 'default' as const },
      creative: { label: 'Criativa', variant: 'secondary' as const },
      educational: { label: 'Educacional', variant: 'outline' as const },
      informational: { label: 'Informativa', variant: 'destructive' as const }
    }
    return styles[style as keyof typeof styles] || styles.professional
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo das suas biografias.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="bg-linear-to-r from-primary to-purple-600">
            <Link to="/admin/bios/nova-rhf">
              <Plus className="mr-2 h-4 w-4" />
              Nova Bio
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Bios</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bios.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bios.reduce((acc, bio) => acc + bio.views, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              +12% desde ontem
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Suas Bios Recentes</h2>
          <Button variant="outline" asChild>
            <Link to="/admin/bios">
              Ver Todas
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentBios.map((bio, index) => {
            return (
              <motion.div
                key={bio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base line-clamp-1">
                          {bio.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge {...getStyleBadge(bio.style)}>
                            {getStyleBadge(bio.style).label}
                          </Badge>
                          {bio.isPublic ? (
                            <Badge variant="outline" className="text-green-600">
                              Público
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-orange-600">
                              Rascunho
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{bio.views} visualizações</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{(new Date(bio.createdAt)).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate({ to: `/admin/bios/editar/$publicUrl`, params: { publicUrl: bio.publicUrl } })}>
                        <Edit className="mr-1 h-3 w-3" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="mr-1 h-3 w-3" />
                        Compartilhar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-4 md:grid-cols-2"
      >
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-primary" />
              <span>Criar Nova Bio</span>
            </CardTitle>
            <CardDescription>
              Use nossa IA para gerar uma biografia personalizada em segundos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/admin/bios/nova-rhf">
                Começar Agora
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Ver Análises</span>
            </CardTitle>
            <CardDescription>
              Acompanhe o desempenho das suas biografias e otimize resultados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link to="/admin/dashboard">
                Ver Relatórios
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
