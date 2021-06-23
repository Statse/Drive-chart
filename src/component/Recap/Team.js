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
                        <OffenseType game={game} team={team}/>
                        <TotalYards game={game} team={team}/>  
                        <CompletionPrecentage game={game} team={team}/>  
                        <PassAvarageGain game={game} team={team}/>  
                        <TouchdownTurnoverRatio game={game} team={team}/>
                        <RunAvarageGain game={game} team={team}/>  
                        <Penalties game={game} team={team}/>  
                        <FirstDowns game={game} team={team}/>  
                        <ReceiverSeparation game={game} team={team}/>  
                        <ReceiverCompletions game={game} team={team}/>  
                        <RunGaps game={game} team={team}/>  
                         {/* <Grid item xs={12} md={6}>
                        <ThrowMap game={game} team={team}/>  
                    </Grid>  */}
                </>
            )}
        </Grid>
    )
}
