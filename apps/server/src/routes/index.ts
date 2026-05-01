import type { FastifyInstance } from "fastify";
import { userRoutes } from "./auth";
import { bioRoutes } from "./bios";


export async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(userRoutes, { prefix: "/auth" });
    fastify.register(bioRoutes, { prefix: "/bio" });
}