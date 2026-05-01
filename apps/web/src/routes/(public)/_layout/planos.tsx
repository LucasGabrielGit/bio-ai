import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react";

export const Route = createFileRoute("/(public)/_layout/planos")({
  component: PlanosComponent,
});

export const plans = [
  {
    name: "Free",
    price: "R$0",
    period: "para sempre",
    description: "Perfeito para começar",
    features: [
      "1 bio personalizada",
      "3 links personalizados",
      "Layout básico",
      "Página pública autobio.app/seu-nome",
      "Suporte por email",
    ],
    limitations: ["Sem IA avançada", "Sem domínio próprio", "Sem relatórios"],
    buttonText: "Começar Grátis",
    buttonVariant: "outline" as const,
    popular: false,
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    name: "Pro",
    price: "R$14,90",
    period: "/mês",
    description: "Para profissionais sérios",
    features: [
      "IA ilimitada para bios",
      "Layouts extras e exclusivos",
      "Links ilimitados",
      "Personalização avançada de cores",
      "Análise de performance da bio",
      "Suporte prioritário",
      "Exportar bio em PDF",
    ],
    limitations: ["Sem domínio próprio", "Sem IA de tradução"],
    buttonText: "Escolher Pro",
    buttonVariant: "default" as const,
    popular: true,
    icon: <Zap className="h-6 w-6" />,
  },
  {
    name: "Anual",
    price: "R$149,00",
    period: "/ano",
    description: "Para quem quer o máximo",
    features: [
      "Tudo do plano Pro",
      "Domínio próprio (meubio.com)",
      "IA avançada com reescrita",
      "Tradução automática da bio",
      "Relatórios detalhados de visitantes",
      "Templates exclusivos premium",
      "Integração com Google Analytics",
      "Suporte VIP 24/7",
      "Backup automático",
    ],
    buttonText: "Escolher Anual",
    buttonVariant: "default" as const,
    popular: false,
    icon: <Crown className="h-6 w-6" />,
  },
];
function PlanosComponent() {
  const faqs = [
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.",
    },
    {
      question: "Como funciona o período gratuito?",
      answer:
        "O plano gratuito é permanente e inclui 1 bio e 3 links. Você pode fazer upgrade quando quiser.",
    },
    {
      question: "Posso mudar de plano depois?",
      answer:
        "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.",
    },
    {
      question: "O domínio próprio está incluído?",
      answer:
        "Sim, no plano Premium você pode usar seu próprio domínio (ex: meubio.com) sem custos extras.",
    },
    {
      question: "Como funciona a IA para criar bios?",
      answer:
        "Nossa IA analisa seu perfil profissional e gera bios personalizadas. Você pode editar e regenerar quantas vezes quiser.",
    },
  ];

  return (
    <div className="space-y-20 py-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">Escolha seu plano</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme sua presença online com o plano ideal para você
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>Sem compromisso</span>
          <Check className="h-4 w-4 text-green-500" />
          <span>Cancele quando quiser</span>
          <Check className="h-4 w-4 text-green-500" />
          <span>Suporte em português</span>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative hover:scale-105 transition-transform duration-300"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-linear-to-r from-primary to-purple-600 text-white px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}

            <Card
              className={`h-full ${plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""}`}
            >
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {plan.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  className="w-full"
                  variant={plan.buttonVariant}
                  size="lg"
                  asChild
                >
                  <Link to="/registro">{plan.buttonText}</Link>
                </Button>

                <div className="space-y-3">
                  <p className="font-semibold text-sm">Incluído:</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && plan.limitations.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="font-semibold text-sm text-muted-foreground mb-2">
                        Não incluído:
                      </p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li
                            key={limitIndex}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-red-400">×</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Compare todos os recursos</h2>
          <p className="text-muted-foreground">
            Veja em detalhes o que cada plano oferece
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">Recursos</th>
                <th className="text-center p-4 font-semibold">Free</th>
                <th className="text-center p-4 font-semibold">Pro</th>
                <th className="text-center p-4 font-semibold">Anual</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Bios com IA",
                  free: "1",
                  pro: "Ilimitado",
                  anual: "Ilimitado",
                },
                {
                  feature: "Links personalizados",
                  free: "3",
                  pro: "Ilimitado",
                  anual: "Ilimitado",
                },
                {
                  feature: "Layouts disponíveis",
                  free: "1 básico",
                  pro: "5 extras",
                  anual: "10+ exclusivos",
                },
                { feature: "Domínio próprio", free: "×", pro: "×", anual: "✓" },
                {
                  feature: "Relatórios",
                  free: "×",
                  pro: "Básicos",
                  anual: "Avançados",
                },
                { feature: "IA de tradução", free: "×", pro: "×", anual: "✓" },
                {
                  feature: "Suporte",
                  free: "Email",
                  pro: "Prioritário",
                  anual: "VIP 24/7",
                },
              ].map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className="p-4 text-center">{row.free}</td>
                  <td className="p-4 text-center">{row.pro}</td>
                  <td className="p-4 text-center">{row.anual}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <h2 className="text-3xl font-bold">Perguntas frequentes</h2>
          <p className="text-muted-foreground">
            Tire suas dúvidas sobre nossos planos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
        className="text-center space-y-6 bg-linear-to-r from-primary/10 to-purple-600/10 rounded-2xl p-12"
      >
        <h2 className="text-3xl font-bold">Ainda tem dúvidas?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comece gratuitamente e faça upgrade quando precisar de mais recursos
        </p>
        <Button size="lg" asChild>
          <Link to="/registro">Começar Gratuitamente</Link>
        </Button>
      </motion.section>
    </div>
  );
}
