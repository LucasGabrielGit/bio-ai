import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import apiClient from '@/lib/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { CheckCircle2, Lock } from 'lucide-react'

export const Route = createFileRoute('/redefinir-senha/')({
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const { token } = Route.useSearch<{ token?: string }>()
  const navigate = useNavigate()
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      toast.error('Token inválido ou não fornecido.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.')
      return
    }

    if (password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    try {
      setIsLoading(true)
      await apiClient.post('/auth/reset-password', { 
        token, 
        newPassword: password 
      })
      setIsSuccess(true)
      toast.success('Senha redefinida com sucesso!')
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Erro ao redefinir senha. O token pode estar expirado.'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-2xl shadow-xl border border-border">
          <h1 className="text-2xl font-bold text-destructive">Link Inválido</h1>
          <p className="text-muted-foreground">O link de redefinição de senha está incompleto ou inválido.</p>
          <Button asChild>
            <Link to="/esqueci-senha">Solicitar novo link</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-xl border border-border">
        
        {!isSuccess ? (
          <>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Criar nova senha</h1>
              <p className="text-muted-foreground mt-2">
                Digite sua nova senha abaixo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !password || !confirmPassword}>
                {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold">Senha Redefinida!</h1>
            <p className="text-muted-foreground">
              Sua senha foi alterada com sucesso. Você já pode fazer login com a nova senha.
            </p>
            <Button asChild className="w-full">
              <Link to="/login">Fazer Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
