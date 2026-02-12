import bcrypt from "bcrypt"
import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"
import type { AuthResponseDto, UserDto } from "../../dto/auth.dto.js"
import { UserMapper } from "../../mappers/user.mapper.js"
import { JwtProvider, JwtProviderInterface } from "../../providers/jwt.provider.js"
import { AuthServiceInterface } from "./auth.interface.js"
import { EmailProviderInterface, ResendEmailProvider } from "../../providers/resend.provider.js"
import { prisma, type PrismaDbClient } from "../../lib/prisma.js"
import { env } from "../../config/env.config.js"

export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly prisma: PrismaDbClient,
    private readonly emailProvider: EmailProviderInterface,
    private readonly jwtProvider: JwtProviderInterface
  ) {}

  async signup(email: string, password: string): Promise<{ message: string; verificationUrl?: string }> {
    const existingUser = await this.prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      throw new Error("משתמש כבר קיים")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = uuidv4()

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false
      }
    })

    const verificationUrl = `${env.frontendUrl}/auth/verify-email?token=${verificationToken}`
    await this.emailProvider.sendVerificationEmail(email, verificationToken)

    return {
      message: "ההרשמה הושלמה. בדקו את האימייל כדי לאמת את החשבון.",
      verificationUrl: env.exposeEmailTokens ? verificationUrl : undefined
    }
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new Error("פרטי התחברות שגויים")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error("פרטי התחברות שגויים")
    }

    if (!user.isVerified) {
      throw new Error("יש לאמת את כתובת האימייל לפני התחברות")
    }

    const { refreshToken, refreshTokenHash, refreshTokenExpiry } = this.createRefreshToken()

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokenHash,
        refreshTokenExpiry
      }
    })

    const token = this.jwtProvider.sign({
      userId: user.id,
      email: user.email
    })

    return {
      user: UserMapper.toDto(user),
      token,
      refreshToken
    }
  }

  async refresh(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const refreshTokenHash = this.hashToken(refreshToken)
    const user = await this.prisma.user.findUnique({
      where: { refreshTokenHash }
    })

    if (!user || !user.refreshTokenExpiry) {
      throw new Error("אסימון רענון לא תקין")
    }

    if (user.refreshTokenExpiry < new Date()) {
      throw new Error("תוקף אסימון הרענון פג")
    }

    const rotated = this.createRefreshToken()

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokenHash: rotated.refreshTokenHash,
        refreshTokenExpiry: rotated.refreshTokenExpiry
      }
    })

    const token = this.jwtProvider.sign({
      userId: user.id,
      email: user.email
    })

    return {
      token,
      refreshToken: rotated.refreshToken
    }
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { verificationToken: token }
    })

    if (!user) {
      throw new Error("אסימון אימות לא תקין")
    }

    if (user.isVerified) {
      throw new Error("האימייל כבר אומת")
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null
      }
    })

    return { message: "האימייל אומת בהצלחה. אפשר להתחבר." }
  }

  async forgotPassword(email: string): Promise<{ message: string; resetUrl?: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      return { message: "אם קיים חשבון עם האימייל הזה, נשלח קישור לאיפוס סיסמה." }
    }

    const resetToken = uuidv4()
    const resetTokenExpiry = new Date(Date.now() + 3600000)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    const resetUrl = `${env.frontendUrl}/auth/reset-password?token=${resetToken}`
    await this.emailProvider.sendPasswordResetEmail(email, resetToken)

    return {
      message: "אם קיים חשבון עם האימייל הזה, נשלח קישור לאיפוס סיסמה.",
      resetUrl: env.exposeEmailTokens ? resetUrl : undefined
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { resetToken: token }
    })

    if (!user || !user.resetTokenExpiry) {
      throw new Error("אסימון האיפוס לא תקין או שפג תוקפו")
    }

    if (user.resetTokenExpiry < new Date()) {
      throw new Error("תוקף אסימון האיפוס פג")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        refreshTokenHash: null,
        refreshTokenExpiry: null
      }
    })

    return { message: "איפוס הסיסמה הצליח. אפשר להתחבר עם הסיסמה החדשה." }
  }

  async getCurrentUser(userId: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error("משתמש לא נמצא")
    }

    return UserMapper.toDto(user)
  }

  static build(): AuthService {
    const emailProvider = ResendEmailProvider.build()
    const jwtProvider = JwtProvider.build()
    return new AuthService(prisma, emailProvider, jwtProvider)
  }

  private createRefreshToken(): {
    refreshToken: string
    refreshTokenHash: string
    refreshTokenExpiry: Date
  } {
    const refreshToken = uuidv4()
    const refreshTokenHash = this.hashToken(refreshToken)
    const refreshTokenExpiry = new Date(Date.now() + env.refreshTokenExpiresInDays * 24 * 60 * 60 * 1000)

    return {
      refreshToken,
      refreshTokenHash,
      refreshTokenExpiry
    }
  }

  private hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex")
  }
}
