import type { User } from "../generated/prisma/client.js"
import type { UserDto } from "../dto/auth.dto.js"

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  static toDtoWithoutSensitiveData(user: User): UserDto {
    return this.toDto(user)
  }
}
