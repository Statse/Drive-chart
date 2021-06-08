import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import OffenseType from './OffenseType'


export default function Team(props) {
    const {game, team} = props

    return (
        <>
            {game.downs && (
                <OffenseType game={game} team={team} />
            )}
        </>
    )
}
