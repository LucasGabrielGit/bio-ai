import { type FastifyInstance } from "fastify";
import { UserController } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const userController = new UserController();

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post("/user/register", {
        handler: userController.create,
    })
    fastify.post("/login", {
        handler: userController.login,
    })
    fastify.get("/verify-email", {
        handler: userController.verifyEmail,
    })
    fastify.post("/resend-verification", {
        preHandler: [authMiddleware],
        handler: userController.resendVerification,
    })
    fastify.post("/forgot-password", {
        handler: userController.forgotPassword,
    })
    fastify.post("/reset-password", {
        handler: userController.resetPassword,
    })
    fastify.get("/verify", {
        preHandler: [authMiddleware],
        handler: userController.getUser,
    })
    fastify.get("/user", {
        preHandler: [authMiddleware],
        handler: userController.getUser,
    })
    fastify.put("/user", {
        preHandler: [authMiddleware],
        handler: userController.update,
    })
}
