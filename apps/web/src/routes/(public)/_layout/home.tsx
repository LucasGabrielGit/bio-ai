import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Sparkles, Users, Zap, Globe, Star, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/(public)/_layout/home')({
  component: HomeComponent,
})

function HomeComponent() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "IA Avançada",
      description: "Gere bios personalizadas com inteligência artificial de última geração"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Para Todos os Perfis",
      description: "Criadores, freelancers, artistas, profissionais e muito mais"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Rápido e Fácil",
      description: "Crie sua bio profissional em menos de 2 minutos"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Página Pública",
      description: "Tenha sua própria landing page personalizada"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Designer Freelancer",
      content: "O AutoBio transformou completamente minha presença online. Agora tenho uma bio profissional que realmente me representa!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Criador de Conteúdo",
      content: "Incrível como a IA consegue capturar minha personalidade. Meus seguidores adoraram minha nova bio!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Artista Digital",
      content: "A página personalizada é perfeita para mostrar meu portfólio. Recomendo para todos os criativos!",
      rating: 5
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
          <h1 className="text-6xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AutoBio
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Criador automático de bio e portfólio pessoal
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforme sua presença online com bios personalizadas geradas por IA e páginas profissionais que impressionam
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/registro">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/planos">
              Ver Planos
            </Link>
          </Button>
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
          <h2 className="text-4xl font-bold">Por que escolher o AutoBio?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para criar uma presença online profissional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
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
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
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
          <h2 className="text-4xl font-bold">Como funciona</h2>
          <p className="text-xl text-muted-foreground">
            Simples, rápido e eficiente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Escolha seu perfil",
              description: "Selecione o tipo de profissional que você é: criador, freelancer, artista, etc."
            },
            {
              step: "2",
              title: "IA gera sua bio",
              description: "Nossa inteligência artificial cria uma bio personalizada baseada no seu perfil"
            },
            {
              step: "3",
              title: "Personalize e publique",
              description: "Edite, escolha o estilo e publique sua página profissional"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground text-lg">{item.description}</p>
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
          <h2 className="text-4xl font-bold">O que nossos usuários dizem</h2>
          <p className="text-xl text-muted-foreground">
            Milhares de profissionais já transformaram sua presença online
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
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
        className="text-center space-y-8 bg-linear-to-r from-primary/10 to-purple-600/10 rounded-2xl p-12"
      >
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Pronto para transformar sua presença online?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já descobriram o poder do AutoBio
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/registro">
              Criar Minha Bio Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Comece gratuitamente • Sem cartão de crédito • Cancele quando quiser
        </p>
      </motion.section>
    </div>
  )
}