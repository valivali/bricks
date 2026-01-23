import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignup } from "@/hooks/useAuth"
import { signupSchema, type SignupFormData } from "@/schemas/auth.schema"
import { Button } from "@/components/UI/button/button"
import { Text, Title, Subtitle } from "@/components/UI/Text/text"
import styles from "./auth.module.scss"

export const Signup = () => {
  const navigate = useNavigate()
  const signupMutation = useSignup()
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: SignupFormData) => {
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await signupMutation.mutateAsync(data)
      setSuccessMessage(response.message)
      setTimeout(() => navigate("/auth/login"), 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Signup failed")
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>Create Account</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            Sign up to get started
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

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              <Text variant="span">Password</Text>
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={styles.input}
              placeholder="••••••••"
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
            isLoading={signupMutation.isPending}
          >
            <Text variant="span">Sign Up</Text>
          </Button>

          <div className={styles.authFooter}>
            <Text variant="span">Already have an account?</Text>
            <Link to="/auth/login" className={styles.link}>
              <Text variant="span">Sign in</Text>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
