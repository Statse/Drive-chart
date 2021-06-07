import React from 'react'
import Grid from '@material-ui/core/Grid';
import Possession from '../component/Recap/Possession'

export default function Team(props) {
    const {game} = props
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <div style={{display:"flex",flexFlow:"column"}}>
                    <div>{game.home} - {game.homeScore}</div>
                    <div>{game.away} - {game.awayScore}</div>
                </div>
            </Grid>
            {game.downs && (
            <Grid item xs={12} md={12}>
                <Possession game={game}/>
            </Grid>
            )}
        </Grid>
    )
}
