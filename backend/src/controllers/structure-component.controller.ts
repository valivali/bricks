import type { Request, Response } from "express"
import { structureComponentService } from "../services/structure-component/structure-component.service.js"
import { handleApiError } from "../lib/http/error-handler.js"
import { bulkUpsertStructureComponentsSchema } from "../schemas/structure-component.schema.js"

export const getComponentsByStructureId = async (req: Request, res: Response) => {
  try {
    const { structureId } = req.params
    const userId = (req as any).userId!

    const components = await structureComponentService.getComponentsByStructureId(userId, structureId)

    res.json(components)
  } catch (error) {
    handleApiError(res, error, { operation: "structure-component.get-components-by-structure-id", knownErrorStatus: 404 })
  }
}

export const bulkUpsertComponents = async (req: Request, res: Response) => {
  try {
    const { structureId } = req.params
    const userId = (req as any).userId!

    const validatedData = bulkUpsertStructureComponentsSchema.parse(req.body)

    const components = await structureComponentService.bulkUpsertComponents(userId, structureId, validatedData)

    res.json(components)
  } catch (error) {
    handleApiError(res, error, { operation: "structure-component.bulk-upsert-components", knownErrorStatus: 400 })
  }
}
