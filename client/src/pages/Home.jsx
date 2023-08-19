import React from 'react'
import Moviecard from '../components/Moviecard'
import {useState} from 'react'
import Searchbar from '../components/Searchbar'
import './Home.css'
import { DEFAULTLISTOFMOVIES } from './defaultListofMovies'
import { httpGetKey } from '../hooks/request'


export default function Home() {
    const [imageURL, setImageURL] = useState('')
    const [searchValue,setSearchValue] = useState('')
    const [listOfMovies, setListOfMovies] = useState(null)



    const httpGetMovies = async (searchValue) => {
        const key = await httpGetKey()

        const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchValue}`)
        const fetchedMovies = await response.json()
        setListOfMovies(fetchedMovies.Search)
        setSearchValue(searchValue)
    }
    

  return (
    <div>
        <Searchbar movieFunction={httpGetMovies}/>
        {!listOfMovies ? (
            <div>
                <h1 className='text-h1'>Our selection of movies!</h1>
                <div className='container'>
                {DEFAULTLISTOFMOVIES.map((movie,index) => 
                    <div key={index}>
                        <Moviecard movie={movie}/>
                    </div>
                )}
                </div>
            </div>

        ) : (
            <div>
                <h1 className='text-h1'>This is all we found for {searchValue}</h1>
                <div className='container'>
                    {
                        listOfMovies.map((movie, index) => 
                        <div key={index}>
                            <Moviecard movie={movie} />
                        </div>
                    )
                    }
                </div> 
            </div>
        )}
    </div>
  )
}
