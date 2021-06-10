import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import OffenseType from './OffenseType'
import TouchdownTurnoverRatio from './TouchdownTurnoverRatio'
import CompletionPrecentage from './CompletionPrecentage'
import PassAvarageGain from './PassAvarageGain'
import RunAvarageGain from './RunAvarageGain'

export default function Team(props) {
    const {game, team} = props

    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                    <Grid item xs={12} md={6} lg={4}>
                        <OffenseType game={game} team={team}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TouchdownTurnoverRatio game={game} team={team}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompletionPrecentage game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6} lg={4}>
                        <PassAvarageGain game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6} lg={4}>
                        <RunAvarageGain game={game} team={team}/>  
                    </Grid> 
                </>
            )}
        </Grid>
    )
}
