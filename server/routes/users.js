import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'
import { MovieModel } from '../models/Movie.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    //CHECK IF ALL PARAMETERS ARE SENT
    if (username === '' || password === '' || email === '') {
        return res.json({message: "Please fill the form."})
    }
    

    //LOOK FOR USER 
    const user = await UserModel.findOne({username});


    //IF USER EXIST
    if (user) {
        return res.json({ message: "User already exist!" })
    }


    //HASH THE PASSWORD FOR SAFETY
    const hashedPassword = await bcrypt.hash(password, 10)


    //CREATE THE NEW USER
    const newUser = new UserModel({username, password: hashedPassword, email})
    await newUser.save()

    res.json({message: "User was registered successfully!"})
})

router.post("/login", async (req, res) => {


    //CHECK IF ALL PARAMETERS ARE SENT
    if (req.body.username === "" || req.body.password === "") {
        return res.json({message: "Please fill out the form!"})
    }



    const { username, password } = req.body


    //LOOK FOR USER
    const user = await UserModel.findOne({username})


    //IF USER DOESNT EXIST
    if (!user) {
        return res.json({message: "User doesnt exist"})
    }


    //CONFIRM THAT THE PASSWORD IS CORRECT BY COMPARING THE HASHED ONE
    const isPasswordValid = await bcrypt.compare(password, user.password)


    //IF PASSWORD INVALID
    if (!isPasswordValid) {
        return res.json({message: "Username or password incorrect"})
    }


    //MAKE A JWT TOKEN FOR SIGNED USER
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.json({token, userID: user._id})
})

router.post("/:userID/addmovie", async (req,res) => {
    const userID = req.params.userID


    const { movieID, name, rating, poster } = req.body

    try {

        //CHECK USERID LENGTH TO SEE IF CORRECT
        if (userID.length != 24) {
            return res.json({message: "Wrong userID"})
        }

        //IF MISSING VALUES
        if (!name || !rating || !poster || !movieID) {
            return res.status(400).json({ error: 'All fields are required' });
        }


        //FIND USER AND MOVIE IF EXIST ALREADY
        const user = await UserModel.findById(userID)
        const currentMovie = await MovieModel.findOne({imdbID: movieID})

        
        
        if (!user) {
            return res.json({message: "No user was found"})
        }


        
        //IF MOVIE ALREADY IN DATABASE
        if (currentMovie) {
            //CHECK IF USER ARLEADY RATED THE MOVIE
            const ratedMovie = user.ratedMovies.find( 
                (ratedMovie) => ratedMovie.movie.equals(currentMovie._id)
            );


            //IF RATED ALREADY
            if (ratedMovie) {
                // UPDATE THE RATING TO THE NEW NUMBER
                ratedMovie.rating = rating
                await user.save()
                return res.json({message: "The rating has been updated"})
            }

            user.ratedMovies.push({movie: currentMovie._id, rating})
            await user.save()
            return res.json({message: "Movie added"})
        }


        //IF MOVIE DOESNT EXIST, MAKE A NEW ONE AND SAVE IN DATABASE
        const newMovie = new MovieModel({
            name,
            poster,
            imdbID: movieID
        })

        await newMovie.save()

        
        //ADD RATED MOVIE TO USER
        user.ratedMovies.push({ movie: newMovie._id, rating })

        await user.save()
        
        return res.json({message: "Movie added"})

        
    } catch (err) {
        console.error(err)
    }



})

router.get('/:userID/movies', async (req, res) => {
    try {
        const userID = req.params.userID


        //FIND USER
        const user = await UserModel.findById(userID).populate('ratedMovies.movie')

        if (!user) {
            return res.json({message: "No user found"})
        }

        //PUT ALL RATED MOVIES THE USER RATED IN A OBJECT
        const ratedMovies = user.ratedMovies.map((ratedMovie) => ({
            movie: ratedMovie.movie,
            rating: ratedMovie.rating
        }))

        res.json(ratedMovies)
    } catch (err) {
        console.log(err)
    }
})






export { router as userRouter }