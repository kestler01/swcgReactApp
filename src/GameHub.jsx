import { useState, useContext, useEffect } from 'react'
import { SocketContext } from './socketConnection.js'
// import { SocketContext } from './App'
import {Container, Row, Col } from 'react-bootstrap'


import CreateGameForm from './createGameForm'
import GameIndex from './gameIndex'

const GameHub= (props) => {
    // const [gameHubSocket, setGameHubSocket] = useState(null)

    // setGameHubSocket(io(`${socket.io.uri}/gameHub`, {auth: {user}})) 

    return (
        <Container fluid className='gameHub maxH100'>
            <Row className='maxH100'>
                <Col className='maxH100 '>
                    <CreateGameForm {...props}></CreateGameForm>
                </Col>
                <Col className='maxH100'>
                    <GameIndex {...props}></GameIndex>
                </Col>
            </Row>
        </Container>
    )
}
export default GameHub