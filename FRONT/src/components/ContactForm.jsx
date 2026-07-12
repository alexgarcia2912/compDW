import { useState } from 'react'

const initialState = {
  nombre: '',
  telefono: '',
  correo: '',
  empresa: '',
  notas: ''
}

function ContactForm({ initialValues = initialState, onSubmit, submitLabel }) {
  const safeInitialValues = initialValues ?? initialState
  const [formData, setFormData] = useState({ ...initialState, ...safeInitialValues })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.nombre || !formData.telefono || !formData.correo) {
      setError('Nombre, teléfono y correo son obligatorios')
      return
    }

    setError('')
    await onSubmit(formData)
  }

  return (
    <form className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/40" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Nombre</span>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Teléfono</span>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Correo</span>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Empresa</span>
          <input
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300"
          />
        </label>
      </div>
      <label className="space-y-2">
        <span className="text-sm text-slate-300">Notas</span>
        <textarea
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300"
        />
      </label>
      {error && <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
      <button type="submit" className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
        {submitLabel}
      </button>
    </form>
  )
}

export default ContactForm