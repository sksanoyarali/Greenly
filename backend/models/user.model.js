import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [25, 'Name cannot exceed 25 characters'],
      minlength: [3, 'name must be at least 3 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least of 6 characters'],
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  { minimize: false, timestamps: true }
)

const User = mongoose.models.user || mongoose.model('user', userSchema)
export default User
