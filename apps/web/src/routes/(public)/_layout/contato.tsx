import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from 'lucide-react'

export const Route = createFileRoute('/(public)/_layout/contato')({
    component: ContatoComponent,
})

function ContatoComponent() {
    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email",
            description: "contato@autobio.app",
            action: "Enviar email"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Telefone",
            description: "+55 (11) 99999-9999",
            action: "Ligar agora"
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Endereço",
            description: "São Paulo, SP - Brasil",
            action: "Ver no mapa"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Horário",
            description: "Seg-Sex: 9h às 18h",
            action: "Horário comercial"
        }
    ]

    const supportOptions = [
        {
            icon: <MessageCircle className="h-6 w-6" />,
            title: "Chat ao Vivo",
            description: "Resposta imediata durante horário comercial",
            badge: "Mais rápido",
            color: "bg-green-500"
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email Suporte",
            description: "Resposta em até 24 horas",
            badge: "Detalhado",
            color: "bg-blue-500"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Comunidade",
            description: "Fórum com outros usuários",
            badge: "Colaborativo",
            color: "bg-purple-500"
        },
        {
            icon: <Headphones className="h-6 w-6" />,
            title: "Suporte Premium",
            description: "Atendimento prioritário para assinantes",
            badge: "VIP",
            color: "bg-orange-500"
        }
    ]

    const faqs = [
        {
            question: "Como posso cancelar minha assinatura?",
            answer: "Você pode cancelar sua assinatura a qualquer momento através do seu painel de usuário ou entrando em contato conosco."
        },
        {
            question: "Vocês oferecem reembolso?",
            answer: "Sim, oferecemos reembolso total em até 30 dias após a compra, sem perguntas."
        },
        {
            question: "Como funciona a IA para criar bios?",
            answer: "Nossa IA analisa suas informações profissionais e cria bios personalizadas baseadas em milhares de exemplos de sucesso."
        },
        {
            question: "Posso usar minha própria URL personalizada?",
            answer: "Sim, usuários Pro e Premium podem usar URLs personalizadas como autobio.app/seunome."
        }
    ]

    return (
        <div className="space-y-20 py-12">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-8"
            >
                <div className="space-y-4">
                    <Badge variant="secondary" className="text-sm px-4 py-2">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Fale Conosco
                    </Badge>
                    <h1 className="text-5xl font-bold">Entre em Contato</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Estamos aqui para ajudar! Entre em contato conosco através de qualquer um dos canais abaixo.
                        Nossa equipe está sempre pronta para responder suas dúvidas e sugestões.
                    </p>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12"
            >
                <Card className="p-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                        <CardDescription>
                            Preencha o formulário abaixo e entraremos em contato em breve
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Nome</label>
                                <Input placeholder="Seu nome completo" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input type="email" placeholder="seu@email.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Assunto</label>
                            <Input placeholder="Como podemos ajudar?" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Mensagem</label>
                            <Textarea
                                placeholder="Descreva sua dúvida ou sugestão em detalhes..."
                                className="min-h-[120px]"
                            />
                        </div>

                        <Button className="w-full" size="lg">
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Mensagem
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Informações de Contato</h3>
                        <p className="text-muted-foreground">
                            Escolha a forma mais conveniente para entrar em contato conosco
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                            {info.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{info.title}</h4>
                                            <p className="text-muted-foreground">{info.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold">Opções de Suporte</h2>
                    <p className="text-xl text-muted-foreground">
                        Escolha o canal de suporte que melhor atende suas necessidades
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {supportOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="relative">
                                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                                            {option.icon}
                                        </div>
                                        <Badge className={`absolute -top-2 -right-2 text-xs ${option.color} text-white`}>
                                            {option.badge}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg">{option.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {option.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold">Perguntas Frequentes</h2>
                    <p className="text-xl text-muted-foreground">
                        Encontre respostas rápidas para as dúvidas mais comuns
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {faq.answer}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-linear-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-12 text-center"
            >
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Suporte de Emergência</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Para problemas críticos que afetam seu negócio, oferecemos suporte de emergência 24/7
                            para usuários Premium
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Ligar Emergência
                        </Button>
                        <Button size="lg">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat Prioritário
                        </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Disponível apenas para assinantes Premium • Resposta em até 1 hora
                    </p>
                </div>
            </motion.section>
        </div>
    )
}
