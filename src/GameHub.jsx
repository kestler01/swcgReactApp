import { useState, useContext, useEffect } from 'react'
import { SocketContext } from './socketConnection.js'
// import { SocketContext } from './App'
import {Container, Row, Col } from 'react-bootstrap'


import CreateGameForm from './createGameForm'
import GameIndex from './gameIndex'

const GameHub= (props) => {


    return (
        <Container fluid className='gameHub'>
            <Row>
                <Col >
                    <CreateGameForm {...props}></CreateGameForm>
                </Col>
                <Col >
                    <GameIndex {...props}></GameIndex>
                </Col>
            </Row>
        </Container>
    )
}
export default GameHub