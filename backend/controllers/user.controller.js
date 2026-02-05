import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookieOptions } from '../utils/constant.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are required',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password length must be atleast 6',
      })
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    const normalizedEmail = email.trim().toLowerCase()

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      })
    }

    if (name.trim().length > 25) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot exceed 25 characters',
      })
    }

    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, cookieOptions)

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { email: user.email, name: user.name },
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    const normalizedEmail = email.trim().toLowerCase()

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      })
    }

    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, cookieOptions)

    return res.status(200).json({
      success: true,
      user: { email: user.email, name: user.name },
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

//check Auth

export const isAuth = async (req, res) => {
  try {
    const userId = req.userId

    const user = await User.findById(userId).select('-password')

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// logout

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
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
