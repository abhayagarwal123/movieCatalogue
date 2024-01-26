import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

//SEND PRIVATE KEY TO FRONTEND
router.get('/omdb', (req, res) => {
    res.json({key: process.env.OMDB_KEY})
})

export { router as keyRouter }