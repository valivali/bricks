import { prisma } from "../../lib/prisma.js"
import { toStructureComponentDto, type StructureComponentDto } from "../../dto/structure-component.dto.js"
import type { BulkUpsertStructureComponentsInput } from "../../schemas/structure-component.schema.js"
import type { StructureComponentService } from "./structure-component.interface.js"

class StructureComponentServiceImpl implements StructureComponentService {
  async getComponentsByStructureId(userId: string, structureId: string): Promise<StructureComponentDto[]> {
    const structure = await prisma.structureId.findFirst({
      where: { id: structureId, userId }
    })

    if (!structure) {
      throw new Error("רכיבים למבנה לא נמצאים")
    }

    const components = await prisma.structureComponent.findMany({
      where: { structureId },
      include: {
        subComponents: {
          orderBy: { index: "asc" }
        }
      },
      orderBy: { createdAt: "asc" }
    })

    return components.map(toStructureComponentDto)
  }

  async bulkUpsertComponents(
    userId: string,
    structureId: string,
    data: BulkUpsertStructureComponentsInput
  ): Promise<StructureComponentDto[]> {
    const structure = await prisma.structureId.findFirst({
      where: { id: structureId, userId }
    })

    if (!structure) {
      throw new Error("רכיבים למבנה לא נמצאים")
    }

    return await prisma.$transaction(async tx => {
      await tx.structureComponent.deleteMany({
        where: { structureId }
      })

      const createdComponents = await Promise.all(
        data.components.map(async comp => {
          return await tx.structureComponent.create({
            data: {
              structureId,
              componentCode: comp.componentCode,
              description: comp.description,
              importanceLevel: comp.importanceLevel,
              basicMeasurementUnit: comp.basicMeasurementUnit,
              secondaryMeasurementUnit: comp.secondaryMeasurementUnit,
              quantity: comp.quantity,
              evaluationNeeded: comp.evaluationNeeded,
              notes: comp.notes,
              comments: comp.comments,
              subComponents: {
                create: comp.subComponents.map(sub => ({
                  index: sub.index,
                  name: sub.name,
                  basicQuantity: sub.basicQuantity,
                  secondaryQuantity: sub.secondaryQuantity,
                  comments: sub.comments,
                  attachment: sub.attachment
                }))
              }
            },
            include: {
              subComponents: {
                orderBy: { index: "asc" }
              }
            }
          })
        })
      )

      return createdComponents.map(toStructureComponentDto)
    })
  }
}

export const structureComponentService = new StructureComponentServiceImpl()
