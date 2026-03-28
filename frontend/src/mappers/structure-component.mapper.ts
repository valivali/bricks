import {
  type StructureComponentDto,
  type StructureComponentInput,
  type SubComponentDto,
  type SubComponentInput
} from "@/api/structure-component.api"
import { type ClientStructureComponent } from "@/hooks/useStructureComponents"
import { type SubComponentData } from "@/types/structure-component.types"

/**
 * Mapper for converting API models (DTOs) to clean client-side models,
 * and vice-versa.
 */
export const structureComponentMapper = {
  toClientSubComponent: (dto: SubComponentDto): SubComponentData => ({
    id: dto.index, // Mapping index to id for client-side lists
    name: dto.name,
    basicQuantity: dto.basicQuantity,
    secondaryQuantity: dto.secondaryQuantity,
    attachments: dto.attachment ? dto.attachment.split(",") : [],
    comments: dto.comments ?? "",
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt).toISOString().split("T")[0] : ""
  }),

  /**
   * Converts a structure component DTO into the clean client model.
   */
  toClientStructureComponent: (dto: StructureComponentDto): ClientStructureComponent => ({
    subComponents: (dto.subComponents ?? []).map(structureComponentMapper.toClientSubComponent),
    comments: dto.comments ?? "",
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt).toISOString().split("T")[0] : "",
    componentCode: dto.componentCode,
    description: dto.description,
    importanceLevel: dto.importanceLevel,
    basicMeasurementUnit: dto.basicMeasurementUnit,
    secondaryMeasurementUnit: dto.secondaryMeasurementUnit ?? null,
    quantity: dto.quantity,
    evaluationNeeded: dto.evaluationNeeded,
    notes: dto.notes ?? null
  }),

  toApiSubComponent: (data: SubComponentData): SubComponentInput => ({
    index: data.id,
    name: data.name,
    basicQuantity: data.basicQuantity,
    secondaryQuantity: data.secondaryQuantity,
    comments: data.comments || null,
    attachment: data.attachments?.length ? data.attachments.join(",") : null
  }),

  /**
   * Maps client-side data (ClientStructureComponent) back to the API StructureComponentInput.
   */
  toApiStructureComponent: (client: ClientStructureComponent): StructureComponentInput => ({
    componentCode: client.componentCode,
    description: client.description,
    importanceLevel: client.importanceLevel,
    basicMeasurementUnit: client.basicMeasurementUnit,
    secondaryMeasurementUnit: client.secondaryMeasurementUnit ?? null,
    quantity: client.quantity,
    evaluationNeeded: client.evaluationNeeded,
    notes: client.notes ?? null,
    comments: client.comments ?? null,
    subComponents: client.subComponents.map(structureComponentMapper.toApiSubComponent)
  })
}
