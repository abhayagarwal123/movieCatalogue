import React from 'react'
import './Navbar.css'
import Searchbar from './Searchbar'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const [cookies, setCookies] = useCookies(['access_token'])
  const loginUsername = window.localStorage.getItem('username')

  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    window.localStorage.removeItem("username")
  }

  

  return (
    <div>
        <header>
        <ul className='navbar-ul'>
            <li className='navbar-li'><a href="/">Home</a></li>
            <li className='navbar-li' style={{float:'right'}}><a href="/takes">Takes</a></li> 
            {!cookies.access_token ? (
              <div>

                  <li className='navbar-li'><a href="/register">Register</a></li>
                  <li className='navbar-li'><a href="/login">Login</a></li>

              </div>
            ) : (
              <div>
                  <li className='navbar-li'><a>Welcome {loginUsername}!</a></li>
                  <li className='navbar-li'><a href='/' onClick={logout}>Logout</a></li>
                  <li className='navbar-li' style={{float:'right'}}><a href='/ratings'>My Ratings</a></li>
            
              </div>
            )}


        </ul>
        </header>
    </div>
  )
}
