import React, {useState, useEffect} from 'react'
import './Searchbar.css'

export default function Searchbar({movieFunction}) {
    const [input, setInput] = useState('')

    

    useEffect(() => {
        const delay = 500; // Adjust the delay time as needed (in milliseconds)
        const timer = setTimeout(() => {
            movieFunction(input); // Call the movie function after the delay
        }, delay);

        return () => {
            clearTimeout(timer); // Clear the timer if the component unmounts or input changes
        };
    }, [input]);

    const handleChange = (value) => {
        setInput(value)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter"){
            event.preventDefault()
        }
    }

  return (
    <form className='searchbar'>
        <label className='label-text'>Search</label>
        <input className="input" placeholder='Type to search ...' value={input} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyPress} />
    </form>
  )
}
