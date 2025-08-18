import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()



// Middleware to handle cors
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Connect Database
connectDB()

// Middleware
app.use(express.json())


// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}))


// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

