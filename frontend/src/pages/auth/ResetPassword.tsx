import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useResetPassword } from "@/hooks/useAuth"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/schemas/auth.schema"
import { Button } from "@/components/UI/button/button"
import { Text, Title, Subtitle } from "@/components/UI/Text/text"
import styles from "./auth.module.scss"

export const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const resetPasswordMutation = useResetPassword()
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid or missing reset token")
    }
  }, [token])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return

    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await resetPasswordMutation.mutateAsync({
        token,
        password: data.password
      })
      setSuccessMessage(response.message)
      setTimeout(() => navigate("/auth/login"), 2000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Password reset failed")
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>Set New Password</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            Enter your new password below
          </Subtitle>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          {errorMessage && (
            <div className={styles.errorAlert}>
              <Text variant="p">{errorMessage}</Text>
            </div>
          )}
          
          {successMessage && (
            <div className={styles.successAlert}>
              <Text variant="p">{successMessage}</Text>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              <Text variant="span">New Password</Text>
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={styles.input}
              placeholder="••••••••"
              disabled={!token}
            />
            {errors.password && (
              <Text variant="span" className={styles.errorText}>
                {errors.password.message}
              </Text>
            )}
            <Text variant="p" className={styles.helperText}>
              Must be 8+ characters with uppercase, lowercase, number, and special character
            </Text>
          </div>

          <Button
            type="submit"
            size="lg"
            className={styles.submitButton}
            isLoading={resetPasswordMutation.isPending}
            disabled={!token}
          >
            <Text variant="span">Reset Password</Text>
          </Button>
        </form>
      </div>
    </div>
  )
}
