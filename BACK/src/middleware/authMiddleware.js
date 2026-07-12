import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
    const tokenFromHeader = req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null
    const token = tokenFromHeader || req.cookies?.token

    if (!token) {
        return res.status(401).json({ message: 'No autenticado' })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }
}