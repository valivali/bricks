import type { InspectionDto } from "../../dto/inspection.dto.js"
import type { CreateInspectionInput, UpdateInspectionInput } from "../../schemas/inspection.schema.js"

export interface InspectionServiceInterface {
  createInspection(userId: string, data: CreateInspectionInput): Promise<InspectionDto>
  updateInspection(userId: string, inspectionId: string, data: UpdateInspectionInput): Promise<InspectionDto>
  getInspectionById(userId: string, inspectionId: string): Promise<InspectionDto>
  getUserInspections(userId: string): Promise<InspectionDto[]>
  getStructureInspections(userId: string, structureId: string): Promise<InspectionDto[]>
}
