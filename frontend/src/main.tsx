import "./index.css"
import "./globals.scss"
import "./components/i18n"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"

import App from "./App.tsx"
import { AuthProvider } from "./contexts/AuthContext"
import { UserProfileProvider } from "./contexts/UserProfileContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

document.documentElement.lang = "he"
document.documentElement.dir = "rtl"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <UserProfileProvider>
            <App />
          </UserProfileProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </QueryClientProvider>
  </StrictMode>
)
