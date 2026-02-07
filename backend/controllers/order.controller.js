// place order with cash on delivery

import { sendOrderConfirmationEmail } from '../config/emailHandler.js'
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.model.js'
import stripe from 'stripe'

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
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: 'COD',
    })

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
    })
    sendOrderConfirmationEmail(
      userId,
      order._id,
      order.items,
      order.amount,
      order.address
    )
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// place order with online payment
export const placeOrderStripe = async (req, res) => {
  const userId = req.userId
  const { items, address } = req.body
  const { origin } = req.headers
  if (!address || items.length == 0) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Data',
    })
  }
  try {
    let productData = []
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product)
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      })
      return (await acc) + product.offerPrice * item.quantity
    }, 0)

    // add tax charge 2%
    amount += Math.floor(amount * 0.02)
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: 'Online',
    })
    // stripe gateway initiialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

    // create line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      }
    })

    // create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    })

    return res.status(201).json({
      success: true,
      url: session.url,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// Stripe webhooks to verify payments action :/stripe
export const stripeWebHooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
  const sig = request.headers['stripe-signature']
  let event
  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    response.status(400).send(`Webhook error :${error.message}`)
  }
  // handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      const paymentIntentId = paymentIntent.id

      // getting session metatdata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      })
      const { orderId, userId } = session.data[0].metadata

      // mark payment as paid true
      await Order.findByIdAndUpdate(orderId, { isPaid: true })
      // clear cart data

      await User.findByIdAndUpdate(userId, { cartItems: {} })
      break
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      const paymentIntentId = paymentIntent.id

      // getting session metatdata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      })
      const { orderId } = session.data[0].metadata

      await Order.findByIdAndDelete(orderId)
      break
    }
    default:
      console.error(`unhandled event type ${event.type}`)
      break
  }
  response.json({ recieved: true })
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
