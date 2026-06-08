import { AdminSidebar } from '@/components/admin-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAuth } from '@/context/AuthProvider'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import apiClient from '@/lib/api/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/_layout')({
    component: AdminLayout,
})

function AdminLayout() {
    const { user, isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()
    const [sendingEmail, setSendingEmail] = useState(false)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate({ to: '/login' })
        }
    }, [isAuthenticated, isLoading, navigate])

    const resendVerification = async () => {
        try {
            setSendingEmail(true)
            await apiClient.post('/auth/resend-verification')
            toast.success('E-mail de verificação reenviado com sucesso! Verifique sua caixa de entrada.')
        } catch (error) {
            toast.error('Erro ao reenviar e-mail de verificação. Tente novamente mais tarde.')
        } finally {
            setSendingEmail(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange storageKey="vite-ui-theme">
            <TooltipProvider>
                <div className="flex bg-background relative h-screen overflow-hidden">
                    <AdminSidebar className='sticky top-0' />
                    <main className="flex-1 overflow-auto flex flex-col h-full">
                        {user?.emailVerified === false && (
                            <div className="bg-yellow-500/15 border-b border-yellow-500/20 text-yellow-500 px-4 py-3 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>Por favor, confirme seu endereço de e-mail para desbloquear todas as funcionalidades (como publicar bios).</span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="bg-background text-foreground hover:bg-background/90"
                                    onClick={resendVerification}
                                    disabled={sendingEmail}
                                >
                                    {sendingEmail ? 'Enviando...' : 'Reenviar E-mail'}
                                </Button>
                            </div>
                        )}
                        <div className="flex-1 overflow-auto">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </TooltipProvider>
        </ThemeProvider>
    )
}
