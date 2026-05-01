import { Link, useLocation } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import logo from "@/lib/assets/images/logo.svg"
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Header() {
	const location = useLocation();

	const links = [
		{ to: "/home", label: "Início" },
		{ to: "/planos", label: "Planos" },
		{ to: "/contato", label: "Contato" },
		{ to: "/sobre", label: "Sobre" },
	] as const;

	const isActiveLink = (path: string) => {
		return location.pathname === path;
	};

	return (
		<motion.header
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6 }}
			className="sticky top-0 z-50 backdrop-blur-md bg-accent border-b border-border/40 shadow-sm"
		>
			<div className="mx-auto px-32 sm:px-6 lg:px-23">
				<div className="flex justify-between items-center h-16">
					<Link to="/home" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
						<div className="relative">
							<img src={logo} alt="AutoBio" className="w-8 h-8" />
							<Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary animate-pulse" />
						</div>
						<span className="text-xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							AutoBio
						</span>
					</Link>

					<nav className="hidden md:flex items-center space-x-8 place-content-center pl-24">
						{links.map((link) => {
							const isActive = isActiveLink(link.to);
							return (
								<Link
									key={link.to}
									to={link.to}
									className={`relative text-sm font-medium transition-all duration-300 group ${isActive
										? 'text-primary font-semibold'
										: 'text-muted-foreground hover:text-primary'
										}`}
								>
									{link.label}
									<span
										className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-primary to-purple-600 transition-all duration-300 ${isActive
											? 'w-full'
											: 'w-0 group-hover:w-full'
											}`}
									></span>
								</Link>
							);
						})}
					</nav>

					<div className="flex items-center space-x-3 ">
						<Button
							variant="outline"
							size="sm"
							className="hidden sm:inline-flex"
							asChild
						>
							<Link to="/login">
								Entrar
							</Link>
						</Button>
						<Button
							size="sm"
							className="bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
							asChild
						>
							<Link to="/registro">
								Começar Grátis
							</Link>
						</Button>
						<ModeToggle />
					</div>
				</div>
			</div>
		</motion.header>
	);
}
