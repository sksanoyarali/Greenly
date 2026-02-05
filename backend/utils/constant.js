export const cookieOptions = {
  httpOnly: true, //prevents xss attack
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}
export const IMAGE_UPLOAD_LIMIT = 3
