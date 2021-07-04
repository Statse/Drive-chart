import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import OffenseType from './Team/OffenseType'
import TouchdownTurnoverRatio from './Team/TouchdownTurnoverRatio'
import CompletionPrecentage from './Team/CompletionPrecentage'
import PassStats from './Team/PassAvarageGain'
import RunStats from './Team/RunAvarageGain'
import GameStats from './Team/TotalYards'
import Penalties from './Team/Penalties'
import RunGaps from './Team/RunGaps'
import PassingZones from './Team/PassingZones'
import ReceiverSeparation from './Team/ReceiverSeparation'
import ReceiverCompletions from './Team/ReceiverCompletions'

export default function Team(props) {
    const {game, team} = props

    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                        <GameStats game={game} team={team}/> 
                        <OffenseType game={game} team={team}/>
                        <PassStats game={game} team={team}/>  
                        <CompletionPrecentage game={game} team={team}/>  
                        <RunStats game={game} team={team}/>  
                        <TouchdownTurnoverRatio game={game} team={team}/>
                        <Penalties game={game} team={team}/>  
                        <RunGaps game={game} team={team}/>
                        <PassingZones game={game} team={team}/>  
                        <ReceiverSeparation game={game} team={team}/>  
                        <ReceiverCompletions game={game} team={team}/>  
                </>
            )}
        </Grid>
    )
}
