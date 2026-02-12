import { apiClient } from "./client"

export interface InspectionDto {
  id: string
  userId: string
  structureId: string | null
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

export interface CreateInspectionRequest {
  structureId?: string | null
  lastUpdated?: string | null
  structureType: string
  generalDescription?: string | null
  inspectionType?: string | null
  companyName?: string | null
  inspectorName?: string | null
  structureNumber?: string | null
  structureName?: string | null
  structureMarking?: string | null
  roadNumber?: string | null
  runningDistance?: string | null
  area?: string | null
  fullStructureIncluded?: boolean
  fullStructureNotes?: string | null
  spanCount?: number | null
  spanCountNotes?: string | null
  adjacentStructures?: number | null
  adjacentStructuresNotes?: string | null
  siteRestrictions?: string | null
  inspectionDate?: string | null
  nextInspectionType?: string | null
  nextInspectionDate?: string | null
  classificationForInspection?: string | null
  coordinateNorth?: number | null
  coordinateEast?: number | null
}

export type UpdateInspectionRequest = Partial<CreateInspectionRequest>

export const inspectionApi = {
  createInspection: (data: CreateInspectionRequest): Promise<InspectionDto> => {
    return apiClient.post<InspectionDto>("/inspection", data)
  },
  updateInspection: (id: string, data: UpdateInspectionRequest): Promise<InspectionDto> => {
    return apiClient.put<InspectionDto>(`/inspection/${id}`, data)
  },
  getInspectionById: (id: string): Promise<InspectionDto> => {
    return apiClient.get<InspectionDto>(`/inspection/${id}`)
  },
  getUserInspections: (): Promise<InspectionDto[]> => {
    return apiClient.get<InspectionDto[]>("/inspection/user")
  },
  getStructureInspections: (structureId: string): Promise<InspectionDto[]> => {
    return apiClient.get<InspectionDto[]>(`/inspection/structure/${structureId}`)
  }
}
