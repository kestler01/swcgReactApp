import { useState, useContext } from 'react'
import { SocketContext } from './socketConnection.js'
// import { SocketContext } from './App'

import { Link} from 'react-router-dom'
import {Card, ListGroup, Button} from 'react-bootstrap'


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
        <Card className='dataPad'>  
            <h4> sign in to your account </h4>
            <form onSubmit={handleSubmit}>
                <ListGroup >
                    <ListGroup.Item>
                    <label>email 
                        <input 
                            name='email' 
                            type='email' 
                            onChange={handleInputChange}>
                        </input>
                    </label>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <label>password 
                        <input 
                            name='password' 
                            type='password' 
                            onChange={handleInputChange}>
                        </input>
                    </label>
                    </ListGroup.Item>
                </ListGroup>
                <br></br>
                <Button variant='outline-info'type='submit'>login</Button>
                <Link to={'/sign-up'}><Button variant="outline-info">register an account</Button></Link>
            </form>
            <br></br>
            {/* <button>sign up with google</button> */}
            
        </Card>
    )
}

export default SignUpForm