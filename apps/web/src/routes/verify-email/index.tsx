import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import apiClient from '@/lib/api/client'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/verify-email/')({
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const token = Route.useParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }

    const verify = async () => {
      try {
        await apiClient.get(`/auth/verify-email?token=${token}`)
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }

    verify()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-2xl shadow-xl border border-border">
        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
            <h1 className="text-2xl font-bold">Verificando e-mail...</h1>
            <p className="text-muted-foreground">Por favor, aguarde enquanto confirmamos seu endereço de e-mail.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold">E-mail Verificado!</h1>
            <p className="text-muted-foreground">Sua conta foi verificada com sucesso. Você já pode utilizar todos os recursos da plataforma.</p>
            <div className="pt-4">
              <Button asChild className="w-full">
                <Link to="/admin/dashboard">Ir para o Dashboard</Link>
              </Button>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold">Falha na Verificação</h1>
            <p className="text-muted-foreground">O link é inválido ou expirou. Tente solicitar um novo link de confirmação pelo seu painel.</p>
            <div className="pt-4">
              <Button asChild className="w-full" variant="outline">
                <Link to="/login">Voltar ao Login</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
