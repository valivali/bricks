import type { NextFunction, Request, Response } from "express"
import { logger } from "../lib/logger/index.js"

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startedAt = Date.now()
  const requestId = (req as any).requestId

  logger.info("http.request.started", {
    requestId,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip
  })

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt
    const context = {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      userId: (req as any).userId
    }

    if (res.statusCode >= 500) {
      logger.error("http.request.failed", context)
      return
    }

    if (res.statusCode >= 400) {
      logger.warn("http.request.failed", context)
      return
    }

    logger.info("http.request.succeeded", context)
  })

  next()
}
