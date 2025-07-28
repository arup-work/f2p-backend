import { email, z } from "zod";

// Schema for register
export const registerSchema = z.object({
    name: z.string().max(255).min(4),
    email: z.email(),
    password: z.string().max(255).min(5)
})

// Schema for login
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().max(255).min(5)
})


// Schema for forget password
export const forgetPasswordSchema = z.object({
    email: z.email()
})