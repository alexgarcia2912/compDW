import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 1000 * 60 * 60 * 8
}

const createToken = (user) => {
    return jwt.sign(
        { id: user._id, nombre: user.nombre, correo: user.correo },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    )
}

router.post('/register', async (req, res) => {
    try {
        const { nombre, correo, password } = req.body

        if (!nombre || !correo || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' })
        }

        const existingUser = await User.findOne({ correo: correo.toLowerCase() })
        if (existingUser) {
            return res.status(409).json({ message: 'El correo ya está registrado' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            nombre,
            correo,
            password: hashedPassword
        })

        const token = createToken(user)
        res.cookie('token', token, cookieOptions)
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: {
                id: user._id,
                nombre: user.nombre,
                correo: user.correo
            }
        })
    } catch (error) {
        console.error('Error al registrar usuario:', error)
        res.status(500).json({ message: 'Error al registrar usuario' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body

        if (!correo || !password) {
            return res.status(400).json({ message: 'Correo y contraseña son obligatorios' })
        }

        const user = await User.findOne({ correo: correo.toLowerCase() })
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }

        const token = createToken(user)
        res.cookie('token', token, cookieOptions)
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                nombre: user.nombre,
                correo: user.correo
            }
        })
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        res.status(500).json({ message: 'Error al iniciar sesión' })
    }
})

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('nombre correo createdAt')

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.status(200).json({ user })
    } catch (error) {
        console.error('Error al validar sesión:', error)
        res.status(500).json({ message: 'Error al validar sesión' })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    })
    res.status(200).json({ message: 'Sesión cerrada correctamente' })
})

export default router