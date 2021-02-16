import React from 'react'
import {GameProvider} from '../context/GameContext'
import Game from './Game'

export default function GameWrapper(props) {
    return (
        <GameProvider>
            <Game {...props}></Game>
        </GameProvider>
    )
}
