import { PrismaClient } from "../generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import { env } from "../config/env.config.js"
import { logger } from "./logger/index.js"

const pool = new pg.Pool({ connectionString: env.databaseUrl })
const adapter = new PrismaPg(pool)

const redactKey = (key: string): boolean => {
  const lowered = key.toLowerCase()
  return (
    lowered.includes("password") ||
    lowered.includes("token") ||
    lowered.includes("secret") ||
    lowered.includes("hash") ||
    lowered.includes("image")
  )
}

const sanitize = (value: unknown, depth = 0): unknown => {
  if (value === null || value === undefined) return value
  if (typeof value === "string") {
    if (value.length > 120) return `[string length=${value.length}]`
    return value
  }
  if (typeof value !== "object") return value
  if (depth >= 3) return "[max_depth]"
  if (Array.isArray(value)) return value.slice(0, 20).map(item => sanitize(item, depth + 1))

  const entries = Object.entries(value as Record<string, unknown>)
  return Object.fromEntries(entries.map(([key, innerValue]) => [key, redactKey(key) ? "[redacted]" : sanitize(innerValue, depth + 1)]))
}

const summarizeResult = (result: unknown): unknown => {
  if (result === null || result === undefined) return result
  if (Array.isArray(result)) return { type: "array", count: result.length }
  if (typeof result === "object") {
    const obj = result as Record<string, unknown>
    if (typeof obj.count === "number") return { count: obj.count }
    if (typeof obj.id === "string") return { id: obj.id }
    return { type: "object", keys: Object.keys(obj).slice(0, 20) }
  }
  return result
}

const basePrisma = new PrismaClient({ adapter })

export const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }: { model: any; operation: any; args: any; query: any }) {
        const startedAt = Date.now()
        const safeArgs = sanitize(args)

        logger.debug("db.operation.started", {
          model,
          operation,
          args: safeArgs
        })

        try {
          const result = await query(args)
          logger.info("db.operation.succeeded", {
            model,
            operation,
            durationMs: Date.now() - startedAt,
            result: summarizeResult(result)
          })
          return result
        } catch (error) {
          logger.error("db.operation.failed", {
            model,
            operation,
            durationMs: Date.now() - startedAt,
            args: safeArgs,
            error
          })
          throw error
        }
      }
    }
  }
})

export type PrismaDbClient = typeof prisma
