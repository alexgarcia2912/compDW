import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { AppError } from '../utils/AppError.js'

const isProduction = process.env.NODE_ENV === 'production'
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? 'none' : 'lax',
  secure: isProduction,
  maxAge: 1000 * 60 * 60 * 8
}

const publicUser = (user) => ({ id: user._id, nombre: user.nombre, correo: user.correo })
const createToken = (user) => jwt.sign(publicUser(user), process.env.JWT_SECRET, { expiresIn: '8h' })

export const register = async (req, res) => {
  const existingUser = await User.findOne({ correo: req.body.correo })
  if (existingUser) throw new AppError('El correo ya está registrado', 409)

  const user = await User.create({ ...req.body, password: await bcrypt.hash(req.body.password, 10) })
  res.cookie('token', createToken(user), cookieOptions)
  res.status(201).json({ message: 'Usuario registrado correctamente', user: publicUser(user) })
}

export const login = async (req, res) => {
  const user = await User.findOne({ correo: req.body.correo }).select('+password')
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw new AppError('Credenciales inválidas', 401)
  }
  res.cookie('token', createToken(user), cookieOptions)
  res.json({ message: 'Inicio de sesión exitoso', user: publicUser(user) })
}

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select('nombre correo createdAt')
  if (!user) throw new AppError('Usuario no encontrado', 404)
  res.json({ user })
}

export const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: isProduction ? 'none' : 'lax', secure: isProduction })
  res.json({ message: 'Sesión cerrada correctamente' })
}
