import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/client.js'
import ContactForm from '../components/ContactForm.jsx'

function EditContactPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContact = async () => {
      try {
        const { data } = await api.get(`/contacts/${id}`)
        setContact(data)
      } catch {
        toast.error('No se pudo cargar el contacto')
        navigate('/', { replace: true })
      } finally {
        setLoading(false)
      }
    }

    loadContact()
  }, [id, navigate])

  const handleSubmit = async (contactData) => {
    await api.put(`/contacts/${id}`, contactData)
    toast.success('Contacto actualizado correctamente')
    navigate('/', { replace: true })
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-10 text-slate-300">Cargando contacto...</div>
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-100">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Formulario</p>
        <h1 className="mt-2 text-3xl font-black">Editar contacto</h1>
      </div>
      <ContactForm
        initialValues={contact}
        submitLabel="Actualizar contacto"
        onSubmit={handleSubmit}
      />
    </main>
  )
}

export default EditContactPage
