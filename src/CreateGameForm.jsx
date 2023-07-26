import { useState, useContext } from 'react'
import { SocketContext } from './socketConnection.js'
// import { SocketContext } from './App'


const CreateGameForm = (props) => {
    const [state, setState] = useState({
    })
    // bring in the socket object from context
    const {user} = props
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
        console.log(user)
        socket.emit('createGame', state)
    }
        return (
        <>  
            <h4> Create a new game </h4>
            <form onSubmit={handleSubmit}>
                <label> game name
                    <input type="text" name='name' onChange={handleInputChange}></input>
                </label>
                <br></br>
                <label> gameType
                    <select name='gameType' onChange={handleInputChange}>
                        <option defaultValue value="default">default</option>
                    </select>
                </label>
                <br></br>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default CreateGameForm