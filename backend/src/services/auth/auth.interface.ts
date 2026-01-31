import type { AuthResponseDto, UserDto } from "../../dto/auth.dto.js"

export interface AuthServiceInterface {
  signup(
    email: string,
    password: string
  ): Promise<{ message: string; verificationUrl?: string }>
  login(email: string, password: string): Promise<AuthResponseDto>
  refresh(refreshToken: string): Promise<{ token: string; refreshToken: string }>
  verifyEmail(token: string): Promise<{ message: string }>
  forgotPassword(email: string): Promise<{ message: string; resetUrl?: string }>
  resetPassword(token: string, newPassword: string): Promise<{ message: string }>
  getCurrentUser(userId: string): Promise<UserDto>
}