import { Router } from "express"
import { StructureIdController } from "../controllers/structure-id.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()
const structureIdController = StructureIdController.build()

router.post("/", authMiddleware, structureIdController.createStructureId)
router.get("/", authMiddleware, structureIdController.getUserStructureIds)
router.get("/:id", authMiddleware, structureIdController.getStructureIdById)
router.put("/:id", authMiddleware, structureIdController.updateStructureId)
router.delete("/:id", authMiddleware, structureIdController.deleteStructureId)

export default router
