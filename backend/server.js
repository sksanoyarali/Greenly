import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import dbConnect from './config/db.js'
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
