export interface UserDto {
  id: string
  email: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthResponseDto {
  user: UserDto
  token: string
}

export interface SignupRequestDto {
  email: string
  password: string
}

export interface LoginRequestDto {
  email: string
  password: string
}

export interface ForgotPasswordRequestDto {
  email: string
}

export interface ResetPasswordRequestDto {
  token: string
  password: string
}

export interface VerifyEmailRequestDto {
  token: string
}

export interface MessageResponseDto {
  message: string
}
