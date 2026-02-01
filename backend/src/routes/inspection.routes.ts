import { Router } from "express"
import { InspectionController } from "../controllers/inspection.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()
const inspectionController = InspectionController.build()

router.post("/", authMiddleware, inspectionController.createInspection)
router.get("/user", authMiddleware, inspectionController.getUserInspections)
router.get("/:id", authMiddleware, inspectionController.getInspectionById)
router.put("/:id", authMiddleware, inspectionController.updateInspection)

export default router
