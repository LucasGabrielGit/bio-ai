import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { copyToClipboard, getBioUrl, useBios, useDeleteBio } from '@/lib/api/bios'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Calendar,
  Copy,
  Edit,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Sparkles,
  Trash2
} from 'lucide-react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/_layout/bios/')({
  component: MinhasBiosComponent,
})

function MinhasBiosComponent() {
  const { data: bios = [], isLoading, error } = useBios()
  const deleteBioMutation = useDeleteBio()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStyle, setFilterStyle] = useState('all')

  const getStyleBadge = (style: string) => {
    const styles = {
      professional: { label: 'Profissional', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      creative: { label: 'Criativa', variant: 'secondary' as const, color: 'bg-purple-100 text-purple-800' },
      educational: { label: 'Educacional', variant: 'outline' as const, color: 'bg-green-100 text-green-800' },
      informational: { label: 'Informativa', variant: 'destructive' as const, color: 'bg-orange-100 text-orange-800' }
    }
    return styles[style as keyof typeof styles] || styles.professional
  }

  const filteredBios = bios.filter(bio => {
    const matchesSearch = bio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bio.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStyle === 'all' || bio.style === filterStyle
    return matchesSearch && matchesFilter
  })

  const handleCopyUrl = async (bio: any) => {
    const url = getBioUrl(bio.publicUrl)
    const success = await copyToClipboard(url)
    if (success) {
      toast.success('URL copiada para a área de transferência!')
    } else {
      toast.error('Erro ao copiar URL')
    }
  }


  const handleDeleteBio = async (slug: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a biografia "${title}"?`)) {
      try {
        await deleteBioMutation.mutateAsync(slug)
        toast.success('Biografia excluída com sucesso!')
      } catch (error) {
        toast.error('Erro ao excluir biografia')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Minhas Bios</h1>
            <p className="text-muted-foreground">Gerencie suas biografias criadas</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Minhas Bios</h1>
            <p className="text-muted-foreground">Gerencie suas biografias criadas</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">Erro ao carregar biografias</p>
              <Button onClick={() => window.location.reload()}>
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Bios</h1>
          <p className="text-muted-foreground">
            Gerencie todas as suas biografias em um só lugar
          </p>
        </div>
        <Button asChild className="bg-linear-to-r from-primary to-purple-600">
          <Link to="/admin/bios/nova-rhf">
            <Plus className="mr-2 h-4 w-4" />
            Nova Bio
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filterStyle === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStyle('all')}
          >
            Todas
          </Button>
          <Button
            variant={filterStyle === 'professional' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStyle('professional')}
          >
            Profissional
          </Button>
          <Button
            variant={filterStyle === 'creative' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStyle('creative')}
          >
            Criativa
          </Button>
          <Button
            variant={filterStyle === 'educational' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStyle('educational')}
          >
            Educacional
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total de Bios</p>
                <p className="text-2xl font-bold">{bios.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Públicas</p>
                <p className="text-2xl font-bold">{bios.filter(b => b.isPublic).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Edit className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Rascunhos</p>
                <p className="text-2xl font-bold">{bios.filter(b => !b.isPublic).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Views</p>
                <p className="text-2xl font-bold">{bios.reduce((acc, bio) => acc + bio.views, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredBios.map((bio, index) => (
          <motion.div
            key={bio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 group h-full flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {bio.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStyleBadge(bio.style).color}>
                        {getStyleBadge(bio.style).label}
                      </Badge>
                      {bio.isPublic ? (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Público
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          Rascunho
                        </Badge>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/bios/editar/$publicUrl`} params={{ publicUrl: bio.publicUrl }}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopyUrl(bio)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar URL
                      </DropdownMenuItem>
                      {bio.isPublic && (
                        <DropdownMenuItem asChild>
                          <a
                            href={getBioUrl(bio.publicUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visualizar
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteBio(bio.publicUrl, bio.title)}
                        className="text-red-600 focus:text-red-600"
                        disabled={deleteBioMutation.isPending}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex flex-col justify-baseline">

                {bio.content.length > 100 ? (
                  <Markdown>
                    {bio.content.slice(0, 200) + '...'}
                  </Markdown>
                ) : (
                  <Markdown>
                    {bio.content}
                  </Markdown>
                )}


                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{bio.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(bio.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <Link to={`/admin/bios/editar/$publicUrl`} params={{ publicUrl: bio.publicUrl }}>
                      <Edit className="mr-1 h-3 w-3" />
                      Editar
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share2 className="mr-1 h-3 w-3" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredBios.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Sparkles className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchTerm || filterStyle !== 'all' ? 'Nenhuma bio encontrada' : 'Nenhuma bio criada ainda'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || filterStyle !== 'all'
              ? 'Tente ajustar os filtros ou termo de busca'
              : 'Crie sua primeira biografia com nossa IA inteligente'
            }
          </p>
          <Button asChild>
            <Link to="/admin/bios/nova-rhf">
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeira Bio
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}