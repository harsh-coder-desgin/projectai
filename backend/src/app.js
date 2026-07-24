import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/error.middleware.js"
import rateLimiter from "./middleware/rateLimiter.js"
import authroute from "./routes/auth.route.js"
import chatroute from "./routes/chat.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(rateLimiter)

app.use('/api/auth', authroute)
app.use('/api/chat', chatroute)
app.use(errorHandler)

export default app