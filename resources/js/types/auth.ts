import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional().default(false),
})

export type LoginPayload = z.infer<typeof loginSchema>

export interface LoginResponse {
  message?: string
  redirect?: string
  user?: {
    id: number
    name: string
    email: string
  }
}
