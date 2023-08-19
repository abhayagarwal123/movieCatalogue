import React from 'react'
import "./Moviecard.css"
import {Link} from 'react-router-dom'

export default function Moviecard({movie}) {

  const url = "/movie/" + movie.imdbID

  
  return (

    <Link to={url} state={movie} >
      <div className='image-container'>
          <img src={movie.Poster} alt={movie.Title} className='image' />
          <span className='tooltip'>{movie.Title + " : " + movie.Year}</span>
      </div>
    </Link>
  )
}
