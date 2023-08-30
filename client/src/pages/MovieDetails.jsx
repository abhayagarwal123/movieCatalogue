import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { httpGetMovieInfo } from '../hooks/request'
import './MovieDetails.css'
import { useCookies } from 'react-cookie'

export default function MovieDetails() {

    const location = useLocation()
    const { state } = location 

    const [checkedStars, setCheckedStars] = useState(["","","","","","","","","","",""])   
    const [cookies, setCookies] = useCookies(["access_token"])
    const [movieInfo, setMovieInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [genres, setGenres] = useState([])
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openPopup = () => {
        setIsPopupOpen(true)
    }

    const closePopup = () => {
        setIsPopupOpen(false)
        setCheckedStars(["","","","","","","","","","",""])
    }



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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
                    {!cookies.access_token ? (
                        <></>
                    ) : (
                        <div className='personal-rating'>
                            <button onClick={openPopup} className='rating-btn'>Rate this movie</button>
                        </div>
                    )}
                    
                    {isPopupOpen && (
                        <div className='popup'>
                        <div className='popup-content'>
                            <div className='popup-header'>
                                <span onClick={closePopup} className='close'>&times;</span>
                                <h2>Rating</h2>
                            </div>
                            <div className='popup-body'>
                                <div className='star-wrapper'>
                                    <span className={"fa fa-star s1 " + checkedStars[0]} onClick={() => setCheckedStars(["checked","","","","","","","","","","10"])}></span>
                                    <span className={"fa fa-star s2 " + checkedStars[1]} onClick={() => setCheckedStars(["","checked","","","","","","","","","9"])}></span>
                                    <span className={"fa fa-star s3 " + checkedStars[2]} onClick={() => setCheckedStars(["","","checked","","","","","","","","8"])}></span>
                                    <span className={"fa fa-star s4 " + checkedStars[3]} onClick={() => setCheckedStars(["","","","checked","","","","","","","7"])}></span>
                                    <span className={"fa fa-star s5 " + checkedStars[4]} onClick={() => setCheckedStars(["","","","","checked","","","","","","6"])}></span>
                                    <span className={"fa fa-star s6 " + checkedStars[5]} onClick={() => setCheckedStars(["","","","","","checked","","","","","5"])}></span>
                                    <span className={"fa fa-star s7 " + checkedStars[6]} onClick={() => setCheckedStars(["","","","","","","checked","","","","4"])}></span>
                                    <span className={"fa fa-star s8 " + checkedStars[7]} onClick={() => setCheckedStars(["","","","","","","","checked","","","3"])}></span>
                                    <span className={"fa fa-star s9 " + checkedStars[8]} onClick={() => setCheckedStars(["","","","","","","","","checked","","2"])}></span>
                                    <span className={"fa fa-star s10 " + checkedStars[9]} onClick={() => setCheckedStars(["","","","","","","","","","checked","1"])}></span>
                                </div>

                                <div className='rating-number'>
                                    <h3 className='rating-text'>{checkedStars[10]}</h3>
                                </div>
                                <button>Confirm</button>
                            </div>
                        </div>
                        </div>
                    )}
                    
                </div>
            </div>
        )} 
    </div>
  )
}
