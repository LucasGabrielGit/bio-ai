import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../lib/prisma/client/db";
import { CustomError } from "../../middlewares/error-handler";
import { addDomainToVercel, removeDomainFromVercel, checkDomainStatusVercel } from "../../services/vercel";

interface DomainBody {
  domain: string;
}

export class DomainController {
  async add(req: FastifyRequest<{ Body: DomainBody; Params: { id: string } }>, res: FastifyReply) {
    const { domain } = req.body;
    const { id: bioId } = req.params;
    const userId = req.user.id;

    if (!domain) {
      throw new CustomError("O domínio é obrigatório", 400, "MISSING_DOMAIN");
    }

    const bio = await db.bio.findUnique({
      where: { id: bioId },
      include: { user: true },
    });

    if (!bio) {
      throw new CustomError("Biografia não encontrada", 404, "BIO_NOT_FOUND");
    }

    if (bio.userId !== userId) {
      throw new CustomError("Acesso negado", 403, "FORBIDDEN");
    }

    if (bio.user.plan !== "PRO" && bio.user.plan !== "premium") {
      throw new CustomError("Este recurso exige um plano PRO", 403, "UPGRADE_REQUIRED");
    }

    const existingDomain = await db.bio.findUnique({
      where: { customDomain: domain },
    });

    if (existingDomain && existingDomain.id !== bioId) {
      throw new CustomError("Este domínio já está em uso por outra biografia", 400, "DOMAIN_TAKEN");
    }

    // Call Vercel API
    await addDomainToVercel(domain);

    // Save in database
    const updatedBio = await db.bio.update({
      where: { id: bioId },
      data: { customDomain: domain },
    });

    return res.status(200).send({
      message: "Domínio adicionado com sucesso. Configure os registros DNS.",
      bio: updatedBio,
    });
  }

  async remove(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    const { id: bioId } = req.params;
    const userId = req.user.id;

    const bio = await db.bio.findUnique({
      where: { id: bioId },
    });

    if (!bio) {
      throw new CustomError("Biografia não encontrada", 404, "BIO_NOT_FOUND");
    }

    if (bio.userId !== userId) {
      throw new CustomError("Acesso negado", 403, "FORBIDDEN");
    }

    if (!bio.customDomain) {
      throw new CustomError("Esta biografia não possui um domínio personalizado", 400, "NO_DOMAIN");
    }

    // Call Vercel API
    await removeDomainFromVercel(bio.customDomain);

    // Remove from database
    const updatedBio = await db.bio.update({
      where: { id: bioId },
      data: { customDomain: null },
    });

    return res.status(200).send({
      message: "Domínio removido com sucesso.",
      bio: updatedBio,
    });
  }

  async check(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    const { id: bioId } = req.params;
    const userId = req.user.id;

    const bio = await db.bio.findUnique({
      where: { id: bioId },
    });

    if (!bio) {
      throw new CustomError("Biografia não encontrada", 404, "BIO_NOT_FOUND");
    }

    if (bio.userId !== userId) {
      throw new CustomError("Acesso negado", 403, "FORBIDDEN");
    }

    if (!bio.customDomain) {
      throw new CustomError("Esta biografia não possui um domínio personalizado", 400, "NO_DOMAIN");
    }

    // Call Vercel API
    const status = await checkDomainStatusVercel(bio.customDomain);

    return res.status(200).send({
      status,
    });
  }
}

export const domainController = new DomainController();
