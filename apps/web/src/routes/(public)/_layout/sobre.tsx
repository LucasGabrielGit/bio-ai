import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Heart, Zap, Globe, Award, Rocket } from 'lucide-react'

export const Route = createFileRoute('/(public)/_layout/sobre')({
    component: SobreComponent,
})

function SobreComponent() {
    const values = [
        {
            icon: <Lightbulb className="h-6 w-6" />,
            title: "Inovação",
            description: "Utilizamos as mais avançadas tecnologias de IA para criar soluções únicas"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Comunidade",
            description: "Construímos uma plataforma que conecta e empodera profissionais"
        },
        {
            icon: <Heart className="h-6 w-6" />,
            title: "Simplicidade",
            description: "Tornamos complexo simples, permitindo que você foque no que importa"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Velocidade",
            description: "Resultados profissionais em minutos, não em horas ou dias"
        }
    ]

    const team = [
        {
            name: "Ana Silva",
            role: "CEO & Fundadora",
            description: "Ex-Google, especialista em IA e produtos digitais",
            image: "👩‍💼"
        },
        {
            name: "Carlos Santos",
            role: "CTO",
            description: "Engenheiro de software com 10+ anos em startups",
            image: "👨‍💻"
        },
        {
            name: "Maria Costa",
            role: "Head of Design",
            description: "Designer UX/UI premiada, ex-Spotify",
            image: "👩‍🎨"
        },
        {
            name: "João Oliveira",
            role: "Head of AI",
            description: "PhD em Machine Learning, pesquisador em NLP",
            image: "👨‍🔬"
        }
    ]

    const stats = [
        { number: "50K+", label: "Usuários ativos" },
        { number: "200K+", label: "Bios criadas" },
        { number: "99.9%", label: "Uptime" },
        { number: "4.9/5", label: "Avaliação média" }
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
                        <Rocket className="h-4 w-4 mr-2" />
                        Nossa História
                    </Badge>
                    <h1 className="text-5xl font-bold">Sobre o AutoBio</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Nascemos da necessidade de democratizar a criação de presenças digitais profissionais.
                        Nossa missão é empoderar cada pessoa a contar sua história de forma única e impactante.
                    </p>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12"
            >
                <Card className="p-8">
                    <CardHeader className="text-center">
                        <Target className="h-12 w-12 mx-auto text-primary mb-4" />
                        <CardTitle className="text-2xl">Nossa Missão</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base text-center">
                            Democratizar a criação de presenças digitais profissionais, permitindo que qualquer pessoa,
                            independente de suas habilidades técnicas, possa ter uma bio e página pessoal de qualidade profissional.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="p-8">
                    <CardHeader className="text-center">
                        <Globe className="h-12 w-12 mx-auto text-primary mb-4" />
                        <CardTitle className="text-2xl">Nossa Visão</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base text-center">
                            Ser a plataforma líder mundial para criação de identidades digitais,
                            conectando milhões de profissionais e criadores através de suas histórias únicas.
                        </CardDescription>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold">Nossos Valores</h2>
                    <p className="text-xl text-muted-foreground">
                        Os princípios que guiam cada decisão que tomamos
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full text-center hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        {value.icon}
                                    </div>
                                    <CardTitle className="text-xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {value.description}
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
                className="bg-linear-to-r from-primary/10 to-purple-600/10 rounded-2xl p-12"
            >
                <div className="text-center space-y-8">
                    <h2 className="text-3xl font-bold">AutoBio em Números</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
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
                    <h2 className="text-4xl font-bold">Nossa Equipe</h2>
                    <p className="text-xl text-muted-foreground">
                        Conheça as pessoas por trás do AutoBio
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="text-center hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="text-6xl mb-4">{member.image}</div>
                                    <CardTitle className="text-lg">{member.name}</CardTitle>
                                    <CardDescription className="text-primary font-medium">
                                        {member.role}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {member.description}
                                    </p>
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
                className="space-y-8"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold">Nossa Jornada</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Tudo começou quando percebemos que criar uma presença digital profissional
                        não deveria ser privilégio de poucos. Em 2023, decidimos mudar isso.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            year: "2023",
                            title: "O Início",
                            description: "Identificamos o problema: criar bios profissionais era complexo e caro"
                        },
                        {
                            year: "2024",
                            title: "Primeiro MVP",
                            description: "Lançamos a primeira versão com IA básica para 100 usuários beta"
                        },
                        {
                            year: "2024",
                            title: "Crescimento",
                            description: "Alcançamos 50K usuários e lançamos recursos avançados de personalização"
                        }
                    ].map((milestone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full">
                                <CardHeader>
                                    <Badge className="w-fit mb-2">{milestone.year}</Badge>
                                    <CardTitle className="text-xl">{milestone.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {milestone.description}
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
                className="text-center space-y-8"
            >
                <div className="space-y-4">
                    <Award className="h-12 w-12 mx-auto text-primary" />
                    <h2 className="text-3xl font-bold">Reconhecimentos</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Nosso trabalho tem sido reconhecido pela comunidade tech e pelos nossos usuários
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        "🏆 Startup do Ano 2024",
                        "🌟 Melhor Produto de IA",
                        "👥 Escolha dos Usuários",
                        "🚀 Inovação em UX"
                    ].map((award, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                            {award}
                        </Badge>
                    ))}
                </div>
            </motion.section>
        </div>
    )
}
