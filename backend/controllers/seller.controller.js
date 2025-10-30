// seller login
import jwt from 'jsonwebtoken'
import { cookieOptions } from '../utils/constant.js'
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })
      res.cookie('sellerToken', token, cookieOptions)
      return res.status(200).json({
        success: true,
        message: 'Logged in',
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Invalid credential',
      })
    }
  } catch (error) {
    console.error(error.message)

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const sellerIsAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      ...cookieOptions,
      maxAge: undefined,
    })
    return res.status(200).json({
      success: true,
      message: 'Logged Out',
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
