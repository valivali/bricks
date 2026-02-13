import type { LogContext, Logger } from "./logger.interface.js"
import { getLogContext } from "./request-context.js"
import { env } from "../../config/env.config.js"

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
  private readonly isDevelopment = env.nodeEnv === "development"

  private readonly colors = {
    INFO: "\x1b[44m\x1b[37m",
    WARN: "\x1b[43m\x1b[30m",
    ERROR: "\x1b[41m\x1b[37m",
    DEBUG: "\x1b[100m\x1b[37m",
    RESET: "\x1b[0m",
    DIM: "\x1b[2m",
    CYAN: "\x1b[36m"
  }

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

  private formatDevelopment(level: "DEBUG" | "INFO" | "WARN" | "ERROR", message: string, context?: Record<string, unknown>): string {
    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false })
    const coloredLevel = `${this.colors[level]} ${level} ${this.colors.RESET}`

    let line = `${this.colors.DIM}${timestamp}${this.colors.RESET} ${coloredLevel} ${message}`

    if (context && Object.keys(context).length > 0) {
      const contextStr = JSON.stringify(context, null, 2)
        .split("\n")
        .map(l => `  ${this.colors.CYAN}${l}${this.colors.RESET}`)
        .join("\n")
      line += `\n${contextStr}`
    }

    return line
  }

  private formatProduction(level: "DEBUG" | "INFO" | "WARN" | "ERROR", message: string, context?: Record<string, unknown>): string {
    const payload = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && Object.keys(context).length > 0 ? { context } : {})
    }
    return JSON.stringify(payload)
  }

  private log(level: "DEBUG" | "INFO" | "WARN" | "ERROR", message: string, context?: LogContext): void {
    const normalizedLevel = level.toLowerCase() as "debug" | "info" | "warn" | "error"
    if (!this.shouldLog(normalizedLevel)) {
      return
    }

    const mergedContext = { ...getLogContext(), ...(context ?? {}) }
    const serializedContext =
      Object.keys(mergedContext).length > 0
        ? Object.fromEntries(Object.entries(mergedContext).map(([key, value]) => [key, safeSerialize(value)]))
        : undefined

    const line = this.isDevelopment
      ? this.formatDevelopment(level, message, serializedContext)
      : this.formatProduction(level, message, serializedContext)

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
