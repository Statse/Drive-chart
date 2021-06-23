import React from 'react'

//
import Button from '@material-ui/core/Button';

//Charts
import Grid from '@material-ui/core/Grid';
import Possession from './Game/Possession'
import ScoringPerQuarter from './Game/ScoringPerQuarter'
import FirstDownsComparison from './Game/FirstDownsComparison'
import OffenseYards from './Game/OffenseYards'
import PassingYardsComparison from './Game/PassingYardsComparison'
import RunningYardsComparison from './Game/RunningYardsComparison'
import AvarageGain from './Game/AvarageGain'
import AvaragePassingGain from './Game/AvaragePassingGain'
import AvarageRunningGain from './Game/AvarageRunningGain'
import PenaltyYards from './Game/PenaltyYards'



export default function Game(props) {
    const {game, team} = props
    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                    <ScoringPerQuarter game={game}/>
                    <Possession game={game}/>
                    <FirstDownsComparison game={game}/>
                    <OffenseYards game={game} team={team}/>  
                    <AvarageGain game={game}/>
                    <PassingYardsComparison game={game}/>
                    <AvaragePassingGain game={game}/>
                    <RunningYardsComparison game={game}/>
                    <AvarageRunningGain game={game}/>
                    <PenaltyYards game={game}/>
                </>
            )}
        </Grid>
    )
}
