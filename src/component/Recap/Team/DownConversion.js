import React from 'react'
import Typography from '@material-ui/core/Typography';
import StatCard from '../Wrappers/StatCard'

export default function DownConversion(props) {
    const {game, team} = props
    const {downs} = game

    const conversion = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
        }
    })
    
    return (
        <StatCard>
            <Typography variant="h5" component="h2">Conversion</Typography>
        </StatCard>
    )
}
