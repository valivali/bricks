import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForgotPassword } from "@/hooks/useAuth"
import { useToast } from "@/hooks/useToast"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth.schema"
import { Button } from "@/components/UI/button/button"
import { Text, Title, Subtitle } from "@/components/UI/Text/text"
import styles from "./auth.module.scss"

export const ForgotPassword = () => {
  const forgotPasswordMutation = useForgotPassword()
  const toast = useToast()
  const [successMessage, setSuccessMessage] = useState("")
  const [resetUrl, setResetUrl] = useState("")
  const [focusedField, setFocusedField] = useState<"email" | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, submitCount }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur"
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setSuccessMessage("")
    setResetUrl("")
    try {
      const response = await forgotPasswordMutation.mutateAsync(data)
      setSuccessMessage(response.message)
      if (response.resetUrl) {
        setResetUrl(response.resetUrl)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "הבקשה נכשלה")
    }
  }
  const onInvalid = () => {
    toast.error("נא לתקן את השדות המסומנים")
  }

  const emailHasError = Boolean(errors.email) && (touchedFields.email || submitCount > 0)
  const showEmailError = emailHasError && focusedField !== "email"
  const emailErrorMessage = errors.email?.message
  const emailField = register("email")

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>איפוס סיסמה</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            הכניסו את האימייל ונשלח קישור לאיפוס
          </Subtitle>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className={styles.authForm}>
          {successMessage && (
            <div className={styles.successAlert}>
              <Text variant="p">{successMessage}</Text>
            </div>
          )}
          {resetUrl && (
            <div className={styles.infoAlert}>
              <Text variant="p">
                קישור לאיפוס סיסמה (פיתוח):{" "}
                <a href={resetUrl}>{resetUrl}</a>
              </Text>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              <Text variant="span">כתובת אימייל</Text>
            </label>
            <input
              id="email"
              type="email"
              {...emailField}
              className={`${styles.input} ${emailHasError ? styles.inputError : ""}`}
              placeholder="you@example.com"
              onFocus={() => setFocusedField("email")}
              onBlur={(event) => {
                emailField.onBlur(event)
                setFocusedField(null)
              }}
            />
            {showEmailError && emailErrorMessage && (
              <Text variant="span" className={styles.errorText}>
                {emailErrorMessage}
              </Text>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className={styles.submitButton}
            isLoading={forgotPasswordMutation.isPending}
          >
            <Text variant="span">שליחת קישור לאיפוס</Text>
          </Button>

          <div className={styles.authFooter}>
            <Link to="/auth/login" className={styles.link}>
              <Text variant="span">חזרה להתחברות</Text>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
