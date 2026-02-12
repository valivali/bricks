import { AsyncLocalStorage } from "async_hooks"
import type { LogContext } from "./logger.interface.js"

const storage = new AsyncLocalStorage<LogContext>()

export const runWithLogContext = (context: LogContext, callback: () => void): void => {
  storage.run(context, callback)
}

export const addToLogContext = (context: LogContext): void => {
  const existing = storage.getStore()
  if (!existing) return
  Object.assign(existing, context)
}

export const getLogContext = (): LogContext => {
  return storage.getStore() ?? {}
}
