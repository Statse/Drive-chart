import React from 'react'

//Charts
import Score from './Score'
import Possession from './Possession'
import ScoringPerQuarter from './ScoringPerQuarter'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Game(props) {
    const {game, team} = props
    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                    <Grid item xs={12} md={4} lg={4}>
                        <ScoringPerQuarter game={game}/>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Possession game={game}/>
                    </Grid>
                </>
            )}
        </Grid>
    )
}
