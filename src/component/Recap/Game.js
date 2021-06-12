import React from 'react'

//
import Button from '@material-ui/core/Button';

//Charts
import Grid from '@material-ui/core/Grid';
import Possession from './Game/Possession'
import ScoringPerQuarter from './Game/ScoringPerQuarter'
import FirstDownsComparison from './Game/FirstDownsComparison'
import OffenseYards from './Game/OffenseYards'


export default function Game(props) {
    const {game, team} = props
    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                    <Grid item xs={12} md={6}>
                        <ScoringPerQuarter game={game}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <OffenseYards game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <Possession game={game}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FirstDownsComparison game={game}/>
                    </Grid>
                </>
            )}
        </Grid>
    )
}
