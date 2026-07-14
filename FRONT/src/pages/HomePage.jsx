import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client.js'

function HomePage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const { data } = await api.get('/contacts')
        setContacts(data)
      } catch {
        setError('No se pudieron cargar los contactos')
      } finally {
        setLoading(false)
      }
    }

    loadContacts()
  }, [])

  const handleDelete = async (contactId) => {
    if (!window.confirm('¿Eliminar este contacto?')) {
      return
    }

    await api.delete(`/contacts/${contactId}`)
    setContacts((current) => current.filter((contact) => contact._id !== contactId))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-slate-100">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Dashboard</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Agenda de contactos</h1>
          <p className="mt-2 max-w-2xl text-slate-300">Lista protegida con JWT, consumiendo la API REST del backend.</p>
        </div>
        <Link to="/contacts/new" className="inline-flex rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
          Nuevo contacto
        </Link>
      </div>

      {loading && <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">Cargando contactos...</p>}
      {error && <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-200">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contacts.map((contact) => (
            <article key={contact._id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{contact.nombre}</h2>
                  <p className="text-sm text-slate-400">{contact.empresa || 'Sin empresa'}</p>
                </div>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">Contacto</span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>{contact.telefono}</p>
                <p>{contact.correo}</p>
                {contact.notas && <p className="text-slate-400">{contact.notas}</p>}
              </div>
              <div className="mt-5 flex gap-3">
                <Link to={`/contacts/${contact._id}/edit`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200">
                  Editar
                </Link>
                <button type="button" onClick={() => handleDelete(contact._id)} className="rounded-2xl border border-rose-400/20 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-400/10">
                  Eliminar
                </button>
              </div>
            </article>
          ))}

          {contacts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-8 text-slate-300 md:col-span-2 xl:col-span-3">
              Todavía no hay contactos guardados.
            </div>
          )}
        </div>
      )}
    </main>
  )
}

export default HomePage
