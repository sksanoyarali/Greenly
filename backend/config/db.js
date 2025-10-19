import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database connected successfully')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/greenly`)
  } catch (error) {
    console.error('Error in db connection')
    process.exit(1)
  }
}
export default dbConnect
