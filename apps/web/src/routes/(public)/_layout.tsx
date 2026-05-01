import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout')({
  component: PublicLayoutComponent,
})

function PublicLayoutComponent() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      storageKey="vite-ui-theme"
    >
      <div className="min-h-screen">
        <Header />
        <main className="px-32 sm:px-6 lg:px-23">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  )
}