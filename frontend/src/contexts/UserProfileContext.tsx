import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { createContext } from "react"

import type { UpdateProfileRequest, UserProfileDto } from "@/api/profile.api"
import { profileApi } from "@/api/profile.api"
import { useAuthContext } from "@/hooks/useAuth"

interface UserProfileContextType {
  profile: UserProfileDto | null
  isLoading: boolean
  refresh: () => void
  updateProfile: (data: UpdateProfileRequest) => Promise<UserProfileDto>
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const queryClient = useQueryClient()

  const {
    data: profile,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: profileApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000
  })

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => profileApi.updateProfile(data),
    onSuccess: data => {
      queryClient.setQueryData(["userProfile"], data)
    }
  })

  const value: UserProfileContextType = {
    profile: profile ?? null,
    isLoading,
    refresh: () => {
      void refetch()
    },
    updateProfile: data => mutation.mutateAsync(data)
  }

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
}

export { UserProfileContext }
