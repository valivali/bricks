import { Routes, Route, Navigate } from "react-router-dom"
import ErrorBoundary from "@/components/general/ErrorBoundary"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { ProtectedLayout } from "@/components/layout/ProtectedLayout/ProtectedLayout"
import CreateSkeleton from "@/pages/skeleton/create-skeleton"
import { Profile } from "@/pages/profile/Profile"
import { Login } from "@/pages/auth/Login"
import { Signup } from "@/pages/auth/Signup"
import { ForgotPassword } from "@/pages/auth/ForgotPassword"
import { ResetPassword } from "@/pages/auth/ResetPassword"
import { VerifyEmail } from "@/pages/auth/VerifyEmail"

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/create-skeleton" replace />} />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />

        <Route
          path="/create-skeleton"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <CreateSkeleton />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
