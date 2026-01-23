import { apiClient } from "./client"

export interface UserDto {
  id: string
  email: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: UserDto
  token: string
}

export interface MessageResponse {
  message: string
}

export interface SignupRequest {
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface VerifyEmailRequest {
  token: string
}

export const authApi = {
  signup: (data: SignupRequest): Promise<MessageResponse> => {
    return apiClient.post<MessageResponse>("/auth/signup", data)
  },

  login: (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", data)
  },

  verifyEmail: (data: VerifyEmailRequest): Promise<MessageResponse> => {
    return apiClient.post<MessageResponse>("/auth/verify-email", data)
  },

  forgotPassword: (data: ForgotPasswordRequest): Promise<MessageResponse> => {
    return apiClient.post<MessageResponse>("/auth/forgot-password", data)
  },

  resetPassword: (data: ResetPasswordRequest): Promise<MessageResponse> => {
    return apiClient.post<MessageResponse>("/auth/reset-password", data)
  },

  getCurrentUser: (): Promise<UserDto> => {
    return apiClient.get<UserDto>("/auth/me")
  }
}
