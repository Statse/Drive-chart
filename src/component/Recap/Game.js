import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import Score from './Score'
import Possession from './Possession'

export default function Game(props) {
    const {game} = props

    return (
        <>
            {/* <Grid item md={12}>
               <Score game={game}/>
            </Grid> */}
            {game.downs && (
                <Possession game={game}/>
            )}
        </>
    )
}
