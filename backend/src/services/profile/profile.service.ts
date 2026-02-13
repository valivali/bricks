import { v4 as uuidv4 } from "uuid"
import type { UserProfileDto } from "../../dto/profile.dto.js"
import type { UpdateProfileInput } from "../../schemas/profile.schema.js"
import { prisma, type PrismaDbClient } from "../../lib/prisma.js"
import { ResendEmailProvider, type EmailProviderInterface } from "../../providers/resend.provider.js"
import { ProfileServiceInterface } from "./profile.interface.js"
import { logger } from "../../lib/logger/index.js"

export class ProfileService implements ProfileServiceInterface {
  constructor(
    private readonly prismaClient: PrismaDbClient,
    private readonly emailProvider: EmailProviderInterface
  ) {}

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    })

    if (!user) {
      logger.warn("user not found on get profile", { userId })
      throw new Error("משתמש לא נמצא")
    }

    const profile =
      user.profile ??
      (await this.prismaClient.userProfile.create({
        data: { userId }
      }))

    return this.toDto(user.email, user.isVerified, profile)
  }

  async updateProfile(userId: string, data: UpdateProfileInput): Promise<UserProfileDto> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    })

    if (!user) {
      logger.warn("user not found on update profile", { userId })
      throw new Error("משתמש לא נמצא")
    }

    if (data.email !== user.email) {
      logger.info("email changed on update profile", { userId, email: data.email })
      const existingUser = await this.prismaClient.user.findUnique({
        where: { email: data.email }
      })

      if (existingUser && existingUser.id !== userId) {
        logger.warn("email already in use on update profile", { userId, email: data.email })
        throw new Error("כתובת האימייל כבר בשימוש")
      }

      const verificationToken = uuidv4()
      logger.info("sending verification email on update profile", { userId, email: data.email })

      await this.prismaClient.user.update({
        where: { id: userId },
        data: {
          email: data.email,
          isVerified: false,
          verificationToken
        }
      })

      await this.emailProvider.sendVerificationEmail(data.email, verificationToken)
      logger.info("verification email sent on update profile", { userId, email: data.email })
    }

    logger.info("profile updated", { userId })
    return this.updateProfileData(userId, data, {
      email: data.email,
      isVerified: data.email !== user.email ? false : user.isVerified
    })
  }

  static build(): ProfileService {
    return new ProfileService(prisma, ResendEmailProvider.build())
  }

  private async updateProfileData(
    userId: string,
    data: UpdateProfileInput,
    emailOverride?: { email: string; isVerified: boolean }
  ): Promise<UserProfileDto> {
    const profileData = {
      firstName: data.firstName ?? null,
      lastName: data.lastName ?? null,
      idNumber: data.idNumber ?? null,
      phone: data.phone ?? null,
      companyName: data.companyName ?? null,
      companyId: data.companyId ?? null,
      companyAddress: data.companyAddress ?? null,
      profileImage: data.profileImage ?? null
    }

    const profile = await this.prismaClient.userProfile.upsert({
      where: { userId },
      create: { userId, ...profileData },
      update: profileData
    })

    const user = await this.prismaClient.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      logger.warn("user not found on update profile data", { userId })
      throw new Error("משתמש לא נמצא")
    }

    const email = emailOverride?.email ?? user.email
    const isVerified = emailOverride?.isVerified ?? user.isVerified

    return this.toDto(email, isVerified, profile)
  }

  private toDto(
    email: string,
    isVerified: boolean,
    profile: {
      firstName: string | null
      lastName: string | null
      idNumber: string | null
      phone: string | null
      companyName: string | null
      companyId: string | null
      companyAddress: string | null
      profileImage: string | null
    }
  ): UserProfileDto {
    return {
      email,
      isVerified,
      firstName: profile.firstName,
      lastName: profile.lastName,
      idNumber: profile.idNumber,
      phone: profile.phone,
      companyName: profile.companyName,
      companyId: profile.companyId,
      companyAddress: profile.companyAddress,
      profileImage: profile.profileImage
    }
  }
}
