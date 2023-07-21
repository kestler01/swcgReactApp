import { useState, useContext, useEffect } from 'react'
import { SocketContext } from './socketConnection.js'

const GameIndex = (props) => {
    const [games, setGames] = useState(null)

    const user = props.user
    const socket = useContext(SocketContext)

    useEffect(() => {
        socket.emit('getGameIndex',)
        socket.on('getGameIndexSuccess', (data) => setGames(data))
    },[])
    
    const handleGameJoin = (event) => {
        console.log(event.target)
        const gameId = games[event.target.key]._id
        console.log(gameId)
        socket.emit('joinGame', gameId)
    }

    return(
        <table>
            <tr>
                <th>Name</th>
                <th>Faction Open</th>
            </tr>

            {games.map((game, key) => {
                <tr onClick={handleGameJoin} key={key}> <td>{game.name} </td>
                <td>{game.empire?'rebels' : 'empire'}</td>
                </tr>
            })}
        </table>
    )
}

export default GameIndex