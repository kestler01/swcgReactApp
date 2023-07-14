import { useState } from 'react'

const SignUpForm = (props) => {
    // const [email, setEmail] = useState(null)
    // const [username, setUsername] = useState(null)
    // const [password, setPassword] = useState(null)    
    // const [passwordConfirmation, setPasswordConfirmation] = useState(null)
    const [state, setState] = useState({
        email: '',
        password: '',
        passwordConfirmation:'',
        username: ''
    })

    function handleInputChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        // WRITE FIRST 'API' SOCKET CONNECTION GOODIES
    }

    return (
        <>  
            <h4>register a new account</h4>
            <form>
                <input 
                    name='email' 
                    type='email' 
                    onChange={handleInputChange}>
                </input>
                <input 
                    name='username' 
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
            <button>sign up with google</button>
            <button>already have an account</button>
        </>
    )
}

export default SignUpForm