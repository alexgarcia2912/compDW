import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
  const headerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null
  const token = headerToken || req.cookies?.token

  if (!token) return res.status(401).json({ message: 'No autenticado' })

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}
