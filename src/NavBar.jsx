import { Link, NavLink } from 'react-router-dom'
import { Navbar} from 'react-bootstrap'
import { useContext } from 'react'
import { SocketContext}  from './socketConnection'
const NavBar = (props) => {

    const {user, setUser} = props

    const socket = useContext(SocketContext)
    

    const handleAbout = () => {
        console.log('clicked about button')
    }

    const onSignOutSuccess = (res) => {
        console.log('inSignOutSuccess',res)
        // if(res.status === 'ok'){
        //     setUser(null)
        // }
        // else{
        //     console.log('an error occurred while signing out', res)
        // }
    }
    const handleSignOut = () => {
        socket.emit('signOut', socket,onSignOutSuccess)
    }

    return (<NavBar className='myNavbar'>

        <NavLink to={'/about'} onClick={handleAbout}>About</NavLink>
        <NavLink to={'/profile'} >Profile</NavLink>
        <NavLink to={'/gameHub'}>New Games</NavLink>
        <NavLink to={'/'} onClick={handleSignOut}>signOut</NavLink>
    </NavBar>)
}

export default NavBar