import { z } from "zod"

const subComponentSchema = z.object({
  index: z.number().int().positive(),
  name: z.string().min(1),
  basicQuantity: z.number().default(0),
  secondaryQuantity: z.number().default(0),
  comments: z.string().optional().nullable(),
  attachment: z.string().optional().nullable()
})

const structureComponentSchema = z.object({
  componentCode: z.string().min(1),
  description: z.string().min(1),
  importanceLevel: z.string().min(1),
  basicMeasurementUnit: z.string().min(1),
  secondaryMeasurementUnit: z.string().optional().nullable(),
  quantity: z.number().int().nonnegative(),
  evaluationNeeded: z.boolean().default(false),
  notes: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  subComponents: z.array(subComponentSchema).default([])
})

export const bulkUpsertStructureComponentsSchema = z.object({
  components: z.array(structureComponentSchema)
})

export type BulkUpsertStructureComponentsInput = z.infer<typeof bulkUpsertStructureComponentsSchema>
export type StructureComponentInput = z.infer<typeof structureComponentSchema>
export type SubComponentInput = z.infer<typeof subComponentSchema>
