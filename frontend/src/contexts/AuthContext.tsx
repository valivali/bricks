import React, { createContext, useContext, useEffect, useState } from "react"
import { useCurrentUser, useLogout } from "@/hooks/useAuth"
import type { UserDto } from "@/api/auth.api"

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
    }
  }, [error])

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading: !isReady || isLoading,
    logout
  }

  if (!isReady) {
    return (
      <div style={{ 
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

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
