import React from 'react'
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div>
        <header>
        <ul className='navbar-ul'>
            <li className='navbar-li'><a href="/">Home</a></li>
            <li className='navbar-li'><a href="/login">Login</a></li>
            <li className='navbar-li'><a href="/register">Register</a></li>
            <li className='navbar-li' style={{float:'right'}}><a href="/takes">Takes</a></li> 
        </ul>
        </header>
    </div>
  )
}
