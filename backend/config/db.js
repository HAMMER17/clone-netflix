import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('mongo connect')
  } catch (error) {
    console.log(error)
  }

}
export const NODE_ENV = process.env.NODE_ENV