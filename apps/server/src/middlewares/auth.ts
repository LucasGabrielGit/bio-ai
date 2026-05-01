import type { FastifyRequest, FastifyReply } from "fastify"

export const authMiddleware = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        await req.jwtVerify()
    } catch (error) {
        return res.status(401).send({
            message: "Token inválido ou expirado",
        })
    }
}