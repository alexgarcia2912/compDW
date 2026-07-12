import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI
        await mongoose.connect(dbURI)
        console.log('MongoDB conectado correctamente')
    } catch (error) {
        console.error('Error al conectar MongoDB:', error)
        process.exit(1)
    }
}