import type { Response } from "express"
import { logger } from "../logger/index.js"

export const isPrismaError = (error: unknown): error is Error => {
  return error instanceof Error && error.name.startsWith("PrismaClient")
}

type HandleApiErrorOptions = {
  operation: string
  knownErrorStatus: number
}

export const handleApiError = (res: Response, error: unknown, options: HandleApiErrorOptions): void => {
  if (isPrismaError(error)) {
    logger.error("api.db_error", {
      operation: options.operation,
      error
    })
    res.status(500).json({ error: "Internal server error" })
    return
  }

  if (error instanceof Error) {
    logger.warn("api.request_error", {
      operation: options.operation,
      error
    })
    res.status(options.knownErrorStatus).json({ error: error.message })
    return
  }

  logger.error("api.unknown_error", {
    operation: options.operation,
    error
  })
  res.status(500).json({ error: "Internal server error" })
}
