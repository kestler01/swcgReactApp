
import { useState, useEffect} from 'react'
import {socket, SocketContext} from './socketConnection'
import { Routes, Route, Navigate, useNavigate} from "react-router-dom"

import './App.css'

import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import NavBar from './navbar'
import GameHub from './GameHub'
import Profile from './Profile'

  console.log('initiated app.jsx, socket and socket context are', socket, SocketContext)

function App() {
  const [user,setUser] = useState(null)
  const [connected, setConnected] = useState(false)

  const navigate = useNavigate()
  // useEffect(() =>{
  //   console.log('in user useEffect', user)
  //   if(user){
  //     navigate('/gameHub')
  //   }

  // },[user])



  useEffect(()=>{
    // these socket listeners need to interact with the app's state, but we can't try and run set state before the app is mounted. They will live here. 
    console.log('in app.jsx top of use effect, socket is:', socket)
    let timeoutID // used to prevent auto logout if user reconnects within time limit, set on disconnect
    socket.on('connect', () => {
      console.log('Connecting')
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
      navigate('/gameHub')
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
        // navigate('/sign-in')
      }, 10000); // if not reconnected in 10 second log out the user
	})
  },[])
  
  useEffect(() => {
    if(connected){
      console.log('Connected, in true use effect registering socket goodness')

      
    console.log(socket)
    }
  },[connected])

  return (
    <SocketContext.Provider value={socket}>
      <>
      {!connected && <h1>Connecting...</h1>}
      {user && <NavBar user={user} />}
        <Routes>

          {!user?
          <>
            <Route path="/sign-up" element={<SignUpForm setUser/> } />
            <Route path="/sign-in?" element={<SignInForm setUser/>} />
            <Route path="*" element={<Navigate to="/sign-in"/>}/>
          </>
            :
          <>
            {/* <Route element={<NavBar user setUser/>}></Route> */}
              <Route path="/about" element={<h2> about page goes here </h2>}/>
              <Route path="/gameHub" element={<GameHub user={user}></GameHub>}/>
              <Route path="/profile" element={<Profile user={user} setUser={setUser}/>}/>
              <Route path="*" element={<Navigate to="/gameHub"/>}/>
            
          </>
          }
        </Routes>
      </>
    </SocketContext.Provider>
  )
}

export default App
// export{socket, SocketContext}