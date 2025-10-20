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
