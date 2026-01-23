import jwt from "jsonwebtoken"
import { env } from "../config/env.config.js"

export interface JwtPayload {
  userId: string
  email: string
}

export interface JwtProviderInterface {
  sign(payload: JwtPayload): string
  verify(token: string): JwtPayload
  decode(token: string): JwtPayload | null
}

export class JwtProvider implements JwtProviderInterface {

  constructor(private readonly secret: string, private readonly expiresIn: string) {}

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as jwt.SignOptions)
  }

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload
    } catch (error) {
      throw new Error("Invalid or expired token")
    }
  }

  decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload
    } catch {
      return null
    }
  }

  static build(): JwtProvider {
    return new JwtProvider(env.jwtSecret, env.jwtExpiresIn)
  }
}
