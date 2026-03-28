import React, { createContext, useEffect, useState } from "react"

import type { UserDto } from "@/api/auth.api"
import { useCurrentUser, useLogout } from "@/hooks/useAuth"

interface AuthContextType {
  user: UserDto | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false)
  const { data: user, isLoading, error } = useCurrentUser()
  const logout = useLogout()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setIsReady(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (error) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
    }
  }, [error])

  const value: AuthContextType = {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading: !isReady || isLoading,
    logout
  }

  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}>
        Loading...
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
