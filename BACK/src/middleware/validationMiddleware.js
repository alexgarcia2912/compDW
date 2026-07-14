const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9+()\-\s]{7,20}$/

const clean = (value) => typeof value === 'string' ? value.trim() : value

export const validateAuth = (isRegister = false) => (req, res, next) => {
  const nombre = clean(req.body.nombre)
  const correo = clean(req.body.correo)?.toLowerCase()
  const password = req.body.password

  if (isRegister && (!nombre || nombre.length < 2 || nombre.length > 80)) {
    return res.status(400).json({ message: 'El nombre debe tener entre 2 y 80 caracteres' })
  }
  if (!correo || !emailPattern.test(correo)) {
    return res.status(400).json({ message: 'Ingresa un correo válido' })
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) {
    return res.status(400).json({ message: 'La contraseña debe tener entre 8 y 72 caracteres' })
  }

  req.body = { ...(isRegister ? { nombre } : {}), correo, password }
  next()
}

export const validateContact = (req, res, next) => {
  const contact = {
    nombre: clean(req.body.nombre),
    telefono: clean(req.body.telefono),
    correo: clean(req.body.correo)?.toLowerCase(),
    empresa: clean(req.body.empresa) || '',
    notas: clean(req.body.notas) || ''
  }

  if (!contact.nombre || contact.nombre.length > 100) {
    return res.status(400).json({ message: 'El nombre es obligatorio y admite máximo 100 caracteres' })
  }
  if (!contact.telefono || !phonePattern.test(contact.telefono)) {
    return res.status(400).json({ message: 'Ingresa un teléfono válido' })
  }
  if (!contact.correo || !emailPattern.test(contact.correo)) {
    return res.status(400).json({ message: 'Ingresa un correo válido' })
  }
  if (contact.empresa.length > 100 || contact.notas.length > 500) {
    return res.status(400).json({ message: 'Empresa o notas exceden la longitud permitida' })
  }

  req.body = contact
  next()
}
