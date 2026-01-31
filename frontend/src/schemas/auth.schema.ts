import { z } from "zod"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const signupSchema = z.object({
  email: z.email("כתובת אימייל לא תקינה"),
  password: z
    .string()
    .min(8, "הסיסמה חייבת להיות לפחות 8 תווים")
    .regex(
      passwordRegex,
      "הסיסמה חייבת לכלול לפחות אות קטנה, אות גדולה, מספר ותו מיוחד"
    )
})

export const loginSchema = z.object({
  email: z.email("כתובת אימייל לא תקינה"),
  password: z.string().min(1, "נדרשת סיסמה")
})

export const forgotPasswordSchema = z.object({
  email: z.email("כתובת אימייל לא תקינה")
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "הסיסמה חייבת להיות לפחות 8 תווים")
    .regex(
      passwordRegex,
      "הסיסמה חייבת לכלול לפחות אות קטנה, אות גדולה, מספר ותו מיוחד"
    )
})

export type SignupFormData = z.infer<typeof signupSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
