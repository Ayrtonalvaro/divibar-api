import express from 'express'
import {
  registerController,
  loginController,
  testController
} from '../controllers/authControllers.js'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js'

// Router user
const router = express.Router()

// Register
router.post('/register', registerController)

// LOGIN
router.post('/login', loginController)

// test routes
router.get('/test', requireSignin, isAdmin, testController)

// protected route auth
router.get('/user-auth', requireSignin, (req, res) => {
  res.status(200).send({
    ok: true
  })
})

// protected route admin
router.get('/admin-auth', requireSignin, (req, res) => {
  res.status(200).send({
    ok: true
  })
})
export default router
