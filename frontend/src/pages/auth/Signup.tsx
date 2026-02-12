import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { Button } from "@/components/UI/button/button"
import { Subtitle, Text, Title } from "@/components/UI/Text/text"
import { useSignup } from "@/hooks/useAuth"
import { useToast } from "@/hooks/useToast"
import { type SignupFormData, signupSchema } from "@/schemas/auth.schema"

import styles from "./auth.module.scss"

export const Signup = () => {
  const signupMutation = useSignup()
  const toast = useToast()
  const [successMessage, setSuccessMessage] = useState("")
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, submitCount }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur"
  })

  const onSubmit = async (data: SignupFormData) => {
    setSuccessMessage("")
    try {
      const response = await signupMutation.mutateAsync(data)
      setSuccessMessage(response.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "ההרשמה נכשלה")
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
          <Title className={styles.authTitle}>יצירת חשבון</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            הירשמו כדי להתחיל
          </Subtitle>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className={styles.authForm}>
          {successMessage && (
            <div className={styles.successAlert}>
              <Text variant="p">{successMessage}</Text>
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
            <Text variant="p" className={styles.helperText}>
              חייבת להיות לפחות 8 תווים עם אות גדולה, אות קטנה, מספר ותו מיוחד
            </Text>
          </div>

          <Button type="submit" size="lg" className={styles.submitButton} isLoading={signupMutation.isPending}>
            <Text variant="span">הרשמה</Text>
          </Button>

          <div className={styles.authFooter}>
            <Text variant="span">כבר יש לכם חשבון?</Text>
            <Link to="/auth/login" className={styles.link}>
              <Text variant="span">התחברות</Text>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
