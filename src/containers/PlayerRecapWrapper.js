import React from 'react'
import PlayerRecap  from './PlayerRecap'
import {useGame} from '../context/GameContext'

export default function PlayerRecapWrapper(props) {
    return (
        <PlayerRecap {...props} useGame={useGame}/>
    )
}
