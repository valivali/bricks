import type { Request, Response } from "express"
import { StructureIdServiceInterface } from "../services/structure-id/structure-id.interface.js"
import { StructureIdService } from "../services/structure-id/structure-id.service.js"
import { createStructureIdSchema, updateStructureIdSchema } from "../schemas/structure-id.schema.js"

export class StructureIdController {
  constructor(private readonly structureIdService: StructureIdServiceInterface) {}

  static build(): StructureIdController {
    return new StructureIdController(StructureIdService.build())
  }

  createStructureId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const parsed = createStructureIdSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const structureId = await this.structureIdService.createStructureId(userId, parsed.data)
      res.status(201).json(structureId)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal server error" })
      }
    }
  }

  updateStructureId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const parsed = updateStructureIdSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const structureId = await this.structureIdService.updateStructureId(userId, req.params.id, parsed.data)
      res.status(200).json(structureId)
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal server error" })
      }
    }
  }

  getStructureIdById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const structureId = await this.structureIdService.getStructureIdById(userId, req.params.id)
      res.status(200).json(structureId)
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal server error" })
      }
    }
  }

  getUserStructureIds = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const structureIds = await this.structureIdService.getUserStructureIds(userId)
      res.status(200).json(structureIds)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal server error" })
      }
    }
  }

  deleteStructureId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      await this.structureIdService.deleteStructureId(userId, req.params.id)
      res.status(204).send()
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal server error" })
      }
    }
  }
}
