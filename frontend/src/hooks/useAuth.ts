import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"

import type { ForgotPasswordRequest, LoginRequest, ResetPasswordRequest, SignupRequest, VerifyEmailRequest } from "@/api/auth.api"
import { authApi } from "@/api/auth.api"
import { AuthContext } from "@/contexts/AuthContext"
import { UserProfileContext } from "@/contexts/UserProfileContext"

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data)
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login(data)
      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("refresh_token", response.refreshToken)
      return response
    },
    onSuccess: data => {
      queryClient.setQueryData(["currentUser"], data.user)
    }
  })
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data)
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data)
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data)
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
    queryClient.setQueryData(["currentUser"], null)
    queryClient.clear()
  }
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error("useUserProfileContext must be used within a UserProfileProvider")
  }
  return context
}
