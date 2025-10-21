// place order with cash on delivery

import Order from '../models/order.model.js'
import Product from '../models/product.model.js'

export const placeOrderCOD = async (req, res) => {
  const userId = req.userId
  const { items, address } = req.body
  if (!address || items.length == 0) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Data',
    })
  }
  try {
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product)
      return (await acc) + product.offerPrice * item.quantity
    }, 0)

    // add tax charge 2%
    amount += Math.floor(amount * 0.02)
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: 'COD',
    })

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// get orders by userid

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: 'COD' }, { isPaid: true }],
    })
      .populate('items.product address')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      orders,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// get all orders (for seller)

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: 'COD' }, { isPaid: true }],
    }).populate('items.product address')

    return res.status(200).json({
      success: true,
      orders,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
