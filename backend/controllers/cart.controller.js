// update user carddata

import User from '../models/user.model.js'

export const updateCart = async (req, res) => {
  const userId = req.userId
  const { cartItems } = req.body
  try {
    await User.findByIdAndUpdate(userId, { cartItems })
    res.json({
      success: true,
      message: 'Cart updated successfully',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
