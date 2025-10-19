import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(402).json({
      success: false,
      message: 'Not authorized',
    })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (decodedToken.id) {
      req.userId = decodedToken.id
    } else {
      return res.status(402).json({
        success: false,
        message: 'Not Authorized',
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export default authUser
