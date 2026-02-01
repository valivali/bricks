import type { PrismaClient } from "../../generated/prisma/client.js"
import type { StructureId } from "../../generated/prisma/client.js"
import type { StructureIdDto } from "../../dto/structure-id.dto.js"
import type { CreateStructureIdInput, UpdateStructureIdInput } from "../../schemas/structure-id.schema.js"
import { prisma } from "../../lib/prisma.js"
import { StructureIdServiceInterface } from "./structure-id.interface.js"

export class StructureIdService implements StructureIdServiceInterface {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createStructureId(userId: string, data: CreateStructureIdInput): Promise<StructureIdDto> {
    const structureId = await this.prismaClient.structureId.create({
      data: {
        userId,
        ...data
      }
    })

    return this.toDto(structureId)
  }

  async updateStructureId(userId: string, structureIdId: string, data: UpdateStructureIdInput): Promise<StructureIdDto> {
    const existing = await this.prismaClient.structureId.findFirst({
      where: { id: structureIdId, userId }
    })

    if (!existing) {
      throw new Error("תעודת זהות למבנה לא נמצאה")
    }

    const structureId = await this.prismaClient.structureId.update({
      where: { id: structureIdId },
      data
    })

    return this.toDto(structureId)
  }

  async getStructureIdById(userId: string, structureIdId: string): Promise<StructureIdDto> {
    const structureId = await this.prismaClient.structureId.findFirst({
      where: { id: structureIdId, userId }
    })

    if (!structureId) {
      throw new Error("תעודת זהות למבנה לא נמצאה")
    }

    return this.toDto(structureId)
  }

  async getUserStructureIds(userId: string): Promise<StructureIdDto[]> {
    const structureIds = await this.prismaClient.structureId.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })

    return structureIds.map(structureId => this.toDto(structureId))
  }

  async deleteStructureId(userId: string, structureIdId: string): Promise<void> {
    const existing = await this.prismaClient.structureId.findFirst({
      where: { id: structureIdId, userId }
    })

    if (!existing) {
      throw new Error("תעודת זהות למבנה לא נמצאה")
    }

    await this.prismaClient.structureId.delete({
      where: { id: structureIdId }
    })
  }

  static build(): StructureIdService {
    return new StructureIdService(prisma)
  }

  private toDto(structureId: StructureId): StructureIdDto {
    return {
      id: structureId.id,
      userId: structureId.userId,
      structureNumber: structureId.structureNumber,
      structureName: structureId.structureName,
      structureMarking: structureId.structureMarking,
      generalDescription: structureId.generalDescription,
      area: structureId.area,
      belongsToRoad: structureId.belongsToRoad,
      runningDistanceKm: structureId.runningDistanceKm,
      runningDistanceStart: structureId.runningDistanceStart,
      runningDistanceEnd: structureId.runningDistanceEnd,
      coordinateNorth: structureId.coordinateNorth,
      coordinateEast: structureId.coordinateEast,
      primaryClassificationGroup: structureId.primaryClassificationGroup,
      secondaryClassificationGroup: structureId.secondaryClassificationGroup,
      trafficFunctionClass: structureId.trafficFunctionClass,
      emergencyClass: structureId.emergencyClass,
      builtBy: structureId.builtBy,
      owner: structureId.owner,
      maintenanceResponsibility: structureId.maintenanceResponsibility,
      tollRoad: structureId.tollRoad,
      specialTransport: structureId.specialTransport,
      historicalValue: structureId.historicalValue,
      temporaryStructure: structureId.temporaryStructure,
      constructionYear: structureId.constructionYear,
      lastRehabYear: structureId.lastRehabYear,
      primaryUsageAbove: structureId.primaryUsageAbove,
      primaryRoadNumberAbove: structureId.primaryRoadNumberAbove,
      secondaryUsageAbove: structureId.secondaryUsageAbove,
      secondaryRoadNumberAbove: structureId.secondaryRoadNumberAbove,
      tracksOrRailwaysAbove: structureId.tracksOrRailwaysAbove,
      lanesAbove: structureId.lanesAbove,
      trafficDirectionAbove: structureId.trafficDirectionAbove,
      primaryUsageBelow: structureId.primaryUsageBelow,
      primaryRoadNumberBelow: structureId.primaryRoadNumberBelow,
      secondaryUsageBelow: structureId.secondaryUsageBelow,
      secondaryRoadNumberBelow: structureId.secondaryRoadNumberBelow,
      tracksOrRailwaysBelow: structureId.tracksOrRailwaysBelow,
      lanesBelow: structureId.lanesBelow,
      trafficDirectionBelow: structureId.trafficDirectionBelow,
      aadt: structureId.aadt,
      aadtYear: structureId.aadtYear,
      aadtt: structureId.aadtt,
      bypassPossible: structureId.bypassPossible,
      bypassLength: structureId.bypassLength,
      bypassDescription: structureId.bypassDescription,
      localBypass: structureId.localBypass,
      localBypassMethod: structureId.localBypassMethod,
      localBypassMethodOther: structureId.localBypassMethodOther,
      originalPlanner: structureId.originalPlanner,
      rehabPlanner: structureId.rehabPlanner,
      spanCount: structureId.spanCount,
      maxSpanLength: structureId.maxSpanLength,
      totalLength: structureId.totalLength,
      lengthRight: structureId.lengthRight,
      lengthLeft: structureId.lengthLeft,
      spanDistribution: structureId.spanDistribution,
      widthChange: structureId.widthChange,
      minWidthPerpendicular: structureId.minWidthPerpendicular,
      maxWidthPerpendicular: structureId.maxWidthPerpendicular,
      maxExternalWidth: structureId.maxExternalWidth,
      minExternalWidth: structureId.minExternalWidth,
      rightSidewalkWidth: structureId.rightSidewalkWidth,
      leftSidewalkWidth: structureId.leftSidewalkWidth,
      minRoadwayWidth: structureId.minRoadwayWidth,
      totalRoadwayWidth: structureId.totalRoadwayWidth,
      separatorType: structureId.separatorType,
      separatorTypeOther: structureId.separatorTypeOther,
      skewAngle: structureId.skewAngle,
      minVerticalClearanceBelow: structureId.minVerticalClearanceBelow,
      verticalClearanceDrainage: structureId.verticalClearanceDrainage,
      minVerticalClearanceAbove: structureId.minVerticalClearanceAbove,
      heightSignageValue: structureId.heightSignageValue,
      minHorizontalClearance: structureId.minHorizontalClearance,
      maxPierHeight: structureId.maxPierHeight,
      maxWallHeight: structureId.maxWallHeight,
      avgJointSpacing: structureId.avgJointSpacing,
      minDistanceYellowLineTop: structureId.minDistanceYellowLineTop,
      minDistanceYellowLineBottom: structureId.minDistanceYellowLineBottom,
      wallFaceArea: structureId.wallFaceArea,
      deckArea: structureId.deckArea,
      maxTheoreticalVerticalDim: structureId.maxTheoreticalVerticalDim,
      maxHorizontalDim: structureId.maxHorizontalDim,
      minVerticalClearanceTunnel: structureId.minVerticalClearanceTunnel,
      minHorizontalClearanceTunnel: structureId.minHorizontalClearanceTunnel,
      deckTypeCount: structureId.deckTypeCount,
      deckTypes: structureId.deckTypes,
      deckTypesOther: structureId.deckTypesOther,
      floorType: structureId.floorType,
      floorTypeOther: structureId.floorTypeOther,
      abutment1Type: structureId.abutment1Type,
      abutment1TypeOther: structureId.abutment1TypeOther,
      abutment2Type: structureId.abutment2Type,
      abutment2TypeOther: structureId.abutment2TypeOther,
      pierTypeCount: structureId.pierTypeCount,
      pierTypes: structureId.pierTypes,
      pierTypesOther: structureId.pierTypesOther,
      prestressingType: structureId.prestressingType,
      prestressingTypeOther: structureId.prestressingTypeOther,
      bearingTypes: structureId.bearingTypes,
      bearingTypesOther: structureId.bearingTypesOther,
      jointTypes: structureId.jointTypes,
      jointTypesOther: structureId.jointTypesOther,
      deckMaterials: structureId.deckMaterials,
      deckMaterialsOther: structureId.deckMaterialsOther,
      beamMaterials: structureId.beamMaterials,
      beamMaterialsOther: structureId.beamMaterialsOther,
      abutmentMaterials: structureId.abutmentMaterials,
      abutmentMaterialsOther: structureId.abutmentMaterialsOther,
      pierMaterials: structureId.pierMaterials,
      pierMaterialsOther: structureId.pierMaterialsOther,
      slopeProtectionMaterials: structureId.slopeProtectionMaterials,
      slopeProtectionMaterialsOther: structureId.slopeProtectionMaterialsOther,
      vehicleBarrierMaterials: structureId.vehicleBarrierMaterials,
      vehicleBarrierMaterialsOther: structureId.vehicleBarrierMaterialsOther,
      pedestrianRailingMaterials: structureId.pedestrianRailingMaterials,
      pedestrianRailingMaterialsOther: structureId.pedestrianRailingMaterialsOther,
      deckCoveringMaterials: structureId.deckCoveringMaterials,
      deckCoveringMaterialsOther: structureId.deckCoveringMaterialsOther,
      deckSealingMaterials: structureId.deckSealingMaterials,
      deckSealingMaterialsOther: structureId.deckSealingMaterialsOther,
      curbMaterials: structureId.curbMaterials,
      curbMaterialsOther: structureId.curbMaterialsOther,
      loadRatingMethod: structureId.loadRatingMethod,
      loadRatingResult: structureId.loadRatingResult,
      loadRatingDate: structureId.loadRatingDate?.toISOString() ?? null,
      seismicRatingMethod: structureId.seismicRatingMethod,
      seismicRatingResult: structureId.seismicRatingResult,
      seismicRatingDate: structureId.seismicRatingDate?.toISOString() ?? null,
      approvedLoadLimits: structureId.approvedLoadLimits,
      loadSignage: structureId.loadSignage,
      infrastructureTypes: structureId.infrastructureTypes,
      infrastructureTypesOther: structureId.infrastructureTypesOther,
      maxRelativeLevel: structureId.maxRelativeLevel,
      designReturnPeriod: structureId.designReturnPeriod,
      hydraulicAdequacy: structureId.hydraulicAdequacy,
      conditionPIav: structureId.conditionPIav,
      conditionPIcrit: structureId.conditionPIcrit,
      availabilityPI: structureId.availabilityPI,
      reliabilityPI: structureId.reliabilityPI,
      inspectionClassification: structureId.inspectionClassification,
      initialInspectionDate: structureId.initialInspectionDate?.toISOString() ?? null,
      lastRoutineInspectionDate: structureId.lastRoutineInspectionDate?.toISOString() ?? null,
      routineInspectionFrequency: structureId.routineInspectionFrequency,
      damageControlInspectionDate: structureId.damageControlInspectionDate?.toISOString() ?? null,
      underwaterInspectionDate: structureId.underwaterInspectionDate?.toISOString() ?? null,
      thoroughInspectionDate: structureId.thoroughInspectionDate?.toISOString() ?? null,
      specialInspectionDate: structureId.specialInspectionDate?.toISOString() ?? null,
      createdAt: structureId.createdAt.toISOString(),
      updatedAt: structureId.updatedAt.toISOString()
    }
  }
}
