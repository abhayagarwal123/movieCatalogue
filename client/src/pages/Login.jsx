import React, {useState} from 'react'
import Form from '../components/Form'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const API_URL = 'http://3.16.160.62:3001'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(API_URL + '/auth/login', {
        username,
        password
      })

      if (!response.data.token) {
        alert(response.data.message)
        setUsername('')
        setPassword('')
      } else {
        setCookies("access_token", response.data.token)
        window.localStorage.setItem('userID', response.data.userID)
        window.localStorage.setItem('username', username)
        navigate('/')
      }
    } catch(err) {
      console.error(err)
    }
  }



  return (

    <div>
      <Form username={username}
      setUsername = {setUsername}
      password={password}
      setPassword={setPassword}
      label={"Login"}
      onSubmit={onSubmit}
      />
    </div>
  )
}
