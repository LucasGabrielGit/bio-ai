import { BackgroundCards } from '@/components/background-style';
import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import logo from "@/lib/assets/images/logo.svg";
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


export const Route = createFileRoute('/login/')({
  component: Login,
})

function Login() {
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    const expired = sessionStorage.getItem("session_expired");
    if (expired === "true") {
      setShowExpiredModal(true);
      toast.warning("Sua sessão expirou por inatividade. Por favor, faça login novamente.", {
        duration: 5000,
      });
      sessionStorage.removeItem("session_expired");
    }
  }, []);

  return (
    <div className='flex h-screen'>
      <div className="flex-1 bg-linear-to-br to-slate-900 from-slate-700 relative overflow-hidden">
        <div className="absolute top-8 left-8 text-white font-bold text-xl">
          <img src={logo} alt="logo" className="w-12 h-12" />
        </div>

        <div className="flex flex-col space-y-12 h-full px-12 relative z-10 bg-[url('@/lib/assets/images/wave-haikei.svg')] bg-cover bg-center justify-center items-center">
          <div className="flex flex-col gap-4 text-white max-w-md">
            <h1 className="text-4xl font-bold">Acesse para</h1>
            <p className="text-lg text-slate-300">
              Transformar suas ideias em bios que se destacam. Em poucos cliques, gere descrições únicas,
              criativas e com a sua cara.
            </p>

            <ul className="mt-6 space-y-3 text-slate-200">
              <li className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">✨</span>
                <span>Gere bios personalizadas com IA</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">⚡</span>
                <span>Economize tempo e mantenha consistência</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">🌐</span>
                <span>Compartilhe sua bio com um link único</span>
              </li>
            </ul>
          </div>
          <div className="text-white max-w-md">
            <h1 className="text-4xl font-bold mb-3">Veja o que você pode criar</h1>
            <p className="text-slate-300 mb-6">
              Crie bios incríveis com poucos cliques. Aqui vai um exemplo:
            </p>

            <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700">
              <p className="text-slate-200 leading-relaxed">
                <strong>🚀 João Silva</strong><br />
                Criador de conteúdo e entusiasta de tecnologia. Acredito no poder das conexões digitais
                para transformar ideias em impacto real.
              </p>
            </div>
          </div>




          <BackgroundCards />
          <div className="absolute top-16 right-32">
            <div className="relative w-20 h-16 bg-linear-to-br from-purple-400 to-purple-500 rounded-2xl shadow-lg transform rotate-12">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-6 h-2 bg-white/20 rounded-full"></div>
            </div>
          </div>

          <div className="absolute bottom-32 right-16">
            <div className="relative w-16 h-20 bg-linear-to-br from-green-400 to-green-500 rounded-2xl shadow-lg transform -rotate-6">
              <div className="absolute top-3 right-3 w-3 h-3 bg-white/40 rounded-full"></div>
              <div className="absolute bottom-3 left-3 w-8 h-1 bg-white/25 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
            </div>
          </div>

          <div className="absolute top-1/3 right-8">
            <div className="relative w-14 h-14 bg-linear-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/35 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/25 rounded-full"></div>
            </div>
          </div>

          <div className="absolute bottom-16 right-40">
            <div className="relative w-18 h-12 bg-linear-to-br from-pink-400 to-pink-500 rounded-xl shadow-lg transform rotate-45">
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-4 h-1 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex-1 bg-linear-to-br from-gray-100 to-gray-300 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-slate-100">
            <CardHeader>
              <div className="items-start flex flex-col gap-3">
                <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                  <ArrowLeft className='w-5 h-5' />
                </Link>
                <div>
                  <p className="text-lg text-gray-600 mb-2">Bem-vindo ao <span className="font-semibold text-blue-600">Bio AI</span></p>
                  <h1 className="text-4xl font-bold text-gray-900">Entrar</h1>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showExpiredModal} onOpenChange={setShowExpiredModal}>
        <DialogContent className="sm:max-w-md border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden p-0 gap-0">
          <div className="relative h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
          
          <div className="p-6 flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500 mb-4">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md animate-pulse"></div>
              <LockKeyhole className="w-8 h-8 relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
            </div>

            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-slate-950 dark:text-slate-50">
                Sessão Expirada
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 text-base max-w-xs leading-relaxed">
                Por motivos de segurança, sua sessão foi encerrada. Por favor, conecte-se novamente para continuar.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full mt-6">
              <button
                onClick={() => setShowExpiredModal(false)}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-sm focus:outline-hidden cursor-pointer"
              >
                Fazer Login Agora
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
