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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(public)/_layout/planos")({
  component: PlanosComponent,
});

export const pricingData = {
  free: {
    name: "Free",
    monthlyPrice: "R$ 0",
    annualPrice: "R$ 0",
    description: "Perfeito para começar",
    features: [
      "Links ilimitados",
      "Geração de Bio com IA (limitado)",
      "Estatísticas básicas",
      "Suporte da comunidade",
    ],
    limitations: ["Marca Bio AI no rodapé", "Sem domínios próprios", "Sem temas premium"],
    buttonText: "Começar Grátis",
    buttonVariant: "outline" as const,
    popular: false,
    icon: <Sparkles className="h-6 w-6" />,
  },
  starter: {
    name: "Starter",
    monthlyPrice: "R$ 9,90",
    annualPrice: "R$ 99",
    description: "Para criadores em crescimento",
    features: [
      "Sem marca d'água",
      "Temas e layouts premium",
      "Geração de IA ilimitada",
      "Ferramentas de coleta de Leads",
      "Suporte por e-mail",
    ],
    limitations: ["Sem domínios próprios", "Sem Analytics Avançado"],
    buttonText: "Assinar Starter",
    buttonVariant: "outline" as const,
    popular: false,
    icon: <Zap className="h-6 w-6" />,
  },
  pro: {
    name: "Pro",
    monthlyPrice: "R$ 29,90",
    annualPrice: "R$ 299",
    description: "Para quem quer o máximo",
    features: [
      "Tudo do plano Starter",
      "Domínio Próprio (seu-nome.com.br)",
      "Analytics Avançado (Meta, Google)",
      "Agendamento de Links",
      "Suporte VIP prioritário",
    ],
    limitations: [],
    buttonText: "Assinar Pro",
    buttonVariant: "default" as const,
    popular: true,
    icon: <Crown className="h-6 w-6" />,
  },
};

function PlanosComponent() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [pricingData.free, pricingData.starter, pricingData.pro];

  const faqs = [
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.",
    },
    {
      question: "Como funciona o período gratuito?",
      answer: "O plano gratuito é permanente. Você tem links ilimitados e pode fazer upgrade quando quiser recursos avançados.",
    },
    {
      question: "Posso mudar de plano depois?",
      answer: "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento pelo painel.",
    },
    {
      question: "O domínio próprio está incluído?",
      answer: "Sim, no plano Pro você pode conectar o seu próprio domínio (ex: meubio.com) sem custos adicionais de hospedagem.",
    },
    {
      question: "Como funciona a IA para criar bios?",
      answer: "Nossa IA analisa seu perfil profissional e gera bios personalizadas instantaneamente. No plano Starter em diante é ilimitado.",
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

        <div className="flex items-center justify-center gap-4 mt-8">
          <Label htmlFor="billing-toggle" className={`text-sm ${!isAnnual ? "font-bold" : "text-muted-foreground"}`}>Mensal</Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="billing-toggle" className={`text-sm flex items-center gap-2 ${isAnnual ? "font-bold" : "text-muted-foreground"}`}>
            Anual
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none">2 meses grátis</Badge>
          </Label>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
          <Check className="h-4 w-4 text-green-500" />
          <span>Sem compromisso</span>
          <Check className="h-4 w-4 text-green-500" />
          <span>Cancele quando quiser</span>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
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
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-linear-to-r from-primary to-purple-600 text-white px-4 py-1 text-sm border-0">
                  <Star className="h-3 w-3 mr-1 inline-block" />
                  Mais Popular
                </Badge>
              </div>
            )}

            <Card
              className={`h-full flex flex-col ${plan.popular ? "ring-2 ring-primary shadow-lg scale-105 border-primary/50 relative z-0" : ""}`}
            >
              <CardHeader className="text-center space-y-4 pb-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {plan.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </div>
                <div className="space-y-1 pt-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.name === "Free" ? "/sempre" : isAnnual ? "/ano" : "/mês"}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 flex-1 flex flex-col">
                <Button
                  className={`w-full mt-2 ${plan.popular ? "bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" : ""}`}
                  variant={plan.buttonVariant}
                  size="lg"
                  asChild
                >
                  <Link to="/registro">{plan.buttonText}</Link>
                </Button>

                <div className="space-y-3 flex-1 pt-4">
                  <p className="font-semibold text-sm">Incluído:</p>
                  <ul className="space-y-3">
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
                    <div className="pt-4 mt-4 border-t">
                      <p className="font-semibold text-sm text-muted-foreground mb-3">
                        Não incluído:
                      </p>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li
                            key={limitIndex}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-red-400 font-bold mr-1">×</span>
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
        className="space-y-8 max-w-6xl mx-auto px-4"
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
                <th className="text-center p-4 font-semibold">Starter</th>
                <th className="text-center p-4 font-semibold">Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Geração por IA", free: "Limitada", starter: "Ilimitada", pro: "Ilimitada" },
                { feature: "Links personalizados", free: "Ilimitado", starter: "Ilimitado", pro: "Ilimitado" },
                { feature: "Temas disponíveis", free: "Básicos", starter: "Premium", pro: "Premium" },
                { feature: "Remoção de Logo", free: "×", starter: "✓", pro: "✓" },
                { feature: "Domínio próprio", free: "×", starter: "×", pro: "✓" },
                { feature: "Analytics Avançado", free: "×", starter: "×", pro: "✓" },
                { feature: "Suporte", free: "Comunidade", starter: "E-mail", pro: "Prioritário" },
              ].map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className="p-4 text-center">{row.free}</td>
                  <td className="p-4 text-center">{row.starter}</td>
                  <td className="p-4 text-center">{row.pro}</td>
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
        className="space-y-8 px-4"
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
              <Card className="h-full">
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
        className="text-center space-y-6 bg-linear-to-r from-primary/10 to-purple-600/10 rounded-2xl p-12 max-w-6xl mx-auto mb-12"
      >
        <h2 className="text-3xl font-bold">Ainda tem dúvidas?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comece gratuitamente e faça upgrade quando precisar de mais recursos
        </p>
        <Button size="lg" asChild className="mt-4">
          <Link to="/registro">Começar Gratuitamente</Link>
        </Button>
      </motion.section>
    </div>
  );
}
