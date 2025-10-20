import express from 'express'
import authUser from '../middlewares/authUser'
import { updateCart } from '../controllers/cart.controller.js'

const cartRouter = express.Router()

cartRouter.post('/update', authUser, updateCart)

export default cartRouter
