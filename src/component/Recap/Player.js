import React from 'react'
import { useParams } from "react-router-dom"

//Charts
import RunGaps from './Player/RunGaps';

import Grid from '@material-ui/core/Grid';



export default function Player(props) {
    const {game, team, player} = props
    console.log("Player", props)
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>Player #31</h1>
            </Grid>
            {game.downs && (
                <>
                    <Grid item xs={12} md={6}>
                        <RunGaps game={game} team={team} player={player}/> 
                    </Grid>
                </>
            )}
        </Grid>
    )
}
