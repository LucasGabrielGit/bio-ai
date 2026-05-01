import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext
} from "@tanstack/react-router";
import "../index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

export interface RouterAppContext { }

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "Bio AI",
			},
			{
				name: "description",
				content: "Bio AI é uma plataforma de inteligência artificial para criação de páginas de links personalizados.",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {
	const queryClient = new QueryClient();
	return (
		<ThemeProvider attribute="class"
			defaultTheme="dark"
			disableTransitionOnChange
			storageKey="vite-ui-theme">
			<AuthProvider>
				<TooltipProvider>
				<QueryClientProvider client={queryClient}>
					<HeadContent />
					<Toaster richColors position="top-center" />
					<main className="min-h-screen">
						<Outlet />
					</main>
				</QueryClientProvider>
				</TooltipProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
