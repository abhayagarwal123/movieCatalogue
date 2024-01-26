import axios from 'axios'

const API_URL = 'http://3.16.160.62:3001'

const httpGetKey = async () => {
    const keyResponse = await fetch(API_URL + '/keys/omdb')
    const fetchedKey = await keyResponse.json()
    return fetchedKey.key
}

const httpGetMovieInfo = async (id) => {
    const key = await httpGetKey()

    const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
    const fetchedInfo = await response.json()

    return fetchedInfo
}

const httpPostMovieRating = async (userID, imdbID, name, poster, rating) => {
    const response = await axios.post(`${API_URL}/auth/${userID}/addmovie`, {
        movieID: imdbID,
        name: name,
        rating: rating,
        poster: poster
    })

    console.log(response.data)
}

const httpGetMovieRatings = async (userID) => {
    const response = await fetch(`${API_URL}/auth/${userID}/movies`)
    const fetchedMovies = await response.json()

    return fetchedMovies
}





export {httpGetMovieInfo, httpGetKey, httpPostMovieRating, httpGetMovieRatings}