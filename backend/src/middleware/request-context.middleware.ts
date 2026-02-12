import type { NextFunction, Request, Response } from "express"
import { randomUUID } from "crypto"
import { runWithLogContext } from "../lib/logger/request-context.js"

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const incomingRequestId = req.header("x-request-id")
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0 ? incomingRequestId : randomUUID()

  ;(req as any).requestId = requestId
  res.setHeader("x-request-id", requestId)

  runWithLogContext(
    {
      requestId,
      method: req.method,
      path: req.originalUrl
    },
    next
  )
}
