import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/UI/button/button"
import { Subtitle, Text, Title } from "@/components/UI/Text/text"
import { useLogin } from "@/hooks/useAuth"
import { useToast } from "@/hooks/useToast"
import { type LoginFormData, loginSchema } from "@/schemas/auth.schema"

import styles from "./auth.module.scss"

export const Login = () => {
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const toast = useToast()
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, submitCount }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data)
      navigate("/")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ""
      const isInvalidCredentials =
        errorMessage.toLowerCase().includes("invalid") ||
        errorMessage.toLowerCase().includes("not found") ||
        errorMessage.toLowerCase().includes("unauthorized")
      const messageLines = isInvalidCredentials
        ? ["לא הצלחנו למצוא משתמש עם הפרטים הללו במערכת.", "בדקו שאין טעות או הירשמו."]
        : ["לא ניתן להשלים את ההתחברות כרגע.", "נסו שוב בעוד מספר דקות."]

      toast.error(messageLines.join("\n"), { id: "login-error" })
    }
  }
  const onInvalid = () => {
    toast.error("נא לתקן את השדות המסומנים")
  }

  const emailHasError = Boolean(errors.email) && (touchedFields.email || submitCount > 0)
  const passwordHasError = Boolean(errors.password) && (touchedFields.password || submitCount > 0)
  const showEmailError = emailHasError && focusedField !== "email"
  const showPasswordError = passwordHasError && focusedField !== "password"
  const emailErrorMessage = errors.email?.message
  const passwordErrorMessage = errors.password?.message
  const emailField = register("email")
  const passwordField = register("password")

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>ברוך שובך</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            התחברו לחשבון שלכם
          </Subtitle>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className={styles.authForm}>
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
              onBlur={event => {
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

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              <Text variant="span">סיסמה</Text>
            </label>
            <input
              id="password"
              type="password"
              {...passwordField}
              className={`${styles.input} ${passwordHasError ? styles.inputError : ""}`}
              placeholder="••••••••"
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
          </div>

          <div className={styles.forgotPassword}>
            <Link to="/auth/forgot-password" className={styles.link}>
              <Text variant="span">שכחתם סיסמה?</Text>
            </Link>
          </div>

          <Button type="submit" size="lg" className={styles.submitButton} isLoading={loginMutation.isPending}>
            <Text variant="span">התחברות</Text>
          </Button>

          <div className={styles.authFooter}>
            <Text variant="span">אין לכם חשבון?</Text>
            <Link to="/auth/signup" className={styles.link}>
              <Text variant="span">הרשמה</Text>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
