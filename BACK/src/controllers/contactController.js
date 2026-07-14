import Contact from '../models/contactModel.js'
import { AppError } from '../utils/AppError.js'

export const listContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user.id }).sort({ createdAt: -1 })
  res.json(contacts)
}

export const getContact = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id, owner: req.user.id })
  if (!contact) throw new AppError('Contacto no encontrado', 404)
  res.json(contact)
}

export const createContact = async (req, res) => {
  const contact = await Contact.create({ ...req.body, owner: req.user.id })
  res.status(201).json({ message: 'Contacto creado correctamente', contact })
}

export const updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id }, req.body, { new: true, runValidators: true }
  )
  if (!contact) throw new AppError('Contacto no encontrado', 404)
  res.json({ message: 'Contacto actualizado correctamente', contact })
}

export const deleteContact = async (req, res) => {
  const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
  if (!contact) throw new AppError('Contacto no encontrado', 404)
  res.json({ message: 'Contacto eliminado correctamente' })
}
