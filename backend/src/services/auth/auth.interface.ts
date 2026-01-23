import type { AuthResponseDto, UserDto } from "../../dto/auth.dto.js"

export interface AuthServiceInterface {
  signup(email: string, password: string): Promise<{ message: string }>
  login(email: string, password: string): Promise<AuthResponseDto>
  verifyEmail(token: string): Promise<{ message: string }>
  forgotPassword(email: string): Promise<{ message: string }>
  resetPassword(token: string, newPassword: string): Promise<{ message: string }>
  getCurrentUser(userId: string): Promise<UserDto>
}