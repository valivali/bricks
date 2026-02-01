import type { StructureIdDto } from "../../dto/structure-id.dto.js"
import type { CreateStructureIdInput, UpdateStructureIdInput } from "../../schemas/structure-id.schema.js"

export interface StructureIdServiceInterface {
  createStructureId(userId: string, data: CreateStructureIdInput): Promise<StructureIdDto>
  updateStructureId(userId: string, structureIdId: string, data: UpdateStructureIdInput): Promise<StructureIdDto>
  getStructureIdById(userId: string, structureIdId: string): Promise<StructureIdDto>
  getUserStructureIds(userId: string): Promise<StructureIdDto[]>
  deleteStructureId(userId: string, structureIdId: string): Promise<void>
}
