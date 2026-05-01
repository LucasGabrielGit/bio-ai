import { AdminSidebar } from '@/components/admin-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { useAuth } from '@/context/AuthProvider'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/admin/_layout')({
    component: AdminLayout,
})

function AdminLayout() {
    const { isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate({ to: '/login' })
        }
    }, [isAuthenticated, isLoading, navigate])

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
            <div className="flex bg-background">
                <AdminSidebar className='sticky top-0' />
                <main className="flex-1 overflow-auto">
                    <div className="h-full overflow-y-hidden">
                        <Outlet />
                    </div>
                </main>
            </div>
        </ThemeProvider>
    )
}
