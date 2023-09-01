import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  name: String,
  poster: String,
  imdbID: String
});

export const MovieModel = mongoose.model('Movie', movieSchema)