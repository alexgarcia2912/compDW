import { Navigate, Route, Routes } from 'react-router-dom'
import CreateContactPage from './pages/CreateContactPage'
import EditContactPage from './pages/EditContactPage'
import HomePage from './pages/HomePage'
import AuthForm from './components/login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navigation from './components/Navigation.jsx'
import { useAuth } from './context/useAuth.js'

function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950">
      {user && <Navigation />}
      <Routes>
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/new"
          element={
            <ProtectedRoute>
              <CreateContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/:id/edit"
          element={
            <ProtectedRoute>
              <EditContactPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </div>
  );
}

export default App;
