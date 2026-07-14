import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">Validando sesión...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
