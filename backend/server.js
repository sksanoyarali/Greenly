import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import dbConnect from './config/db.js'
import userRouter from './routes/user.routes.js'
import sellerRouter from './routes/seller.routes.js'
const app = express()

const port = process.env.PORT || 4000
const allowedOrigins = ['http://localhost:5173']
dbConnect()
// middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

app.get('/', (req, res) => {
  res.send('Server is live')
})
// routes
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
