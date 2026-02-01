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

const optionalDate = z.preprocess(value => {
  if (value === null || value === undefined) return null
  if (value instanceof Date) return value
  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? value : parsed
}, z.date().nullable())

const optionalInt = z.preprocess(value => {
  if (value === null || value === undefined) return null
  if (typeof value === "number") return value
  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = Number.parseInt(trimmed, 10)
  return Number.isNaN(parsed) ? value : parsed
}, z.number().int().nullable())

const optionalFloat = z.preprocess(value => {
  if (value === null || value === undefined) return null
  if (typeof value === "number") return value
  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = Number.parseFloat(trimmed)
  return Number.isNaN(parsed) ? value : parsed
}, z.number().nullable())

const booleanDefaultTrue = z
  .preprocess(value => {
    if (value === null || value === undefined || value === "") return undefined
    if (typeof value === "string") return value === "true"
    return value
  }, z.boolean())
  .default(true)

const optionalBoolean = z.preprocess(value => {
  if (value === null || value === undefined || value === "") return undefined
  if (typeof value === "string") return value === "true"
  return value
}, z.boolean().optional())

export const createInspectionSchema = z.object({
  lastUpdated: optionalDate,
  structureType: stringNoHtml(200),
  generalDescription: optionalString(1000),
  inspectionType: optionalString(200),
  companyName: optionalString(200),
  inspectorName: optionalString(200),
  structureNumber: optionalString(200),
  structureName: optionalString(200),
  structureMarking: optionalString(200),
  roadNumber: optionalString(50),
  runningDistance: optionalString(50),
  area: optionalString(50),
  fullStructureIncluded: booleanDefaultTrue,
  fullStructureNotes: optionalString(500),
  spanCount: optionalInt,
  spanCountNotes: optionalString(500),
  adjacentStructures: optionalInt,
  adjacentStructuresNotes: optionalString(500),
  siteRestrictions: optionalString(1000),
  inspectionDate: optionalDate,
  nextInspectionType: optionalString(200),
  nextInspectionDate: optionalDate,
  classificationForInspection: optionalString(200),
  coordinateNorth: optionalFloat,
  coordinateEast: optionalFloat
})

export const updateInspectionSchema = createInspectionSchema
  .extend({
    fullStructureIncluded: optionalBoolean
  })
  .partial()

export type CreateInspectionInput = z.infer<typeof createInspectionSchema>
export type UpdateInspectionInput = z.infer<typeof updateInspectionSchema>
