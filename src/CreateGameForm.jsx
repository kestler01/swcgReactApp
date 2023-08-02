import { useState, useContext } from 'react'
import { SocketContext } from './socketConnection.js'
import isSocketPromiseOk from './socketPromiseHelper.js'
import { useNavigate } from 'react-router-dom'
const CreateGameForm = (props) => {
    const [state, setState] = useState({
    })
    // bring in the socket object from context
    const {user} = props
    const navigate = useNavigate()

    function handleInputChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {...state, ...user}
        console.log('data before creating game emit', data)
        const resData = await isSocketPromiseOk('createGame', data)
        console.log('data after creating game emit', resData)
        if (resData.status === 'ok') {
            navigate('/game')
        }

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