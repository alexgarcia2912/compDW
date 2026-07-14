import express from 'express'
import { createContact, deleteContact, getContact, listContacts, updateContact } from '../controllers/contactController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { validateContact } from '../middleware/validationMiddleware.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = express.Router()
router.use(requireAuth)
router.get('/', asyncHandler(listContacts))
router.get('/:id', asyncHandler(getContact))
router.post('/', validateContact, asyncHandler(createContact))
router.put('/:id', validateContact, asyncHandler(updateContact))
router.delete('/:id', asyncHandler(deleteContact))
export default router
