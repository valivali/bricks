import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "@/hooks/useAuth"
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema"
import { Button } from "@/components/UI/button/button"
import { Text, Title, Subtitle } from "@/components/UI/Text/text"
import styles from "./auth.module.scss"

export const Login = () => {
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage("")
    try {
      await loginMutation.mutateAsync(data)
      navigate("/")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed")
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>Welcome Back</Title>
          <Subtitle className={styles.authSubtitle} variant="p">
            Sign in to your account
          </Subtitle>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          {errorMessage && (
            <div className={styles.errorAlert}>
              <Text variant="p">{errorMessage}</Text>
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
          </div>

          <div className={styles.forgotPassword}>
            <Link to="/auth/forgot-password" className={styles.link}>
              <Text variant="span">Forgot password?</Text>
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className={styles.submitButton}
            isLoading={loginMutation.isPending}
          >
            <Text variant="span">Sign In</Text>
          </Button>

          <div className={styles.authFooter}>
            <Text variant="span">Don't have an account?</Text>
            <Link to="/auth/signup" className={styles.link}>
              <Text variant="span">Sign up</Text>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
