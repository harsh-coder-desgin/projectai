import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./utils/error.middleware.js"
import authroute from "./routes/auth.route.js"
import chatroute from "./routes/chat.route.js"

const app = express()

app.use(cors())
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(errorHandler())
// app.use(express.static("public"))

app.use('/api/auth', authroute)
app.use('/api/chat', chatroute)

export default app