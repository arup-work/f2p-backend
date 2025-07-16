import { email, z } from "zod";

// Schema for register
export const registerSchema = z.object({
    name: z.string().max(255).min(5),
    email: z.email(),
    password: z.string().max(255).min(5)
})