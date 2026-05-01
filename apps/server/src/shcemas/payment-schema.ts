import { z } from "zod";

export const createPaymentIntentSchema = z.object({
  planId: z.string().min(1, "Plano inválido"),
  successUrl: z.string().min(1, "URL de sucesso inválida"),
  cancelUrl: z.string().min(1, "URL de cancelamento inválida"),
});

export type CreatePaymentIntentType = z.infer<typeof createPaymentIntentSchema>;
