
import { useState, useEffect, useContext} from 'react'
import {Container, Row, Col, Table } from 'react-bootstrap'
import { SocketContext } from './socketConnection.js'
import isSocketPromiseOk from './socketPromiseHelper.js'

import ForceGrid from './ForceGrid.jsx'

const GameBoard = (props) => {
    const [localState, setLocalState] = useState(props.game.data)
    const [isPlayerTurn, setPlayerTurn] = useState(null)
    const [resources, setResources] = useState(0)
    const [playerFaction, setPlayerFaction] = useState(null)
    const {user, game} = props

    const socket = useContext(SocketContext)

    useEffect(() =>{
        console.log(localState)
        if (user._id === game.empire){
            setPlayerTurn(true)
            setPlayerFaction('empire')
        } else {
            setPlayerTurn(false)
            setPlayerFaction('rebels')

        }
    },[])

    return(
        <>
            <div className="gameBoard ">
                <Row className="opponentHand gameField">
                    {/* map hand to card components ( backs ) */}
                </Row>
                <Row className="opponentPLayRow gameField">
                </Row>
                <Row className="gameBoardRow gameField">
                    <Col className="forceColumn gameField">
                        {/* 7 stacked cells with force token */}
                        {/* <div className='forceCell' key='1'>
                            <div id='forceCube' ></div>
                        </div>
                        <div className='forceCell' key='2'>
                        </div>
                        <div className='forceCell' key='3'>
                        </div>
                        <div className='forceCell' key='4'>
                        </div>
                        <div className='forceCell' key='5'>
                        </div>
                        <div className='forceCell' key='6'>
                        </div>
                        <div className='forceCell' key='7'>
                        </div> */}
                        <ForceGrid force={0}></ForceGrid>
                    </Col>
                    <Col md={10} className='centerBoard gameField'>
                        
                        <Row className="CenterRow gameField">
                            <Col className='outerRimPilotDeck'></Col>
                            <Col className='galaxyRow'></Col>
                            <Col className='galaxyDeck'></Col>
                            <Col className='galaxyDiscard'></Col>
                        </Row>

                    </Col>
                    <Col className="gameDataDisplay gameField">

                    </Col>
                </Row>
                <Row className="playerPlayRow gameField"></Row>
                <Row className="playerHand gameField">
                            {/* map hand to card components ( backs ) */}

                </Row>
            </div>

        </>
    )
}



{/* 
<img className='mediumIcon' src="../public/assets/imperialSymbol.svg" alt="SVG of imperial emblem"></img>

<img className='mediumIcon' src="/assets/RebelSymbol.svg" alt="SVG of rebel emblem"></img>

<img className='mediumIcon' src="../public/assets/resourceIconblk.svg" alt="SVG of resource crate icon"></img> 
*/}

export default GameBoard