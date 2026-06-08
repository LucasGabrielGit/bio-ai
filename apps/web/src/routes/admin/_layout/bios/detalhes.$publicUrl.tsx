import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useBio, getBioUrl, copyToClipboard } from '@/lib/api/bios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Edit3,
  ExternalLink,
  Copy,
  Calendar,
  Eye,
  ArrowLeft,
  Share2,
  Globe,
  Settings,
  BarChart3
} from 'lucide-react'
import { toast } from 'sonner'
import { QRCodeGenerator } from '@/components/QRCodeGenerator'
import { BioAnalytics } from '@/components/analytics/BioAnalytics'
import ReactMarkdown from 'react-markdown'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

export const Route = createFileRoute('/admin/_layout/bios/detalhes/$publicUrl')({
  component: BioDetailsPage,
})

function BioDetailsPage() {
  const { publicUrl } = Route.useParams()
  const navigate = useNavigate()
  const { data: bio, isLoading, error } = useBio(publicUrl)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  if (isLoading) return <Empty className='w-full'>
    <EmptyHeader>
      <EmptyMedia>
        <Spinner />
      </EmptyMedia>
      <EmptyTitle>Carregando...</EmptyTitle>
      <EmptyDescription>
        Buscando informações da sua biografia...
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
  if (error || !bio) return <div className="p-8 text-center text-destructive">Erro ao carregar biografia.</div>

  const fullUrl = getBioUrl(bio.publicUrl)

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(fullUrl)
    if (success) toast.success('Link copiado!')
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 space-y-10 animate-in fade-in duration-700 pb-24">
      {/* Header com Ações */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: '/admin/bios' })}
            className="hover:bg-accent rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {bio.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-muted-foreground font-mono bg-muted/30">
                /{bio.publicUrl}
              </Badge>
              {bio.isPublic ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Público</Badge>
              ) : (
                <Badge variant="secondary">Rascunho</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-primary/20 hover:border-primary/40 transition-colors">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Compartilhar Biografia</DialogTitle>
                <DialogDescription>
                  Use o QR Code abaixo ou copie o link direto para divulgar sua bio.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center py-6 space-y-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm border">
                  <QRCodeGenerator url={fullUrl} title={bio.title} />
                </div>
                <div className="flex w-full items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <label htmlFor="link" className="sr-only">Link</label>
                    <input
                      id="link"
                      defaultValue={fullUrl}
                      readOnly
                      className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
                    />
                  </div>
                  <Button size="sm" className="px-3" onClick={handleCopyUrl}>
                    <span className="sr-only">Copiar</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button asChild className="bg-linear-to-r from-primary to-purple-600">
            <a href={fullUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Página
            </a>
          </Button>
        </div>
      </div>

      {/* Grid Principal de Informações */}
      <div className="grid gap-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Informações da Bio */}
          <Card className="md:col-span-2 shadow-sm border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="h-5 w-5 text-primary" />
                Resumo da Página
              </CardTitle>
              <CardDescription>Configurações e conteúdo atual da sua biografia.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Estilo Visual</p>
                  <p className="font-semibold capitalize text-primary">{bio.style}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Criada em</p>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(bio.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Template</p>
                  <p className="font-semibold">{bio.template}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-sm text-muted-foreground font-medium">Bio</p>
                <div className="text-sm border rounded-xl p-6 bg-muted/20 text-muted-foreground leading-relaxed">
                  <ReactMarkdown>
                    {bio.content}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-medium">Links Ativos ({bio.links?.length || 0})</p>
                <div className="flex flex-wrap gap-2">
                  {bio.links?.map((link: any) => (
                    <Badge key={link.id} variant="secondary" className="px-3 py-1.5 bg-secondary/50 hover:bg-secondary">
                      {link.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mini Stats Lateral */}
          <Card className="shadow-sm border-muted/60 bg-linear-to-b from-card to-muted/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Destaques Atuais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Visualizações</span>
                  <Badge variant="outline" className="font-mono">{bio.views}</Badge>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase">Status</p>
                    <p className="text-sm font-medium">Bio Otimizada</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Estatísticas (Abaixo) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Análise de Desempenho</h2>
          </div>
          <BioAnalytics publicUrl={bio.publicUrl} />
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <Button
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-linear-to-r from-primary to-purple-600 border-0 group z-50"
        size="icon"
        onClick={() => navigate({ to: `/admin/bios/editar/$publicUrl`, params: { publicUrl: bio.publicUrl } })}
      >
        <Edit3 className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute right-16 bg-card border px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none top-2 z-50 text-white">
          Editar Biografia
        </span>
      </Button>
    </div>
  )
}
