/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
// // import { Navbar} from 'react-bootstrap'
import { useContext } from 'react'
import { SocketContext}  from './socketConnection'
// import { SocketContext } from './App'



const NavBar = (props) => {

    const socket = useContext(SocketContext)
    console.log('in navbar page props:', props)
    
    const {user} = props 
    function handleAbout() {
        console.log('clicked about button')
    }

    const handleSignOutSuccess = (res) => {
        console.log('in handle sign out success callback:', res)
    }

    const handleSignOut = () => {
        console.log('clicked sign out button')
        socket.emit('signout', user,handleSignOutSuccess)
    }

    return (
    <div className='myNavbar'>
        <span>welcome {user?.profileName}</span>
        <Link to={'/about'} onClick={handleAbout}>About</Link>
        <Link to={'/profile'} >Profile</Link>
        <Link to={'/gameHub'}>New Games</Link>
        <Link to={'/'} onClick={handleSignOut}>signOut</Link>
    </div>)
}

export default NavBar