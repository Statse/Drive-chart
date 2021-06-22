import React from 'react'

//Charts
import Grid from '@material-ui/core/Grid';



export default function Game(props) {
    const {game, team} = props

    

    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                    <Grid item xs={12} md={6}>
                        {/* <ScoringPerQuarter game={game}/> */}
                    </Grid>
                </>
            )}
        </Grid>
    )
}
