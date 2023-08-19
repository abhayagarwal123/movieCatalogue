import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    if (username === undefined || password === undefined || email === undefined) {
        res.json({message: "No body was sent"})
    }
    const user = await UserModel.findOne({username});

    if (user) {
        return res.json({ message: "User already exist!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, password: hashedPassword, email})
    await newUser.save()

    res.json({message: "User was registered successfully!"})
})




export { router as userRouter }