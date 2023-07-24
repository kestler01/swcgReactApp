import { useState, useEffect } from 'react'
import {socket, SocketContext} from './socketConnection'
import { Routes, Route, useNavigate, Navigate} from "react-router-dom"

import './App.css'

import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import CreateGameForm from './createGameForm'
import GameIndex from './gameIndex'
import NavBar from './navbar'

function App() {
  const [user,setUser] = useState(null)
  const [connected, setConnected] = useState(false)

  const navigate = useNavigate()
useEffect(() =>{
  navigate('/gameHub')
},[user])

  useEffect(()=>{
    // these socket listeners need to interact with the app's state, but we can't try and run set state before the app is mounted. They will live here. 

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

    socket.on('signinSuccess', (data)  => {
      console.log('Signing in', data)
      setUser(data)

    })

    socket.on('signinFailure', (data) => {
      console.log('Signing in error', data)
    })

    socket.on('signoutSuccess', (data) => {
      console.log('in on signoutSuccess',data)
      setUser(null)
      navigate('/sign-in')
    })

    socket.on('disconnect', (data) => {
      console.log('Disconnecting', data)
      setConnected(false)
      timeoutID = setTimeout(() => {
        setUser('null')
        navigate('/sign-in')
      }, 10000); // if not reconnected in 10 second log out the user
	})
  },[])
  
  return (
    <SocketContext.Provider value={socket}>
      {!connected && <h1>Connecting...</h1>}
      {user && <NavBar user setUser/> }
        <Routes>
          {!user? 
          <>
            <Route path="/sign-up" element={<SignUpForm setUser/> } />
            <Route path="/sign-in?" element={<SignInForm setUser/>} />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </>
          :
          <>
            <Route path="/gameHub" element={
              <>
                <CreateGameForm></CreateGameForm>
                <GameIndex></GameIndex>
              </>}
            />
            <Route path="*" element={<Navigate to="/gamehub" />} />
          </>
          }
        </Routes>
    </SocketContext.Provider>
  )
}

export default App
