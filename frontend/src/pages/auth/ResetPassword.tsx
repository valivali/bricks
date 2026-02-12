import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Button } from "@/components/UI/button/button"
import { Subtitle, Text, Title } from "@/components/UI/Text/text"
import { useResetPassword } from "@/hooks/useAuth"
import { useToast } from "@/hooks/useToast"
import { type ResetPasswordFormData, resetPasswordSchema } from "@/schemas/auth.schema"

import styles from "./auth.module.scss"

export const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const resetPasswordMutation = useResetPassword()
  const toast = useToast()
  const [successMessage, setSuccessMessage] = useState("")
  const [focusedField, setFocusedField] = useState<"password" | null>(null)

  useEffect(() => {
    if (!token) {
      toast.error("אסימון איפוס לא תקין או חסר")
    }
  }, [token, toast])

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, submitCount }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur"
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return

    setSuccessMessage("")
    try {
      const response = await resetPasswordMutation.mutateAsync({
        token,
        password: data.password
      })
      setSuccessMessage(response.message)
      setTimeout(() => navigate("/auth/login"), 2000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "איפוס הסיסמה נכשל")
    }
  }
  const onInvalid = () => {
    toast.error("נא לתקן את השדות המסומנים")
  }

  const passwordHasError = Boolean(errors.password) && (touchedFields.password || submitCount > 0)
  const showPasswordError = passwordHasError && focusedField !== "password"
  const passwordErrorMessage = errors.password?.message
  const passwordField = register("password")

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>הגדרת סיסמה חדשה</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            הכניסו את הסיסמה החדשה למטה
          </Subtitle>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className={styles.authForm}>
          {successMessage && (
            <div className={styles.successAlert}>
              <Text variant="p">{successMessage}</Text>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              <Text variant="span">סיסמה חדשה</Text>
            </label>
            <input
              id="password"
              type="password"
              {...passwordField}
              className={`${styles.input} ${passwordHasError ? styles.inputError : ""}`}
              placeholder="••••••••"
              disabled={!token}
              onFocus={() => setFocusedField("password")}
              onBlur={event => {
                passwordField.onBlur(event)
                setFocusedField(null)
              }}
            />
            {showPasswordError && passwordErrorMessage && (
              <Text variant="span" className={styles.errorText}>
                {passwordErrorMessage}
              </Text>
            )}
            <Text variant="p" className={styles.helperText}>
              חייבת להיות לפחות 8 תווים עם אות גדולה, אות קטנה, מספר ותו מיוחד
            </Text>
          </div>

          <Button type="submit" size="lg" className={styles.submitButton} isLoading={resetPasswordMutation.isPending} disabled={!token}>
            <Text variant="span">איפוס סיסמה</Text>
          </Button>
        </form>
      </div>
    </div>
  )
}
