import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import MovieDetails from './pages/MovieDetails'
import './App.css'
import Ratings from './pages/Ratings'


export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/ratings' element={<Ratings />} />
        </Routes>
      </Router>
    </div>
  )
}
