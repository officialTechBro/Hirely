import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import jobRoutes from './routes/job.routes.js'
import applicationRoutes from './routes/application.routes.js'
import savedJobRoutes from './routes/savedJob.routes.js'
import analyticsRoute from './routes/analytics.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(helmet())

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim())

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
        callback(new Error(`CORS: origin ${origin} not allowed`))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' },
})

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' },
})

app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/user', apiLimiter, userRoutes)
app.use('/api/job', apiLimiter, jobRoutes)
app.use('/api/application', apiLimiter, applicationRoutes)
app.use('/api/save-job', apiLimiter, savedJobRoutes)
app.use('/api/analytics', apiLimiter, analyticsRoute)

const uploadsDir = process.env.VERCEL ? '/tmp' : path.join(__dirname, 'uploads')
app.use('/uploads', express.static(uploadsDir))

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message || 'Internal server error'

    if (process.env.NODE_ENV !== 'test') {
        console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} — ${err.message}`)
    }

    res.status(status).json({ message })
})

export default app
