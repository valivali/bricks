import { z } from "zod"

const stringNoHtml = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be at most ${max} characters`)
    .refine(value => !/[<>]/.test(value), "Invalid characters")

const optionalString = (max: number) =>
  z.preprocess(value => {
    if (value === null || value === undefined) return null
    if (typeof value !== "string") return value
    const trimmed = value.trim()
    return trimmed === "" ? null : trimmed
  }, stringNoHtml(max).nullable())

const optionalDigits = (length: number, message: string) =>
  z.preprocess(value => {
    if (value === null || value === undefined) return null
    if (typeof value !== "string") return value
    const trimmed = value.trim()
    if (trimmed === "") return null
    return trimmed.replace(/\D/g, "")
  }, z.string().length(length, message).nullable())

const optionalPhone = z.preprocess(
  value => {
    if (value === null || value === undefined) return null
    if (typeof value !== "string") return value
    const trimmed = value.trim()
    if (trimmed === "") return null
    return trimmed.replace(/\D/g, "")
  },
  z
    .string()
    .length(10, "Invalid phone number")
    .refine(value => value.startsWith("05"), "Invalid phone number")
    .nullable()
)

const optionalImage = z.preprocess(
  value => {
    if (value === null || value === undefined) return null
    if (typeof value !== "string") return value
    const trimmed = value.trim()
    return trimmed === "" ? null : trimmed
  },
  z
    .string()
    .max(3_000_000, "Image too large")
    .refine(value => value.startsWith("data:image/"), "Invalid image data")
    .nullable()
)

export const updateProfileSchema = z.object({
  email: z.email("Invalid email address").max(254, "Invalid email address"),
  firstName: optionalString(50),
  lastName: optionalString(50),
  idNumber: optionalDigits(9, "Invalid ID number"),
  phone: optionalPhone,
  companyName: optionalString(100),
  companyId: optionalDigits(9, "Invalid company ID"),
  companyAddress: optionalString(200),
  profileImage: optionalImage
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
