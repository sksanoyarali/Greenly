// seller login
import jwt from 'jsonwebtoken'
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
      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', //use secure for production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
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
