import { Router } from "express"
import { pingSchema } from "../schemas/index.js"
import authRoutes from "./auth.routes.js"
import inspectionRoutes from "./inspection.routes.js"
import profileRoutes from "./profile.routes.js"
import structureIdRoutes from "./structure-id.routes.js"
import structureComponentRoutes from "./structure-component.routes.js"

const router = Router()

router.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

router.post("/ping", (req, res) => {
  const parsed = pingSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() })
  }

  return res.json({ ok: true, data: parsed.data })
})

router.use("/auth", authRoutes)
router.use("/inspection", inspectionRoutes)
router.use("/profile", profileRoutes)
router.use("/structure-id", structureIdRoutes)
router.use("/structure-component", structureComponentRoutes)

export default router
