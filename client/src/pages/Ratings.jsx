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

  if (fetchedMovies.length == 0) {
    return (
      <div>
        <h1 className='text-h1'>NO RATED MOVIES</h1>
      </div>
    )
  }

  return (
    <div>
      {loading ? (
        <div class="loading-container">
          <div class="loading-icon"></div>
        </div>
      ) : (
        <>
        <div>
          <h1 className='text-h1'>Personal Ratings</h1>
        </div>
        <div className='rating-container'>
        {fetchedMovies.map((movie,index) => 
          <div className="rated-movie" key={index}>
            <img className="rating-poster"src={movie.movie.poster} alt="ye"/>
            <h4 className='rating-value'>{"Your rating : " + movie.rating + "/10"}</h4>
          </div>
        )
        }
        </div>
        </>
        )
      }
      
    </div>
  );
}