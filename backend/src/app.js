import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./utils/error.middleware.js"
import authroute from "./routes/auth.route.js"
import chatroute from "./routes/chat.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
//limit of api call
// app.use(express.static("public"))

app.use('/api/auth', authroute)
app.use('/api/chat', chatroute)
app.use(errorHandler)

export default app