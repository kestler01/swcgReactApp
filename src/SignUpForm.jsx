import { useState, useContext } from 'react'
import { SocketContext } from './socketConnection.js'
// import { SocketContext } from './App'
import { Link } from 'react-router-dom'

const SignUpForm = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        passwordConfirmation:'',
        profileName: ''
    })
    // bring in the socket object from context
    const socket = useContext(SocketContext)

    function handleInputChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(state)
        console.log(socket)
        try{
            socket.emit('signup', state)
        } catch(e) {
            console.log(e)
        }
        
    }

    return (
        <div className='dataPad'>  
            <h4>register a new account</h4>
            <form onSubmit={handleSubmit}>
                <input 
                    name='email' 
                    type='email' 
                    onChange={handleInputChange}>
                </input>
                <input 
                    name='profileName' 
                    type='text' 
                    onChange={handleInputChange}>
                </input>
                <input 
                    name='password' 
                    type='password' 
                    onChange={handleInputChange}>
                </input>
                <input 
                    name='passwordConfirmation' 
                    type='password' 
                    onChange={handleInputChange}>
                </input>
                <button type='submit'>submit</button>
            </form>
            {/* <button>sign up with google</button> */}
            <Link to={'/sign-in'}><button>already have an account</button></Link>
        </div>
    )
}

export default SignUpForm