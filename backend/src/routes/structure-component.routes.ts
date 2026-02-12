import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { getComponentsByStructureId, bulkUpsertComponents } from "../controllers/structure-component.controller.js"

const router = Router()

router.use(authMiddleware)

router.get("/:structureId", getComponentsByStructureId)
router.put("/:structureId", bulkUpsertComponents)

export default router
