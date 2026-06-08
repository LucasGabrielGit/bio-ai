import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import apiClient from '@/lib/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ArrowLeft, Mail } from 'lucide-react'

export const Route = createFileRoute('/esqueci-senha/')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      setIsLoading(true)
      await apiClient.post('/auth/forgot-password', { email })
      setIsSent(true)
    } catch (error) {
      toast.error('Erro ao solicitar recuperação. Verifique o e-mail informado.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-xl border border-border">
        
        {!isSent ? (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">Esqueci minha senha</h1>
              <p className="text-muted-foreground mt-2">
                Digite seu e-mail abaixo e enviaremos as instruções para redefinir sua senha.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !email}>
                {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <Mail className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-2xl font-bold">Verifique seu e-mail</h1>
            <p className="text-muted-foreground">
              Enviamos um link de recuperação para <strong>{email}</strong>. 
              Por favor, verifique sua caixa de entrada e spam.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/login" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
