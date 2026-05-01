import z from "zod";

const linkSchema = z.object({
    id: z.string(),
    platform: z.string(),
    url: z.string().url("URL inválida"),
    label: z.string(),
});

export const createBioSchema = z.object({
    title: z.string().min(3, "Título deve ter ao menos 3 caracteres"),
    style: z.enum(["criativo", "profissional", "divertido", "neutro", "tecnologico"]),
    template: z.string().min(1, "Template é obrigatório").default("minimalista"),
    content: z.string().min(10, "Conteúdo deve ter ao menos 10 caracteres"),
    publicUrl: z.string().min(1, "URL pública é obrigatória"),
    isPublic: z.boolean().default(false),
    links: z.array(linkSchema).optional(),
})

export const updateBioSchema = z.object({
    title: z.string().min(3, "Título deve ter ao menos 3 caracteres").optional(),
    style: z.enum(["criativo", "profissional", "divertido", "neutro", "tecnologico"]).optional(),
    template: z.string().min(1, "Template é obrigatório").optional(),
    content: z.string().optional(),
    publicUrl: z.string().min(1, "URL pública é obrigatória").optional(),
    isPublic: z.boolean().optional(),
    links: z.array(linkSchema).optional(),
})

export const generateContentSchema = z.object({
    title: z.string().min(3, "Título deve ter ao menos 3 caracteres"),
    style: z.enum(["criativo", "profissional", "divertido", "neutro", "tecnologico"]),
    template: z.string().min(1, "Template é obrigatório").default("minimalista"),
})

export type CreateBioType = z.infer<typeof createBioSchema>
export type UpdateBioType = z.infer<typeof updateBioSchema>
export type GenerateContentType = z.infer<typeof generateContentSchema>
