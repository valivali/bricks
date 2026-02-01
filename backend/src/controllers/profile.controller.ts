import type { Request, Response } from "express"
import { ProfileServiceInterface } from "../services/profile/profile.interface.js"
import { ProfileService } from "../services/profile/profile.service.js"
import { updateProfileSchema } from "../schemas/profile.schema.js"

export class ProfileController {
  constructor(private readonly profileService: ProfileServiceInterface) {}

  static build(): ProfileController {
    return new ProfileController(ProfileService.build())
  }

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const profile = await this.profileService.getProfile(userId)
      res.status(200).json(profile)
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal server error" })
      }
    }
  }

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" })
        return
      }

      const parsed = updateProfileSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({
          error: "Validation failed",
          details: parsed.error.format()
        })
        return
      }

      const updated = await this.profileService.updateProfile(userId, parsed.data)
      res.status(200).json(updated)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal server error" })
      }
    }
  }
}
