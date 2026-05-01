import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySensible from "@fastify/sensible";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";

import { env } from "./lib/env";
import { userRoutes } from "./routes/auth";
import { healthRoutes } from "./routes/health";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";
import { sanitizationMiddleware } from "./middlewares/validation";
import { bioRoutes } from "./routes/bios";
import { paymentRoutes } from "./routes/payments";
import fastifyRawBody from "fastify-raw-body";

const app = fastify({
  logger: {
    level: env.LOG_LEVEL,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

async function bootstrap() {
  try {
    app.register(fastifyRawBody, {
      encoding: "utf8",
      field: "rawBody",
      global: false,
      runFirst: true,
      routes: ["/payments/webhook"],
      jsonContentTypes: ["application/json"],
    });
    await app.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    });

    await app.register(fastifyCors, {
      origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN.split(","),
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    });

    await app.register(fastifyRateLimit, {
      max: parseInt(env.RATE_LIMIT_MAX),
      timeWindow: env.RATE_LIMIT_WINDOW,
      errorResponseBuilder: (_request, context) => {
        return {
          error: "Rate Limit Exceeded",
          message: `Muitas requisições. Tente novamente em ${Math.round(context.ttl / 1000)} segundos.`,
          statusCode: 429,
        };
      },
    });

    await app.register(fastifySensible);

    // Plugin para upload de arquivos
    await app.register(fastifyMultipart, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    });

    // Plugin para servir arquivos estáticos
    await app.register(fastifyStatic, {
      root: path.join(__dirname, "..", "public"),
      prefix: "/public/",
    });

    await app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
      sign: {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    });

    app.addHook("preHandler", sanitizationMiddleware);

    await app.register(healthRoutes);
    await app.register(userRoutes, { prefix: "/auth" });
    await app.register(bioRoutes, { prefix: "/bios" });
    await app.register(paymentRoutes, { prefix: "/payments" });

    app.setNotFoundHandler(notFoundHandler);
    app.setErrorHandler(errorHandler);

    const port = parseInt(env.PORT);
    await app.listen({ port, host: "0.0.0.0" });

    app.log.info(`🚀 Servidor rodando na porta ${port}`);
    app.log.info(
      `📊 Health check disponível em http://localhost:${port}/health`,
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  app.log.info("Recebido SIGINT, encerrando servidor...");
  await app.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  app.log.info("Recebido SIGTERM, encerrando servidor...");
  await app.close();
  process.exit(0);
});

bootstrap();
