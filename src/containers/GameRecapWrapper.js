import React from 'react'
import GameRecap  from './GameRecap'
import {useGame} from '../context/GameContext'

export default function GameRecapWrapper(props) {
    return (
        <GameRecap {...props} useGame={useGame}/>
    )
}
