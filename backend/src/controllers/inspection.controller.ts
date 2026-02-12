import type { Request, Response } from "express"
import { InspectionServiceInterface } from "../services/inspection/inspection.interface.js"
import { InspectionService } from "../services/inspection/inspection.service.js"
import { createInspectionSchema, updateInspectionSchema } from "../schemas/inspection.schema.js"
import { handleApiError } from "../lib/http/error-handler.js"

export class InspectionController {
  constructor(private readonly inspectionService: InspectionServiceInterface) {}

  static build(): InspectionController {
    return new InspectionController(InspectionService.build())
  }

  createInspection = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const parsed = createInspectionSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const inspection = await this.inspectionService.createInspection(userId, parsed.data)
      res.status(201).json(inspection)
    } catch (error) {
      handleApiError(res, error, { operation: "inspection.create", knownErrorStatus: 400 })
    }
  }

  updateInspection = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const parsed = updateInspectionSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const inspection = await this.inspectionService.updateInspection(userId, req.params.id, parsed.data)
      res.status(200).json(inspection)
    } catch (error) {
      handleApiError(res, error, { operation: "inspection.update", knownErrorStatus: 404 })
    }
  }

  getInspectionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const inspection = await this.inspectionService.getInspectionById(userId, req.params.id)
      res.status(200).json(inspection)
    } catch (error) {
      handleApiError(res, error, { operation: "inspection.get-by-id", knownErrorStatus: 404 })
    }
  }

  getUserInspections = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const inspections = await this.inspectionService.getUserInspections(userId)
      res.status(200).json(inspections)
    } catch (error) {
      handleApiError(res, error, { operation: "inspection.list", knownErrorStatus: 400 })
    }
  }

  getStructureInspections = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const { structureId } = req.params
      const inspections = await this.inspectionService.getStructureInspections(userId, structureId)
      res.status(200).json(inspections)
    } catch (error) {
      handleApiError(res, error, { operation: "inspection.list-by-structure", knownErrorStatus: 404 })
    }
  }
}
