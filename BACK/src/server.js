import express from 'express'
import authRouter from './routes/authRoutes.js'
import contactRouter from './routes/contactRoutes.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactRouter)


const PORT = process.env.PORT || 3001

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor levantado en http://localhost:${PORT}`)
    })  

})

