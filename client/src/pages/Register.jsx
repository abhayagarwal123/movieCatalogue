import React, {useState} from 'react'
import axios from 'axios'
import Form from '../components/Form'

export default function Register() {
  const API_URL = 'http://3.16.160.62:3001'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(API_URL + "/auth/register", { username, password, email})
      alert(response.data.message)
      setUsername('')
      setPassword('')
      setEmail('')
    } catch( err ) {
      console.log(err)
    }

  }
  return (
    <div>
      <Form username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      email={email}
      setEmail={setEmail}
      label={"Register"}
      onSubmit={onSubmit}
      />
    </div>
  )
}
