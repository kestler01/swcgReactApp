import { useState, useContext } from 'react'
import { SocketContext } from './socketConnection.js'

const SignUpForm = (props) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    // destructure setUser from props
    const {setUser} = props
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
            socket.emit('signin', state)
        } catch(e) {
            console.log(e)
        }
        
    }

    return (
        <>  
            <h4> sign in to your account </h4>
            <form onSubmit={handleSubmit}>
                <label>email</label>
                <input 
                    name='email' 
                    type='email' 
                    onChange={handleInputChange}>
                </input>
                <br></br>
                <label>password</label>
                <input 
                    name='password' 
                    type='password' 
                    onChange={handleInputChange}>
                </input>
                <button type='submit'>login</button>
            </form>
            {/* <button>sign up with google</button> */}
            <button>register an account</button>
        </>
    )
}

export default SignUpForm