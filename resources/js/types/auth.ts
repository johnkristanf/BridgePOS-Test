import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional().default(false),
})

export const loginResponseSchema = z.object({
  message: z.string().optional(),
  redirect: z.string().optional(),
  user: z
    .object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    })
    .optional(),
})

export type LoginPayload = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })

export const registerResponseSchema = z.object({
  message: z.string().optional(),
  redirect: z.string().optional(),
  user: z
    .object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    })
    .optional(),
})

export type RegisterPayload = z.infer<typeof registerSchema>
export type RegisterResponse = z.infer<typeof registerResponseSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
})

export const forgotPasswordResponseSchema = z.object({
  message: z.string().optional(),
  status: z.string().optional(),
})

export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>
export type ForgotPasswordResponse = z.infer<
  typeof forgotPasswordResponseSchema
>

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })

export const resetPasswordResponseSchema = z.object({
  message: z.string().optional(),
  status: z.string().optional(),
  redirect: z.string().optional(),
})

export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>
export type ResetPasswordResponse = z.infer<typeof resetPasswordResponseSchema>

export const twoFactorChallengeSchema = z
  .object({
    code: z.string().length(6, "Code must be 6 digits").optional(),
    recovery_code: z.string().optional(),
  })
  .refine((data) => data.code || data.recovery_code, {
    message: "Either code or recovery code is required",
    path: ["code"],
  })

export const twoFactorChallengeResponseSchema = z.object({
  message: z.string().optional(),
  redirect: z.string().optional(),
})

export type TwoFactorChallengePayload = z.infer<typeof twoFactorChallengeSchema>
export type TwoFactorChallengeResponse = z.infer<
  typeof twoFactorChallengeResponseSchema
>
