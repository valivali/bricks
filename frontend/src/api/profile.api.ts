import { apiClient } from "./client"

export interface UserProfileDto {
  email: string
  isVerified: boolean
  firstName: string | null
  lastName: string | null
  idNumber: string | null
  phone: string | null
  companyName: string | null
  companyId: string | null
  companyAddress: string | null
  profileImage: string | null
}

export interface UpdateProfileRequest {
  email: string
  firstName: string | null
  lastName: string | null
  idNumber: string | null
  phone: string | null
  companyName: string | null
  companyId: string | null
  companyAddress: string | null
  profileImage: string | null
}

export const profileApi = {
  getProfile: (): Promise<UserProfileDto> => {
    return apiClient.get<UserProfileDto>("/profile")
  },
  updateProfile: (data: UpdateProfileRequest): Promise<UserProfileDto> => {
    return apiClient.patch<UserProfileDto>("/profile", data)
  }
}
