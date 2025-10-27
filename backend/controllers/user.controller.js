import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing details',
      })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hashedPassword })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //use secure for production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { email: user.email, name: user.name },
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const user = await User.findOne({ email })
    console.log(user)

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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //use secure for production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      success: true,
      user: { email: user.email, name: user.name },
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//check Auth

export const isAuth = async (req, res) => {
  try {
    const userId = req.userId
    console.log(userId)

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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //use secure for production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
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
