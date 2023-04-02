import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

// Protected Routes token base

export const requireSignin = (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    next()
    req.user = decode
  } catch (error) {
    console.log(error)
  }
}

// Admin acces

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id)
    if (!user.role !== 1) {
      return res.status(401).send({
        succes: false,
        message: 'Unauthorized Acces'
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      succes: false,
      error,
      message: 'Error in admin middlwhare'
    })
  }
}
