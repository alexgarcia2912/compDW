import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 80
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User
