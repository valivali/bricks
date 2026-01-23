import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authApi } from "@/api/auth.api"
import type {
  SignupRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest
} from "@/api/auth.api"

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
      return response
    },
    onSuccess: (data) => {
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
    queryClient.setQueryData(["currentUser"], null)
    queryClient.clear()
  }
}
