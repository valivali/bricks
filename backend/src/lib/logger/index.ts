import { ConsoleLogger } from "./console.logger.js"
import type { Logger } from "./logger.interface.js"
import { env } from "../../config/env.config.js"

const createLogger = (): Logger => {
  if (env.logProvider !== "console") {
    console.warn(`Unknown LOG_PROVIDER "${env.logProvider}", falling back to console logger`)
  }

  const level = env.logLevel.toLowerCase()
  const minLevel = level === "debug" || level === "info" || level === "warn" || level === "error" ? level : "info"

  if (minLevel !== level) {
    console.warn(`Unknown LOG_LEVEL "${env.logLevel}", falling back to "info"`)
  }

  return new ConsoleLogger(minLevel)
}

export const logger = createLogger()

export type { Logger, LogContext, LogLevel } from "./logger.interface.js"
