import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Settings,
  User,
  BarChart3,
  LogOut,
  Sparkles,
  Crown,
} from "lucide-react";
import logo from "@/lib/assets/images/logo.svg";
import { useAuth } from "@/context/AuthProvider";

const navigation = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral",
  },
  {
    name: "Minhas Bios",
    to: "/admin/bios",
    icon: FileText,
    description: "Gerenciar bios",
  },
  {
    name: "Criar Nova Bio",
    to: "/admin/bios/nova-rhf",
    icon: Plus,
    description: "Nova biografia",
  },
  {
    name: "Análises",
    to: "/admin/analytics",
    icon: BarChart3,
    description: "Estatísticas",
  },
  {
    name: "Configurações",
    to: "/admin/configuracoes",
    icon: Settings,
    description: "Preferências",
  },
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div
      className={cn("flex h-screen w-64 flex-col bg-card border-r", className)}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <div className="relative">
            <img src={logo} alt="AutoBio" className="w-8 h-8" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AutoBio
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.to}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-5 w-5 shrink-0",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-accent-foreground",
                )}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.name === "Criar Nova Bio" && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      IA
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <Badge className="mb-2 bg-linear-to-r from-yellow-500 to-orange-500">
              <Crown className="h-3 w-3" />
              {user?.plan.charAt(0).toUpperCase().concat(user?.plan.slice(1))}
            </Badge>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}
