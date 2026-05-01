import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string()
        .min(1, "E-mail obrigatório")
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "E-mail inválido"),
    password: z.string(),
})

export const updateUserSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    email: z.string()
        .min(1, "E-mail obrigatório")
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "E-mail inválido")
        .optional(),
    bio: z.string().optional(),
    website: z.string().optional(),
    location: z.string().optional(),
    password: z.string().optional(),
})

export const loginUserSchema = z.object({
    email: z.string()
        .min(1, "E-mail obrigatório")
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "E-mail inválido"),
    password: z.string(),
})

export type CreateUserType = z.infer<typeof createUserSchema>
export type LoginUserType = z.infer<typeof loginUserSchema>
export type UpdateUserType = z.infer<typeof updateUserSchema>
