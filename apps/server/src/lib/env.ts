import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL deve ser uma URL válida"),

  PORT: z.string().regex(/^\d+$/, "PORT deve ser um número").default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET deve ter pelo menos 32 caracteres"),
  JWT_EXPIRES_IN: z.string().default("7d"),

  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY é obrigatória").optional(),

  CORS_ORIGIN: z.string().default("*"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY é obrigatória").optional(),

  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY é obrigatória"),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .min(1, "STRIPE_WEBHOOK_SECRET é obrigatória"),

  RATE_LIMIT_MAX: z.string().regex(/^\d+$/).default("100"),
  RATE_LIMIT_WINDOW: z.string().default("15m"),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.error("❌ Erro na validação das variáveis de ambiente:");
  if (error instanceof z.ZodError) {
    error.issues.forEach((err) => {
      console.error(`  - ${err.path.join(".")}: ${err.message}`);
    });
  }
  process.exit(1);
}

export { env };
