import dotenv from "dotenv"

dotenv.config()

interface EnvConfig {
  port: number
  nodeEnv: string
  logProvider: string
  logLevel: string
  jwtSecret: string
  jwtExpiresIn: string
  refreshTokenExpiresInDays: number
  resendApiKey: string
  fromEmail: string
  frontendUrl: string
  databaseUrl: string
  exposeEmailTokens: boolean
}

function validateEnv(): EnvConfig {
  const requiredVars = ["JWT_SECRET", "RESEND_API_KEY", "DATABASE_URL"]

  const missing = requiredVars.filter(v => !process.env[v])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }

  return {
    port: Number(process.env.PORT) || 4000,
    nodeEnv: process.env.NODE_ENV || "production",
    logProvider: process.env.LOG_PROVIDER || "console",
    logLevel: process.env.LOG_LEVEL || "info",
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    refreshTokenExpiresInDays: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) || 30,
    resendApiKey: process.env.RESEND_API_KEY!,
    fromEmail: process.env.FROM_EMAIL || "noreply@example.com",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    databaseUrl: process.env.DATABASE_URL!,
    exposeEmailTokens: process.env.EXPOSE_EMAIL_TOKENS === "true"
  }
}

export const env = validateEnv()
