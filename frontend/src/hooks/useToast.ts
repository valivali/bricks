import { useMemo } from "react"
import toast, { type ToastOptions } from "react-hot-toast"

export interface ToastConfig {
  success?: ToastOptions
  error?: ToastOptions
  loading?: ToastOptions
  default?: ToastOptions
}

export const useToast = (config: ToastConfig = {}) => {
  return useMemo(() => {
    const withOptions = (options?: ToastOptions) => ({
      ...config.default,
      ...options
    })

    return {
      success: (message: string, options?: ToastOptions) =>
        toast.success(message, withOptions({ ...config.success, ...options })),
      error: (message: string, options?: ToastOptions) =>
        toast.error(message, withOptions({ ...config.error, ...options })),
      loading: (message: string, options?: ToastOptions) =>
        toast.loading(message, withOptions({ ...config.loading, ...options })),
      promise: toast.promise,
      custom: toast.custom,
      dismiss: toast.dismiss,
      remove: toast.remove
    }
  }, [config])
}
