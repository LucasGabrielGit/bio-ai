import type { FastifyInstance } from "fastify";
import { BioController } from "../controllers/bio";
import { domainController } from "../controllers/domain";
import { authMiddleware } from "../middlewares/auth";

export async function bioRoutes(fastify: FastifyInstance) {
    const bioController = new BioController();

    fastify.get("/public/:slug", {
        handler: bioController.get,
    })

    fastify.get("/click/:bioId/:linkId", {
        handler: bioController.trackClick,
    })

    // Rota para analytics de uma bio específica
    fastify.get("/analytics/:slug", {
        preHandler: authMiddleware,
        handler: bioController.getAnalytics,
    })

    // Rota para analytics global (todas as bios do usuário)
    fastify.get("/analytics/all", {
        preHandler: authMiddleware,
        handler: bioController.getUserAnalytics,
    })

    fastify.post("/generate", {
        preHandler: authMiddleware,
        handler: bioController.generateContent,
    })

    fastify.post("/save", {
        preHandler: authMiddleware,
        handler: bioController.create,
    })
    fastify.get("/u/:slug", {
        preHandler: authMiddleware,
        handler: bioController.get,
    })
    fastify.get("/all", {
        preHandler: authMiddleware,
        handler: bioController.list,
    })
    fastify.put("/update/:slug", {
        preHandler: authMiddleware,
        handler: bioController.update,
    })
    fastify.delete("/delete/:slug", {
        preHandler: authMiddleware,
        handler: bioController.delete,
    })

    // Rota para upload de avatar
    fastify.post("/upload-avatar/:slug", {
        preHandler: authMiddleware,
        handler: bioController.uploadAvatar,
    })

    // Rota para atualizar tema
    fastify.post("/:id/theme", {
        preHandler: [authMiddleware],
        handler: bioController.updateTheme,
    })

    // Domain routes
    fastify.post("/:id/domain", {
        preHandler: [authMiddleware],
        handler: domainController.add,
    })
    fastify.delete("/:id/domain", {
        preHandler: [authMiddleware],
        handler: domainController.remove,
    })
    fastify.get("/:id/domain/status", {
        preHandler: [authMiddleware],
        handler: domainController.check,
    })
}