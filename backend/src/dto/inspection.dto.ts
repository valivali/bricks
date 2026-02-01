export type InspectionDto = {
  id: string
  userId: string
  lastUpdated: string | null
  structureType: string
  generalDescription: string | null
  inspectionType: string | null
  companyName: string | null
  inspectorName: string | null
  structureNumber: string | null
  structureName: string | null
  structureMarking: string | null
  roadNumber: string | null
  runningDistance: string | null
  area: string | null
  fullStructureIncluded: boolean
  fullStructureNotes: string | null
  spanCount: number | null
  spanCountNotes: string | null
  adjacentStructures: number | null
  adjacentStructuresNotes: string | null
  siteRestrictions: string | null
  inspectionDate: string | null
  nextInspectionType: string | null
  nextInspectionDate: string | null
  classificationForInspection: string | null
  coordinateNorth: number | null
  coordinateEast: number | null
  createdAt: string
  updatedAt: string
}
