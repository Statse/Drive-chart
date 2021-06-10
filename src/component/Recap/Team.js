import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import OffenseType from './Team/OffenseType'
import TouchdownTurnoverRatio from './Team/TouchdownTurnoverRatio'
import CompletionPrecentage from './Team/CompletionPrecentage'
import PassAvarageGain from './Team/PassAvarageGain'
import RunAvarageGain from './Team/RunAvarageGain'
import TotalYards from './Team/TotalYards'

export default function Team(props) {
    const {game, team} = props

    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                    <Grid item xs={12} md={6}>
                        <OffenseType game={game} team={team}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TotalYards game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <CompletionPrecentage game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <PassAvarageGain game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <TouchdownTurnoverRatio game={game} team={team}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RunAvarageGain game={game} team={team}/>  
                    </Grid> 
                </>
            )}
        </Grid>
    )
}
