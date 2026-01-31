import type { ReactNode } from "react"
import toast from "react-hot-toast"
import { ErrorBadgeIcon } from "@/components/icons/ErrorBadgeIcon"
import { SuccessBadgeIcon } from "@/components/icons/SuccessBadgeIcon"
import { InfoBadgeIcon } from "@/components/icons/InfoBadgeIcon"

export type ToastVariant = "success" | "error" | "loading" | "default"

interface ToastContentProps {
  title: string
  message: string
  variant?: ToastVariant
  icon?: ReactNode
  toastId?: string
  isVisible?: boolean
}

export const ToastContent = ({
  title,
  message,
  variant = "default",
  icon,
  toastId,
  isVisible = true
}: ToastContentProps) => {
  const lines = message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  const defaultIcon =
    variant === "success"
      ? <SuccessBadgeIcon size={22} />
      : variant === "error"
        ? <ErrorBadgeIcon size={28} />
        : <InfoBadgeIcon size={18} />

  return (
    <div
      className={`app-toast app-toast--${variant} ${
        isVisible ? "app-toast--enter" : "app-toast--leave"
      }`}
      dir="rtl"
    >
      <button
        type="button"
        className="app-toast__close"
        aria-label="סגירת הודעה"
        onClick={() => toastId && toast.dismiss(toastId)}
      >
        ×
      </button>
      <div className="app-toast__layout">
        <div className="app-toast__icon-container">
          <div className="app-toast__icon-box">
            {icon ?? defaultIcon}
          </div>
        </div>
        {/* <span className="app-toast__separator">|</span> */}
        <div className="app-toast__content">
          <div className="app-toast__title">{title}</div>
          <div className="app-toast__message">
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
