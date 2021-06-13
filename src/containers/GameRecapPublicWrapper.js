import React from 'react'
import {PublicGameProvider} from '../context/PublicGameContext'
import {usePublicGame} from '../context/PublicGameContext'
import GameRecap  from './GameRecap'

export default function GameRecapWrapper(props) {
    return (
        <PublicGameProvider>
            <GameRecap {...props} useGame={usePublicGame} />
        </PublicGameProvider>
    )
}
