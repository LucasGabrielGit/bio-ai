import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../lib/prisma/client/db";
import { stripeClient } from "../../utils/stripe";
import {
  createPaymentIntentSchema,
  type CreatePaymentIntentType,
} from "../../shcemas/payment-schema";
import { env } from "../../lib/env";

const PLAN_PRICE_MAP: Record<string, { priceId: string; name: string }> = {
  "bio-ai": {
    priceId: "price_1TQBxePgXV6U3mPUy5g2z5fi",
    name: "bio-ai",
  },
  "bio-ai-anual": {
    priceId: "price_1TQBz1PgXV6U3mPUkmANWKXG",
    name: "bio-ai-anual",
  },
};

export class PaymentController {
  async createCheckout(
    req: FastifyRequest<{ Body: CreatePaymentIntentType }>,
    res: FastifyReply,
  ) {
    try {
      if (!stripeClient) {
        return res.status(503).send({
          message:
            "Serviço de pagamento indisponível. STRIPE_SECRET_KEY não configurada.",
        });
      }

      const data = createPaymentIntentSchema.parse(req.body);
      const plan = PLAN_PRICE_MAP[data.planId];

      if (!plan) {
        return res.status(400).send({
          message: `Plano "${data.planId}" não encontrado. Planos disponíveis: ${Object.keys(PLAN_PRICE_MAP).join(", ")}`,
        });
      }

      const user = await db.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      let customerId = user.stripeCustomerId;

      if (!customerId) {
        const customer = await stripeClient.customers.create({
          email: user.email,
          name: `${user.name} ${user.surname}`.trim(),
          metadata: { userId: user.id },
        });

        customerId = customer.id;

        await db.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customerId },
        });
      }

      const session = await stripeClient.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [
          {
            price: plan.priceId,
            quantity: 1,
          },
        ],
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        metadata: {
          userId: user.id,
          planId: data.planId,
        },
      });

      await db.subscription.create({
        data: {
          userId: user.id,
          stripeSessionId: session.id,
          planId: data.planId,
          status: "pending",
        },
      });

      return res.status(200).send({
        message: "Sessão de checkout criada com sucesso",
        url: session.url,
        sessionId: session.id,
      });
    } catch (error: any) {
      if (error instanceof Error && "issues" in error) {
        return res.status(400).send({
          message: "Erro na validação dos dados",
          errors: error.issues,
        });
      }

      console.error("Erro ao criar checkout:", error);
      return res.status(500).send({
        message: "Erro ao criar sessão de checkout",
        error: error?.message,
      });
    }
  }

  async handleWebhook(req: FastifyRequest, res: FastifyReply) {
    try {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

      if (!sig || !webhookSecret) {
        return res.status(400).send("Webhook Secret ou Signature faltando");
      }

      let event;

      try {
        event = stripeClient.webhooks.constructEvent(
          req.rawBody as string | Buffer,
          sig,
          webhookSecret,
        );
      } catch (error: any) {
        console.error("Erro ao construir webhook:", error);
        return res.status(400).send("Webhook inválido");
      }

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const userId = session.metadata?.userId;
          const planId = session.metadata?.planId;

          if (userId && planId) {
            await db.subscription.updateMany({
              where: { stripeSessionId: session.id },
              data: {
                stripeSubscriptionId: session.subscription?.toString(),
                status: "active",
                currentPeriodStart: new Date(),
              },
            });

            const newPlan =
              planId === "bio-ai-anual"
                ? "anual"
                : planId === "bio-ai"
                  ? "pro"
                  : planId;

            await db.user.update({
              where: { id: userId },
              data: { plan: newPlan },
            });
          }
          break;
        }

        case "customer.subscription.updated": {
          const subscription = event.data.object;

          await db.subscription.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: {
              status: subscription.status === "active" ? "active" : "cancelled",
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              currentPeriodStart: new Date(subscription.start_date * 1000),
              currentPeriodEnd: new Date((subscription.ended_at || 0) * 1000),
            },
          });
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object;

          const localSub = await db.subscription.findFirst({
            where: { stripeSubscriptionId: subscription.id },
          });

          if (localSub) {
            await db.subscription.update({
              where: { id: localSub.id },
              data: { status: "cancelled" },
            });

            await db.user.update({
              where: { id: localSub.userId },
              data: { plan: "free" },
            });
          }
          break;
        }

        case "invoice.payment_failed": {
          const invoice = event.data.object;
          const subId = invoice?.metadata?.subscriptionId;

          if (subId) {
            await db.subscription.updateMany({
              where: { stripeSubscriptionId: subId as string },
              data: { status: "expired" },
            });
          }
          break;
        }

        default:
          console.log(`Evento Stripe não tratado: ${event.type}`);
      }

      return res.status(200).send({ received: true });
    } catch (error: any) {
      console.error("Erro no webhook do Stripe:", error);
      return res.status(500).send({
        message: "Erro ao processar webhook",
        error: error?.message,
      });
    }
  }

  async listPlans(_req: FastifyRequest, res: FastifyReply) {
    const plans = Object.entries(PLAN_PRICE_MAP).map(([id, plan]) => ({
      id,
      name: plan.name,
    }));

    return res.send({ plans });
  }

  async getSubscription(req: FastifyRequest, res: FastifyReply) {
    try {
      const user = await db.user.findUnique({
        where: { id: req.user.id },
        select: {
          plan: true,
          subscriptions: {
            where: { status: "active" },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      const activeSubscription = user.subscriptions[0] || null;

      return res.send({
        plan: user.plan,
        subscription: activeSubscription,
      });
    } catch (error: any) {
      console.error("Erro ao buscar subscription:", error);
      return res.status(500).send({
        message: "Erro ao buscar informações de pagamento",
      });
    }
  }

  async cancelSubscription(req: FastifyRequest, res: FastifyReply) {
    try {
      if (!stripeClient) {
        return res.status(503).send({ message: "Stripe não configurado" });
      }

      const subscription = await db.subscription.findFirst({
        where: {
          userId: req.user.id,
          status: "active",
        },
        orderBy: { createdAt: "desc" },
      });

      if (!subscription || !subscription.stripeSubscriptionId) {
        return res.status(404).send({
          message: "Nenhuma assinatura ativa encontrada",
        });
      }

      await stripeClient.subscriptions.update(
        subscription.stripeSubscriptionId,
        { cancel_at_period_end: true },
      );

      await db.subscription.update({
        where: { id: subscription.id },
        data: { cancelAtPeriodEnd: true },
      });

      return res.send({
        message:
          "Assinatura será cancelada ao final do período de faturamento atual",
      });
    } catch (error: any) {
      console.error("Erro ao cancelar subscription:", error);
      return res.status(500).send({
        message: "Erro ao cancelar assinatura",
        error: error?.message,
      });
    }
  }

  async createPortalSession(req: FastifyRequest, res: FastifyReply) {
    try {
      if (!stripeClient) {
        return res.status(503).send({ message: "Stripe não configurado" });
      }

      const user = await db.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user?.stripeCustomerId) {
        return res.status(400).send({
          message: "Nenhuma conta de pagamento vinculada",
        });
      }

      const portalSession = await stripeClient.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url:
          (req.query as any)?.returnUrl ||
          "http://localhost:5173/admin/configuracoes",
      });

      return res.send({ url: portalSession.url });
    } catch (error: any) {
      console.error("Erro ao criar portal session:", error);
      return res.status(500).send({
        message: "Erro ao abrir portal de gerenciamento",
        error: error?.message,
      });
    }
  }

  // Verificar checkout via polling / redirect manual (fallback quando webhook não for usado localmente)
  async verifyCheckout(
    req: FastifyRequest<{ Body: { sessionId: string } }>,
    res: FastifyReply,
  ) {
    try {
      if (!stripeClient) {
        return res.status(503).send({ message: "Stripe não configurado" });
      }

      const { sessionId } = req.body;
      if (!sessionId) {
        return res.status(400).send({ message: "Session ID é obrigatório" });
      }

      const existingSub = await db.subscription.findFirst({
        where: { stripeSessionId: sessionId, status: "active" },
      });

      if (existingSub) {
        return res.send({
          success: true,
          message: "Já atualizado via Webhook",
        });
      }

      // Buscar a sessão no Stripe
      const session = await stripeClient.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid" || session.status === "complete") {
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;

        if (userId && planId) {
          const newPlan =
            planId === "bio-ai-anual"
              ? "anual"
              : planId === "bio-ai"
                ? "pro"
                : planId;

          // Atualizar o plano do usuário
          await db.user.update({
            where: { id: userId },
            data: { plan: newPlan },
          });

          // Opcional: Atualizar subscription se necessário
          if (session.subscription) {
            await db.subscription.updateMany({
              where: { stripeSessionId: session.id },
              data: {
                stripeSubscriptionId: session.subscription as string,
                status: "active",
                currentPeriodStart: new Date(),
              },
            });
          }

          return res.send({
            success: true,
            message: "Pagamento verificado e plano atualizado",
            plan: newPlan,
          });
        }
      }

      return res
        .status(400)
        .send({ success: false, message: "Pagamento pendente ou inválido" });
    } catch (error: any) {
      console.error("Erro ao verificar checkout:", error);
      return res.status(500).send({
        message: "Erro ao verificar pagamento",
        error: error?.message,
      });
    }
  }
}
