import { Router } from "express"
import { ProfileController } from "../controllers/profile.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()
const profileController = ProfileController.build()

router.get("/", authMiddleware, profileController.getProfile)
router.patch("/", authMiddleware, profileController.updateProfile)

export default router
