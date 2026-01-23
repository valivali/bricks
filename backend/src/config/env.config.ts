import dotenv from "dotenv"

dotenv.config()

interface EnvConfig {
  port: number
  jwtSecret: string
  jwtExpiresIn: string
  resendApiKey: string
  fromEmail: string
  frontendUrl: string
  databaseUrl: string
}

function validateEnv(): EnvConfig {
  const requiredVars = [
    "JWT_SECRET",
    "RESEND_API_KEY",
    "DATABASE_URL"
  ]

  const missing = requiredVars.filter(v => !process.env[v])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }

  return {
    port: Number(process.env.PORT) || 4000,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    resendApiKey: process.env.RESEND_API_KEY!,
    fromEmail: process.env.FROM_EMAIL || "noreply@example.com",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    databaseUrl: process.env.DATABASE_URL!
  }
}

export const env = validateEnv()
