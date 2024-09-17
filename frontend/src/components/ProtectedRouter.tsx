import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const sessionToken = localStorage.getItem("sessionToken")

  if (!sessionToken) {
    return <Navigate to="/login" />
  }

  return children
}