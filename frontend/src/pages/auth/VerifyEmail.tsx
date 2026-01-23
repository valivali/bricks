import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useVerifyEmail } from "@/hooks/useAuth"
import { Button } from "@/components/UI/button/button"
import { Text, Title } from "@/components/UI/Text/text"
import styles from "./auth.module.scss"

export const VerifyEmail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const verifyEmailMutation = useVerifyEmail()
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (token && !isVerifying) {
      setIsVerifying(true)
      verifyEmail()
    }
  }, [token])

  const verifyEmail = async () => {
    if (!token) {
      setErrorMessage("Invalid or missing verification token")
      return
    }

    try {
      const response = await verifyEmailMutation.mutateAsync({ token })
      setSuccessMessage(response.message)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Verification failed")
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Title className={styles.authTitle}>Email Verification</Title>
        </div>

        <div className={styles.authForm}>
          {verifyEmailMutation.isPending && (
            <div className={styles.infoAlert}>
              <Text variant="p">Verifying your email...</Text>
            </div>
          )}

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

          {successMessage && (
            <Button
              size="lg"
              className={styles.submitButton}
              onClick={() => navigate("/auth/login")}
            >
              <Text variant="span">Go to Login</Text>
            </Button>
          )}

          {errorMessage && (
            <Button
              size="lg"
              variant="outline"
              className={styles.submitButton}
              onClick={() => navigate("/auth/signup")}
            >
              <Text variant="span">Back to Signup</Text>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
