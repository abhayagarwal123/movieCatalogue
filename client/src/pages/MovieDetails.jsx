import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { httpGetMovieInfo } from '../hooks/request'
import './MovieDetails.css'

export default function MovieDetails() {

    const location = useLocation()
    const { state } = location 



    const [movieInfo, setMovieInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [genres, setGenres] = useState([])


     useEffect(()=> {
        setLoading(true)
        if (state) {
            httpGetMovieInfo(state.imdbID)
            .then(data => {

                setMovieInfo(data);
                setGenres((data.Genre).split(', '))
                setLoading(false)
            })
        }
    }, [])


    

  return (
    <div>
        {loading || (!state) ? (
            <div class="loading-container">
                <div class="loading-icon"></div>
            </div>
        ) : (
            <div className='movie-details'>
                <div className='movie-valuables'>
                    <h1 className='title'>{movieInfo.Title}</h1>
                    <div className='movie-time-info'>
                        <h5 className='release-date'>{movieInfo.Year}</h5>
                        <h5 className='rated'>{movieInfo.Rated}</h5>
                        <h5 className='runtime'>{movieInfo.Runtime}</h5>
                    </div>
                    <img src={state.Poster} alt={state.Title}/>
                </div>

                <div className='movie-information'>
                    <div className='genre'>
                        {genres?.map((genre) =>
                            <div>
                                {genre}
                            </div>
                        )}
                    </div>

                    <div className='plot'>
                        {movieInfo.Plot}
                    </div>

                    <div className='staff'> 
                        <ul>
                            <li>Director: {movieInfo.Director}</li>
                            <li>Writers: {movieInfo.Writer}</li>
                            <li>Actors: {movieInfo.Actors}</li>
                        </ul>
                    </div>

                    <div className='rating'>
                        {(movieInfo.Ratings)?.map((rating) => 
                            <div className='individual-rating'>
                                {rating.Source}: {rating.Value}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )} 
    </div>
  )
}
