import { z } from "zod"

const stringNoHtml = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be at most ${max} characters`)
    .refine(value => !/[<>]/.test(value), "Invalid characters")

const optionalString = (max: number) =>
  z.preprocess(value => {
    if (value === null || value === undefined || value === "") return null
    if (typeof value === "number") return String(value)
    if (typeof value !== "string") return value
    const trimmed = value.trim()
    return trimmed === "" ? null : trimmed
  }, stringNoHtml(max).nullable())

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
  if (value === null || value === undefined || value === "") return null
  if (typeof value === "number") return value
  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = Number.parseInt(trimmed, 10)
  return Number.isNaN(parsed) ? value : parsed
}, z.number().int().nullable())

const optionalFloat = z.preprocess(value => {
  if (value === null || value === undefined || value === "") return null
  if (typeof value === "number") return value
  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = Number.parseFloat(trimmed)
  return Number.isNaN(parsed) ? value : parsed
}, z.number().nullable())

export const createStructureIdSchema = z.object({
  structureNumber: optionalString(50),
  structureName: optionalString(200),
  structureMarking: optionalString(100),
  generalDescription: optionalString(1000),
  area: optionalString(10),
  belongsToRoad: optionalString(10),
  runningDistanceKm: optionalString(10),
  runningDistanceStart: optionalString(10),
  runningDistanceEnd: optionalString(10),
  coordinateNorth: optionalString(10),
  coordinateEast: optionalString(10),

  structureType: optionalString(50),
  structureSubType: optionalString(50),
  structureDetailType: optionalString(50),
  inventoryComponentName: optionalString(200),
  inspectionType: optionalString(50),
  plannedInspectionDate: optionalDate,
  inspector: optionalString(200),
  inspectionCompany: optionalString(200),
  inspectionStatus: optionalString(50),

  primaryClassificationGroup: optionalString(10),
  secondaryClassificationGroup: optionalString(10),
  trafficFunctionClass: optionalString(10),
  emergencyClass: optionalString(10),
  builtBy: optionalString(10),
  owner: optionalString(10),
  maintenanceResponsibility: optionalString(10),
  tollRoad: optionalString(10),
  specialTransport: optionalString(10),
  historicalValue: optionalString(10),
  temporaryStructure: optionalString(10),

  constructionYear: optionalString(4),
  lastRehabYear: optionalString(4),
  primaryUsageAbove: optionalString(10),
  primaryRoadNumberAbove: optionalString(10),
  secondaryUsageAbove: optionalString(10),
  secondaryRoadNumberAbove: optionalString(10),
  tracksOrRailwaysAbove: optionalInt,
  lanesAbove: optionalInt,
  trafficDirectionAbove: optionalString(10),
  primaryUsageBelow: optionalString(10),
  primaryRoadNumberBelow: optionalString(10),
  secondaryUsageBelow: optionalString(10),
  secondaryRoadNumberBelow: optionalString(10),
  tracksOrRailwaysBelow: optionalInt,
  lanesBelow: optionalInt,
  trafficDirectionBelow: optionalString(10),
  aadt: optionalInt,
  aadtYear: optionalString(4),
  aadtt: optionalInt,
  bypassPossible: optionalString(10),
  bypassLength: optionalInt,
  bypassDescription: optionalString(1000),
  bypassDescriptionImage: optionalImage,
  localBypass: optionalString(10),
  localBypassMethod: optionalString(10),
  localBypassMethodOther: optionalString(1000),
  originalPlanner: optionalString(200),
  rehabPlanner: optionalString(200),

  spanCount: optionalInt,
  maxSpanLength: optionalFloat,
  totalLength: optionalFloat,
  lengthRight: optionalFloat,
  lengthLeft: optionalFloat,
  spanDistribution: optionalString(500),
  widthChange: optionalString(10),
  minWidthPerpendicular: optionalFloat,
  maxWidthPerpendicular: optionalFloat,
  maxExternalWidth: optionalFloat,
  minExternalWidth: optionalFloat,
  rightSidewalkWidth: optionalFloat,
  leftSidewalkWidth: optionalFloat,
  minRoadwayWidth: optionalFloat,
  totalRoadwayWidth: optionalFloat,
  separatorType: optionalString(10),
  separatorTypeOther: optionalString(1000),
  skewAngle: optionalInt,
  minVerticalClearanceBelow: optionalFloat,
  verticalClearanceDrainage: optionalFloat,
  minVerticalClearanceAbove: optionalFloat,
  heightSignageValue: optionalFloat,
  minHorizontalClearance: optionalFloat,
  maxPierHeight: optionalFloat,
  maxWallHeight: optionalFloat,
  avgJointSpacing: optionalFloat,
  minDistanceYellowLineTop: optionalFloat,
  minDistanceYellowLineBottom: optionalFloat,
  wallFaceArea: optionalFloat,
  deckArea: optionalFloat,
  maxTheoreticalVerticalDim: optionalFloat,
  maxHorizontalDim: optionalFloat,
  minVerticalClearanceTunnel: optionalFloat,
  minHorizontalClearanceTunnel: optionalFloat,

  deckTypeCount: optionalInt,
  deckTypes: optionalString(1000),
  deckTypesOther: optionalString(1000),
  floorType: optionalString(1000),
  floorTypeOther: optionalString(1000),
  abutment1Type: optionalString(10),
  abutment1TypeOther: optionalString(1000),
  abutment2Type: optionalString(10),
  abutment2TypeOther: optionalString(1000),
  pierTypeCount: optionalInt,
  pierTypes: optionalString(1000),
  pierTypesOther: optionalString(1000),
  prestressingType: optionalString(10),
  prestressingTypeOther: optionalString(1000),
  bearingTypes: optionalString(1000),
  bearingTypesOther: optionalString(1000),
  jointTypes: optionalString(1000),
  jointTypesOther: optionalString(1000),

  deckMaterials: optionalString(1000),
  deckMaterialsOther: optionalString(1000),
  beamMaterials: optionalString(1000),
  beamMaterialsOther: optionalString(1000),
  abutmentMaterials: optionalString(1000),
  abutmentMaterialsOther: optionalString(1000),
  pierMaterials: optionalString(1000),
  pierMaterialsOther: optionalString(1000),
  slopeProtectionMaterials: optionalString(1000),
  slopeProtectionMaterialsOther: optionalString(1000),
  vehicleBarrierMaterials: optionalString(1000),
  vehicleBarrierMaterialsOther: optionalString(1000),
  pedestrianRailingMaterials: optionalString(1000),
  pedestrianRailingMaterialsOther: optionalString(1000),
  deckCoveringMaterials: optionalString(1000),
  deckCoveringMaterialsOther: optionalString(1000),
  deckSealingMaterials: optionalString(1000),
  deckSealingMaterialsOther: optionalString(1000),
  curbMaterials: optionalString(1000),
  curbMaterialsOther: optionalString(1000),

  loadRatingMethod: optionalString(1000),
  loadRatingResult: optionalString(100),
  loadRatingDate: optionalDate,
  seismicRatingMethod: optionalString(1000),
  seismicRatingResult: optionalString(100),
  seismicRatingDate: optionalDate,
  approvedLoadLimits: optionalInt,
  loadSignage: optionalInt,

  infrastructureTypes: optionalString(1000),
  infrastructureTypesOther: optionalString(1000),

  maxRelativeLevel: optionalFloat,
  designReturnPeriod: optionalInt,
  hydraulicAdequacy: optionalString(10),

  conditionPIav: optionalInt,
  conditionPIcrit: optionalInt,

  availabilityPI: optionalInt,

  reliabilityPI: optionalInt,

  inspectionClassification: optionalString(20),
  initialInspectionDate: optionalDate,
  lastRoutineInspectionDate: optionalDate,
  routineInspectionFrequency: optionalInt,
  damageControlInspectionDate: optionalDate,
  underwaterInspectionDate: optionalDate,
  thoroughInspectionDate: optionalDate,
  specialInspectionDate: optionalDate,
  fieldImages: z
    .array(
      z.object({
        fieldName: z.string(),
        imageUrl: z.string()
      })
    )
    .optional()
})

export const updateStructureIdSchema = createStructureIdSchema.partial()

export type CreateStructureIdInput = z.infer<typeof createStructureIdSchema>
export type UpdateStructureIdInput = z.infer<typeof updateStructureIdSchema>
