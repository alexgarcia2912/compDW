import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/client.js'
import ContactForm from '../components/ContactForm.jsx'

function CreateContactPage() {
  const navigate = useNavigate()

  const handleSubmit = async (contactData) => {
    await api.post('/contacts', contactData)
    toast.success('Contacto creado correctamente')
    navigate('/', { replace: true })
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-100">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Formulario</p>
        <h1 className="mt-2 text-3xl font-black">Crear contacto</h1>
      </div>
      <ContactForm submitLabel="Guardar contacto" onSubmit={handleSubmit} />
    </main>
  )
}

export default CreateContactPage
