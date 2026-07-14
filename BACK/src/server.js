import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import authRouter from './routes/authRoutes.js'
import contactRouter from './routes/contactRoutes.js'

dotenv.config()

const missingEnv = ['MONGODB_URI', 'JWT_SECRET'].filter((name) => !process.env[name])
if (missingEnv.length) throw new Error(`Variables requeridas faltantes: ${missingEnv.join(', ')}`)

const app = express()
const allowedOrigins = (process.env.CLIENT_URLS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())

app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }))
app.use(express.json({ limit: '20kb' }))
app.use(cookieParser())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRouter)
app.use('/api/contacts', contactRouter)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
connectDB().then(() => app.listen(PORT, () => console.log(`Servidor levantado en http://localhost:${PORT}`)))
