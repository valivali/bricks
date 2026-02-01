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

const optionalDate = z
  .string()
  .trim()
  .optional()
  .transform(value => (value && value.length > 0 ? value : undefined))
  .refine(value => value === undefined || /^\d{4}-\d{2}-\d{2}$/.test(value), "תאריך לא תקין")

const optionalIntString = z
  .string()
  .trim()
  .optional()
  .transform(value => (value && value.length > 0 ? value : undefined))
  .refine(value => value === undefined || /^\d+$/.test(value), "ערך לא תקין")

const optionalFloatString = z
  .string()
  .trim()
  .optional()
  .transform(value => (value && value.length > 0 ? value : undefined))
  .refine(value => value === undefined || /^-?\d+(\.\d+)?$/.test(value), "ערך לא תקין")

export const inspectionSchema = z.object({
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
  fullStructureIncluded: z.boolean().default(true),
  fullStructureNotes: optionalString(500),
  spanCount: optionalIntString,
  spanCountNotes: optionalString(500),
  adjacentStructures: optionalIntString,
  adjacentStructuresNotes: optionalString(500),
  siteRestrictions: optionalString(1000),
  inspectionDate: optionalDate,
  nextInspectionType: optionalString(200),
  nextInspectionDate: optionalDate,
  classificationForInspection: optionalString(200),
  coordinateNorth: optionalFloatString,
  coordinateEast: optionalFloatString
})

export type InspectionFormValues = z.input<typeof inspectionSchema>
