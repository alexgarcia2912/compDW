import { useEffect, useState } from 'react'
import api from '../api/client.js'
import { AuthContext } from './authContext.js'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await api.get('/auth/me')
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    restoreSession()
  }, [])

  const login = async ({ correo, password }) => {
    const { data } = await api.post('/auth/login', { correo, password })
    setUser(data.user)
    return data.user
  }

  const register = async ({ nombre, correo, password }) => {
    const { data } = await api.post('/auth/register', { nombre, correo, password })
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
