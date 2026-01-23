import type { Request, Response, NextFunction } from "express"
import { JwtProvider } from "../providers/jwt.provider.js"

const jwtProvider = new JwtProvider()

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No token provided" })
      return
    }

    const token = authHeader.substring(7)
    const payload = jwtProvider.verify(token)

    ;(req as any).userId = payload.userId
    ;(req as any).userEmail = payload.email

    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" })
  }
}
