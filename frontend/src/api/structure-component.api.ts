import { apiClient } from "./client"

export interface SubComponentDto {
  id: string
  componentId: string
  index: number
  name: string
  basicQuantity: number
  secondaryQuantity: number
  comments: string | null
  attachment: string | null
  createdAt: string
  updatedAt: string
}

export interface StructureComponentDto {
  id: string
  structureId: string
  componentCode: string
  description: string
  importanceLevel: string
  basicMeasurementUnit: string
  secondaryMeasurementUnit: string | null
  quantity: number
  evaluationNeeded: boolean
  notes: string | null
  comments: string | null
  subComponents: SubComponentDto[]
  createdAt: string
  updatedAt: string
}

export interface SubComponentInput {
  index: number
  name: string
  basicQuantity: number
  secondaryQuantity: number
  comments?: string | null
  attachment?: string | null
}

export interface StructureComponentInput {
  componentCode: string
  description: string
  importanceLevel: string
  basicMeasurementUnit: string
  secondaryMeasurementUnit?: string | null
  quantity: number
  evaluationNeeded?: boolean
  notes?: string | null
  comments?: string | null
  subComponents: SubComponentInput[]
}

export interface BulkUpsertComponentsRequest {
  components: StructureComponentInput[]
}

export const structureComponentApi = {
  getComponentsByStructureId: (structureId: string): Promise<StructureComponentDto[]> => {
    return apiClient.get<StructureComponentDto[]>(`/structure-component/${structureId}`)
  },
  bulkUpsertComponents: (structureId: string, data: BulkUpsertComponentsRequest): Promise<StructureComponentDto[]> => {
    return apiClient.put<StructureComponentDto[]>(`/structure-component/${structureId}`, data)
  }
}
