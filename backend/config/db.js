import mongoose from "mongoose";

// Cache the connection across serverless invocations so we don't
// reconnect on every request (Vercel reuses warm function instances).
let cached = null

const connectDB = async () => {
    if (cached && mongoose.connection.readyState === 1) return cached
    cached = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Db connected to: ${mongoose.connection.host}`)
    return cached
}

export default connectDB