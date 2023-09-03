import React, {useState} from 'react'
import './Form.css'

export default function Form({username, setUsername, password, setPassword, email = '', setEmail = '', label, onSubmit}) {
  return (
    <div className='form-container'>
            <form onSubmit={onSubmit}>
                <h2 className='form-label'> {label} </h2>
                <div className='form-group'>
                    <label htmlFor='username'> Username: </label>
                    <input type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'> Password: </label>
                    <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                { label === "Register" ? (
                    <div className='form-group'>
                        <label htmlFor='email'> Email: </label>
                    <input type='email' id='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                ) : (
                    <>
                    </>
                )}


                <button className='submit-btn' type="submit"> {label} </button>
            </form>
       </div>
  )
}
