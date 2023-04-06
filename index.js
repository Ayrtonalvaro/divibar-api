import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import menuRoute from './routes/menuRoute.js'
import categoryRoute from './routes/categoryRoute.js'

const app = express()
app.use(cors())
dotenv.config()

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB', error)
    })
}
connect()
app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
