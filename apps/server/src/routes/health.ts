import type { FastifyInstance } from "fastify";
import { db } from "../lib/prisma/client/db";

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/health", async (_request, reply) => {
    return reply.status(200).send({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  fastify.get("/health/detailed", async (request, reply) => {
    const startTime = Date.now();

    try {
      await db.$queryRaw`SELECT 1`;
      const dbLatency = Date.now() - startTime;

      const memoryUsage = process.memoryUsage();

      return reply.status(200).send({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
        version: process.env.npm_package_version || "1.0.0",
        services: {
          database: {
            status: "connected",
            latency: `${dbLatency}ms`,
          },
        },
        system: {
          memory: {
            used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
            total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
          },
          cpu: {
            usage: process.cpuUsage(),
          },
        },
      });
    } catch (error) {
      request.log.error(error, "Health check failed");

      return reply.status(503).send({
        status: "error",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
        services: {
          database: {
            status: "disconnected",
            error: "Database connection failed",
          },
        },
      });
    }
  });

  fastify.get("/metrics", async (_request, reply) => {
    const memoryUsage = process.memoryUsage();

    return reply.status(200).send({
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
      },
      cpu: process.cpuUsage(),
      version: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
      },
    });
  });
}