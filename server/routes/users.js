import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    if (username === '' || password === '' || email === '') {
        return res.json({message: "Please fill the form."})
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

router.post("/login", async (req, res) => {

    if (req.body.username === "" || req.body.password === "") {
        return res.json({message: "Please fill out the form!"})
    }

    const { username, password } = req.body

    const user = await UserModel.findOne({username})

    if (!user) {
        return res.json({message: "User doesnt exist"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.json({message: "Username or password incorrect"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.json({token, userID: user._id})
})






export { router as userRouter }