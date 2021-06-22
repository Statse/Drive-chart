import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import OffenseType from './Team/OffenseType'
import TouchdownTurnoverRatio from './Team/TouchdownTurnoverRatio'
import CompletionPrecentage from './Team/CompletionPrecentage'
import PassAvarageGain from './Team/PassAvarageGain'
import RunAvarageGain from './Team/RunAvarageGain'
import TotalYards from './Team/TotalYards'
import Penalties from './Team/Penalties'
import FirstDowns from './Team/FirstDowns'
import RunGaps from './Team/RunGaps'
import ReceiverSeparation from './Team/ReceiverSeparation'
import ReceiverCompletions from './Team/ReceiverCompletions'

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
                    <Grid item xs={12} md={6}>
                        <Penalties game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <FirstDowns game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <ReceiverSeparation game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <ReceiverCompletions game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <RunGaps game={game} team={team}/>  
                    </Grid> 
                         {/* <Grid item xs={12} md={6}>
                        <ThrowMap game={game} team={team}/>  
                    </Grid>  */}
                </>
            )}
        </Grid>
    )
}
