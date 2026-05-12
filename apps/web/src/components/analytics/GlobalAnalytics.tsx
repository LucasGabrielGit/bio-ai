import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { useGlobalAnalytics } from "@/lib/api/bios";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function GlobalAnalytics() {
  const { data: analytics, isLoading, error } = useGlobalAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 w-32 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-full bg-muted animate-pulse rounded"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <p className="text-center text-destructive">
            Erro ao carregar as análises globais. Por favor, tente novamente.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { summary, bios } = analytics;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Resumo Geral */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Bios</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalBios}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Bios criadas no total
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Views
            </CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Visualizações acumuladas
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Cliques
            </CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <MousePointerClick className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.totalClicks.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Cliques em links
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR Médio</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.avgCTR}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Taxa de clique global
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Desempenho por Bio */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Biografia</CardTitle>
            <CardDescription>
              Uma visão detalhada de como cada uma de suas páginas está
              performando.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Biografia</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Cliques</TableHead>
                    <TableHead className="text-center w-30">CTR</TableHead>
                    <TableHead className="text-center w-10">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bios.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Nenhuma biografia encontrada para analisar.
                      </TableCell>
                    </TableRow>
                  ) : (
                    bios.map((bio) => (
                      <TableRow key={bio.id}>
                        <TableCell>
                          <div className="font-medium">{bio.title}</div>
                          <div className="text-xs text-muted-foreground">
                            /{bio.slug}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {bio.views.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {bio.clicks.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={bio.ctr > 10 ? "default" : "secondary"}
                          >
                            {bio.ctr}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              to="/admin/bios/detalhes/$publicUrl"
                              params={{ publicUrl: bio.slug }}
                            >
                              Detalhes
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
