import dotenv from 'dotenv'
import transporter from './nodemailer.js'
import User from '../models/user.model.js'
import { orderConfirmationTemplate } from './emailTemplate.js'

dotenv.config()

export const sendOrderConfirmationEmail = async (
  userId,
  orderId,
  items,
  amount,
  address
) => {
  try {
    const user = await User.findById(userId)

    if (!user) return

    const mailOptions = {
      from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: 'Your Order Has Been Confirmed',
      html: orderConfirmationTemplate({
        userName: user.name,
        orderId,
        items,
        amount,
        address,
      }),
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
  }
}
