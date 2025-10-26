import Product from '../models/product.model.js'
import { v2 as cloudinary } from 'cloudinary'
// add product

export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData)

    const images = req.files

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        })
        return result.secure_url
      })
    )
    await Product.create({
      ...productData,
      image: imagesUrl,
    })

    return res.status(200).json({
      success: true,
      message: 'Product added successfully',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// get product list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// get productById
export const productById = async (req, res) => {
  try {
    const { id } = req.body
    const product = await Product.findById(id)
    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// change product in stock
export const changeStock = async (req, res) => {
  const { id, inStock } = req.body
  try {
    await Product.findByIdAndUpdate(id, { inStock })
    res.status(200).josn({
      success: true,
      message: 'stock Updated',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
