import express from 'express'
import { login, logout, me, register } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { validateAuth } from '../middleware/validationMiddleware.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = express.Router()
router.post('/register', validateAuth(true), asyncHandler(register))
router.post('/login', validateAuth(false), asyncHandler(login))
router.get('/me', requireAuth, asyncHandler(me))
router.post('/logout', logout)
export default router
