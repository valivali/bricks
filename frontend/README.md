# Bricks App (Frontend)

React frontend for the Bricks app with a full authentication flow (login, signup, email verification, forgot/reset password) and protected routes.

## Features

- Auth pages under `src/pages/auth`
- Protected routes via `ProtectedRoute`
- Auth state via `AuthContext`
- API hooks via React Query
- Zod validation for all auth inputs
- Toasts via `react-hot-toast` + `useToast`
- Animated auth UI with SCSS modules

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router
- React Query
- React Hook Form + Zod
- Sass (SCSS modules)

## Setup

### Prerequisites

- Node.js 20.18.0+ (see `.nvmrc`)
- Backend running on `http://localhost:4000` (or update `VITE_API_URL`)

### Install

```bash
cd frontend
npm install
```

### Environment Variables

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000/api
```

### Run

```bash
npm run dev
```

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview build
npm run lint      # Lint
npm run test      # Tests
```

## Auth Routes

- `/auth/login`
- `/auth/signup`
- `/auth/forgot-password`
- `/auth/reset-password?token=...`
- `/auth/verify-email?token=...`

Protected:
- `/create-skeleton`

## Toasts

Use the custom hook:

```ts
import { useToast } from "@/hooks/useToast"

const toast = useToast()
toast.success("Saved")
```

## Notes

- Auth token is stored in `localStorage` under `auth_token`.
- Email verification is required before login.
