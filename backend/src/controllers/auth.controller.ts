import type { Request, Response } from "express"
import { AuthServiceInterface } from "../services/auth/auth.interface.js"
import { AuthService } from "../services/auth/auth.service.js"
import { handleApiError } from "../lib/http/error-handler.js"
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  refreshTokenSchema
} from "../schemas/auth.schema.js"

export class AuthController {
  constructor(private readonly authService: AuthServiceInterface) {}

  static build(): AuthController {
    return new AuthController(AuthService.build())
  }

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = signupSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const result = await this.authService.signup(parsed.data.email, parsed.data.password)

      res.status(201).json(result)
    } catch (error) {
      handleApiError(res, error, { operation: "auth.signup", knownErrorStatus: 400 })
    }
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = loginSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const result = await this.authService.login(parsed.data.email, parsed.data.password)

      res.status(200).json(result)
    } catch (error) {
      handleApiError(res, error, { operation: "auth.login", knownErrorStatus: 401 })
    }
  }

  refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = refreshTokenSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const result = await this.authService.refresh(parsed.data.refreshToken)

      res.status(200).json(result)
    } catch (error) {
      handleApiError(res, error, { operation: "auth.refresh", knownErrorStatus: 401 })
    }
  }

  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = verifyEmailSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const result = await this.authService.verifyEmail(parsed.data.token)

      res.status(200).json(result)
    } catch (error) {
      handleApiError(res, error, { operation: "auth.verify-email", knownErrorStatus: 400 })
    }
  }

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = forgotPasswordSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const result = await this.authService.forgotPassword(parsed.data.email)

      res.status(200).json(result)
    } catch (error) {
      handleApiError(res, error, { operation: "auth.forgot-password", knownErrorStatus: 500 })
    }
  }

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = resetPasswordSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const result = await this.authService.resetPassword(parsed.data.token, parsed.data.password)

      res.status(200).json(result)
    } catch (error) {
      handleApiError(res, error, { operation: "auth.reset-password", knownErrorStatus: 400 })
    }
  }

  getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const user = await this.authService.getCurrentUser(userId)

      res.status(200).json(user)
    } catch (error) {
      handleApiError(res, error, { operation: "auth.current-user", knownErrorStatus: 404 })
    }
  }
}
