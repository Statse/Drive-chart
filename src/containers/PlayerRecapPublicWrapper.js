import React from 'react'
import {PublicGameProvider} from '../context/PublicGameContext'
import {usePublicGame} from '../context/PublicGameContext'
import PlayerRecap  from './PlayerRecap'

export default function PlayerRecapWrapper(props) {
    return (
        <PublicGameProvider>
            <PlayerRecap {...props} useGame={usePublicGame} />
        </PublicGameProvider>
    )
}
