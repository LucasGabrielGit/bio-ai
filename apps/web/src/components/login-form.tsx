import { useAuth } from "@/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      await login(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.";
      toast.error(errorMessage);
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium text-gray-700">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail"
            className={`h-12 bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500 ${errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="font-medium text-gray-700">
            Senha
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className={`h-12 bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500 pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""
                }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
          <div className="flex justify-end">
            <Link to="/recuperar-senha" className="text-base text-blue-600 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mt-6 w-full disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        <span className="text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <Link to="/registro" className="text-blue-600 font-medium hover:underline">
            Cadastre-se
          </Link>
        </span>
      </form>
    </div>
  )
}
