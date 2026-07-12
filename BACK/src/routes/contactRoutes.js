import express from 'express'
import Contact from '../models/contactModel.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(requireAuth)

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({ owner: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json(contacts)
    } catch (error) {
        console.error('Error al obtener contactos:', error)
        res.status(500).json({ message: 'Error al obtener contactos' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findOne({ _id: req.params.id, owner: req.user.id })

        if (!contact) {
            return res.status(404).json({ message: 'Contacto no encontrado' })
        }

        res.status(200).json(contact)
    } catch (error) {
        console.error('Error al obtener contacto:', error)
        res.status(500).json({ message: 'Error al obtener contacto' })
    }
})

router.post('/', async (req, res) => {
    try {
        const { nombre, telefono, correo, empresa, notas } = req.body

        if (!nombre || !telefono || !correo) {
            return res.status(400).json({ message: 'Nombre, teléfono y correo son obligatorios' })
        }

        const contact = await Contact.create({
            nombre,
            telefono,
            correo,
            empresa,
            notas,
            owner: req.user.id
        })

        res.status(201).json({ message: 'Contacto creado correctamente', contact })
    } catch (error) {
        console.error('Error al crear contacto:', error)
        res.status(500).json({ message: 'Error al crear contacto' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { nombre, telefono, correo, empresa, notas } = req.body

        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            { nombre, telefono, correo, empresa, notas },
            { new: true, runValidators: true }
        )

        if (!contact) {
            return res.status(404).json({ message: 'Contacto no encontrado' })
        }

        res.status(200).json({ message: 'Contacto actualizado correctamente', contact })
    } catch (error) {
        console.error('Error al actualizar contacto:', error)
        res.status(500).json({ message: 'Error al actualizar contacto' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user.id })

        if (!contact) {
            return res.status(404).json({ message: 'Contacto no encontrado' })
        }

        res.status(200).json({ message: 'Contacto eliminado correctamente' })
    } catch (error) {
        console.error('Error al eliminar contacto:', error)
        res.status(500).json({ message: 'Error al eliminar contacto' })
    }
})

export default router