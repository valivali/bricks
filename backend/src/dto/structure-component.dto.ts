import type { StructureComponent, SubComponent } from "@/generated/prisma"

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

export const toSubComponentDto = (subComponent: SubComponent): SubComponentDto => ({
  id: subComponent.id,
  componentId: subComponent.componentId,
  index: subComponent.index,
  name: subComponent.name,
  basicQuantity: subComponent.basicQuantity,
  secondaryQuantity: subComponent.secondaryQuantity,
  comments: subComponent.comments,
  attachment: subComponent.attachment,
  createdAt: subComponent.createdAt.toISOString(),
  updatedAt: subComponent.updatedAt.toISOString()
})

export const toStructureComponentDto = (component: StructureComponent & { subComponents: SubComponent[] }): StructureComponentDto => ({
  id: component.id,
  structureId: component.structureId,
  componentCode: component.componentCode,
  description: component.description,
  importanceLevel: component.importanceLevel,
  basicMeasurementUnit: component.basicMeasurementUnit,
  secondaryMeasurementUnit: component.secondaryMeasurementUnit,
  quantity: component.quantity,
  evaluationNeeded: component.evaluationNeeded,
  notes: component.notes,
  comments: component.comments,
  subComponents: component.subComponents.map(toSubComponentDto),
  createdAt: component.createdAt.toISOString(),
  updatedAt: component.updatedAt.toISOString()
})
