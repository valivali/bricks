const API_BASE_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:4000/api" : "/api")

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem("auth_token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private hasRefreshAttempt(options?: RequestInit): boolean {
    const headers = new Headers(options?.headers)
    return headers.get("X-Refresh-Attempt") === "1"
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) {
      return null
    }

    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Refresh-Attempt": "1"
      },
      body: JSON.stringify({ refreshToken })
    })

    if (!response.ok) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
      return null
    }

    const data = (await response.json()) as { token: string; refreshToken: string }
    localStorage.setItem("auth_token", data.token)
    localStorage.setItem("refresh_token", data.refreshToken)
    return data.token
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...options.headers
      }
    }

    let response = await fetch(url, config)

    if (response.status === 401 && !this.hasRefreshAttempt(options)) {
      const newToken = await this.refreshAccessToken()
      if (newToken) {
        const retryConfig: RequestInit = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newToken}`
          }
        }
        response = await fetch(url, retryConfig)
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: "An error occurred"
      }))
      throw new Error(error.error ?? error.message ?? "Request failed")
    }

    return response.json()
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data)
    })
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

export const apiClient = new ApiClient()
