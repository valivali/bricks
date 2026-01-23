import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForgotPassword } from "@/hooks/useAuth"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth.schema"
import { Button } from "@/components/UI/button/button"
import { Text, Title, Subtitle } from "@/components/UI/Text/text"
import styles from "./auth.module.scss"

export const ForgotPassword = () => {
  const forgotPasswordMutation = useForgotPassword()
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await forgotPasswordMutation.mutateAsync(data)
      setSuccessMessage(response.message)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Request failed")
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>Reset Password</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            Enter your email and we'll send you a reset link
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
            <label htmlFor="email" className={styles.label}>
              <Text variant="span">Email Address</Text>
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={styles.input}
              placeholder="you@example.com"
            />
            {errors.email && (
              <Text variant="span" className={styles.errorText}>
                {errors.email.message}
              </Text>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className={styles.submitButton}
            isLoading={forgotPasswordMutation.isPending}
          >
            <Text variant="span">Send Reset Link</Text>
          </Button>

          <div className={styles.authFooter}>
            <Link to="/auth/login" className={styles.link}>
              <Text variant="span">Back to sign in</Text>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
