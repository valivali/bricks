import { Navigate, Route, Routes } from "react-router-dom"

import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import ErrorBoundary from "@/components/general/ErrorBoundary"
import { ProtectedLayout } from "@/components/layout/ProtectedLayout/ProtectedLayout"
import { ForgotPassword } from "@/pages/auth/ForgotPassword"
import { Login } from "@/pages/auth/Login"
import { ResetPassword } from "@/pages/auth/ResetPassword"
import { Signup } from "@/pages/auth/Signup"
import { VerifyEmail } from "@/pages/auth/VerifyEmail"
import { Profile } from "@/pages/profile/Profile"
import { StructureIdForm } from "@/pages/structure-id/StructureIdForm"
import { Structures } from "@/pages/structures/Structures"

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/structures" replace />} />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />

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
        <Route
          path="/structures"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Structures />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/structure-id/new"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <StructureIdForm />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/structure-id/:id"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <StructureIdForm />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
