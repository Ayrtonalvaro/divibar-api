import express from 'express'
import {
  categoryController,
  createCategoryController,
  singleCategoryController,
  updateCategoryController
} from '../controllers/categoryController.js'
import { requireSignin } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/create-category', requireSignin, createCategoryController)

router.put('/update-category/:id', requireSignin, updateCategoryController)

router.get('/category', categoryController)

router.get('/single-category/:slug', singleCategoryController)

router.delete('/delete-category', requireSignin)
export default router
