import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import RunGaps from './Player/RunGaps';



export default function Player(props) {
    const {game, team, player} = props
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>Player #{player}</h1>
            </Grid>
            {game.downs && (
                <RunGaps game={game} team={team} player={player}/>
            )}
        </Grid>
    )
}