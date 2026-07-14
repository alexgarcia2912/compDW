import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Contact from '../src/models/contactModel.js'
import User from '../src/models/userModel.js'

dotenv.config()
await mongoose.connect(process.env.MONGODB_URI)

const correo = 'demo@agendapro.local'
await User.deleteOne({ correo })
const user = await User.create({
  nombre: 'Usuario Demo',
  correo,
  password: await bcrypt.hash('Demo12345', 10)
})

await Contact.deleteMany({ owner: user._id })
await Contact.insertMany([
  { nombre: 'Ana Torres', telefono: '0991234567', correo: 'ana@ejemplo.com', empresa: 'Nova', notas: 'Cliente frecuente', owner: user._id },
  { nombre: 'Luis Pérez', telefono: '0987654321', correo: 'luis@ejemplo.com', empresa: 'Independiente', owner: user._id }
])

console.log('Datos demo creados: demo@agendapro.local / Demo12345')
await mongoose.disconnect()
