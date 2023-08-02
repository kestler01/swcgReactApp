import { useState, useContext, useEffect } from 'react'
import { SocketContext } from './socketConnection.js'
import isSocketPromiseOk from './socketPromiseHelper.js'
import { Button, Table } from 'react-bootstrap'

const GameIndex = (props) => {
    const [games, setGames] = useState(null)
    
    const { user, setGame}= props
    const socket = useContext(SocketContext)

    const getGameIndex = async (data) => {
        const returnData = await isSocketPromiseOk('getOpenGames', data)
        // console.log(returnData)
        const gameList = returnData.games
        setGames( gameList )
    }

    useEffect( () => {
        console.log('in game index useEffect')
        const userData = { user } 
        socket.emit('subscribeToGameHub')
        getGameIndex( userData )
        socket.on('gameListUpdate',() => {
            getGameIndex( userData )
        })
        return (() => { // returning a clean up function here, 
            socket.emit('unsubscribeFromGameHub') // should no longer receive requests to update 
            socket.off('gameListUpdate') // remove the listener for the update event to prevent multiple registrations of the event. 
        })
    },[])
    
    const handleGameJoin = async (game, key) => {
        console.log(game)

        // gameList[key].players.push(user._id)
        // console.log(gameList)
        // setGames(gameList)
        // const gameId = games[event.target.key]._id
        // console.log(gameId)
        const resData = await isSocketPromiseOk('joinGame', {game, user})
        console.log('data after join game emit', resData)
        if (resData.status === 'ok') {
            setGame(resData.game)
        }
    }

    return(
        <div className='tableContainer maxH100'>
            <Table striped bordered hover className='maxH100'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Faction Open</th>
                        <th>Players</th>
                    </tr>
                </thead>
                <tbody>
                {games?.map((game, key) => {
                    return(
                    <tr  key={key}> 
                        <td><Button variant="outline-info" disabled={game.players.length >= 2} onClick={() => handleGameJoin(game, key)}> join </Button></td>
                        <td>{game.name} </td>
                        <td>{game.empire?'rebels' : 'empire'}</td>
                        <td>{game.players.length}</td>
                    </tr>)
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default GameIndex