import type { UserProfileDto } from "../../dto/profile.dto.js"
import type { UpdateProfileInput } from "../../schemas/profile.schema.js"

export interface ProfileServiceInterface {
  getProfile(userId: string): Promise<UserProfileDto>
  updateProfile(userId: string, data: UpdateProfileInput): Promise<UserProfileDto>
}
