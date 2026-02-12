import type { StructureComponentDto } from "../../dto/structure-component.dto.js"
import type { BulkUpsertStructureComponentsInput } from "../../schemas/structure-component.schema.js"

export interface StructureComponentService {
  getComponentsByStructureId(userId: string, structureId: string): Promise<StructureComponentDto[]>
  bulkUpsertComponents(userId: string, structureId: string, data: BulkUpsertStructureComponentsInput): Promise<StructureComponentDto[]>
}
