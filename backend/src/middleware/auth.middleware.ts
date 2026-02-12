import type { Request, Response, NextFunction } from "express"
import { JwtProvider } from "../providers/jwt.provider.js"
import { logger } from "../lib/logger/index.js"
import { addToLogContext } from "../lib/logger/request-context.js"

const jwtProvider = JwtProvider.build()

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("auth.failed.missing_token", {
        requestId: (req as any).requestId,
        path: req.originalUrl,
        method: req.method
      })
      res.status(401).json({ error: "No token provided" })
      return
    }

    const token = authHeader.substring(7)
    const payload = jwtProvider.verify(token)

    ;(req as any).userId = payload.userId
    ;(req as any).userEmail = payload.email
    addToLogContext({ userId: payload.userId, userEmail: payload.email })

    next()
  } catch (error) {
    logger.warn("auth.failed.invalid_token", {
      requestId: (req as any).requestId,
      path: req.originalUrl,
      method: req.method,
      error
    })
    res.status(401).json({ error: "Invalid or expired token" })
  }
}
