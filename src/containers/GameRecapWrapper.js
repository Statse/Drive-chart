import React from 'react'
import {GameProvider} from '../context/GameContext'
import GameRecap  from './GameRecap'

export default function GameRecapWrapper(props) {
    return (
        <GameProvider>
            <GameRecap {...props} />
        </GameProvider>
    )
}
