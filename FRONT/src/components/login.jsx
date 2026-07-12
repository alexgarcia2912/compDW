
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function AuthForm({ mode = 'login' }) {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isRegister = mode === 'register'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (isRegister) {
        await register(formData)
      } else {
        await login({ correo: formData.correo, password: formData.password })
      }

      navigate('/', { replace: true })
    } catch (submissionError) {
      setError(submissionError.response?.data?.message || 'No se pudo completar la operación')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_32%),linear-gradient(135deg,#0f172a,#1e293b_50%,#111827)] px-4 py-10 text-slate-100">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Agenda de contactos
          </span>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Gestiona usuarios y contactos con sesión segura.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-300 md:text-base">
              Autenticación con JWT, rutas protegidas y un CRUD completo para tu entidad principal.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Auth</p>
              <p className="mt-1 font-semibold">Registro, login y logout</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">API</p>
              <p className="mt-1 font-semibold">Backend con Express y MongoDB</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">UI</p>
              <p className="mt-1 font-semibold">React Router y formularios controlados</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur md:p-8">
          <div className="mb-6 flex rounded-2xl bg-white/5 p-1 text-sm font-semibold">
            <Link
              to="/login"
              className={`flex-1 rounded-xl px-4 py-2 text-center transition ${!isRegister ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:text-white'}`}
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className={`flex-1 rounded-xl px-4 py-2 text-center transition ${isRegister ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:text-white'}`}
            >
              Registrarse
            </Link>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="block space-y-2">
                <span className="text-sm text-slate-300">Nombre</span>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                  placeholder="Tu nombre"
                />
              </label>
            )}

            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Correo</span>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                placeholder="correo@ejemplo.com"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Contraseña</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                placeholder="Mínimo 8 caracteres"
              />
            </label>

            {error && <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Procesando...' : isRegister ? 'Crear cuenta' : 'Entrar'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default AuthForm
