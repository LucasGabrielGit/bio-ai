import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  description: string;
}

export function UpgradeModal({
  isOpen,
  onClose,
  featureName,
  description,
}: UpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden p-0 gap-0">
        <div className="relative h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500" />

        <div className="p-6 flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500 mb-4">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md animate-pulse"></div>
            <Crown className="w-8 h-8 relative z-10" />
          </div>

          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-slate-950 dark:text-slate-50 flex items-center justify-center gap-2">
              Recurso Premium
              <Sparkles className="w-5 h-5 text-amber-500" />
            </DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              O recurso <strong className="text-foreground">{featureName}</strong> é exclusivo para assinantes. {description}
            </DialogDescription>
          </DialogHeader>

          <div className="w-full mt-6 space-y-3">
            <Button
              asChild
              className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 group"
            >
              <Link to="/admin/configuracoes">
                Fazer Upgrade Agora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Talvez mais tarde
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
