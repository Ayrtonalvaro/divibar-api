import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import usersModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, adress } = req.body

    if (!name) {
      return res.send({ error: 'Name is required' })
    }
    if (!email) {
      return res.send({ error: 'Email is required' })
    }
    if (!password) {
      return res.send({ error: 'password is required' })
    }
    if (!phone) {
      return res.send({ error: 'Phone is required' })
    }
    if (!adress) {
      return res.send({ error: 'Adress is required' })
    }

    const existingUser = await usersModel.findOne({ email })
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: 'Already register please login'
      })
    }
    const hasedPassword = await hashPassword(password)

    // eslint-disable-next-line new-cap
    const user = await new usersModel({ name, email, phone, adress, password: hasedPassword }).save()

    res.status(201).send({
      success: true,
      message: 'User register',
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error register',
      error
    })
  }
}

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalidad email or password'
      })
    }
    const user = await usersModel.findOne({ email })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email is not registerd'
      })
    }
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalidad password'
      })
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(200).send({
      success: true,
      message: 'Login succesfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      },
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error login',
      error
    })
  }
}
