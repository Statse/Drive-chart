import React from 'react'

//Charts
import Score from './Score'
import Possession from './Possession'
import Button from '@material-ui/core/Button';

export default function Game(props) {
    const {game, team} = props
    return (
        <div>
            <Score game={game}/>
            {game.downs && (
                <Possession game={game}/>
            )}
        </div>
    )
}
