import { useState, useEffect } from 'react'
import {socket, SocketContext} from './socketConnection'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'

import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

function App() {
  const [user,setUser] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(()=>{
    let timeoutID // used to prevent auto logout if user reconnects within time limit, set on disconnect

    socket.on('connect', (data) => {
      console.log('Connecting', data)
      setConnected(true)
      clearTimeout(timeoutID) // prevent the auto log out if user reconnects within time limit
    })

    socket.on('signupSuccess', (data) => {
      console.log('Signing up', data)
    })

    socket.on('signupFailure', (data) => {
      console.log('Signing up error', data)
    })

    socket.on('signinSuccess', (data) => {
      console.log('Signing in', data)
      setUser(data)
    })

    socket.on('signinFailure', (data) => {
      console.log('Signing in error', data)
    })

    socket.on('disconnect', (data) => {
      console.log('Disconnecting', data)
      setConnected(false)
      timeoutID = setTimeout(() => {
        setUser('null')
      }, 10000); // if not reconnected in 10 second log out the user
	})
  },[])
  
  return (
    <SocketContext.Provider value={socket}>
      {!connected? <h1>Connecting...</h1> :
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <p>landing page for /</p>}/>
          <Route path="/sign-up" element={<SignUpForm setUser={setUser}/>} />
          <Route path="/sign-in" element={<SignInForm setUser={setUser}/>} />
        </Routes>
      </BrowserRouter>
      }
    </SocketContext.Provider>
  )
}

export default App
