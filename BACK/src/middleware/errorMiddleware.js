export const notFound = (req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` })
}

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error)

  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((item) => item.message).join(', ')
    return res.status(400).json({ message })
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Identificador no válido' })
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'El correo ya está registrado' })
  }

  const statusCode = error.statusCode || 500
  if (statusCode >= 500) console.error(error)
  res.status(statusCode).json({ message: error.message || 'Error interno del servidor' })
}
