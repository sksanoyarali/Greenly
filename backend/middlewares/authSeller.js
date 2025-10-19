import jwt from 'jsonwebtoken'

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies
  if (!sellerToken) {
    return res.status(402).json({
      success: false,
      message: 'Not Authorized',
    })
  }
  try {
    const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET)

    if (decodedToken.email === process.env.SELLER_EMAIL) {
      next()
    } else {
      return res.status(402).json({
        success: false,
        message: 'Not Authorized',
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export default authSeller
