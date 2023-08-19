import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/users.js'
import { keyRouter } from './routes/keys.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)
app.use("/keys", keyRouter)

mongoose.connect(process.env.MONGODB_SECRET_URL)


app.listen(PORT, () => {
    console.log("Listening on "+ PORT + "...")
})