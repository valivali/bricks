import { z } from "zod"

const stringNoHtml = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `עד ${max} תווים`)
    .refine(value => !/[<>]/.test(value), "תווים לא תקינים")

const optionalString = (max: number) =>
  stringNoHtml(max)
    .optional()
    .transform(value => (value && value.length > 0 ? value : undefined))

const optionalDigits = (length: number, message: string) =>
  z
    .string()
    .trim()
    .optional()
    .transform(value => {
      if (!value) return undefined
      const digits = value.replace(/\D/g, "")
      return digits.length > 0 ? digits : undefined
    })
    .refine(value => value === undefined || value.length === length, message)

const optionalPhone = z
  .string()
  .trim()
  .optional()
  .transform(value => {
    if (!value) return undefined
    const digits = value.replace(/\D/g, "")
    return digits.length > 0 ? digits : undefined
  })
  .refine(value => value === undefined || (value.length === 10 && value.startsWith("05")), "מספר טלפון לא תקין")

const optionalImage = z
  .string()
  .trim()
  .max(3_000_000, "התמונה גדולה מדי")
  .refine(value => value.startsWith("data:image/"), "קובץ תמונה לא תקין")
  .optional()
  .transform(value => (value && value.length > 0 ? value : undefined))

export const profileSchema = z.object({
  email: z.email("כתובת אימייל לא תקינה").max(254, "כתובת אימייל לא תקינה"),
  firstName: optionalString(50),
  lastName: optionalString(50),
  idNumber: optionalDigits(9, "מספר ת.ז לא תקין"),
  phone: optionalPhone,
  companyName: optionalString(100),
  companyId: optionalDigits(9, "מספר ח.פ לא תקין"),
  companyAddress: optionalString(200),
  profileImage: optionalImage
})

export type ProfileFormValues = z.input<typeof profileSchema>
