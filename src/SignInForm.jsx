import { useState, useContext } from 'react'
import { SocketContext } from './socketConnection.js'
// import { SocketContext } from './App'

import { Link} from 'react-router-dom'



const SignUpForm = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    // bring in the socket object from context
        const socket = useContext(SocketContext)
    console.log('in signUpForm, socket is', socket)

    function handleInputChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    // const handleSignInSuccess = (response) => {
    //     console.log(response)
    //     if (response.status === ok) {
    //         // setUser(response.data)
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(state)
        console.log(socket)
        socket.emit('signin', state)
    }

    return (
        <>  
        {/* {user && (<Navigate to='/gameHub' replace='true'></Navigate>)} */}
            <h4> sign in to your account </h4>
            <form onSubmit={handleSubmit}>
                <label>email
                    <input 
                        name='email' 
                        type='email' 
                        onChange={handleInputChange}>
                    </input>
                </label>
                <br></br>
                <label>password
                    <input 
                        name='password' 
                        type='password' 
                        onChange={handleInputChange}>
                    </input>
                </label>
                <br></br>
                <button type='submit'>login</button>
            </form>
            <br></br>
            {/* <button>sign up with google</button> */}
            <Link to={'/sign-up'}><button>register an account</button></Link>
        </>
    )
}

export default SignUpForm