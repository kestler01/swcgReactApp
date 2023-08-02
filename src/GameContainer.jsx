import { useState, useEffect, useContext} from 'react'
import { useNavigate, Navigate} from 'react-router-dom'
import { SocketContext } from './socketConnection.js'
import isSocketPromiseOk from './socketPromiseHelper.js'
import { Button, Table, ToggleButton, Card, Image } from 'react-bootstrap'
import {Container, Row, Col } from 'react-bootstrap'

import GameBoard from './GameBoard.jsx'
// import galacticEmpireEmblem from './assets/Emblem_of_first_em'
// <img src="/path/to/image.svg" alt="SVG as an image">

// import mySvg from './path/to/image.svg'
const GameContainer = (props) => {
    // all coming from the game prop, which is being aggressively updated by the users / server side
    // const [players, setPlyers] = useState([])
    const [rebels, setRebels] = useState(null)
    const [empire,setEmpire] = useState(null)
    const [ready, setReady] = useState(false)
    const [otherReady, setOtherReady] = useState(false)
    const {user, game, setGame} = props


    const navigate = useNavigate()
    const socket = useContext(SocketContext)

    useEffect(() =>{
        console.log('in game Container', props)
        socket.on('startGameSuccess', (data) => {
                console.log('starting game success!', data)
                setGame(data?.game)
            })
        socket.on('gameDetailsUpdate', ( data ) =>{
            console.log('incoming game details update, data: ', data)
            setGame(data)
        })
        return(
            () => {// clean up function
                const data = {game, user}
                if(!ready){
                    const res = isSocketPromiseOk('leaveGame', data)
                console.log(res)
                if(res.status === 'ok'){
                    setGame(null)
                }
                }
                socket.removeListener('gameDetailsUpdate', 'startGameSuccess')
            }
        )
    },[])

    useEffect( () => {
        console.log('in ready use effect, are we ready to start ?', ready)
        console.log('is other ready ? not yet but who cares : test it now')
        const data = {game, user}
        if( ready ){
            console.log('passed ready check')
            handleGameStart(data)
        }
        
    }, [ready])

    const handleGameStart = async (data) => {
        console.log('run emit')
        const res = await isSocketPromiseOk('startGame', data)
        console.log(res.data)
        setGame(res.data)
    }
    
    const handleGameUpdate = (data) => {
        console.log('in handleGameUpdate, data:', data)
    }


    const handleLeaveGame = () => {
        // setGame(null) 
        navigate('/gameHub')
    }

    return(
    <>  
        {game.isStarted? <GameBoard {...props}></GameBoard> :
        <>
            {!game && (<Navigate to='/gameHub'></Navigate>)}
            <h2>Pregame Page</h2>
            <Container className='gameContainer maxH100'>
                <Row>
                    <Col>
                        <p>players</p>
                        {game.players.map((player, index) => {
                            return(
                                <Card key={index}>
                                    {player.profileName}
                                    {/* other profile data goes here in V2 */}
                                    Faction:
                                    <select name='faction' onChange={handleGameUpdate}>
                                        <option value={null}> - </option>
                                        <option value="Empire"> Empire</option>
                                        <option value="Rebels">Rebels</option>
                                    </select>
                                
                                <ToggleButton
                                    className="mb-2"
                                    id="toggle-check"
                                    type="checkbox"
                                    variant="outline-info"
                                    checked={ready}
                                    value="1"
                                    onChange={() => setReady(true)}
                                >
                                    Ready
                                </ToggleButton>
                                </Card>
                            )
                        })}
                    </Col>
                    <Col>
                        <p>game details</p>
                        <Table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>type</th>
                                    <th>empire</th>
                                    <th>rebels</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{game.name}</td>
                                    <td>{game.type?game.type:'default'}</td>
                                    <td >{game.empire?<img className='embeddedIcon' src="../public/assets/imperialSymbol.svg" alt="SVG of imperial emblem"></img>:''}</td>
                                    <td >{game.rebels?<img className='embeddedIcon' src="/assets/RebelSymbol.svg" alt="SVG of imperial emblem"></img>:''}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Button onClick={handleLeaveGame}> Leave Game </Button>
        </>
        }
    </>
    )
}

export default GameContainer