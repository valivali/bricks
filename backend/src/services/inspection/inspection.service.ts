import type { Inspection } from "../../generated/prisma/client.js"
import type { InspectionDto } from "../../dto/inspection.dto.js"
import type { CreateInspectionInput, UpdateInspectionInput } from "../../schemas/inspection.schema.js"
import { prisma, type PrismaDbClient } from "../../lib/prisma.js"
import { InspectionServiceInterface } from "./inspection.interface.js"
import { logger } from "../../lib/logger/index.js"

export class InspectionService implements InspectionServiceInterface {
  constructor(private readonly prismaClient: PrismaDbClient) {}

  async createInspection(userId: string, data: CreateInspectionInput): Promise<InspectionDto> {
    const inspection = await this.prismaClient.inspection.create({
      data: {
        userId,
        ...data
      }
    })

    return this.toDto(inspection)
  }

  async updateInspection(userId: string, inspectionId: string, data: UpdateInspectionInput): Promise<InspectionDto> {
    const existing = await this.prismaClient.inspection.findFirst({
      where: { id: inspectionId, userId }
    })

    if (!existing) {
      logger.warn("inspection not found on update inspection", { userId, inspectionId })
      throw new Error("סקירה לא נמצאה")
    }

    const inspection = await this.prismaClient.inspection.update({
      where: { id: inspectionId },
      data
    })

    logger.info("inspection updated", { userId, inspectionId })
    return this.toDto(inspection)
  }

  async getInspectionById(userId: string, inspectionId: string): Promise<InspectionDto> {
    const inspection = await this.prismaClient.inspection.findFirst({
      where: { id: inspectionId, userId }
    })

    if (!inspection) {
      logger.warn("inspection not found on get inspection by id", { userId, inspectionId })
      throw new Error("סקירה לא נמצאה")
    }

    return this.toDto(inspection)
  }

  async getUserInspections(userId: string): Promise<InspectionDto[]> {
    const inspections = await this.prismaClient.inspection.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })

    return inspections.map((inspection: Inspection) => this.toDto(inspection))
  }

  async getStructureInspections(userId: string, structureId: string): Promise<InspectionDto[]> {
    const structure = await this.prismaClient.structureId.findFirst({
      where: { id: structureId, userId }
    })

    if (!structure) {
      logger.warn("structure not found on get structure inspections", { userId, structureId })
      throw new Error("Structure not found")
    }

    const inspections = await this.prismaClient.inspection.findMany({
      where: { structureId },
      orderBy: { createdAt: "desc" }
    })

    logger.info("structure inspections found", { userId, structureId })
    return inspections.map((inspection: Inspection) => this.toDto(inspection))
  }

  static build(): InspectionService {
    return new InspectionService(prisma)
  }

  private toDto(inspection: Inspection): InspectionDto {
    return {
      id: inspection.id,
      userId: inspection.userId,
      structureId: inspection.structureId ?? null,
      lastUpdated: inspection.lastUpdated?.toISOString() ?? null,
      structureType: inspection.structureType,
      generalDescription: inspection.generalDescription ?? null,
      inspectionType: inspection.inspectionType ?? null,
      companyName: inspection.companyName ?? null,
      inspectorName: inspection.inspectorName ?? null,
      structureNumber: inspection.structureNumber ?? null,
      structureName: inspection.structureName ?? null,
      structureMarking: inspection.structureMarking ?? null,
      roadNumber: inspection.roadNumber ?? null,
      runningDistance: inspection.runningDistance ?? null,
      area: inspection.area ?? null,
      fullStructureIncluded: inspection.fullStructureIncluded,
      fullStructureNotes: inspection.fullStructureNotes ?? null,
      spanCount: inspection.spanCount ?? null,
      spanCountNotes: inspection.spanCountNotes ?? null,
      adjacentStructures: inspection.adjacentStructures ?? null,
      adjacentStructuresNotes: inspection.adjacentStructuresNotes ?? null,
      siteRestrictions: inspection.siteRestrictions ?? null,
      inspectionDate: inspection.inspectionDate?.toISOString() ?? null,
      nextInspectionType: inspection.nextInspectionType ?? null,
      nextInspectionDate: inspection.nextInspectionDate?.toISOString() ?? null,
      classificationForInspection: inspection.classificationForInspection ?? null,
      coordinateNorth: inspection.coordinateNorth ?? null,
      coordinateEast: inspection.coordinateEast ?? null,
      createdAt: inspection.createdAt.toISOString(),
      updatedAt: inspection.updatedAt.toISOString()
    }
  }
}
