import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import type { PrismaClient } from "../../generated/prisma/client.js"
import type { AuthResponseDto, UserDto } from "../../dto/auth.dto.js"
import { UserMapper } from "../../mappers/user.mapper.js"
import { JwtProvider, JwtProviderInterface } from "../../providers/jwt.provider.js"
import { AuthServiceInterface } from "./auth.interface.js"
import { EmailProviderInterface, ResendEmailProvider } from "../../providers/resend.provider.js"
import { prisma } from "../../lib/prisma.js"

export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly emailProvider: EmailProviderInterface,
    private readonly jwtProvider: JwtProviderInterface
  ) {}

  async signup(email: string, password: string): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({ where: { email } })
    
    if (existingUser) {
      throw new Error("User already exists")
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

    await this.emailProvider.sendVerificationEmail(email, verificationToken)

    return { message: "Signup successful. Please check your email to verify your account." }
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new Error("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error("Invalid credentials")
    }

    if (!user.isVerified) {
      throw new Error("Please verify your email before logging in")
    }

    const token = this.jwtProvider.sign({
      userId: user.id,
      email: user.email
    })

    return {
      user: UserMapper.toDto(user),
      token
    }
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { verificationToken: token }
    })

    if (!user) {
      throw new Error("Invalid verification token")
    }

    if (user.isVerified) {
      throw new Error("Email already verified")
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null
      }
    })

    return { message: "Email verified successfully. You can now log in." }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      return { message: "If an account with that email exists, a password reset link has been sent." }
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

    await this.emailProvider.sendPasswordResetEmail(email, resetToken)

    return { message: "If an account with that email exists, a password reset link has been sent." }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { resetToken: token }
    })

    if (!user || !user.resetTokenExpiry) {
      throw new Error("Invalid or expired reset token")
    }

    if (user.resetTokenExpiry < new Date()) {
      throw new Error("Reset token has expired")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    return { message: "Password reset successful. You can now log in with your new password." }
  }

  async getCurrentUser(userId: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error("User not found")
    }

    return UserMapper.toDto(user)
  }

  static build(): AuthService {
    const emailProvider = ResendEmailProvider.build()
    const jwtProvider = JwtProvider.build()
    return new AuthService(prisma, emailProvider, jwtProvider)
  }
}
