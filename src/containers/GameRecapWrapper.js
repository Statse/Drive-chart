import React from 'react'
import {GameProvider} from '../context/GameContext'
import GameRecap  from './GameRecap'
import {useGame} from '../context/GameContext'

export default function GameRecapWrapper(props) {
    return (
        <GameProvider>
            <GameRecap {...props} useGame={useGame}/>
        </GameProvider>
    )
}
