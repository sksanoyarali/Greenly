import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/greenly`)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Error in db connection')
    process.exit(1)
  }
}
export default dbConnect
