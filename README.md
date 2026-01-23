

# Bricks App

Full‑stack app with a React frontend and an Express backend. The project includes a production‑ready authentication system (signup, login, email verification, forgot/reset password), protected routes, and a layered backend architecture.

## Architecture

### Frontend
- React 19 + TypeScript + Vite
- React Router for routing
- React Query for API calls
- React Hook Form + Zod for validation
- AuthContext + ProtectedRoute for auth state and guarding pages
- SCSS modules for styling, with shared UI components
- Toasts via `react-hot-toast` (`useToast` hook)

### Backend
- Express + TypeScript
- Prisma ORM (PostgreSQL) with PrismaPg adapter
- Layered design: routes → controllers → services → providers → DTOs/mappers
- Zod for input validation
- JWT authentication with centralized env config
- Resend email provider (swappable via provider interface)
- Security headers via Helmet

## Repository Structure

```
backend/      # API server, auth logic, Prisma schema
frontend/     # React app
```

## Key Features

- Email‑based auth flows (verify + reset)
- Password policy enforced on both frontend and backend
- JWT‑based session handling
- Protected routes and current‑user endpoint

## Getting Started

1. Install dependencies in `backend/` and `frontend/`
2. Configure environment variables (see each app’s README)
3. Run backend, then frontend