import type { FastifyInstance } from "fastify";
import { PaymentController } from "../controllers/payment";
import { authMiddleware } from "../middlewares/auth";

export async function paymentRoutes(fastify: FastifyInstance) {
  const paymentController = new PaymentController();

  // Planos disponíveis (público)
  fastify.get("/plans", {
    handler: paymentController.listPlans,
  });

  // Criar sessão de checkout (autenticado)
  fastify.post("/create-checkout", {
    preHandler: authMiddleware,
    handler: paymentController.createCheckout,
  });

  // Status da subscription do usuário (autenticado)
  fastify.get("/subscription", {
    preHandler: authMiddleware,
    handler: paymentController.getSubscription,
  });

  // Cancelar subscription (autenticado)
  fastify.post("/cancel", {
    preHandler: authMiddleware,
    handler: paymentController.cancelSubscription,
  });

  // Portal de gerenciamento Stripe (autenticado)
  fastify.post("/portal", {
    preHandler: authMiddleware,
    handler: paymentController.createPortalSession,
  });

  // Verificar checkout manualmente (autenticado)
  fastify.post("/verify-checkout", {
    preHandler: authMiddleware,
    handler: paymentController.verifyCheckout.bind(paymentController),
  });

  // Webhook do Stripe (sem autenticação - chamado pelo Stripe)
  fastify.post(
    "/webhook",
    {
      config: {
        rawBody: true,
      },
    },
    async (request, reply) => {
      const signatureHeader = request.headers["stripe-signature"];
      if (!signatureHeader) {
        return reply.status(400).send("Missing stripe-signature header");
      }

      try {
        await paymentController.handleWebhook(request, reply);
        reply.status(200).send("Webhook received successfully");
      } catch (error) {
        console.error("[WEBHOOK ERROR]", error);
        reply.status(500).send("Webhook processing failed");
      }
    },
  );
}
