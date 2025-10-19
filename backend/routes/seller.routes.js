import express from 'express'
import {
  sellerIsAuth,
  sellerLogin,
  sellerLogout,
} from '../controllers/seller.controller.js'
import authSeller from '../middlewares/authSeller.js'

const sellerRouter = express.Router()

sellerRouter.post('/login', sellerLogin)

sellerRouter.get('/is-auth', authSeller, sellerIsAuth)

sellerRouter.get('/logout', authSeller, sellerLogout)

export default sellerRouter
