import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    empresa: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ''
    },
    notas: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
