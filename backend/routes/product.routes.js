import express from 'express'
import { upload } from '../config/multer.js'
import authSeller from '../middlewares/authSeller.js'
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from '../controllers/productController.js'
import { IMAGE_UPLOAD_LIMIT } from '../utils/constant.js'

const productRouter = express.Router()

productRouter.post(
  '/add',
  upload.array('images', IMAGE_UPLOAD_LIMIT), //upload array take 2 argument one is {fieldname,maxlimit}
  authSeller,
  addProduct
)

productRouter.get('/list', productList)

productRouter.get('/id', productById)

productRouter.post('/stock', authSeller, changeStock)

export default productRouter
