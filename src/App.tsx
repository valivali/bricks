import { Routes, Route, Navigate } from "react-router-dom"
import ErrorBoundary from "@/components/general/ErrorBoundary"
import CreateSkeleton from "@/pages/skeleton/create-skeleton"

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/create-skeleton" replace />} />
        <Route path="/create-skeleton" element={<CreateSkeleton />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
