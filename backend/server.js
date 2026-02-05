import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import dbConnect from './config/db.js'
import userRouter from './routes/user.routes.js'
import sellerRouter from './routes/seller.routes.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import addressRouter from './routes/address.route.js'
import orderRouter from './routes/order.routes.js'
import { stripeWebHooks } from './controllers/order.controller.js'
const app = express()

const port = process.env.PORT || 4000
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://greenly-murex.vercel.app',
]

app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebHooks)
//connections

await dbConnect()
await connectCloudinary()
// middleware

app.use(express.json()) //parse json body
app.use(express.urlencoded({ extended: true })) //parse url encoded data like form
app.use(cookieParser()) //parse cookie haeder

app.use(
  cors({
    origin: allowedOrigins, //allow only your frontennd to request to server
    credentials: true, //allow to send cookies
  })
)

app.get('/', (req, res) => {
  res.send('Server is live')
})
// routes
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
