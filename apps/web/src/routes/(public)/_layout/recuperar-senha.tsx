import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Mail,
    ArrowLeft,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
    KeyRound,
    Send,
    Sparkles
} from 'lucide-react'
import { useState } from 'react'

const recoverySchema = z.object({
    email: z.string()
        .email('Email inválido')
        .min(1, 'Email é obrigatório'),
})

type RecoveryForm = z.infer<typeof recoverySchema>

export const Route = createFileRoute('/(public)/_layout/recuperar-senha')({
    component: RecuperarSenhaComponent,
})

function RecuperarSenhaComponent() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues
    } = useForm<RecoveryForm>({
        resolver: zodResolver(recoverySchema)
    })

    const onSubmit = async (data: RecoveryForm) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            setIsSubmitted(true)
        } catch (error) {
            console.error('Recovery error:', error)
        }
    }

    const steps = [
        {
            icon: <Mail className="h-5 w-5" />,
            title: "Digite seu email",
            description: "Informe o email da sua conta"
        },
        {
            icon: <Send className="h-5 w-5" />,
            title: "Receba o link",
            description: "Enviamos um link seguro por email"
        },
        {
            icon: <KeyRound className="h-5 w-5" />,
            title: "Crie nova senha",
            description: "Defina uma nova senha forte"
        }
    ]

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12">
                <div className="container mx-auto px-4 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-8 shadow-2xl text-center">
                            <CardContent className="space-y-6">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold">Email Enviado!</h1>
                                    <p className="text-muted-foreground">
                                        Enviamos um link de recuperação para
                                    </p>
                                    <p className="font-medium text-primary">
                                        {getValues('email')}
                                    </p>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-blue-800 dark:text-blue-200">
                                                Verifique sua caixa de entrada
                                            </p>
                                            <p className="text-blue-700 dark:text-blue-300 mt-1">
                                                O link expira em 15 minutos. Não esqueça de verificar a pasta de spam.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Enviar novamente
                                    </Button>

                                    <Button asChild className="w-full">
                                        <Link to="/login">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Voltar ao Login
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <Badge variant="secondary" className="text-sm px-4 py-2">
                                <Shield className="h-4 w-4 mr-2" />
                                Recuperação Segura
                            </Badge>
                            <h1 className="text-4xl lg:text-5xl font-bold">
                                Esqueceu sua
                                <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent"> senha?</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Não se preocupe! Vamos ajudá-lo a recuperar o acesso à sua conta de forma rápida e segura.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg">Como funciona:</h3>
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{step.title}</h4>
                                        <p className="text-muted-foreground text-sm">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-linear-to-r from-primary/5 to-purple-600/5 rounded-2xl p-6">
                            <div className="flex items-start space-x-3">
                                <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-2">Segurança Garantida</h3>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>• Link único e temporário (15 minutos)</li>
                                        <li>• Criptografia de ponta a ponta</li>
                                        <li>• Verificação de identidade</li>
                                        <li>• Histórico de tentativas monitorado</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="p-8 shadow-2xl">
                            <CardHeader className="text-center space-y-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <KeyRound className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">Recuperar Senha</CardTitle>
                                <CardDescription>
                                    Digite seu email para receber o link de recuperação
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-5.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                {...register('email')}
                                                type="email"
                                                placeholder="seu@email.com"
                                                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="flex items-center space-x-1 text-red-500 text-xs">
                                                <AlertCircle className="h-3 w-3" />
                                                <span>{errors.email.message}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Enviar Link de Recuperação
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <Separator className="w-full" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Ou
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link to="/login">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Voltar ao Login
                                        </Link>
                                    </Button>

                                    <Button variant="ghost" className="w-full" asChild>
                                        <Link to="/registro">
                                            Não tem conta? Criar uma agora
                                        </Link>
                                    </Button>
                                </div>

                                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-amber-800 dark:text-amber-200">
                                                Precisa de ajuda?
                                            </p>
                                            <p className="text-amber-700 dark:text-amber-300 mt-1">
                                                Entre em contato conosco através do{' '}
                                                <Link to="/contato" className="underline hover:no-underline">
                                                    formulário de contato
                                                </Link>
                                                {' '}ou pelo email suporte@autobio.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
