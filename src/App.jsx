import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {socket, SocketContext} from './socketConnection'
import SignUpForm from './SignUpForm'

function App() {
  const [user,setUser] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(()=>{
    socket.on('connect', () => {
      console.log('Connecting', socket)
      setConnected(true)
	})

    socket.on('disconnect', () => {
      console.log('Disconnecting')
      setConnected(false)
	})
  },[connected])
  
  return (
    <SocketContext.Provider value={socket}>
      {connected? <></> : <p>Loading...</p>}
      <SignUpForm setUser></SignUpForm>
    </SocketContext.Provider>
  )
}

export default App
