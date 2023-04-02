import express from 'express'
import { registerController, loginController } from '../controllers/authControllers.js'

// Router user
const router = express.Router()

// Register

router.post('/register', registerController)

// LOGIN

router.post('/login', loginController)

export default router
