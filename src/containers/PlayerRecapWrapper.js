import React from 'react'
import {GameProvider} from '../context/GameContext'
import PlayerRecap  from './PlayerRecap'
import {useGame} from '../context/GameContext'

export default function PlayerRecapWrapper(props) {
    return (
        <GameProvider>
            <PlayerRecap {...props} useGame={useGame}/>
        </GameProvider>
    )
}
