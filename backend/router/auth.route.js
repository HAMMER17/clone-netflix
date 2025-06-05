import express from 'express'
import { authCheck, login, logout, signup } from '../controllers/auth.controller.js'
import { protectRouter } from '../middleware/protectedRouter.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/authCheck', protectRouter, authCheck)

export default router;