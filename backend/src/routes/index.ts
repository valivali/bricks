import { Router } from "express"
import { pingSchema } from "../schemas/index.js"
import authRoutes from "./auth.routes.js"

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

export default router

