import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navigation() {
  const { user, logout } = useAuth()

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 text-white">
        <Link to="/" className="text-lg font-black tracking-tight text-cyan-300">
          Agenda Pro
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Dashboard
          </NavLink>
          <NavLink to="/contacts/new" className={linkClass}>
            Nuevo contacto
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-300 sm:block">{user?.nombre}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navigation