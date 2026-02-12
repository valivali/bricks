import type { LogContext, Logger } from "./logger.interface.js"
import { getLogContext } from "./request-context.js"

const safeSerialize = (value: unknown): unknown => {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack
    }
  }
  return value
}

export class ConsoleLogger implements Logger {
  constructor(private readonly minLevel: "debug" | "info" | "warn" | "error" = "info") {}

  private shouldLog(level: "debug" | "info" | "warn" | "error"): boolean {
    const order: Record<"debug" | "info" | "warn" | "error", number> = {
      debug: 10,
      info: 20,
      warn: 30,
      error: 40
    }

    return order[level] >= order[this.minLevel]
  }

  private log(level: "DEBUG" | "INFO" | "WARN" | "ERROR", message: string, context?: LogContext): void {
    const normalizedLevel = level.toLowerCase() as "debug" | "info" | "warn" | "error"
    if (!this.shouldLog(normalizedLevel)) {
      return
    }

    const mergedContext = { ...getLogContext(), ...(context ?? {}) }
    const payload = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(Object.keys(mergedContext).length > 0
        ? { context: Object.fromEntries(Object.entries(mergedContext).map(([key, value]) => [key, safeSerialize(value)])) }
        : {})
    }

    const line = JSON.stringify(payload)

    if (level === "ERROR") {
      console.error(line)
      return
    }

    if (level === "WARN") {
      console.warn(line)
      return
    }

    console.log(line)
  }

  debug(message: string, context?: LogContext): void {
    this.log("DEBUG", message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log("INFO", message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log("WARN", message, context)
  }

  error(message: string, context?: LogContext): void {
    this.log("ERROR", message, context)
  }
}
