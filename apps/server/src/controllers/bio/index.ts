import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../lib/prisma/client/db";
import {
  createBioSchema,
  updateBioSchema,
  generateContentSchema,
  type CreateBioType,
  type UpdateBioType,
  type GenerateContentType,
} from "../../shcemas/bio-schema";
import { openai } from "../../utils/openai";
import { generateWithGemini } from "../../utils/gemini";
import { v2 as cloudinary } from "cloudinary";

export class BioController {
  async create(
    req: FastifyRequest<{ Body: CreateBioType }>,
    res: FastifyReply,
  ) {
    try {
      const data = createBioSchema.parse(req.body);

      const publicUrl =
        data.publicUrl ||
        `${req.user.id.slice(0, 5)}-${data.title.toLowerCase().replace(/\s+/g, "-")}`;

      const bio = await db.bio.create({
        data: {
          userId: req.user.id,
          title: data.title,
          content: data.content,
          style: data.style,
          template: data.template || "minimalista",
          links: data.links || [],
          publicUrl: publicUrl,
          isPublic: data.isPublic || false,
        },
      });

      return res.status(201).send({
        message: "Bio criada com sucesso",
        bio,
      });
    } catch (error: any) {
      if (error instanceof Error && "issues" in error) {
        return res.status(400).send({
          message: "Erro na validação dos dados",
          errors: error.issues,
        });
      }

      return res.status(500).send({
        message: "Erro interno no servidor",
        error: error?.message ?? "Falha na comunicação com o modelo de IA",
      });
    }
  }

  async generateContent(
    req: FastifyRequest<{ Body: GenerateContentType }>,
    res: FastifyReply,
  ) {
    try {
      const data = generateContentSchema.parse(req.body);
      const prompt = `Crie uma bio ${data.style} para redes sociais com o título: ${data.title}. Deve soar natural e atrativa!`;

      let generatedBio: string | undefined;

      if (openai) {
        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "Você é um assistente que cria bios para redes sociais.",
              },
              { role: "user", content: prompt },
            ],
          });
          generatedBio = completion?.choices[0]?.message.content || "";
        } catch (err) {
          console.error("Erro ao gerar bio com OpenAI:", err);
        }
      }

      if (!generatedBio && typeof generateWithGemini === "function") {
        try {
          generatedBio = await generateWithGemini(prompt);
          console.log(generatedBio);
        } catch (err) {
          console.error("Erro ao gerar bio com Gemini:", err);
        }
      }
      if (!generatedBio) {
        return res.status(500).send({
          message:
            "Falha ao gerar a bio. Verifique se as chaves de API estão configuradas corretamente.",
        });
      }
      return res.status(200).send({
        message: "Bio gerada com sucesso",
        bio: generatedBio,
      });
    } catch (error: any) {
      if (error instanceof Error && "issues" in error) {
        return res.status(400).send({
          message: "Erro na validação dos dados",
          errors: error.issues,
        });
      }
    }
  }

  async get(
    req: FastifyRequest<{ Params: { slug: string } }>,
    res: FastifyReply,
  ) {
    try {
      const bio = await db.bio.findUnique({
        where: { publicUrl: req.params.slug },
        select: {
          id: true,
          title: true,
          content: true,
          style: true,
          template: true,
          links: true,
          publicUrl: true,
          isPublic: true,
          views: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          avatar: true,
          theme: true,
        },
      });
      if (!bio) return res.status(404).send({ message: "Bio não encontrada" });

      const clientIp =
        req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip;
      const userAgent = req.headers["user-agent"];
      const referrer = req.headers["referer"];

      await Promise.all([
        db.bio.update({
          where: { id: bio.id },
          data: { views: { increment: 1 } },
        }),

        db.bioView.create({
          data: {
            bioId: bio.id,
            ipAddress: Array.isArray(clientIp) ? clientIp[0] : clientIp,
            userAgent: userAgent || null,
            referrer: referrer || null,
          },
        }),
      ]);

      return res.send(bio);
    } catch (error) {
      return res.status(500).send({ message: "Erro ao buscar bio" });
    }
  }

  async list(req: FastifyRequest, res: FastifyReply) {
    try {
      const bios = await db.bio.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          content: true,
          style: true,
          template: true,
          links: true,
          publicUrl: true,
          isPublic: true,
          views: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return res.send(bios);
    } catch (error) {
      return res.status(500).send({ message: "Erro ao listar bios" });
    }
  }

  async delete(
    req: FastifyRequest<{ Params: { slug: string } }>,
    res: FastifyReply,
  ) {
    try {
      const bio = await db.bio.findUnique({
        where: { publicUrl: req.params.slug },
      });
      if (!bio) return res.status(404).send({ message: "Bio não encontrada" });
      if (bio.userId !== req.user.id)
        return res
          .status(403)
          .send({ message: "Sem permissão para excluir esta bio" });

      await db.bio.delete({ where: { publicUrl: req.params.slug } });
      return res.status(200).send({ message: "Bio excluída com sucesso" });
    } catch (error) {
      return res.status(500).send({ message: "Erro ao excluir bio" });
    }
  }

  async update(
    req: FastifyRequest<{ Params: { slug: string }; Body: UpdateBioType }>,
    res: FastifyReply,
  ) {
    try {
      const data = updateBioSchema.parse(req.body);

      const bio = await db.bio.findUnique({
        where: { publicUrl: req.params.slug },
      });

      if (!bio) return res.status(404).send({ message: "Bio não encontrada" });
      if (bio.userId !== req.user.id)
        return res
          .status(403)
          .send({ message: "Sem permissão para editar esta bio" });

      const updated = await db.bio.update({
        where: { id: bio.id },
        data: {
          title: data.title ?? bio.title,
          style: data.style ?? bio.style,
          template: data.template ?? bio.template,
          content: data.content ?? bio.content,
          publicUrl: data.publicUrl ?? bio.publicUrl,
          isPublic: data.isPublic ?? bio.isPublic,
          links: data.links
            ? JSON.parse(JSON.stringify(data.links))
            : bio.links,
        },
      });

      return res.send({ message: "Bio atualizada com sucesso", bio: updated });
    } catch (error: any) {
      if (error instanceof Error && "issues" in error) {
        return res.status(400).send({
          message: "Erro na validação dos dados",
          errors: error.issues,
        });
      }
      return res.status(500).send({ message: "Erro ao atualizar bio" });
    }
  }

  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply,
  ) {
    try {
      const bio = await db.bio.findUnique({
        where: { id: req.params.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!bio) return res.status(404).send({ message: "Bio não encontrada" });
      if (bio.userId !== req.user.id)
        return res
          .status(403)
          .send({ message: "Sem permissão para acessar esta bio" });

      return res.send(bio);
    } catch (error) {
      return res.status(500).send({ message: "Erro ao buscar bio" });
    }
  }

  async getAnalytics(
    req: FastifyRequest<{
      Params: { slug: string };
      Querystring: { startDate?: string; endDate?: string; days?: string };
    }>,
    res: FastifyReply,
  ) {
    try {
      const bio = await db.bio.findUnique({
        where: { publicUrl: req.params.slug },
        select: {
          id: true,
          userId: true,
          title: true,
          views: true,
          createdAt: true,
        },
      });

      if (!bio) return res.status(404).send({ message: "Bio não encontrada" });
      if (bio.userId !== req.user.id)
        return res
          .status(403)
          .send({ message: "Sem permissão para acessar analytics desta bio" });

      let startDate: Date;
      let endDate: Date = new Date();

      if (req.query.startDate && req.query.endDate) {
        startDate = new Date(req.query.startDate);
        endDate = new Date(req.query.endDate);
      } else if (req.query.days) {
        const days = parseInt(req.query.days);
        startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
      } else {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
      }

      const [recentViews, viewsByDay] = await Promise.all([
        db.bioView.findMany({
          where: {
            bioId: bio.id,
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          orderBy: { createdAt: "desc" },
          take: 1000,
        }),

        db.$queryRaw`
                    SELECT 
                        DATE("createdAt") as date,
                        COUNT(*)::int as views
                    FROM "BioView" 
                    WHERE "bioId" = ${bio.id} 
                        AND "createdAt" >= ${startDate}
                        AND "createdAt" <= ${endDate}
                    GROUP BY DATE("createdAt")
                    ORDER BY date ASC
                `,
      ]);

      const totalViews = bio.views;
      const recentViewsCount = recentViews.length;
      const uniqueIps = new Set(
        recentViews.map((v) => v.ipAddress).filter(Boolean),
      ).size;

      const referrerCounts = recentViews.reduce(
        (acc, view) => {
          if (view.referrer) {
            try {
              const domain = new URL(view.referrer).hostname;
              acc[domain] = (acc[domain] || 0) + 1;
            } catch {
              acc["Direto"] = (acc["Direto"] || 0) + 1;
            }
          } else {
            acc["Direto"] = (acc["Direto"] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

      const topReferrers = Object.entries(referrerCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([domain, count]) => ({ domain, count }));

      return res.send({
        bio: {
          id: bio.id,
          title: bio.title,
          createdAt: bio.createdAt,
        },
        period: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          days: Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
          ),
        },
        stats: {
          totalViews,
          recentViews: recentViewsCount,
          uniqueVisitors: uniqueIps,
          topReferrers,
        },
        chartData: viewsByDay,
      });
    } catch (error) {
      console.error("Analytics error:", error);
      return res.status(500).send({ message: "Erro ao buscar analytics" });
    }
  }

  async uploadAvatar(
    req: FastifyRequest<{ Params: { slug: string } }>,
    res: FastifyReply,
  ) {
    try {
      const bio = await db.bio.findFirst({
        where: {
          publicUrl: req.params.slug,
          userId: req.user.id,
        },
      });

      if (!bio) {
        return res.status(404).send({ message: "Bio não encontrada" });
      }

      const data = await req.file();

      if (!data) {
        return res.status(400).send({ message: "Nenhum arquivo enviado" });
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedTypes.includes(data.mimetype)) {
        return res.status(400).send({
          message: "Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF",
        });
      }

      const buffer = await data.toBuffer();

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            upload_preset: "bio-ai-avatars",
            folder: "bio_avatars",
            public_id: `${bio.id}_${Date.now()}`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        uploadStream.end(buffer);
      });

      const avatarUrl = (uploadResult as any).secure_url;
      const updatedBio = await db.bio.update({
        where: { id: bio.id },
        data: { avatar: avatarUrl },
      });

      return res.status(200).send({
        message: "Avatar enviado com sucesso",
        avatarUrl,
        bio: updatedBio,
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      return res.status(500).send({
        message: "Erro ao fazer upload do avatar",
        error: error?.message,
      });
    }
  }

  async updateTheme(
    req: FastifyRequest<{
      Params: { slug: string };
      Body: {
        primaryColor?: string;
        backgroundColor?: string;
        textColor?: string;
        avatar?: string | null;
      };
    }>,
    res: FastifyReply,
  ) {
    try {
      const bio = await db.bio.findFirst({
        where: {
          publicUrl: req.params.slug,
          userId: req.user.id,
        },
      });

      if (!bio) {
        return res.status(404).send({ message: "Bio não encontrada" });
      }

      const updates: Record<string, any> = {};

      if (Object.prototype.hasOwnProperty.call(req.body, "avatar")) {
        updates.avatar = req.body.avatar ?? null;
      }

      const currentTheme = typeof bio.theme === "object" ? bio.theme : {};
      const { avatar, ...themeBody } = req.body as any;
      const newTheme = {
        ...currentTheme,
        ...themeBody,
      };
      updates.theme = newTheme;

      const updatedBio = await db.bio.update({
        where: { id: bio.id },
        data: updates,
      });

      return res.status(200).send({
        message: "Tema atualizado com sucesso",
        bio: updatedBio,
      });
    } catch (error: any) {
      console.error("Theme update error:", error);
      return res.status(500).send({
        message: "Erro ao atualizar tema",
        error: error?.message,
      });
    }
  }
}
