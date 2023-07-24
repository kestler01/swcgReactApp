import { useState, useContext, useEffect } from 'react'
import { SocketContext } from './socketConnection.js'

import CreateGameForm from './createGameForm'
import GameIndex from './gameIndex'

const GameHub= (props) => {


    return (
        <div classList='gameHub'>
            <CreateGameForm {...props}></CreateGameForm>
            <GameIndex {...props}></GameIndex>
        </div>
    )
}
export default GameHub