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

export const forgotPasswordSchema = z.object({
    email: z.string().email("E-mail inválido"),
})

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token obrigatório"),
    newPassword: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
})

export type CreateUserType = z.infer<typeof createUserSchema>
export type LoginUserType = z.infer<typeof loginUserSchema>
export type UpdateUserType = z.infer<typeof updateUserSchema>
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>
