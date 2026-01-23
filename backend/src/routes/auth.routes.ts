import { Router } from "express"
import { AuthController } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = Router()
const authController = AuthController.build()

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/verify-email", authController.verifyEmail)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password", authController.resetPassword)
router.get("/me", authMiddleware, authController.getCurrentUser)

export default router
