import { createElement, useMemo } from "react"
import toast, { type ToastOptions } from "react-hot-toast"
import { ToastContent, type ToastVariant } from "@/components/general/ToastContent"

export interface ToastConfig {
  success?: ToastOptions
  error?: ToastOptions
  loading?: ToastOptions
  default?: ToastOptions
}

export interface AppToastOptions extends ToastOptions {
  title?: string
}

export const useToast = (config: ToastConfig = {}) => {
  return useMemo(() => {
    const withOptions = (options?: ToastOptions) => ({
      ...config.default,
      ...options,
      duration: 5000000,
    })

    const defaultTitles: Record<ToastVariant, string> = {
      error: "משהו בלתי צפוי קרה",
      success: "הפעולה הצליחה",
      loading: "מבצעים פעולה",
      default: "הודעה"
    }

    const showToast = (
      variant: ToastVariant,
      message: string,
      options?: AppToastOptions
    ) => {
      const mergedOptions = withOptions(options)
      const title = options?.title ?? defaultTitles[variant]
      return toast.custom(
        (toastItem) =>
          createElement(ToastContent, {
            title,
            message,
            variant,
            toastId: toastItem.id,
            isVisible: toastItem.visible
          }),
        mergedOptions
      )
    }

    return {
      success: (message: string, options?: AppToastOptions) =>
        showToast("success", message, { ...config.success, ...options }),
      error: (message: string, options?: AppToastOptions) =>
        showToast("error", message, { ...config.error, ...options }),
      loading: (message: string, options?: AppToastOptions) =>
        showToast("loading", message, { ...config.loading, ...options }),
      default: (message: string, options?: AppToastOptions) =>
        showToast("default", message, { ...config.default, ...options }),
      promise: toast.promise,
      custom: toast.custom,
      dismiss: toast.dismiss,
      remove: toast.remove
    }
  }, [config])
}
