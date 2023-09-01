import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { httpGetMovieRatings } from '../hooks/request'
import './Rating.css'

export default function Ratings() {
  const [cookies] = useCookies(['access_token']);
  const [fetchedMovies, setFetchedMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.access_token) {
      navigate('/login')
    }
    setLoading(true)


    const userID = window.localStorage.getItem("userID")
    httpGetMovieRatings(userID)
      .then(data => {
        setFetchedMovies(data)
        setLoading(false)
      })

    console.log(fetchedMovies)
  }, []);


  if (!cookies.access_token) {
    return null;
  }

  return (
    <div>
      {loading ? (
        <div class="loading-container">
          <div class="loading-icon"></div>
        </div>
      ) : (
        fetchedMovies.map((movie,index) => 
          <div className="rating-container" key={index}>
            <img className="rating-poster"src={movie.movie.poster} alt="ye"/>
            <h1 className='rating-value'>{movie.rating}</h1>
          </div>
        )
      )}
      
    </div>
  );
}